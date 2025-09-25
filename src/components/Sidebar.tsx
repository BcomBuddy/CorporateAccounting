import React from 'react';
import { 
  Home, 
  TrendingUp, 
  DollarSign, 
  Star, 
  BarChart3, 
  FileText,
  Building2,
  LogOut
} from 'lucide-react';
import { ActiveUnit } from '../App';

interface SidebarProps {
  activeUnit: ActiveUnit;
  setActiveUnit: (unit: ActiveUnit) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeUnit, setActiveUnit, onLogout }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'unit1', label: 'Unit I: Share Capital', icon: TrendingUp },
    { id: 'unit2', label: 'Unit II: Debentures & Bonus', icon: DollarSign },
    { id: 'unit3', label: 'Unit III: Goodwill Valuation', icon: Star },
    { id: 'unit4', label: 'Unit IV: Share Valuation', icon: BarChart3 },
    { id: 'unit5', label: 'Unit V: Final Accounts', icon: FileText },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-80 bg-white shadow-xl border-r border-gray-200 z-50">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Corporate Accounting</h1>
            <p className="text-sm text-gray-600">2nd Year - 4th Semester</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeUnit === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveUnit(item.id as ActiveUnit)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-16 left-0 right-0 p-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-500 text-center">
          B.Com Corporate Accounting Practice Platform
        </p>
      </div>
    </div>
  );
};

export default Sidebar;