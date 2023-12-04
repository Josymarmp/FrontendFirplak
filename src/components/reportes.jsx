import { Bar } from 'react-chartjs-2';
import { Card } from 'primereact/card';
import 'chart.js/auto';


const Reportes = (props) => {
    const data = {
        labels: ['Entregas Completadas', 'Entregas Pendientes', 'Entregas en Camino', 'Entregas Totales'],
        datasets: [
          {
            label: 'Estadísticas de Entregas',
            backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384', '#4CAF50'],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.8)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [props.Reports.entregasCompletadas, props.Reports.entregasPendientes, props.Reports.entregasEnCamino, props.Reports.totalEntregas],
          },
        ],
      };

      const datap = {
        labels: ['Pedidos Completados', 'Pedidos Pendientes', 'Pedidos Totales'],
        datasets: [
          {
            label: 'Estadísticas de Pedidos',
            backgroundColor: ['#36A2EB', '#FFCE56', '#4CAF50'],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.8)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [props.Reports.pedidosCompletados, props.Reports.pedidosPendientes, props.Reports.totalPedidos],
          },
        ],
      };
      
  return (
      <div style={{ display: 'flex',flexDirection: 'column', gap: '15px' }} >
          <Card style={{ marginRight: '200px',marginLeft: '200px' }}>
              <h2>Estadísticas de Entregas - Gráfico de Barras</h2>
              <Bar data={data} options={{ scales: { y: { beginAtZero: true } } }} />
          </Card>

          <Card style={{ marginRight: '200px',marginLeft: '200px' }}>
              <h2>Estadísticas de Pedidos - Gráfico de Barras</h2>
              <Bar data={datap} options={{ scales: { y: { beginAtZero: true } } }} />
          </Card>

      </div>
  )
}

export default Reportes