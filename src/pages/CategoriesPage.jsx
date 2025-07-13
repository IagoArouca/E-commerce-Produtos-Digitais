import React from 'react';
import { Link } from 'react-router-dom';


const IconClothes = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.05 0 0 0-3.072-3.072L3 10.5l2.846-.813a4.5 4.05 0 0 0 3.072-3.072L9 3.75l.813 2.846a4.5 4.05 0 0 0 3.072 3.072L15 10.5l-2.846.813a4.5 4.05 0 0 0-3.072 3.072Zm0 0 2.123 2.123"/></svg>);


const IconBonnet = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.05 0 0 0-3.072-3.072L3 10.5l2.846-.813a4.5 4.05 0 0 0 3.072-3.072L9 3.75l.813 2.846a4.5 4.05 0 0 0 3.072 3.072L15 10.5l-2.846.813a4.5 4.05 0 0 0-3.072 3.072Zm0 0 2.123 2.123M21 12c-1.251-1.391-2.652-2.585-4.223-3.486L15.2 6.744a5.137 5.093 0 0 1-4.004-4.887V2.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>); // Ícone de chapéu/boné

const IconTshirt = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18M4.5 19.5h15"/></svg>); // Ícone de camiseta/blusa

const IconGlasses = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 1.5h11.55a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75v-6.75a.75.75 0 0 1 .75-.75Z"/></svg>); // Ícone de óculos

const IconSneakers = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.05 0 0 0-3.072-3.072L3 10.5l2.846-.813a4.5 4.05 0 0 0 3.072-3.072L9 3.75l.813 2.846a4.5 4.05 0 0 0 3.072 3.072L15 10.5l-2.846.813a4.5 4.05 0 0 0-3.072 3.072Zm0 0 2.123 2.123M21 12c-1.251-1.391-2.652-2.585-4.223-3.486L15.2 6.744a5.137 5.093 0 0 1-4.004-4.887V2.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>); // Ícone genérico de sapato (usando o de chapéu temporariamente se não houver um bom de sapato)

const IconJewelry = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>); // Ícone de anel/joia (círculo simples)

const IconWatch = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>); // Ícone de relógio

const IconBag = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.008v.008H12zM6 18h.008v.008H6zM18 18h.008v.008H18zM6 6h.008v.008H6zM18 6h.008v.008H18zM6 12h.008v.008H6zM18 12h.008v.008H18zM12 6h.008v.008H12zM12 12h.008v.008H12zM12 18h.008v.008H12z"/></svg>); // Ícone genérico de bolsa (quadrado com alça simples)

const IconHeadwear = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.25 8.75m17.5 0L18 12m-6 6V6.75a4.5 4.5 0 0 0-9 0V18m18 0V6.75a4.5 4.5 0 0 0-9 0V18"/></svg>); // Ícone para chapéus/bonés mais genérico


const CategoriesPage = () => {
  const categoryIcons = {
    "Bones": IconHeadwear,
    "Blusas": IconTshirt,
    "Óculos": IconGlasses,
    "Calças": IconClothes, 
    "Calçados": IconSneakers,
    "Acessórios": IconJewelry,
    "Relógios": IconWatch,
    "Bolsas": IconBag,
  };

  const categories = [
    { name: "Bones", description: "Estilo e proteção para sua cabeça.", iconName: "Bones" },
    { name: "Blusas", description: "Conforto e moda para todas as estações.", iconName: "Blusas" },
    { name: "Óculos", description: "Proteção e estilo para seus olhos.", iconName: "Óculos" },
    { name: "Calças", description: "Diversos modelos para seu dia a dia.", iconName: "Calças" },
    { name: "Calçados", description: "Conforto e tendência para seus pés.", iconName: "Calçados" },
    { name: "Acessórios", description: "Complemente seu visual com estilo.", iconName: "Acessórios" },
    { name: "Relógios", description: "Sofisticação e funcionalidade no seu pulso.", iconName: "Relógios" },
    { name: "Bolsas", description: "Praticidade e elegância para carregar seus itens.", iconName: "Bolsas" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 text-center min-h-screen bg-gray-50 font-body">
      <h2 className="text-4xl md:text-5xl font-display text-gray-900 mb-6 leading-tight">
        Explore Nossas <span className="text-blue-600">Categorias de Roupas</span>
      </h2>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
        Descubra um universo de produtos de moda selecionados para você.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const IconComponent = categoryIcons[category.iconName];
          return (
            <Link
              key={index}
              to={`/categorias/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="
                bg-white p-6 rounded-xl shadow-lg border border-gray-100
                flex flex-col items-start text-left
                hover:shadow-2xl hover:scale-103 transition-all duration-300 ease-in-out
                group relative overflow-hidden
              "
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="
                w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-6
                group-hover:bg-pink-200 transition-colors duration-300
                shadow-inner
              ">
                {IconComponent ? <IconComponent className="text-pink-600 w-10 h-10" /> : <span className="text-xl text-pink-600">?</span>}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2 font-body leading-tight">
                {category.name}
              </h3>

              <p className="text-gray-600 text-base mb-4 flex-grow">
                {category.description}
              </p>
              <span className="
                mt-auto text-gray-800 font-semibold relative inline-flex items-center
                group-hover:text-blue-600 transition-colors duration-300
              ">
                Ver produtos
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 mt-16">
        * Clique em uma categoria para simular a visualização de produtos específicos.
      </p>
    </div>
  );
};

export default CategoriesPage;