import React from 'react';
import '../../App.css'; // Asegúrate de tener estilos básicos para la tabla

interface TableProps {
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ children }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        {children}
      </table>
    </div>
  );
};
