import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';

const UnitFour: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'simulator'>('concepts');
  const [method, setMethod] = useState<'netassets' | 'yield' | 'fairvalue'>('netassets');
  const [formData, setFormData] = useState({
    totalAssets: '',
    totalLiabilities: '',
    paidUpCapital: '',
    expectedDividend: '',
    marketRate: '',
    marketPrice: '',
    bookValue: '',
    earningsPerShare: ''
  });
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateShareValue = () => {
    const totalAssets = parseFloat(formData.totalAssets) || 0;
    const totalLiabilities = parseFloat(formData.totalLiabilities) || 0;
    const paidUpCapital = parseFloat(formData.paidUpCapital) || 0;
    const expectedDividend = parseFloat(formData.expectedDividend) || 0;
    const marketRate = parseFloat(formData.marketRate) || 0;
    const marketPrice = parseFloat(formData.marketPrice) || 0;
    const bookValue = parseFloat(formData.bookValue) || 0;
    const earningsPerShare = parseFloat(formData.earningsPerShare) || 0;

    let shareValue = 0;
    let steps: string[] = [];

    if (method === 'netassets') {
      const netAssets = totalAssets - totalLiabilities;
      shareValue = netAssets / (paidUpCapital / 100); // Assuming ₹100 face value
      steps = [
        `Net Assets = Total Assets - Total Liabilities = ₹${totalAssets} - ₹${totalLiabilities} = ₹${netAssets}`,
        `Number of Shares = Paid Up Capital ÷ Face Value = ₹${paidUpCapital} ÷ 100 = ${paidUpCapital / 100}`,
        `Value per Share = Net Assets ÷ Number of Shares = ₹${netAssets} ÷ ${paidUpCapital / 100} = ₹${shareValue}`
      ];
    } else if (method === 'yield') {
      shareValue = (expectedDividend * 100) / marketRate;
      steps = [
        `Expected Dividend per Share = ₹${expectedDividend}`,
        `Market Rate of Return = ${marketRate}%`,
        `Share Value = (Expected Dividend × 100) ÷ Market Rate = (₹${expectedDividend} × 100) ÷ ${marketRate} = ₹${shareValue}`
      ];
    } else if (method === 'fairvalue') {
      shareValue = (marketPrice + bookValue + (earningsPerShare * 8)) / 3;
      steps = [
        `Market Price per Share = ₹${marketPrice}`,
        `Book Value per Share = ₹${bookValue}`,
        `Capitalized Earnings = EPS × PE Ratio = ₹${earningsPerShare} × 8 = ₹${earningsPerShare * 8}`,
        `Fair Value = (Market Price + Book Value + Capitalized Earnings) ÷ 3`,
        `Fair Value = (₹${marketPrice} + ₹${bookValue} + ₹${earningsPerShare * 8}) ÷ 3 = ₹${shareValue}`
      ];
    }

    setResults({
      shareValue: shareValue.toFixed(2),
      steps
    });
  };

  const concepts = [
    {
      title: 'Share Valuation',
      definition: 'The process of determining the economic value of a company\'s shares based on various financial and market factors.'
    },
    {
      title: 'Net Assets Method',
      definition: 'Share value is calculated by dividing the net assets of the company by the number of shares outstanding.'
    },
    {
      title: 'Yield Method (Income Basis)',
      definition: 'Share value is determined based on the expected dividend yield and market rate of return on similar investments.'
    },
    {
      title: 'Fair Value Method',
      definition: 'A weighted average of market price, asset backing value, and yield value to determine fair value per share.'
    },
    {
      title: 'Book Value per Share',
      definition: 'The accounting value of shares based on shareholders\' equity divided by number of shares outstanding.'
    },
    {
      title: 'Market Value per Share',
      definition: 'The current trading price of shares in the stock market, determined by supply and demand forces.'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit IV: Valuation of Shares</h1>
        <p className="text-gray-600">Calculate share values using different valuation approaches</p>
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
                onClick={() => setMethod('netassets')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  method === 'netassets' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Net Assets Method
              </button>
              <button
                onClick={() => setMethod('yield')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  method === 'yield' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yield Method
              </button>
              <button
                onClick={() => setMethod('fairvalue')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  method === 'fairvalue' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Fair Value Method
              </button>
            </div>
          </div>

          {/* Input Form */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Share Valuation Calculator</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {method === 'netassets' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Assets (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.totalAssets}
                      onChange={(e) => handleInputChange('totalAssets', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter total assets"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Liabilities (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.totalLiabilities}
                      onChange={(e) => handleInputChange('totalLiabilities', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter total liabilities"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paid Up Capital (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.paidUpCapital}
                      onChange={(e) => handleInputChange('paidUpCapital', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter paid up capital"
                    />
                  </div>
                </>
              )}

              {method === 'yield' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Dividend per Share (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.expectedDividend}
                      onChange={(e) => handleInputChange('expectedDividend', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter expected dividend"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Rate of Return (%)
                    </label>
                    <input
                      type="number"
                      value={formData.marketRate}
                      onChange={(e) => handleInputChange('marketRate', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter market rate"
                    />
                  </div>
                </>
              )}

              {method === 'fairvalue' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Market Price per Share (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.marketPrice}
                      onChange={(e) => handleInputChange('marketPrice', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter market price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Book Value per Share (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.bookValue}
                      onChange={(e) => handleInputChange('bookValue', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter book value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Earnings per Share (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.earningsPerShare}
                      onChange={(e) => handleInputChange('earningsPerShare', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter EPS"
                    />
                  </div>
                </>
              )}
            </div>

            <button
              onClick={calculateShareValue}
              className="mt-6 bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Share Value</span>
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
                    <div className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full font-medium mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-2">Calculated Share Value</p>
                  <p className="text-4xl font-bold text-orange-600">₹{parseFloat(results.shareValue).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitFour;