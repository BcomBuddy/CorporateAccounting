import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Star, 
  BarChart3, 
  FileText,
  BookOpen,
  Calculator,
  Award
} from 'lucide-react';

const HomePage: React.FC = () => {
  const modules = [
    {
      id: 'unit1',
      title: 'Accounting for Share Capital',
      description: 'Practice share issuance, forfeiture, and reissue problems',
      icon: TrendingUp,
      color: 'bg-blue-500',
      topics: ['Share Types', 'Issue Procedures', 'Forfeiture & Reissue']
    },
    {
      id: 'unit2',
      title: 'Debentures & Bonus Shares',
      description: 'Master debenture accounting and bonus share calculations',
      icon: DollarSign,
      color: 'bg-green-500',
      topics: ['Debenture Issue', 'Redemption', 'Buyback Procedures']
    },
    {
      id: 'unit3',
      title: 'Goodwill Valuation',
      description: 'Calculate goodwill using various valuation methods',
      icon: Star,
      color: 'bg-purple-500',
      topics: ['Average Profit', 'Super Profits', 'Capitalization']
    },
    {
      id: 'unit4',
      title: 'Share Valuation',
      description: 'Value shares using different approaches and methods',
      icon: BarChart3,
      color: 'bg-orange-500',
      topics: ['Net Assets', 'Yield Basis', 'Fair Value']
    },
    {
      id: 'unit5',
      title: 'Company Final Accounts',
      description: 'Prepare complete financial statements and reports',
      icon: FileText,
      color: 'bg-teal-500',
      topics: ['P&L Account', 'Balance Sheet', 'Adjustments']
    }
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Interactive Calculators',
      description: 'Step-by-step problem solvers with automatic calculations'
    },
    {
      icon: BookOpen,
      title: 'Conceptual Learning',
      description: 'Clear definitions and explanations for each topic'
    },
    {
      icon: Award,
      title: 'Practice Problems',
      description: 'Real-world accounting scenarios and case studies'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 flex flex-col items-center justify-center text-center py-10 mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Corporate Accounting Simulator
        </h1>
        <p className="text-lg text-white mt-2 max-w-2xl">
          Master corporate accounting concepts through interactive practice. Each module provides 
          step-by-step problem solvers designed specifically for B.Com students.
        </p>
      </div>

      {/* Features Overview */}
      <div className="px-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Module Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Modules</h2>
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${module.color} p-3 rounded-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Getting Started */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 mb-6">
            Select any module from the sidebar to begin practicing. Each unit includes interactive 
            problem solvers with step-by-step solutions to help you master corporate accounting concepts.
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">5 Complete Modules</span>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Interactive Simulators</span>
            </div>
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">Step-by-Step Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;