import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Upload, FileCheck } from "lucide-react";
import { Label } from "../ui/Label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { keccak256 } from 'js-sha3'; // Importar keccak256 de js-sha3

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
  creationDate: string;
  versions: DocumentVersion[];
}

export default function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [isNewVersion, setIsNewVersion] = useState(false);
  const [existingDocId, setExistingDocId] = useState('');
  const [hash, setHash] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [documents, setDocuments] = useState<Document[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedDocuments = JSON.parse(localStorage.getItem('documents') || '[]');
      setDocuments(storedDocuments);
    } catch (error) {
      console.error('Error al acceder al localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('documents', JSON.stringify(documents));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [documents]);

  // Generar hash usando nombre y tipo del documento
  const generateHash = (name: string, type: string) => {
    const data = new TextEncoder().encode(name + type); // Convertir a Uint8Array
    return '0x' + keccak256(data); // Usar keccak256 de js-sha3
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!file || !documentName || !documentType) {
      setMessage('Por favor, completa todos los campos.');
      return;
    }

    // Generar hash usando solo nombre y tipo
    const documentHash = generateHash(documentName, documentType);
    if (!documentHash) {
      console.error('Error al generar el hash del documento.');
      return;
    }

    let updatedDocuments = [...documents];
    if (isNewVersion && existingDocId) {
      const docIndex = updatedDocuments.findIndex(doc => doc.documentId === existingDocId);
      if (docIndex !== -1) {
        const newVersion: DocumentVersion = {
          documentHash,
          modificationDate: new Date().toISOString(),
          version: `v${updatedDocuments[docIndex].versions.length + 1}`,
          state: 'updated'
        };
        updatedDocuments[docIndex].versions.push(newVersion);
        setMessage(`Nueva versión creada para el documento ${updatedDocuments[docIndex].documentName}.`);
      } else {
        setMessage('Documento no encontrado.');
        return;
      }
    } else {
      const documentId = generateHash(documentName, documentType);
      const newDocument: Document = {
        documentId,
        documentName,
        documentType,
        creationDate: new Date().toISOString(),
        versions: [{
          documentHash,
          modificationDate: new Date().toISOString(),
          version: 'v1',
          state: 'active'
        }]
      };
      updatedDocuments = [...updatedDocuments, newDocument];
      setMessage('Documento creado exitosamente.');
    }

    // Actualizar el estado de documentos
    setDocuments(updatedDocuments);
    setHash(documentHash);

    // Guardar archivo en la carpeta
    await saveFile(file);

    alert('Documento subido exitosamente!');
    navigate('/');
  };

  // Guardar archivo en una carpeta
  const saveFile = async (file: File) => {
    const folderPath = '/ruta/a/la/carpeta/'; // Cambia esto a la ruta deseada
    try {
      const fileData = new Blob([file], { type: file.type });
      const filePath = `${folderPath}/${file.name}`;
      // Aquí puedes implementar la lógica para guardar el archivo en el servidor
      console.log(`Archivo guardado en: ${filePath}`);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }
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
                disabled={!file || !documentName || !documentType}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" /> Subir Documento
              </Button>

              {message && <p className="text-sm text-blue-500 mt-2">{message}</p>}
              
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
