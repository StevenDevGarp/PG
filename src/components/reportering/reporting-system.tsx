import React from 'react';
import { Card } from '../ui/card';
import { Table } from '../ui/tables'; // Crea un componente de tabla si no existe
import { Chart } from '../ui/chartReport'; // Crea un componente de gráfico si no existe
import '../../App.css'; // Importar los estilos

// Datos quemados para los reportes
const reportData = [
  { id: 1, name: 'Documento A', type: 'PDF', views: 120, downloads: 30 },
  { id: 2, name: 'Documento B', type: 'Word', views: 80, downloads: 25 },
  { id: 3, name: 'Documento C', type: 'Excel', views: 95, downloads: 45 },
  { id: 4, name: 'Documento D', type: 'PDF', views: 200, downloads: 80 },
  { id: 5, name: 'Documento E', type: 'Word', views: 150, downloads: 60 },
];

// Datos para gráficos
const chartData = {
  labels: ['Documento A', 'Documento B', 'Documento C', 'Documento D', 'Documento E'],
  views: [120, 80, 95, 200, 150],
  downloads: [30, 25, 45, 80, 60],
};

const ReportingSystem: React.FC = () => {
  return (
    <div className="reporting-container">
      <h1 className="reporting-title">Reportes del Sistema</h1>

      {/* Sección de tabla */}
      <Card className="reporting-card">
        <h2 className="reporting-subtitle">Resumen de Documentos</h2>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Vistas</th>
              <th>Descargas</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.type}</td>
                <td>{doc.views}</td>
                <td>{doc.downloads}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Sección de gráficos */}
      <Card className="reporting-card">
        <h2 className="reporting-subtitle">Estadísticas de Visualización</h2>
        <Chart
          type="bar"
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: 'Vistas',
                data: chartData.views,
              },
              {
                label: 'Descargas',
                data: chartData.downloads,
              },
            ],
          }}
        />
      </Card>

      <Card className="reporting-card">
        <h2 className="reporting-subtitle">Distribución de Tipos de Documentos</h2>
        <Chart
          type="pie"
          data={{
            labels: ['PDF', 'Word', 'Excel'],
            datasets: [
              {
                label: 'Documentos',
                data: [320, 230, 95], // Datos de ejemplo
              },
            ],
          }}
        />
      </Card>
    </div>
  );
};

export default ReportingSystem;
