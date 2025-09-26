import React from 'react';

interface Quest {
  id: number;
  title: string;
  category: string;
  description: string;
  progress: number;
  xpReward: number;
  gradient: string;
  icon: string;
}

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  return (
    <div className={`bg-gradient-to-br ${quest.gradient} p-6 rounded-2xl text-white shadow-lg transform hover:scale-105 transition-transform duration-300`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white/30 p-3 rounded-lg">
          <span className="material-symbols-outlined text-white text-3xl">{quest.icon}</span>
        </div>
        <div>
          <h4 className="font-bold text-lg">{quest.title}</h4>
          <p className="text-sm opacity-80">{quest.category}</p>
        </div>
      </div>
      
      <p className="mb-4">{quest.description}</p>
      
      {/* Progress Bar */}
      <div className="w-full bg-white/30 rounded-full h-2.5 mb-2">
        <div 
          className="bg-white h-2.5 rounded-full transition-all duration-300" 
          style={{ width: `${quest.progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between items-center text-sm font-medium">
        <span>{quest.progress}% Complete</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-yellow-300 text-base">bolt</span>
          +{quest.xpReward} XP
        </span>
      </div>
    </div>
  );
};

export default QuestCard;
