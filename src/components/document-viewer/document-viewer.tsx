import React from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { FileText, Calendar, Clock, Hash } from "lucide-react"

// Mock data for demonstration purposes
const documents = [
  {
    id: "1",
    title: "Informe Q1.pdf",
    type: "pdf",
    content: "This is a PDF document content.",
    created: "2023-04-01",
    modified: "2023-04-15",
    version: "1.2",
    hash: "8f7d88e901a5ad3a1654977929d1c2f7",
  },
  // ... other documents
]

export default function DocumentViewer() {
  const { id, versionId } = useParams<{ id: string; versionId: string }>()
  
  // In a real application, you would fetch the document based on id and versionId
  const document = documents.find(doc => doc.id === id)

  if (!document) {
    return <div>Document not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section with Blockchain Image and Metadata */}
      <div className="relative overflow-hidden rounded-lg bg-gray-900 text-white mb-8">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Blockchain representation"
          className="w-full h-64 object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-6">
          <h1 className="text-4xl font-bold mb-4">{document.title}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              <span>Type: {document.type.toUpperCase()}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              <span>Created: {document.created}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              <span>Modified: {document.modified}</span>
            </div>
            <div className="flex items-center">
              <Hash className="mr-2 h-5 w-5" />
              <span>Version: {document.version}</span>
            </div>
          </div>
          <Badge className="mt-4 w-fit">{document.hash}</Badge>
        </div>
      </div>

      {/* Document Viewer */}
      <Card>
        <CardHeader>
          <CardTitle>Document Viewer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[calc(100vh-24rem)] w-full bg-gray-200 dark:bg-gray-700 overflow-auto p-4 rounded-lg">
            {renderDocumentContent(document)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function renderDocumentContent(document: typeof documents[0]) {
  switch (document.type) {
    case 'pdf':
      return (
        <iframe
          src={`data:application/pdf;base64,${btoa(document.content)}`}
          className="w-full h-full"
          title={document.title}
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