import Link from 'next/link'



export default function Navbar() {
    return (
      <nav className="bg-secondary p-3 h-auto">
      <div className="container mx-3 text-left">
        <Link href="/" className="text-white text-4xl font-bold">
          Quill
        </Link>
      </div>
    </nav>
    
    )
}