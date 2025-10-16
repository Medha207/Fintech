// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} FinTrack. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-yellow-400 transition">Privacy</a>
          <a href="#" className="hover:text-yellow-400 transition">Terms</a>
          <a href="#" className="hover:text-yellow-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;