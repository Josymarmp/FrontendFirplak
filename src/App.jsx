import { useEffect,useState,useRef } from 'react'; 
import * as Entregasapi from './network/entregas_api';
import { TabView, TabPanel } from 'primereact/tabview';
import Resumenentregas from './components/resumenentregas';
import Reportes from './components/reportes';
import Facturacion from './components/facturacion';

import { Toast } from 'primereact/toast';
const App = () => {
  const [Entregas,setEntregas] = useState([]);
  const [Reports,setReports] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const Entregas= await Entregasapi.fetchEntregas();
        const Reports= await Entregasapi.fetchReports();
        setEntregas(Entregas);
        setReports(Reports);
        const entregasPendientes = Entregas.some(entrega => entrega.Estado_Entrega !== 'Completada');
       if (entregasPendientes) {
       toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Hay entregas pendientes', life: 3000 });
       }
       
      } catch (error) {
        console.error('Error al recuperar las notas:', error);
      }
    }
    fetchEntregas();
    }, []);

  

    const headerE=<div style={{ marginLeft: '8px' }}>Resumen De Entregas</div>
    const headerR=<div style={{ marginLeft: '8px' }}>Reportes</div>
    const headerF=<div style={{ marginLeft: '8px' }}>Facturación</div>
  

  return (
    <div className="card">
      <Toast ref={toast} />
      <TabView activeIndex={null}>
        <TabPanel  header={headerE} leftIcon="pi pi-inbox" >
        <Resumenentregas Entregas={Entregas} setEntregas={setEntregas}></Resumenentregas>
        </TabPanel>
        <TabPanel header={headerR} leftIcon="pi pi-chart-bar">
         <Reportes Reports={Reports}></Reportes>
        </TabPanel>
        <TabPanel header={headerF}leftIcon="pi pi-money-bill" >
              <Facturacion Entregas={Entregas}></Facturacion>
        </TabPanel>
      </TabView>
    </div>
  )
}

export default App
