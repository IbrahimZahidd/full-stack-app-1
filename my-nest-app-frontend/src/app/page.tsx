"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: number;
  imageUrl: string;
  price: string;
  description: string;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        // Adjust URL as needed
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: number) => {
    // Logic to add the product to the cart
    console.log(`Product ${productId} added to cart`);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/products/search?q=${searchTerm}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center p-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col items-center">
            <ProductCard
              imageUrl={product.imageUrl}
              price={product.price}
              description={product.description}
            />
            <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
