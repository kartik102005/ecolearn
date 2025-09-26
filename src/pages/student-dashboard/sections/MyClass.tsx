import React from 'react';

const MyClass: React.FC = () => {
  const classmates = [
    { id: 1, name: 'Emma Green', avatar: '👩‍🎓', level: 4, xp: 890 },
    { id: 2, name: 'Jake Rivers', avatar: '👨‍🎓', level: 3, xp: 675 },
    { id: 3, name: 'Sofia Earth', avatar: '👩‍🎓', level: 5, xp: 1100 },
    { id: 4, name: 'Mike Forest', avatar: '👨‍🎓', level: 2, xp: 450 },
  ];

  const assignments = [
    {
      id: 1,
      title: 'Water Conservation Project',
      dueDate: '2024-01-15',
      status: 'In Progress',
      description: 'Create a presentation on water saving techniques'
    },
    {
      id: 2,
      title: 'Recycling Workshop',
      dueDate: '2024-01-20',
      status: 'Pending',
      description: 'Organize a recycling workshop for younger students'
    },
    {
      id: 3,
      title: 'Energy Audit Report',
      dueDate: '2024-01-10',
      status: 'Completed',
      description: 'Complete home energy audit and submit findings'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Pending':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-green-600">school</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">My Class</h1>
          <p className="text-gray-600 dark:text-gray-400">Environmental Science - Grade 8A</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Class Members */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Class Members</h3>
          <div className="space-y-4">
            {classmates.map((classmate) => (
              <div key={classmate.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(classmate.name)}&background=10b981&color=fff&size=64&rounded=true`}
                  alt={`${classmate.name} avatar`}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{classmate.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Level {classmate.level} • {classmate.xp} XP</p>
                </div>
                <button className="text-green-600 hover:text-green-700">
                  <span className="material-symbols-outlined">message</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Assignments</h3>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">{assignment.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{assignment.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due: {assignment.dueDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Class Progress */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Class Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="material-symbols-outlined text-4xl text-green-600 mb-2">group</span>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">25</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="material-symbols-outlined text-4xl text-blue-600 mb-2">task_alt</span>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">18</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed Projects</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <span className="material-symbols-outlined text-4xl text-yellow-600 mb-2">eco</span>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">127</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Trees Planted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClass;
