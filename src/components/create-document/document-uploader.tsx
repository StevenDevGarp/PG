import React, { useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Upload, FileCheck } from "lucide-react";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
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

  // Crear documento o nueva versión
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
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Document Management System
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Carga, gestiona y verifica tus documentos de manera segura y eficiente.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Cargar y Verificar Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="documentName">Nombre del documento</Label>
                <Input 
                  id="documentName"
                  type="text" 
                  placeholder="Nombre del documento" 
                  value={documentName} 
                  onChange={(e) => setDocumentName(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentType">Tipo de documento</Label>
                <Input 
                  id="documentType"
                  type="text" 
                  placeholder="Tipo de documento" 
                  value={documentType} 
                  onChange={(e) => setDocumentType(e.target.value)} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="authorName">Nombre del autor</Label>
                <Input 
                  id="authorName"
                  type="text" 
                  placeholder="Nombre del autor" 
                  value={authorName} 
                  onChange={(e) => setAuthorName(e.target.value)} 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isNewVersion" 
                  checked={isNewVersion} 
                  onCheckedChange={(checked) => setIsNewVersion(checked as boolean)}
                />
                <Label htmlFor="isNewVersion">Nueva versión de documento existente</Label>
              </div>

              {isNewVersion && (
                <div className="space-y-2">
                  <Label htmlFor="existingDoc">Seleccionar documento existente</Label>
                  <Select onValueChange={setExistingDocId} value={existingDocId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {documents.map((doc) => (
                        <SelectItem key={doc.documentId} value={doc.documentId}>
                          {doc.documentName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="file">Subir archivo</Label>
                <Input id="file" type="file" onChange={handleFileChange} />
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={!file || !documentName || !documentType || !authorName}
                className="w-full"
              >
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
