import React, { useState } from 'react';
import { courseService } from '@/services/courseService';

const SeedData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedCourses = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      await courseService.seedCourses();
      setMessage('✅ Courses seeded successfully!');
    } catch (error) {
      console.error('Error seeding courses:', error);
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Database Seeding</h2>
      
      <button
        onClick={handleSeedCourses}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        {loading ? 'Seeding Courses...' : 'Seed Courses'}
      </button>
      
      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
      
      <div className="mt-4 text-xs text-gray-600">
        <p>This will populate your database with initial course data.</p>
        <p>Only run this once to avoid duplicates.</p>
      </div>
    </div>
  );
};

export default SeedData;
