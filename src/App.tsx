import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import UnitOne from './components/units/UnitOne';
import UnitTwo from './components/units/UnitTwo';
import UnitThree from './components/units/UnitThree';
import UnitFour from './components/units/UnitFour';
import UnitFive from './components/units/UnitFive';

export type ActiveUnit = 'home' | 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'unit5';

function App() {
  const [activeUnit, setActiveUnit] = useState<ActiveUnit>('home');

  const renderContent = () => {
    switch (activeUnit) {
      case 'home':
        return <HomePage />;
      case 'unit1':
        return <UnitOne />;
      case 'unit2':
        return <UnitTwo />;
      case 'unit3':
        return <UnitThree />;
      case 'unit4':
        return <UnitFour />;
      case 'unit5':
        return <UnitFive />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <Sidebar activeUnit={activeUnit} setActiveUnit={setActiveUnit} />
      
      {/* Main Content Area */}
      <div className="flex-1 ml-80">
        <div className="h-screen overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;