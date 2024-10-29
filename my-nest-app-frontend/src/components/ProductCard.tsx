// src/components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  imageUrl: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  price,
  description,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={imageUrl}
        alt={description}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h3 className="text-lg font-bold">{description}</h3>
      <p className="text-xl text-green-500">{price}</p>
    </div>
  );
};

export default ProductCard;
