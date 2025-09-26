import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { courseService } from '@/services/courseService';
import { supabase } from '@/lib/supabase';
import type { UserProgress } from '@/lib/mockData';

interface NotificationState {
  questUpdates: boolean;
  teamActivity: boolean;
  achievements: boolean;
  leaderboard: boolean;
  weeklyReport: boolean;
}

interface PrivacyState {
  showInLeaderboard: boolean;
  allowTeamInvites: boolean;
  showProgress: boolean;
}

interface ProfileFormState {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  institution: string;
}

const Settings: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Initialize profile data from auth context
  const [profileData, setProfileData] = useState<ProfileFormState>({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    institution: ''
  });

  const [preferences, setPreferences] = useState({
    notifications: {
      questUpdates: true,
      teamActivity: true,
      achievements: true,
      leaderboard: false,
      weeklyReport: true
    } satisfies NotificationState,
    privacy: {
      showInLeaderboard: true,
      allowTeamInvites: true,
      showProgress: true
    } satisfies PrivacyState,
    language: 'en'
  });

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user && profile) {
      setProfileData({
        name: profile.full_name || profile.username || '',
        email: profile.email || user.email || '',
        bio: profile.bio || '',
        avatar: profile.avatar_url || '👤',
        institution: profile.institution || ''
      });
    }
  }, [user, profile]);

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    setSaveStatus('idle'); // Reset save status when user makes changes
  };

  // Avatar upload state
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarRemoving, setAvatarRemoving] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const hasCustomAvatar = useMemo(() => {
    if (!profileData.avatar) return false;
    if (profileData.avatar === '👤') return false;
    if (profileData.avatar.includes('ui-avatars.com')) return false;
    return true;
  }, [profileData.avatar]);

  const extractSupabaseStoragePath = (url: string): { bucket: string; path: string } | null => {
    try {
      const parsed = new URL(url);
      const marker = '/storage/v1/object/public/';
      const markerIndex = parsed.pathname.indexOf(marker);
      if (markerIndex === -1) return null;
      const relativePath = parsed.pathname.slice(markerIndex + marker.length);
      const parts = relativePath.split('/').filter(Boolean);
      if (parts.length < 2) return null;
      const [bucket, ...objectParts] = parts;
      if (!bucket || objectParts.length === 0) return null;
      return {
        bucket,
        path: decodeURIComponent(objectParts.join('/')),
      };
    } catch (error) {
      console.warn('Failed to parse Supabase storage path from URL:', error);
      return null;
    }
  };

  // Helper: convert file to data URL (fallback when storage bucket is unavailable)
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setAvatarError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validations
    if (!file.type.startsWith('image/')) {
      setAvatarError('Please select a valid image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // 2MB
      setAvatarError('Image is too large. Please upload an image under 2MB.');
      return;
    }

    let previewUrl: string | null = null;
    const revokePreview = () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
        previewUrl = null;
      }
    };

    try {
      setAvatarUploading(true);
      const previousAvatar = profileData.avatar;
      previewUrl = URL.createObjectURL(file);

      setProfileData(prev => ({ ...prev, avatar: previewUrl! }));

      // Create a unique path for the user's avatar
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage (ensure a bucket named 'avatars' exists)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true, cacheControl: '3600' });

      if (uploadError) {
        console.error('Avatar upload error:', uploadError);
        const msg = typeof uploadError.message === 'string' ? uploadError.message : '';
        if (msg.toLowerCase().includes('bucket not found')) {
          // Fallback: store small image as data URL in profile to unblock UI across the app
          try {
            revokePreview();
            const dataUrl = await fileToDataUrl(file);
            const { error: fallbackErr } = await updateProfile({ avatar_url: dataUrl });
            if (fallbackErr) {
              setAvatarError('Storage bucket missing and fallback save failed. Please try again after creating the avatars bucket.');
              setProfileData(prev => ({ ...prev, avatar: previousAvatar }));
            } else {
              setProfileData(prev => ({ ...prev, avatar: dataUrl }));
              setSaveStatus('success');
              setTimeout(() => setSaveStatus('idle'), 3000);
            }
          } catch (fe) {
            setAvatarError('Avatar storage bucket missing. Please create a public bucket named "avatars" in Supabase (Storage → New bucket), then try again.');
            setProfileData(prev => ({ ...prev, avatar: previousAvatar }));
          }
        } else {
          setAvatarError('Failed to upload image. Please try again.');
          setProfileData(prev => ({ ...prev, avatar: previousAvatar }));
        }
        revokePreview();
        return;
      }

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = data?.publicUrl;
      if (!publicUrl) {
        setAvatarError('Failed to get image URL.');
        setProfileData(prev => ({ ...prev, avatar: previousAvatar }));
        revokePreview();
        return;
      }

      // Update profile with new avatar URL
      const { error } = await updateProfile({ avatar_url: publicUrl });
      if (error) {
        // Attempt to clean up uploaded file to avoid orphaned storage objects
        await supabase.storage.from('avatars').remove([filePath]).catch(cleanupError => {
          console.warn('Failed to cleanup avatar after profile update error:', cleanupError);
        });
        setProfileData(prev => ({ ...prev, avatar: previousAvatar }));
        setAvatarError('Failed to save avatar. Please try again.');
        revokePreview();
      } else {
        setProfileData(prev => ({ ...prev, avatar: publicUrl }));
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
        revokePreview();
      }
    } catch (err) {
      console.error('Avatar upload failed:', err);
      setAvatarError('Unexpected error. Please try again.');
      setProfileData(prev => ({ ...prev, avatar: profile?.avatar_url || prev.avatar }));
      revokePreview();
    } finally {
      setAvatarUploading(false);
      // Reset the input value to allow uploading same file again if needed
      e.target.value = '';
      revokePreview();
    }
  };

  const handleRemoveAvatar = async () => {
    if (!user || avatarRemoving) return;
    if (!hasCustomAvatar) return;

    try {
      setAvatarError(null);
      setAvatarRemoving(true);

      const previousAvatar = profileData.avatar;
      setProfileData(prev => ({ ...prev, avatar: '' }));

      const storageInfo = extractSupabaseStoragePath(previousAvatar);
      const removalPromise = storageInfo
        ? supabase.storage.from(storageInfo.bucket).remove([storageInfo.path])
        : Promise.resolve({ data: null, error: null });

      const [removalResult, profileResult] = await Promise.all([
        removalPromise,
        updateProfile({ avatar_url: null })
      ]);

      const removalError = (removalResult as { error?: unknown })?.error;
      const profileError = profileResult?.error;

      if (removalError) {
        console.error('Failed to delete avatar from Supabase storage:', removalError);
        throw new Error('Storage removal failed');
      }

      if (profileError) {
        console.error('Failed to clear avatar from profile:', profileError);
        throw profileError;
      }

      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Unexpected error when removing avatar:', error);
      setAvatarError('Failed to remove photo. Please try again.');
      setProfileData(prev => ({ ...prev, avatar: profile?.avatar_url || prev.avatar }));
    } finally {
      setAvatarRemoving(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) {
      setSaveStatus('error');
      return;
    }

    setLoading(true);
    setSaveStatus('saving');

    try {
      const updates = {
        full_name: profileData.name,
        bio: profileData.bio,
        avatar_url: profileData.avatar,
        institution: profileData.institution || null
      };

      const { error } = await updateProfile(updates);

      if (error) {
        console.error('Error updating profile:', error);
        setSaveStatus('error');
      } else {
        setSaveStatus('success');
        // Reset status after 3 seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    if (!user) return;

    setActionLoading('export');
    
    try {
      // Simulate data export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get user progress data
      const progressData = await courseService.getUserCourseProgress(user.email || 'demo-user');
      
      // Create export data object
      const exportData = {
        profile: {
          name: profileData.name,
          email: profileData.email,
          bio: profileData.bio,
          avatar: profileData.avatar,
          institution: profileData.institution || null,
          level: profile?.level || 1,
          totalXP: profile?.total_xp || 0,
          ecoCoins: profile?.eco_coins || 0
        },
        progress: progressData,
        preferences: preferences,
        exportDate: new Date().toISOString()
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ecolearn-data-${user.email}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Your data has been exported successfully!');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetProgress = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      'Are you sure you want to reset all your progress? This action cannot be undone.\n\n' +
      'This will:\n' +
      '• Reset all course progress to 0%\n' +
      '• Clear all achievements\n' +
      '• Reset XP and level to starting values\n' +
      '• Keep your profile information intact'
    );

    if (!confirmed) return;

    setActionLoading('reset');

    try {
      // Simulate reset process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Clear user progress from mock database storage
      try {
        const allProgressRaw = localStorage.getItem('mock-user-progress');
        if (allProgressRaw) {
          const allProgress = JSON.parse(allProgressRaw) as UserProgress[];
          const filtered = Array.isArray(allProgress)
            ? allProgress.filter(p => p.user_id !== (user.email || 'demo-user'))
            : [];
          localStorage.setItem('mock-user-progress', JSON.stringify(filtered));
        }
      } catch (e) {
        console.warn('Failed to clear mock-user-progress for user:', e);
      }

      // Set a no-demo flag so demo progress is not regenerated after reset
      try {
        localStorage.setItem(`userProgress_noDemo_${user.email || 'demo-user'}`, 'true');
      } catch (e) {
        console.warn('Failed to set no-demo flag:', e);
      }
      
      // Clear dashboard cache
      localStorage.removeItem('dashboard-courses');
      localStorage.removeItem('dashboard-progress');
      localStorage.removeItem('dashboard-initialized');
      localStorage.removeItem('dashboard-last-update');

      // Reset profile XP and level
      if (profile) {
        await updateProfile({
          level: 1,
          total_xp: 0,
          eco_coins: 100
        });
      }

      alert('Your progress has been reset successfully! Please refresh the page to see the changes.');
      
      // Optionally refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error) {
      console.error('Error resetting progress:', error);
      alert('Failed to reset progress. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };


  const handleNotificationChange = (setting: string) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting as keyof typeof prev.notifications]
      }
    }));
  };

  const handlePrivacyChange = (setting: string) => {
    setPreferences(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: !prev.privacy[setting as keyof typeof prev.privacy]
      }
    }));
  };

  // Avatar options removed; using image upload instead

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">settings</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your EcoLearners experience</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Profile Information</h3>
          
          <div className="space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={profileData.avatar && profileData.avatar !== '👤' ? profileData.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name || 'Student')}&background=10b981&color=fff&size=128&rounded=true`}
                  alt="Profile avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-green-200"
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload"
                    onChange={handleAvatarUpload}
                    disabled={avatarUploading || !user}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold cursor-pointer transition-all duration-200 ${
                      avatarUploading || !user
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">upload</span>
                    {avatarUploading ? 'Uploading...' : 'Upload New Photo'}
                  </label>
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    disabled={!user || !hasCustomAvatar || avatarUploading || avatarRemoving}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ml-2 ${
                      !user || !hasCustomAvatar || avatarUploading
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : avatarRemoving
                        ? 'bg-red-200 text-red-700 cursor-wait'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                    {avatarRemoving ? 'Removing...' : 'Remove Photo'}
                  </button>
                  {avatarError && (
                    <p className="text-sm text-red-600 mt-2">{avatarError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG under 2MB</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>


            {/* Institution */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Institution (School/College)
              </label>
              <input
                type="text"
                value={profileData.institution || ''}
                onChange={(e) => handleProfileChange('institution', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Green Valley High"
              />
            </div>


            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Tell others about your eco journey..."
              />
            </div>

            <button 
              onClick={handleSaveProfile}
              disabled={loading || !user}
              className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                saveStatus === 'success' 
                  ? 'bg-green-600 text-white' 
                  : saveStatus === 'error'
                  ? 'bg-red-600 text-white'
                  : loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </div>
              ) : saveStatus === 'success' ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Saved Successfully!</span>
                </div>
              ) : saveStatus === 'error' ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  <span>Save Failed - Try Again</span>
                </div>
              ) : (
                'Save Profile Changes'
              )}
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Notifications</h3>
            
            <div className="space-y-4">
              {Object.entries(preferences.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {key === 'questUpdates' && 'Get notified about new quests and progress'}
                      {key === 'teamActivity' && 'Notifications about your team activities'}
                      {key === 'achievements' && 'Celebrate when you unlock achievements'}
                      {key === 'leaderboard' && 'Updates about leaderboard changes'}
                      {key === 'weeklyReport' && 'Weekly summary of your eco activities'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationChange(key)}
                    className={`relative inline-flex w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      value ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block w-5 h-5 rounded-full bg-white transform transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Privacy</h3>
            
            <div className="space-y-4">
              {Object.entries(preferences.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {key === 'showInLeaderboard' && 'Appear in class and school leaderboards'}
                      {key === 'allowTeamInvites' && 'Allow other students to invite you to teams'}
                      {key === 'showProgress' && 'Let others see your quest progress'}
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyChange(key)}
                    className={`relative inline-flex w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      value ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block w-5 h-5 rounded-full bg-white transform transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-0.5'
                      } mt-0.5`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* App Preferences */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">App Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Language
                </label>
                <select
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Account Actions</h3>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleExportData}
            disabled={actionLoading === 'export'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {actionLoading === 'export' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">download</span>
                <span>Export My Data</span>
              </>
            )}
          </button>
          <button 
            onClick={handleResetProgress}
            disabled={actionLoading === 'reset'}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {actionLoading === 'reset' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Resetting...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">refresh</span>
                <span>Reset Progress</span>
              </>
            )}
          </button>
          {/* Delete Account removed as per request */}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
          Need help? Contact your teacher or school administrator for assistance with account management.
        </p>
      </div>
    </div>
  );
};

export default Settings;
