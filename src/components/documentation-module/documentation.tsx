import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavItemProps {
  item: {
    name: string;
    href: string;
  };
}

const NavItem: React.FC<NavItemProps> = ({ item }) => (
  <li>
    <a
      href={item.href}
      className="text-sm font-semibold text-gray-200 hover:text-white"
    >
      {item.name}
    </a>
  </li>
)

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Introducción', href: '#introduction' },
    { name: 'Autenticación', href: '#authentication' },
    { name: 'Ejemplos', href: '#examples' },
    { name: 'Referencias de API', href: '#api-reference' },
  ]

  return (
    <nav className="bg-gray-900 w-full fixed top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-white text-xl font-bold">
              D-Docs API
            </a>
          </div>
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

interface DocumentationSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const DocumentationSection: React.FC<DocumentationSectionProps> = ({ title, id, children }) => (
  <section id={id} className="py-12 px-4 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="text-gray-600">{children}</div>
    </div>
  </section>
)

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <header className="bg-gray-900 text-white py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Documentación de la API de D-Docs</h1>
          <p className="text-xl">
            Aprende a integrarte con la API de D-Docs para gestionar tus documentos de forma segura y eficiente.
          </p>
        </div>
      </header>

      <DocumentationSection title="Introducción" id="introduction">
        <p>
          La API de D-Docs te permite integrar capacidades de gestión documental directamente en tus aplicaciones.
          Con esta API, puedes almacenar, recuperar, y gestionar documentos de forma segura utilizando la tecnología blockchain.
        </p>
      </DocumentationSection>

      <DocumentationSection title="Autenticación" id="authentication">
        <h3 className="text-xl font-semibold mt-4 mb-2">Obteniendo un token de acceso</h3>
        <p>
          Para utilizar la API, primero necesitas obtener un token de acceso. Puedes hacer esto enviando una solicitud 
          de autenticación con tus credenciales de usuario:
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-auto">
          {`POST /api/auth/login
Headers:
  Content-Type: application/json

Body:
  {
    "username": "tu_usuario",
    "password": "tu_contraseña"
  }
Response:
  {
    "token": "tu_token_de_acceso"
  }`}
        </pre>
        <p className="mt-4">
          Una vez que tengas el token, incluye el siguiente encabezado en tus solicitudes:
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-auto">
          {`Authorization: Bearer tu_token_de_acceso`}
        </pre>
      </DocumentationSection>

      <DocumentationSection title="Ejemplos de uso de la API" id="examples">
        <h3 className="text-xl font-semibold mt-4 mb-2">Ejemplo de obtener documentos</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-auto">
          {`GET /api/documents
Headers:
  Authorization: Bearer tu_token_de_acceso

Response:
  {
    "documents": [
      { "id": 1, "title": "Documento 1", "status": "completed" },
      { "id": 2, "title": "Documento 2", "status": "in_progress" }
    ]
  }`}
        </pre>

        <h3 className="text-xl font-semibold mt-4 mb-2">Ejemplo de crear un documento</h3>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-auto">
          {`POST /api/documents
Headers:
  Content-Type: application/json
  Authorization: Bearer tu_token_de_acceso

Body:
  {
    "title": "Nuevo Documento",
    "content": "Contenido del documento en texto o base64"
  }

Response:
  {
    "id": 3,
    "title": "Nuevo Documento",
    "status": "in_progress"
  }`}
        </pre>
      </DocumentationSection>

      <DocumentationSection title="Referencias de la API" id="api-reference">
        <h3 className="text-xl font-semibold mt-4 mb-2">GET /api/documents</h3>
        <p>
          Obtiene la lista de documentos del usuario autenticado. Puedes usar parámetros opcionales para filtrar los resultados.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-auto">
          {`GET /api/documents?status=completed
Headers:
  Authorization: Bearer tu_token_de_acceso`}
        </pre>

        <h3 className="text-xl font-semibold mt-4 mb-2">POST /api/documents</h3>
        <p>
          Crea un nuevo documento en el sistema. Proporciona el contenido y título del documento en el cuerpo de la solicitud.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-auto">
          {`POST /api/documents
Headers:
  Content-Type: application/json
  Authorization: Bearer tu_token_de_acceso`}
        </pre>
      </DocumentationSection>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 D-Docs. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default DocumentationPage
