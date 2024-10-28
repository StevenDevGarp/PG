import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Registrando los elementos de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface ChartProps {
  type: 'bar' | 'pie';
  data: any;
}

export const Chart: React.FC<ChartProps> = ({ type, data }) => {
  return (
    <div className="chart-container">
      {type === 'bar' && <Bar data={data} />}
      {type === 'pie' && <Pie data={data} />}
    </div>
  );
};
