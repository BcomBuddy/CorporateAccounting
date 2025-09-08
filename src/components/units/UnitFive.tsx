import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle, Table } from 'lucide-react';

const UnitFive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'simulator'>('concepts');
  const [formData, setFormData] = useState({
    sales: '',
    costOfGoods: '',
    operatingExpenses: '',
    otherIncome: '',
    taxation: '',
    currentAssets: '',
    fixedAssets: '',
    currentLiabilities: '',
    longTermDebt: '',
    shareCapital: ''
  });
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const prepareFinalAccounts = () => {
    const sales = parseFloat(formData.sales) || 0;
    const costOfGoods = parseFloat(formData.costOfGoods) || 0;
    const operatingExpenses = parseFloat(formData.operatingExpenses) || 0;
    const otherIncome = parseFloat(formData.otherIncome) || 0;
    const taxation = parseFloat(formData.taxation) || 0;
    const currentAssets = parseFloat(formData.currentAssets) || 0;
    const fixedAssets = parseFloat(formData.fixedAssets) || 0;
    const currentLiabilities = parseFloat(formData.currentLiabilities) || 0;
    const longTermDebt = parseFloat(formData.longTermDebt) || 0;
    const shareCapital = parseFloat(formData.shareCapital) || 0;

    const grossProfit = sales - costOfGoods;
    const operatingProfit = grossProfit - operatingExpenses;
    const profitBeforeTax = operatingProfit + otherIncome;
    const netProfit = profitBeforeTax - taxation;

    const totalAssets = currentAssets + fixedAssets;
    const totalLiabilities = currentLiabilities + longTermDebt + shareCapital;
    const retainedEarnings = totalAssets - (currentLiabilities + longTermDebt + shareCapital);

    setResults({
      grossProfit,
      operatingProfit,
      profitBeforeTax,
      netProfit,
      totalAssets,
      totalLiabilities,
      retainedEarnings,
      profitLossAccount: [
        { item: 'Sales Revenue', amount: sales },
        { item: 'Less: Cost of Goods Sold', amount: -costOfGoods },
        { item: 'Gross Profit', amount: grossProfit },
        { item: 'Less: Operating Expenses', amount: -operatingExpenses },
        { item: 'Operating Profit', amount: operatingProfit },
        { item: 'Add: Other Income', amount: otherIncome },
        { item: 'Profit Before Tax', amount: profitBeforeTax },
        { item: 'Less: Tax', amount: -taxation },
        { item: 'Net Profit', amount: netProfit }
      ],
      balanceSheet: {
        assets: [
          { item: 'Fixed Assets', amount: fixedAssets },
          { item: 'Current Assets', amount: currentAssets },
          { item: 'Total Assets', amount: totalAssets }
        ],
        liabilities: [
          { item: 'Share Capital', amount: shareCapital },
          { item: 'Retained Earnings', amount: retainedEarnings + netProfit },
          { item: 'Long Term Debt', amount: longTermDebt },
          { item: 'Current Liabilities', amount: currentLiabilities },
          { item: 'Total Liabilities', amount: totalLiabilities + netProfit }
        ]
      }
    });
  };

  const concepts = [
    {
      title: 'Company Final Accounts',
      definition: 'Financial statements prepared by companies as per Companies Act 2013, including Profit & Loss Account and Balance Sheet.'
    },
    {
      title: 'Profit and Loss Account',
      definition: 'Shows revenues, expenses, and net profit/loss for a specific period, prepared in prescribed format under Companies Act.'
    },
    {
      title: 'Balance Sheet',
      definition: 'Statement of financial position showing assets, liabilities, and equity at a specific date in vertical format.'
    },
    {
      title: 'Gross Profit',
      definition: 'Profit after deducting cost of goods sold from sales revenue, indicating trading efficiency.'
    },
    {
      title: 'Operating Profit',
      definition: 'Profit from core business operations after deducting operating expenses from gross profit.'
    },
    {
      title: 'Net Profit',
      definition: 'Final profit after all expenses, taxes, and other deductions, available for distribution to shareholders.'
    },
    {
      title: 'Provisions and Adjustments',
      definition: 'Accounting adjustments for depreciation, bad debts, provisions, and accruals as per accounting standards.'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Unit V: Company Final Accounts</h1>
        <p className="text-gray-600">Prepare complete financial statements with adjustments</p>
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
          <span>Financial Statements</span>
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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Data Input</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Revenue & Expenses</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sales Revenue (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.sales}
                    onChange={(e) => handleInputChange('sales', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter sales revenue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cost of Goods Sold (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.costOfGoods}
                    onChange={(e) => handleInputChange('costOfGoods', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter cost of goods sold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operating Expenses (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.operatingExpenses}
                    onChange={(e) => handleInputChange('operatingExpenses', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter operating expenses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Income (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.otherIncome}
                    onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter other income"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Expense (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.taxation}
                    onChange={(e) => handleInputChange('taxation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter tax expense"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Balance Sheet Items</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Assets (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.currentAssets}
                    onChange={(e) => handleInputChange('currentAssets', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter current assets"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fixed Assets (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.fixedAssets}
                    onChange={(e) => handleInputChange('fixedAssets', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter fixed assets"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Liabilities (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.currentLiabilities}
                    onChange={(e) => handleInputChange('currentLiabilities', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter current liabilities"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Long Term Debt (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.longTermDebt}
                    onChange={(e) => handleInputChange('longTermDebt', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter long term debt"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Share Capital (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.shareCapital}
                    onChange={(e) => handleInputChange('shareCapital', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Enter share capital"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={prepareFinalAccounts}
              className="mt-6 bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
            >
              <Table className="w-4 h-4" />
              <span>Generate Financial Statements</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-8">
              {/* Profit & Loss Account */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center space-x-2 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Profit & Loss Account</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Particulars</th>
                        <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.profitLossAccount.map((item: any, index: number) => (
                        <tr key={index} className={item.amount < 0 ? 'bg-red-50' : item.item.includes('Profit') ? 'bg-green-50' : ''}>
                          <td className="border border-gray-300 px-4 py-3">{item.item}</td>
                          <td className="border border-gray-300 px-4 py-3 text-right font-mono">
                            {Math.abs(item.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Balance Sheet */}
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <div className="flex items-center space-x-2 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Balance Sheet</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Assets */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Assets</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Particulars</th>
                            <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.balanceSheet.assets.map((item: any, index: number) => (
                            <tr key={index} className={item.item.includes('Total') ? 'bg-blue-100 font-semibold' : ''}>
                              <td className="border border-gray-300 px-4 py-3">{item.item}</td>
                              <td className="border border-gray-300 px-4 py-3 text-right font-mono">
                                {item.amount.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Liabilities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Liabilities & Equity</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-green-50">
                            <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Particulars</th>
                            <th className="border border-gray-300 px-4 py-3 text-right font-semibold">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.balanceSheet.liabilities.map((item: any, index: number) => (
                            <tr key={index} className={item.item.includes('Total') ? 'bg-green-100 font-semibold' : ''}>
                              <td className="border border-gray-300 px-4 py-3">{item.item}</td>
                              <td className="border border-gray-300 px-4 py-3 text-right font-mono">
                                {item.amount.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Financial Metrics</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Gross Profit</p>
                    <p className="text-xl font-bold text-green-600">₹{results.grossProfit.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Operating Profit</p>
                    <p className="text-xl font-bold text-blue-600">₹{results.operatingProfit.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Net Profit</p>
                    <p className="text-xl font-bold text-purple-600">₹{results.netProfit.toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Assets</p>
                    <p className="text-xl font-bold text-teal-600">₹{results.totalAssets.toLocaleString()}</p>
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

export default UnitFive;