import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center">
      <div className="container mx-auto">
        <p className="mb-2">
          &copy; 2024 My Product Store. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/privacy"
            className="hover:text-gray-400 transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-gray-400 transition duration-300"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
