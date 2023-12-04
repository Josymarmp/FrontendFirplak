import React, { useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import jsPDF from 'jspdf';



const Facturacion = ({Entregas}) => {

const entregasCompletadas = Entregas.filter((entrega) => entrega.Estado_Entrega === 'Completada');
const [displayDialog, setDisplayDialog] = useState(false);
const [selectedEntrega, setSelectedEntrega] = useState(null);
const toast = useRef(null);
const [totalSize, setTotalSize] = useState(0);
const fileUploadRef = useRef(null);

const showDialog = (entrega) => {
    setSelectedEntrega(entrega);
    setDisplayDialog(true);
  };

  const onHide = () => {
    setDisplayDialog(false);
  };
  
  const handleDownload = (rowData) => {
    const pdf = new jsPDF();
    if (fileUploadRef.current && fileUploadRef.current.files.length > 0) {
        const imageFile = fileUploadRef.current.files[0];
        const imageData = fileUploadRef.current.files[0].objectURL;
        const imageWidth = 100;
        const imageHeight = (imageFile.height * imageWidth) / imageFile.width;
        pdf.addImage(imageData, 'JPEG', 20, 20, imageWidth, imageHeight);
      }
    pdf.text(`Fecha de Despacho: ${rowData.Fecha_Despacho}`, 20, 50);
    pdf.text(`Fecha de Entrega: ${rowData.Fecha_Entrega}`, 20, 60);
    pdf.text(`Nombre del Cliente: ${rowData.Nombre_Cliente}`, 20, 70);
    pdf.text(`Número de Guía: ${rowData.NumeroGuia}`, 20, 80);
  
    pdf.save('Factura.pdf');
  };
    
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 1000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 2 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

  return (
    <div>

            <DataTable value={entregasCompletadas}   tableStyle={{ minWidth: '50rem' }}>
                <Column field="ID_Entrega" header="ID Entrega" style={{ width: '10%' }}></Column>
                <Column field="Fecha_Despacho" header="Fecha Despacho" style={{ width: '15%' }}></Column>
                <Column field="Fecha_Entrega" header="Fecha Entrega" style={{ width: '15%' }}></Column>
                <Column field="Nombre_Cliente" header="Nombre Cliente" style={{ width: '15%' }}></Column>
                <Column field="NumeroGuia" header="Número de Guía" style={{ width: '15%' }}></Column>
              <Column body={(rowData) => <div style={{ display: 'flex', gap:'10px' }}>
                  <Button
                      onClick={() => showDialog(rowData)}
                      icon="pi pi-upload"
                      className="p-button-success"
                      tooltip="Cargar POD"
                      tooltipOptions={{ position: 'top' }}
                  ></Button>
                  <Button
                      onClick={() => handleDownload(rowData)}
                      icon="pi pi-download"
                      className="p-button-primary"
                      tooltip="Generar Factura"
                      tooltipOptions={{ position: 'top' }}
                  ></Button>
              </div>} />
             </DataTable>
           
             <Dialog visible={displayDialog} onHide={onHide} style={{ width: '50vw', height:'40vw' }}>
          <h2>Cargue de la Prueba de Entrega</h2>
          {selectedEntrega && (
            <div>
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
        </div>
          )}
        </Dialog>




    
    
    
    </div>
  )
}

export default Facturacion