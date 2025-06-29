import React from "react";

function ProductCard( {product} ) {
    if (!product || !product.name || !product.price || !product.imageUrl) {
    return <p>Produto inválido ou incompleto.</p>;
    }

    const handleAddToCart = () => {
    // Por enquanto, apenas um alerta. Futuramente, aqui adicionaremos o produto ao carrinho.
    alert(`"${product.name}" adicionado ao carrinho!`);
    };
    return (
    <div className="product-card">
        <img src={product.imageUrl} alt={product.name} className="product-image" height={130} />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">R$ {product.price.toFixed(2).replace('.', ',')}</p> 
        <button className="details-button">Ver Detalhes</button>
        <button onClick={handleAddToCart} className="add-to-cart-button">
        Adicionar ao Carrinho
        </button>
    </div>
    )
}
export default ProductCard;