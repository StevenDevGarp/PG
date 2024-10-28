import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Web3Provider } from '@ethersproject/providers'
import { Link } from 'react-router-dom'


// Declaración global para MetaMask
declare global {
  interface Window {
    ethereum?: any
  }
}

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

  // Función para conectar MetaMask
  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const address = await signer.getAddress()

        alert(`Conectado con: ${address}`)
      } catch (error) {
        console.error('Error conectando con MetaMask:', error)
        alert('Error conectando con MetaMask. Revisa la consola para más detalles.')
      }
    } else {
      alert('MetaMask no está instalado. Por favor, instala MetaMask y vuelve a intentarlo.')
    }
  }

  const menuItems = [
    { name: 'Inicio', href: '#' },
    { name: 'Blockchain', href: '#blockchain' },
    { name: 'Wallets', href: '#wallets' },
    { name: 'Criptomonedas', href: '#crypto' },
    { name: 'Seguridad', href: '#security' },
  ]

  return (
    <nav className="bg-gray-900 w-full fixed top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-white text-xl font-bold">
              D-Docs
            </a>
          </div>
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item, index) => (
                <NavItem key={index} item={item} />
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <button
              onClick={connectMetaMask}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Login
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/doc">Documentación</Link>
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <button
                onClick={connectMetaMask}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 w-full"
              >
                Login
              </button>
            </div>
            <div className="mt-3 px-2">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
                Documentación
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

interface SectionProps {
  title: string;
  content: string;
  id: string;
  imageUrl: string;
}

const Section: React.FC<SectionProps> = ({ title, content, id, imageUrl }) => (
  <section id={id} className="py-20 bg-gray-100">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">{title}</h2>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <img src={imageUrl} alt={title} className="rounded-lg shadow-lg w-full" />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <div className="prose max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  </section>
)

const LandingPage = () => {
  const sections = [
    {
      id: 'blockchain',
      title: '¿Qué es Blockchain?',
      content: `
        <p>Blockchain es una tecnología revolucionaria que está transformando la forma en que almacenamos y compartimos información digital. En esencia, es una base de datos distribuida y descentralizada que registra transacciones en una serie de bloques enlazados criptográficamente.</p>
        <h3 class="text-xl font-semibold mt-4 mb-2">Características principales:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Descentralización:</strong> No hay una autoridad central que controle la información.</li>
          <li><strong>Transparencia:</strong> Todas las transacciones son visibles para los participantes de la red.</li>
          <li><strong>Inmutabilidad:</strong> Una vez que se registra una transacción, es prácticamente imposible alterarla.</li>
          <li><strong>Seguridad:</strong> Utiliza criptografía avanzada para proteger la integridad de los datos.</li>
        </ul>
        <p class="mt-4">La tecnología blockchain tiene aplicaciones en diversos campos, desde finanzas y cadena de suministro hasta atención médica y gestión de identidad. Su capacidad para crear confianza y transparencia en entornos descentralizados la convierte en una herramienta poderosa para la transformación digital.</p>
      `,
      imageUrl: '/placeholder.svg?height=300&width=400'
    },
    {
      id: 'wallets',
      title: 'Wallets y MetaMask',
      content: `
        <p>Las wallets o billeteras digitales son herramientas esenciales en el ecosistema blockchain, permitiendo a los usuarios almacenar, enviar y recibir criptomonedas de forma segura.</p>
        <h3 class="text-xl font-semibold mt-4 mb-2">MetaMask:</h3>
        <p>MetaMask es una de las wallets más populares y versátiles, especialmente en el ecosistema Ethereum. Funciona como una extensión de navegador y ofrece las siguientes características:</p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Gestión de claves:</strong> Almacena de forma segura las claves privadas del usuario.</li>
          <li><strong>Interacción con dApps:</strong> Permite conectarse fácilmente con aplicaciones descentralizadas.</li>
          <li><strong>Múltiples redes:</strong> Soporta Ethereum y otras redes compatibles con EVM.</li>
          <li><strong>Intercambio integrado:</strong> Ofrece la posibilidad de intercambiar tokens directamente desde la wallet.</li>
        </ul>
        <p class="mt-4">MetaMask actúa como un puente entre el navegador web y la blockchain, facilitando la interacción con aplicaciones descentralizadas y la gestión de activos digitales de manera segura y conveniente.</p>
      `,
      imageUrl: '/placeholder.svg?height=300&width=400'
    },
    {
      id: 'crypto',
      title: 'Criptomonedas',
      content: `
        <p>Las criptomonedas son activos digitales que utilizan criptografía para asegurar transacciones, controlar la creación de unidades adicionales y verificar la transferencia de activos. Bitcoin, creada en 2009, fue la primera criptomoneda, pero desde entonces han surgido miles más.</p>
        <h3 class="text-xl font-semibold mt-4 mb-2">Características principales:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Descentralización:</strong> No están controladas por gobiernos o instituciones financieras centrales.</li>
          <li><strong>Transparencia:</strong> Todas las transacciones son registradas en un libro contable público (blockchain).</li>
          <li><strong>Limitación de suministro:</strong> Muchas criptomonedas tienen un suministro máximo predefinido.</li>
          <li><strong>Pseudoanonimidad:</strong> Las transacciones no están vinculadas directamente a identidades reales.</li>
        </ul>
        <h3 class="text-xl font-semibold mt-4 mb-2">Tipos de criptomonedas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Bitcoin (BTC):</strong> La primera y más conocida criptomoneda.</li>
          <li><strong>Ethereum (ETH):</strong> Plataforma para aplicaciones descentralizadas y contratos inteligentes.</li>
          <li><strong>Stablecoins:</strong> Criptomonedas diseñadas para mantener un valor estable.</li>
          <li><strong>Tokens:</strong> Activos digitales creados sobre blockchains existentes.</li>
        </ul>
        <p class="mt-4">Las criptomonedas están transformando el panorama financiero global, ofreciendo nuevas formas de transferir valor y acceder a servicios financieros de manera descentralizada.</p>
      `,
      imageUrl: '/placeholder.svg?height=300&width=400'
    },
    {
      id: 'security',
      title: 'Blockchain en Gestión Documental',
      content: `
        <p>La tecnología blockchain está revolucionando la gestión documental, ofreciendo niveles sin precedentes de seguridad, trazabilidad y transparencia. Su aplicación en este campo aborda muchos de los desafíos tradicionales asociados con la gestión y verificación de documentos.</p>
        <h3 class="text-xl font-semibold mt-4 mb-2">Beneficios clave:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Integridad de documentos:</strong> Cada documento se registra con un hash único en la blockchain, lo que permite verificar si ha sido alterado.</li>
          <li><strong>Trazabilidad:</strong> Todas las acciones realizadas sobre un documento (creación, modificación, acceso) quedan registradas de forma inmutable.</li>
          <li><strong>Auditoría simplificada:</strong> La naturaleza transparente de la blockchain facilita los procesos de auditoría.</li>
          <li><strong>Eliminación de intermediarios:</strong> Reduce la necesidad de terceros para verificar la autenticidad de los documentos.</li>
          <li><strong>Acceso controlado:</strong> Permite definir y hacer cumplir permisos de acceso de manera descentralizada.</li>
        </ul>
        <h3 class="text-xl font-semibold mt-4 mb-2">Aplicaciones prácticas:</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Certificados académicos:</strong> Verificación instantánea de títulos y credenciales.</li>
          <li><strong>Contratos inteligentes:</strong> Automatización de acuerdos y cumplimiento de términos.</li>
          <li><strong>Registros médicos:</strong> Gestión segura y compartida de historiales clínicos.</li>
          <li><strong>Propiedad intelectual:</strong> Registro y protección de derechos de autor y patentes.</li>
        </ul>
        <p class="mt-4">La integración de blockchain en la gestión documental no solo mejora la seguridad y la eficiencia, sino que también abre nuevas posibilidades para la colaboración y el intercambio de información en un entorno confiable y transparente.</p>
      `,
      imageUrl: '/placeholder.svg?height=300&width=400'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <header className="bg-gray-900 text-white py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blockchain y Gestión Documental</h1>
          <p className="text-xl">Descubre cómo la tecnología blockchain revoluciona la seguridad y trazabilidad de documentos</p>
        </div>
      </header>
      {sections.map((section, index) => (
        <Section key={index} {...section} />
      ))}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 D-Docs. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
