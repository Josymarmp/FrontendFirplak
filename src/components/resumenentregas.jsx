import { useState,useRef} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';



 const Resumenentregas = (props) => {
    const entregas =props.Entregas;
    const { setEntregas } = props;
    const [selectedEstado, setSelectedEstado] = useState(null);
    const estadosUnicos = [...new Set(entregas.map(entrega => entrega.Estado_Entrega))];
    const opcionesEstados = ['Todos', ...estadosUnicos];
    const [statuses] = useState(['Completada', 'En Camino']);
    const toast = useRef(null);


    const filteredEntregas = selectedEstado && selectedEstado !== 'Todos'
        ? entregas.filter(entrega => entrega.Estado_Entrega === selectedEstado)
        : entregas;
        

        const getSeverity = (value) => {
            switch (value) {
                case 'Completada':
                    return 'success';
    
                case 'En Camino':
                    return 'warning';
                default:
                    return null;
            }
        };

        const statusBodyTemplate = (rowData) => {
            return <Tag value={rowData.Estado_Entrega} severity={getSeverity(rowData.Estado_Entrega)}></Tag>;
        };
    
        const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e) => options.editorCallback(e.value)}
                placeholder="Seleccionar Estado"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getSeverity(option)}></Tag>;
                }}
            />
        );
    };

    const onRowEditComplete = (e) => {
        let _entregas = [...entregas];
        let { newData, index } = e;
        _entregas[index] = newData;
         setEntregas(_entregas);
      console.log(e.newData.Estado_Entrega)

      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Estado de entrega actualizado con éxito', life: 3600 });

    };


       
    

  return (
    <div className="card">
          <div className="p-d-flex p-ai-center p-mb-4">
              <Dropdown
                  value={selectedEstado}
                  options={opcionesEstados.map(estado => ({ label: estado, value: estado }))}
                  onChange={(e) => setSelectedEstado(e.value)}
                  placeholder="Seleccionar Estado"
              />
          </div>

            <DataTable value={filteredEntregas} editMode="row" onRowEditComplete={onRowEditComplete} dataKey={entregas.ID_Entrega}paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="ID_Entrega" header="ID Entrega" style={{ width: '10%' }}></Column>
                <Column field="Fecha_Despacho" header="Fecha Despacho" style={{ width: '15%' }}></Column>
                <Column field="Fecha_Entrega" header="Fecha Entrega" style={{ width: '15%' }}></Column>
                <Column field="Estado_Entrega" header="Estado Entrega" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '15%' }} ></Column>
                <Column field="Nombre_Cliente" header="Nombre Cliente" style={{ width: '15%' }}></Column>
                <Column field="NumeroGuia" header="Número de Guía" style={{ width: '15%' }}></Column>
                <Column field="Fecha_Pedido" header="Fecha Pedido" style={{ width: '15%' }}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
            <Toast ref={toast} />
        </div>
        
    //     <Column
    //     body={(rowData) => (
    //       <i className="pi pi-pencil"  onClick={()=>cambiarEstadoEntrega(rowData.ID_Entrega)} style={{
    //           color: 'slateblue',
    //           cursor: 'pointer', 
    //           transition: 'background-color 0.3s',
    //         }}></i>
    //     )}
    // />
  )
}

export default Resumenentregas;