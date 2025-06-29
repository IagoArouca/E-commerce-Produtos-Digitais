import Header from "./components/Header";
import ProductList from "./components/ProductList";

const products = [
  { id: '1', name: 'Ebook - Guia Completo de JS', price: 29.90, imageUrl: 'https://th.bing.com/th/id/R.1feaba51b4877c18eca84eb5a174572e?rik=PbkToaMUpEhU%2fA&pid=ImgRaw&r=0' },
  { id: '2', name: 'Template HTML/CSS Profissional', price: 49.99, imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.S-sXozyvtrUrtTzemQXpFwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: '3', name: 'Pack de Sons para Jogos', price: 79.00, imageUrl: 'https://tecnoblog.net/wp-content/uploads/2019/09/minecraft-001.jpg' },
];

function App() {

  return (
    <>
      < Header />
      <main>
        <h2>Nossos Produtos Digitais</h2>
        <ProductList products={products} />
      </main>
    </>
  )
}

export default App;
