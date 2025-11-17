const Header : React.FC = () => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
      <a href="#" className="text-xl font-extrabold text-primary tracking-tight">
        DevHub
      </a>
      <nav className="space-x-4">
        <a href="/blog" className="text-gray-600 hover:text-primary transition duration-150 ease-in-out font-medium">Blog</a>
        <a href="/project" className="text-gray-600 hover:text-primary transition duration-150 ease-in-out font-medium">Projects</a>
        <a href="#" className="text-gray-600 hover:text-primary transition duration-150 ease-in-out font-medium">Contact</a>
      </nav>
    </div>
  </header>
)

export default Header;