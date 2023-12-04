import Link from "next/link";

function Navbar() {
  return (
    <nav className="fixed w-full h-24 shadow-xl bg-secondary">
      <div className="flex justify-between items-center w-full h-full px-6">
        <div>
          <Link
            href="/"
            className="font-lexend font-bold text-transparent text-6xl bg-gradient-to-r from-purple-400 to-pink-600  bg-clip-text "
          >
            Quill
          </Link>
        </div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
