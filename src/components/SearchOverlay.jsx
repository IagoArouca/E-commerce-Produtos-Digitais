function SearchOverlay({ isOpen, onClick }) {
  // O overlay só será renderizado se isOpen for true
  if (!isOpen) return null;

  return (
    // Fixed inset-0 para cobrir a tela toda, bg-gray-900 com opacidade, z-index baixo
    // transition-opacity para uma animação suave
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 transition-opacity duration-300"
      onClick={onClick} // Permite fechar o overlay clicando fora do input
    ></div>
  );
}

export default SearchOverlay;