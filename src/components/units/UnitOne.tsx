import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle } from 'lucide-react';

const UnitOne: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'simulator'>('concepts');
  const [formData, setFormData] = useState({
    shareCapital: '',
    faceValue: '',
    issuePrice: '',
    applicationMoney: '',
    allotmentMoney: '',
    forfeitedShares: '',
    reissuePrice: ''
  });
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateShareAccounting = () => {
    const shareCapital = parseFloat(formData.shareCapital) || 0;
    const faceValue = parseFloat(formData.faceValue) || 0;
    const issuePrice = parseFloat(formData.issuePrice) || 0;
    const applicationMoney = parseFloat(formData.applicationMoney) || 0;
    const allotmentMoney = parseFloat(formData.allotmentMoney) || 0;
    const forfeitedShares = parseFloat(formData.forfeitedShares) || 0;
    const reissuePrice = parseFloat(formData.reissuePrice) || 0;

    const totalShares = shareCapital / faceValue;
    const premiumPerShare = issuePrice - faceValue;
    const totalPremium = totalShares * premiumPerShare;
    const forfeitedAmount = forfeitedShares * (applicationMoney + allotmentMoney);
    const capitalOnForfeiture = forfeitedShares * faceValue;

    const calculations = {
      totalShares: totalShares,
      premiumPerShare: premiumPerShare,
      totalPremium: totalPremium,
      forfeitedAmount: forfeitedAmount,
      capitalOnForfeiture: capitalOnForfeiture,
      steps: [
        `Total Shares = Share Capital ÷ Face Value = ${shareCapital} ÷ ${faceValue} = ${totalShares} shares`,
        `Premium per Share = Issue Price - Face Value = ${issuePrice} - ${faceValue} = ₹${premiumPerShare}`,
        `Total Premium = Total Shares × Premium per Share = ${totalShares} × ${premiumPerShare} = ₹${totalPremium}`,
        `Forfeited Amount = Forfeited Shares × (Application + Allotment) = ${forfeitedShares} × ${applicationMoney + allotmentMoney} = ₹${forfeitedAmount}`,
        `Share Capital on Forfeiture = Forfeited Shares × Face Value = ${forfeitedShares} × ${faceValue} = ₹${capitalOnForfeiture}`
      ]
    };

    setResults(calculations);
  };

  const concepts = [
    {
      title: 'Types of Shares',
      definition: 'Equity shares represent ownership in a company, while preference shares have preferential rights for dividends and capital repayment.'
    },
    {
      title: 'Share Issue at Par',
      definition: 'When shares are issued at their nominal/face value without any premium or discount.'
    },
    {
      title: 'Share Issue at Premium',
      definition: 'When shares are issued at a price higher than their face value, the excess amount is called premium.'
    },
    {
      title: 'Share Issue at Discount',
      definition: 'When shares are issued at a price lower than their face value (subject to legal restrictions).'
    },
    {
      title: 'Forfeiture of Shares',
      definition: 'Cancellation of shares due to non-payment of calls by shareholders, with money paid being forfeited.'
    },
    {
      title: 'Reissue of Forfeited Shares',
      definition: 'Re-selling forfeited shares to new shareholders, usually at a discount to facilitate sale.'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit I: Accounting for Share Capital</h1>
        <p className="text-gray-600">Master share capital accounting with interactive problem solving</p>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Share Capital Problem Solver</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorized Share Capital (₹)
                </label>
                <input
                  type="number"
                  value={formData.shareCapital}
                  onChange={(e) => handleInputChange('shareCapital', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter share capital amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Face Value per Share (₹)
                </label>
                <input
                  type="number"
                  value={formData.faceValue}
                  onChange={(e) => handleInputChange('faceValue', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter face value"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issue Price per Share (₹)
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
                  Application Money per Share (₹)
                </label>
                <input
                  type="number"
                  value={formData.applicationMoney}
                  onChange={(e) => handleInputChange('applicationMoney', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter application money"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allotment Money per Share (₹)
                </label>
                <input
                  type="number"
                  value={formData.allotmentMoney}
                  onChange={(e) => handleInputChange('allotmentMoney', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter allotment money"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Forfeited Shares (Number)
                </label>
                <input
                  type="number"
                  value={formData.forfeitedShares}
                  onChange={(e) => handleInputChange('forfeitedShares', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter number of forfeited shares"
                />
              </div>
            </div>

            <button
              onClick={calculateShareAccounting}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
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
                    <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium mt-1">
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
                    <p className="text-sm text-gray-600">Total Shares Issued</p>
                    <p className="text-xl font-bold text-blue-600">{results.totalShares}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Premium per Share</p>
                    <p className="text-xl font-bold text-green-600">₹{results.premiumPerShare}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Premium</p>
                    <p className="text-xl font-bold text-purple-600">₹{results.totalPremium}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Forfeited Amount</p>
                    <p className="text-xl font-bold text-red-600">₹{results.forfeitedAmount}</p>
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

export default UnitOne;