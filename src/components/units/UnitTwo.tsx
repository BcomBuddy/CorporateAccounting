import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';

const UnitTwo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'simulator'>('concepts');
  const [formData, setFormData] = useState({
    debentureValue: '',
    issuePrice: '',
    redemptionPrice: '',
    bonusRatio: '',
    existingShares: '',
    buybackShares: '',
    buybackPrice: ''
  });
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateDebentures = () => {
    const debentureValue = parseFloat(formData.debentureValue) || 0;
    const issuePrice = parseFloat(formData.issuePrice) || 0;
    const redemptionPrice = parseFloat(formData.redemptionPrice) || 0;
    const bonusRatio = parseFloat(formData.bonusRatio) || 0;
    const existingShares = parseFloat(formData.existingShares) || 0;
    const buybackShares = parseFloat(formData.buybackShares) || 0;
    const buybackPrice = parseFloat(formData.buybackPrice) || 0;

    const discountOnIssue = debentureValue - issuePrice;
    const premiumOnRedemption = redemptionPrice - debentureValue;
    const bonusShares = (existingShares * bonusRatio) / 100;
    const buybackAmount = buybackShares * buybackPrice;

    const calculations = {
      discountOnIssue: discountOnIssue,
      premiumOnRedemption: premiumOnRedemption,
      bonusShares: bonusShares,
      buybackAmount: buybackAmount,
      steps: [
        `Discount on Issue = Face Value - Issue Price = ${debentureValue} - ${issuePrice} = ₹${discountOnIssue}`,
        `Premium on Redemption = Redemption Price - Face Value = ${redemptionPrice} - ${debentureValue} = ₹${premiumOnRedemption}`,
        `Bonus Shares = Existing Shares × Bonus Ratio = ${existingShares} × ${bonusRatio}% = ${bonusShares} shares`,
        `Buyback Amount = Buyback Shares × Buyback Price = ${buybackShares} × ${buybackPrice} = ₹${buybackAmount}`
      ]
    };

    setResults(calculations);
  };

  const concepts = [
    {
      title: 'Debentures',
      definition: 'Long-term debt instruments issued by companies to raise funds, with fixed interest rates and specific maturity periods.'
    },
    {
      title: 'Issue of Debentures at Par',
      definition: 'When debentures are issued at their face value without any premium or discount.'
    },
    {
      title: 'Issue of Debentures at Discount',
      definition: 'When debentures are issued at a price lower than their face value to make them attractive to investors.'
    },
    {
      title: 'Issue of Debentures at Premium',
      definition: 'When debentures are issued at a price higher than their face value, usually for high-credit companies.'
    },
    {
      title: 'Redemption of Debentures',
      definition: 'Repayment of debenture principal amount to debenture holders at maturity or as per terms.'
    },
    {
      title: 'Bonus Shares',
      definition: 'Additional shares given to existing shareholders free of cost in proportion to their current holdings.'
    },
    {
      title: 'Buyback of Shares',
      definition: 'Company repurchasing its own shares from the market to reduce share capital and improve financial ratios.'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit II: Issue & Redemption of Debentures</h1>
        <p className="text-gray-600">Master debenture accounting and bonus share calculations</p>
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
          {/* Input Form */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Debentures & Bonus Shares Calculator</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Debenture Face Value (₹)
                </label>
                <input
                  type="number"
                  value={formData.debentureValue}
                  onChange={(e) => handleInputChange('debentureValue', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter debenture face value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.issuePrice}
                  onChange={(e) => handleInputChange('issuePrice', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter issue price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Redemption Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.redemptionPrice}
                  onChange={(e) => handleInputChange('redemptionPrice', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter redemption price"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bonus Ratio (%)
                </label>
                <input
                  type="number"
                  value={formData.bonusRatio}
                  onChange={(e) => handleInputChange('bonusRatio', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter bonus percentage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing Shares (Number)
                </label>
                <input
                  type="number"
                  value={formData.existingShares}
                  onChange={(e) => handleInputChange('existingShares', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter existing shares"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buyback Shares (Number)
                </label>
                <input
                  type="number"
                  value={formData.buybackShares}
                  onChange={(e) => handleInputChange('buybackShares', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter buyback shares"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buyback Price per Share (₹)
                </label>
                <input
                  type="number"
                  value={formData.buybackPrice}
                  onChange={(e) => handleInputChange('buybackPrice', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter buyback price"
                />
              </div>
            </div>

            <button
              onClick={calculateDebentures}
              className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Solution</span>
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
                    <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Final Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Discount on Issue</p>
                    <p className="text-xl font-bold text-red-600">₹{results.discountOnIssue}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Premium on Redemption</p>
                    <p className="text-xl font-bold text-blue-600">₹{results.premiumOnRedemption}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Bonus Shares Issued</p>
                    <p className="text-xl font-bold text-green-600">{results.bonusShares}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Buyback Amount</p>
                    <p className="text-xl font-bold text-purple-600">₹{results.buybackAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitTwo;