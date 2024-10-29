import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Product Store</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="hover:text-blue-300 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className="hover:text-blue-300 transition duration-300"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-blue-300 transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-300 transition duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
