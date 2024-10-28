import { useState, useEffect } from "react"
import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { BarChart, FileText, Folder, Users, Sun, Moon, FilePlus, FileIcon, FileTextIcon, FileSpreadsheetIcon } from "lucide-react"
import { Link } from 'react-router-dom'
import { Bar, BarChart as RechartsBarChart, Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const documents = [
  { id: 1, title: "Informe Q1.pdf", created: "2023-04-01", modified: "2023-04-15", type: "pdf", content: "This is a PDF document content.", versions: [
    { version: "1.0", date: "2023-04-01" },
    { version: "1.1", date: "2023-04-10" },
    { version: "1.2", date: "2023-04-15" },
  ]},
  { id: 2, title: "Presupuesto 2023.xlsx", created: "2023-03-20", modified: "2023-04-02", type: "xlsx", content: "This is an Excel document content.", versions: [
    { version: "1.0", date: "2023-03-20" },
    { version: "1.1", date: "2023-04-02" },
  ]},
  { id: 3, title: "Contrato.docx", created: "2023-04-01", modified: "2023-04-02", type: "docx", content: "This is a Word document content.", versions: [
    { version: "1.0", date: "2023-04-01" },
    { version: "1.1", date: "2023-04-02" },
  ]},
  { id: 4, title: "Datos.csv", created: "2023-05-01", modified: "2023-05-02", type: "csv", content: "id,name,value\n1,John,100\n2,Jane,200", versions: [
    { version: "1.0", date: "2023-05-01" },
    { version: "1.1", date: "2023-05-02" },
  ]},
  { id: 5, title: "Notas.txt", created: "2023-05-10", modified: "2023-05-10", type: "txt", content: "This is a plain text document.", versions: [
    { version: "1.0", date: "2023-05-10" },
  ]},
]

interface Document {
  id: number;
  title: string;
  created: string;
  modified: string;
  type: string;
  content: string;
  versions: Array<{version: string, date: string}>;
}

export default function DocumentManagementSystem() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [activeTab, setActiveTab] = useState("viewer")

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
    setActiveTab("viewer")
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

  // Calculate dashboard metrics
  const totalDocuments = documents.length
  const documentTypes = documents.reduce((acc, doc) => {
    acc[doc.type] = (acc[doc.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const maxVersions = Math.max(...documents.map(doc => doc.versions.length))
  const documentWithMostVersions = documents.find(doc => doc.versions.length === maxVersions)

  // Prepare data for charts
  const documentTypeData = Object.entries(documentTypes).map(([type, count]) => ({ type, count }))
  const versionData = documents.map(doc => ({ name: doc.title, versions: doc.versions.length }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <img
          src="/placeholder.svg?height=400&width=800"
          alt="Blockchain representation"
          className="w-full h-64 object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center">Document Management System</h1>
        </div>
      </div>

      <div className="flex flex-1">
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
              <Link to="/version">Control de versiones</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart className="mr-2 h-4 w-4" />
              <Link to="/report">Reportes</Link>
              Reportes
            </Button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Dashboard Section */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalDocuments}</div>
                <ChartContainer config={{
                  count: {
                    label: "Count",
                    color: "hsl(var(--chart-1))",
                  },
                }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={documentTypeData}
                        dataKey="count"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {documentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent config={{ count: { label: "Count", color: "hsl(var(--chart-1))" } }} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Document Types</CardTitle>
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  count: {
                    label: "Count",
                    color: "hsl(var(--chart-1))",
                  },
                }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={documentTypeData}>
                      <Bar dataKey="count" fill="hsl(var(--chart-1))" />
                      <ChartTooltip content={<ChartTooltipContent config={{ count: { label: "Count", color: "hsl(var(--chart-1))" } }} />} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Document Versions</CardTitle>
                <FileSpreadsheetIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  versions: {
                    label: "Versions",
                    color: "hsl(var(--chart-2))",
                  },
                }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={versionData}>
                      <Bar dataKey="versions" fill="hsl(var(--chart-2))" />
                      <ChartTooltip content={<ChartTooltipContent config={{ versions: { label: "Versions", color: "hsl(var(--chart-2))" } }} />} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Versioned</CardTitle>
                <Folder className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documentWithMostVersions?.title || 'N/A'}</div>
                <p className="text-xs text-muted-foreground">
                  {maxVersions} versions
                </p>
                <ChartContainer config={{
                  versions: {
                    label: "Versions",
                    color: "hsl(var(--chart-3))",
                  },
                }} className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[{ name: "Versions", value: maxVersions }]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="hsl(var(--chart-3))"
                        label
                      />
                      <ChartTooltip content={<ChartTooltipContent config={{ versions: { label: "Versions", color: "hsl(var(--chart-3))" } }} />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <h2 className="mb-6 text-3xl font-bold">Administrador de Documentos</h2>

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                  {selectedDocument ? (
                    <ul className="space-y-2">
                      {selectedDocument.versions.map((version, index) => (
                        <li key={index}>Version {version.version} - Created on {version.date}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a document to view its versions
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}