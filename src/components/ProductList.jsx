import React from "react";
import ProductCard from "./ProductCard";

function ProductList( { products }) {
    if (!products || !Array.isArray(products) || products.length === 0) {
    return <p>Nenhum produto disponível no momento.</p>;

    }
    return (
    <div className="product-list-container"> 
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
    )
}
export default ProductList;