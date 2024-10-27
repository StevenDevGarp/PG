import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the types for props for each component
type TabsProps = {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
};

type TabsListProps = {
  children: React.ReactNode;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

type TabsContextType = {
  activeTab: string;
  onTabChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType>({
  activeTab: '',
  onTabChange: () => {},
});

export function Tabs({ children, value, onValueChange, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(value);

  useEffect(() => {
    setActiveTab(value);
  }, [value]);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, onTabChange: handleTabChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: TabsListProps) {
  return <div className="flex space-x-4 border-b border-gray-200 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const { activeTab, onTabChange } = useContext(TabsContext);

  return (
    <button
      className={`px-4 py-2 font-semibold ${
        activeTab === value ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
      }`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext);

  return activeTab === value ? <div>{children}</div> : null;
}