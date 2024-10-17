import React, { useState } from 'react';

// Definimos los tipos de props para cada componente
type TabsProps = {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
};

type TabsListProps = {
  children: React.ReactNode;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  onClick?: () => void;
  activeTab?: string; // Add activeTab as an optional prop
};

type TabsContentProps = {
  value: string;
  activeTab?: string; // Esta propiedad es opcional, porque solo algunos hijos la necesitarán
  children: React.ReactNode;
};

export function Tabs({ children, defaultValue, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Verificamos si el componente hijo necesita las propiedades adicionales antes de pasárselas
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Validamos que el tipo del hijo sea 'TabsContent' o 'TabsTrigger' antes de pasarle 'activeTab' o 'onTabChange'
            return React.cloneElement(child, { activeTab, onClick: () => handleTabChange(child.props.value) } as any);
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children }: TabsListProps) {
  return <div className="flex space-x-4 border-b border-gray-200 mb-4">{children}</div>;
}

export function TabsTrigger({ value, children, onClick, activeTab }: TabsTriggerProps & { activeTab?: string }) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  // Evaluamos si el 'activeTab' coincide con el 'value' para determinar si está activo
  const isActive = activeTab === value;

  return (
    <button
      className={`px-4 py-2 font-semibold ${
        isActive ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
      }`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }: TabsContentProps) {
  return activeTab === value ? <div>{children}</div> : null;
}
