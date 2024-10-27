import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Upload, FileCheck } from "lucide-react";
import keccak256 from 'keccak256';

// Definir interfaces para documentos y versiones
interface DocumentVersion {
  documentHash: string;
  modificationDate: string;
  version: string;
  state: string;
}

interface Document {
  documentId: string;
  documentName: string;
  documentType: string;
  authorName: string;
  creationDate: string;
  versions: DocumentVersion[];
}

// Array para almacenar documentos y versiones
const documents: Document[] = [];

// Componente para la carga de documentos
export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isNewVersion, setIsNewVersion] = useState(false);
  const [existingDocId, setExistingDocId] = useState('');
  const [hash, setHash] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Función para generar un hash único
  const generateHash = (data: any) => {
    return '0x' + keccak256(data).toString('hex');
  };

  // Cargar archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !documentName || !documentType || !authorName) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e?.target?.result;
  
      if (fileData) {
        // Convertir fileData a una cadena antes de generar el hash
        const fileDataString = typeof fileData === 'string' ? fileData : Buffer.from(fileData).toString();
  
        if (isNewVersion && existingDocId) {
          // Agregar nueva versión a un documento existente
          const docIndex = documents.findIndex(doc => doc.documentId === existingDocId);
          if (docIndex !== -1) {
            const newVersion: DocumentVersion = {
              documentHash: generateHash(fileDataString + Date.now().toString()),
              modificationDate: new Date().toISOString(),
              version: `v${documents[docIndex].versions.length + 1}`,
              state: 'updated'
            };
            documents[docIndex].versions.push(newVersion);
            setMessage(`Nueva versión creada para el documento ${documents[docIndex].documentName}.`);
          } else {
            setMessage('Documento no encontrado.');
          }
        } else {
          // Crear nuevo documento
          const documentId = generateHash(documentName + Date.now().toString());
          const newDocument: Document = {
            documentId,
            documentName,
            documentType,
            authorName,
            creationDate: new Date().toISOString(),
            versions: [{
              documentHash: generateHash(fileDataString),
              modificationDate: new Date().toISOString(),
              version: 'v1',
              state: 'active'
            }]
          };
          documents.push(newDocument);
          setMessage('Documento creado exitosamente.');
        }
  
        // Generar hash simulado para la demostración
        const simulatedHash = generateHash(fileDataString);
        setHash(simulatedHash);
  
        // Guardar archivo en la carpeta 'uploads'
        saveFile(file);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Guardar archivo en la carpeta local 'uploads'
  const saveFile = (file: File) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Cargar y Verificar Documento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Campos para el nombre del documento, tipo y autor */}
          <Input 
            type="text" 
            placeholder="Nombre del documento" 
            value={documentName} 
            onChange={(e) => setDocumentName(e.target.value)} 
          />
          <Input 
            type="text" 
            placeholder="Tipo de documento" 
            value={documentType} 
            onChange={(e) => setDocumentType(e.target.value)} 
          />
          <Input 
            type="text" 
            placeholder="Nombre del autor" 
            value={authorName} 
            onChange={(e) => setAuthorName(e.target.value)} 
          />
          
          {/* Checkbox para nueva versión */}
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={isNewVersion} 
              onChange={(e) => setIsNewVersion(e.target.checked)} 
            />
            <span>Nueva versión de documento existente</span>
          </label>

          {/* Select para documentos existentes */}
          {isNewVersion && (
            <select 
              className="border rounded p-2 w-full" 
              onChange={(e) => setExistingDocId(e.target.value)}
            >
              <option value="">Seleccionar documento existente</option>
              {documents.map((doc) => (
                <option key={doc.documentId} value={doc.documentId}>
                  {doc.documentName}
                </option>
              ))}
            </select>
          )}

          {/* Campo para subir archivo */}
          <Input type="file" onChange={handleFileChange} />

          {/* Botón para subir documento */}
          <Button onClick={handleUpload} disabled={!file || !documentName || !documentType || !authorName}>
            <Upload className="mr-2 h-4 w-4" /> Subir Documento
          </Button>

          {/* Mensajes de resultado */}
          {message && <p className="text-sm text-blue-500 mt-2">{message}</p>}
          
          {/* Mostrar hash simulado del documento */}
          {hash && (
            <div className="mt-4">
              <p className="text-sm font-medium">Hash del Documento:</p>
              <p className="text-xs">{hash}</p>
              <div className="mt-2 flex items-center text-green-600">
                <FileCheck className="mr-2 h-4 w-4" />
                <span className="text-sm">Documento verificado en la blockchain (simulado)</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
