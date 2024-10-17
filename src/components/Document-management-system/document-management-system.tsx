import { useState, useEffect } from "react"
import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { BarChart, FileText, Folder, Users, Sun, Moon, FilePlus  } from "lucide-react"
import { Link } from 'react-router-dom'

const documents = [
  { id: 1, title: "Informe Q1.pdf", created: "2023-04-01", modified: "2023-04-15", type: "pdf", content: "This is a PDF document content." },
  { id: 2, title: "Presupuesto 2023.xlsx", created: "2023-03-20", modified: "2023-04-02", type: "xlsx", content: "This is an Excel document content." },
  { id: 3, title: "Contrato.docx", created: "2023-04-01", modified: "2023-04-02", type: "docx", content: "This is a Word document content." },
  { id: 4, title: "Datos.csv", created: "2023-05-01", modified: "2023-05-02", type: "csv", content: "id,name,value\n1,John,100\n2,Jane,200" },
  { id: 5, title: "Notas.txt", created: "2023-05-10", modified: "2023-05-10", type: "txt", content: "This is a plain text document." },
]


interface Document {
  id: number;
  title: string;
  created: string;
  modified: string;
  type: string;
  content: string;
}


export default function DocumentManagementSystem() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null) 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleCardClick = (document: Document) => {
    setSelectedDocument(document)
  }

  const renderDocumentContent = (document: Document | null) => {
    if (!document) return null

    switch (document.type) {
      case 'pdf':
        return (
          <iframe
            src={`data:application/pdf;base64,${btoa(document.content)}`}
            className="w-full h-full"
          />
        )
      case 'xlsx':
        return <div className="p-4 bg-green-100 dark:bg-green-800">Excel Viewer: {document.content}</div>
      case 'docx':
        return <div className="p-4 bg-blue-100 dark:bg-blue-800">Word Viewer: {document.content}</div>
      case 'csv':
        return (
          <table className="w-full border-collapse">
            {document.content.split('\n').map((row, i) => (
              <tr key={i}>
                {row.split(',').map((cell, j) => (
                  <td key={j} className="border p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </table>
        )
      case 'txt':
        return <pre className="p-4 whitespace-pre-wrap">{document.content}</pre>
      default:
        return <div>Unsupported file type</div>
    }
  }


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">D-Docs</h2>
          <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            <Link to="/">Todos los documentos</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FilePlus className="mr-2 h-4 w-4" />
            <Link to="/upload">Cargar documento</Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Folder className="mr-2 h-4 w-4" />
            Control de versiones
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Info de usuario
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <BarChart className="mr-2 h-4 w-4" />
            Reportes
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="mb-6 text-3xl font-bold">Administrador de Documentos</h1>

        {/* Document Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleCardClick(doc)}>
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Created: {doc.created}</p>
                <p>Modified: {doc.modified}</p>
                <p>Type: {doc.type.toUpperCase()}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Document Viewer and Versions */}
        <Tabs defaultValue="viewer" className="w-full">
          <TabsList>
            <TabsTrigger value="viewer">Document Viewer</TabsTrigger>
            <TabsTrigger value="versions">Document Versions</TabsTrigger>
          </TabsList>
          <TabsContent value="viewer">
            <Card>
              <CardHeader>
                <CardTitle>Document Viewer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 w-full bg-gray-200 dark:bg-gray-700 overflow-auto">
                  {selectedDocument ? (
                    renderDocumentContent(selectedDocument)
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                      Select a document to view
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="versions">
            <Card>
              <CardHeader>
                <CardTitle>Document Versions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Version 1.0 - Created on 2023-04-01</li>
                  <li>Version 1.1 - Modified on 2023-04-02</li>
                  <li>Version 1.2 - Modified on 2023-04-15</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}