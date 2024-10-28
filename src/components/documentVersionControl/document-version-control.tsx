import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { FileText, Clock } from "lucide-react"
import { Link } from 'react-router-dom'

// Assuming this data would come from an API in a real application
const documents = [
  {
    id: 1,
    title: "Informe Q1.pdf",
    versions: [
      { version: "1.2", date: "2023-04-15", id: "v1.2" },
      { version: "1.1", date: "2023-04-10", id: "v1.1" },
      { version: "1.0", date: "2023-04-01", id: "v1.0" },
    ]
  },
  {
    id: 2,
    title: "Presupuesto 2023.xlsx",
    versions: [
      { version: "1.1", date: "2023-04-02", id: "v1.1" },
      { version: "1.0", date: "2023-03-20", id: "v1.0" },
    ]
  },
  {
    id: 3,
    title: "Contrato.docx",
    versions: [
      { version: "1.1", date: "2023-04-02", id: "v1.1" },
      { version: "1.0", date: "2023-04-01", id: "v1.0" },
    ]
  },
  {
    id: 4,
    title: "Datos.csv",
    versions: [
      { version: "1.1", date: "2023-05-02", id: "v1.1" },
      { version: "1.0", date: "2023-05-01", id: "v1.0" },
    ]
  },
  {
    id: 5,
    title: "Notas.txt",
    versions: [
      { version: "1.0", date: "2023-05-10", id: "v1.0" },
    ]
  },
]

export default function DocumentVersionControl() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gray-900 text-white mb-8">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Blockchain representation"
          className="w-full h-64 object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center">Control de Versiones de Documentos</h1>
        </div>
      </div>

      {/* Document Version Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                {doc.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Historial de Versiones:</h3>
              <ul className="space-y-2">
                {doc.versions.map((version) => (
                  <li key={version.id} className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      v{version.version} - {version.date}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      
                    >
                      <Link to={`/viewer/${doc.id}/${version.id}`}>Ver</Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}