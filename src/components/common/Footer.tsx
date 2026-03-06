import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-xl font-bold">SULOG</span>
          </div>
          <div className="text-sm text-gray-400">
            © 2025 Template. All Rights Reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/terms"
              className="text-sm text-gray-400 hover:text-white"
            >
              Terms of Use
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-gray-400 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookie"
              className="text-sm text-gray-400 hover:text-white"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
