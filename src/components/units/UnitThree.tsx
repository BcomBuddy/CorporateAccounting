import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';

const UnitThree: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'simulator'>('concepts');
  const [method, setMethod] = useState<'average' | 'super' | 'capitalization'>('average');
  const [formData, setFormData] = useState({
    profit1: '',
    profit2: '',
    profit3: '',
    capitalEmployed: '',
    normalRate: '',
    expectedRate: '',
    purchaseConsideration: ''
  });
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateGoodwill = () => {
    const profits = [
      parseFloat(formData.profit1) || 0,
      parseFloat(formData.profit2) || 0,
      parseFloat(formData.profit3) || 0
    ];
    const capitalEmployed = parseFloat(formData.capitalEmployed) || 0;
    const normalRate = parseFloat(formData.normalRate) || 0;
    const expectedRate = parseFloat(formData.expectedRate) || 0;
    const purchaseConsideration = parseFloat(formData.purchaseConsideration) || 0;

    const averageProfit = profits.reduce((sum, profit) => sum + profit, 0) / profits.length;
    const normalProfit = (capitalEmployed * normalRate) / 100;
    const superProfit = averageProfit - normalProfit;
    const capitalizationValue = (averageProfit * 100) / expectedRate;

    let goodwill = 0;
    let steps: string[] = [];

    if (method === 'average') {
      goodwill = averageProfit * 3; // 3 years purchase
      steps = [
        `Total Profits = ${profits.join(' + ')} = ₹${profits.reduce((sum, p) => sum + p, 0)}`,
        `Average Profit = Total Profits ÷ 3 = ₹${profits.reduce((sum, p) => sum + p, 0)} ÷ 3 = ₹${averageProfit}`,
        `Goodwill = Average Profit × 3 years = ₹${averageProfit} × 3 = ₹${goodwill}`
      ];
    } else if (method === 'super') {
      goodwill = superProfit * 3; // 3 years purchase of super profits
      steps = [
        `Average Profit = ₹${averageProfit}`,
        `Normal Profit = Capital Employed × Normal Rate = ₹${capitalEmployed} × ${normalRate}% = ₹${normalProfit}`,
        `Super Profit = Average Profit - Normal Profit = ₹${averageProfit} - ₹${normalProfit} = ₹${superProfit}`,
        `Goodwill = Super Profit × 3 years = ₹${superProfit} × 3 = ₹${goodwill}`
      ];
    } else if (method === 'capitalization') {
      goodwill = capitalizationValue - capitalEmployed;
      steps = [
        `Average Profit = ₹${averageProfit}`,
        `Capitalization Value = Average Profit × 100 ÷ Expected Rate = ₹${averageProfit} × 100 ÷ ${expectedRate}% = ₹${capitalizationValue}`,
        `Goodwill = Capitalization Value - Capital Employed = ₹${capitalizationValue} - ₹${capitalEmployed} = ₹${goodwill}`
      ];
    }

    setResults({
      averageProfit,
      normalProfit,
      superProfit,
      goodwill,
      capitalizationValue,
      steps
    });
  };

  const concepts = [
    {
      title: 'Goodwill',
      definition: 'The value of a business beyond its tangible assets, representing reputation, customer relationships, and brand value.'
    },
    {
      title: 'Average Profit Method',
      definition: 'Goodwill is calculated as average profit of past years multiplied by agreed number of years of purchase.'
    },
    {
      title: 'Super Profit Method',
      definition: 'Goodwill is calculated based on super profits (excess over normal profits) multiplied by agreed number of years.'
    },
    {
      title: 'Capitalization Method',
      definition: 'Goodwill is the excess of capitalized value of average profits over actual capital employed in the business.'
    },
    {
      title: 'Normal Profit',
      definition: 'The profit that a business should normally earn on the capital employed, calculated using normal rate of return.'
    },
    {
      title: 'Super Profit',
      definition: 'The excess profit earned over and above the normal profit, indicating the earning capacity of goodwill.'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit III: Valuation of Goodwill</h1>
        <p className="text-gray-600">Calculate goodwill using various valuation methods</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'concepts'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Concepts
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-6 py-2 rounded-md transition-colors flex items-center space-x-2 ${
            activeTab === 'simulator'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Problem Solver</span>
        </button>
      </div>

      {activeTab === 'concepts' && (
        <div className="grid gap-6">
          {concepts.map((concept, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{concept.title}</h3>
              <p className="text-gray-700 leading-relaxed">{concept.definition}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'simulator' && (
        <div className="space-y-8">
          {/* Method Selection */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Valuation Method</h2>
            <div className="flex space-x-4">
              <button
                onClick={() => setMethod('average')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  method === 'average' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Average Profit Method
              </button>
              <button
                onClick={() => setMethod('super')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  method === 'super' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Super Profit Method
              </button>
              <button
                onClick={() => setMethod('capitalization')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  method === 'capitalization' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Capitalization Method
              </button>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Goodwill Valuation Calculator</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year 1 Profit (₹)
                </label>
                <input
                  type="number"
                  value={formData.profit1}
                  onChange={(e) => handleInputChange('profit1', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter year 1 profit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year 2 Profit (₹)
                </label>
                <input
                  type="number"
                  value={formData.profit2}
                  onChange={(e) => handleInputChange('profit2', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter year 2 profit"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year 3 Profit (₹)
                </label>
                <input
                  type="number"
                  value={formData.profit3}
                  onChange={(e) => handleInputChange('profit3', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter year 3 profit"
                />
              </div>

              {(method === 'super' || method === 'capitalization') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capital Employed (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.capitalEmployed}
                    onChange={(e) => handleInputChange('capitalEmployed', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter capital employed"
                  />
                </div>
              )}

              {method === 'super' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Normal Rate of Return (%)
                  </label>
                  <input
                    type="number"
                    value={formData.normalRate}
                    onChange={(e) => handleInputChange('normalRate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter normal rate"
                  />
                </div>
              )}

              {method === 'capitalization' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Rate of Return (%)
                  </label>
                  <input
                    type="number"
                    value={formData.expectedRate}
                    onChange={(e) => handleInputChange('expectedRate', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter expected rate"
                  />
                </div>
              )}
            </div>

            <button
              onClick={calculateGoodwill}
              className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Goodwill</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold text-gray-900">Solution Steps</h2>
              </div>

              <div className="space-y-4 mb-6">
                {results.steps.map((step: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full font-medium mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Calculated Goodwill Value</p>
                  <p className="text-4xl font-bold text-purple-600">₹{results.goodwill.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitThree;