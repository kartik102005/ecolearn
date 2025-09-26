import React from 'react';

const ProgressChart: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', xp: 300, percentage: 60 },
    { day: 'Tue', xp: 200, percentage: 40 },
    { day: 'Wed', xp: 400, percentage: 80 },
    { day: 'Thu', xp: 350, percentage: 70 },
    { day: 'Fri', xp: 450, percentage: 90 },
    { day: 'Sat', xp: 150, percentage: 30 },
    { day: 'Sun', xp: 250, percentage: 50 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Your Progress Path</h3>
        <div className="flex gap-2 items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold">Weekly XP</span>
        </div>
      </div>
      
      <div className="relative h-64">
        {/* Y-axis labels and grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-gray-600 dark:text-gray-400 text-xs pr-4">
          <div className="flex items-center">
            <span className="w-8">500</span>
            <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="flex items-center">
            <span className="w-8">400</span>
            <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="flex items-center">
            <span className="w-8">300</span>
            <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="flex items-center">
            <span className="w-8">200</span>
            <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="flex items-center">
            <span className="w-8">100</span>
            <div className="flex-1 border-b border-dashed border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="flex items-center">
            <span className="w-8">0</span>
            <div className="flex-1 border-b border-gray-300 dark:border-gray-600"></div>
          </div>
        </div>
        
        {/* Chart bars */}
        <div className="absolute inset-0 pl-10 pr-4 flex justify-around items-end">
          {weeklyData.map((data, index) => (
            <div
              key={data.day}
              className={`w-8 rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer ${
                data.day === 'Fri' 
                  ? 'bg-green-600' 
                  : 'bg-green-200 dark:bg-green-700 hover:bg-green-600'
              }`}
              style={{ height: `${data.percentage}%` }}
              title={`${data.day}: ${data.xp}XP`}
            >
              <span className="sr-only">{data.day}: {data.xp}XP</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="flex justify-around text-gray-600 dark:text-gray-400 text-xs mt-2 pl-10">
        {weeklyData.map((data) => (
          <span 
            key={data.day}
            className={data.day === 'Fri' ? 'text-gray-800 dark:text-gray-200 font-bold' : ''}
          >
            {data.day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressChart;
