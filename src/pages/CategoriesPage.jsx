import React from 'react';
import { Link } from 'react-router-dom';

const IconElectronics = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3.75m3-2.25V3.75M9 6h3m-3 1.5h3m-3 1.5h3m-3 1.5h3m-3 1.5h3m-3 1.5h3m-3 1.5h3M9 19.5h3"/></svg>);

const IconBooks = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M20.25 21v-8.25M18.75 1.5v8.25M12 21a2.25 2.25 0 0 0 2.25-2.25V15M12 21a2.25 2.25 0 0 1-2.25-2.25V15M10.5 8.25V5.25a2.25 2.25 0 0 1 2.25-2.25h.583A2.25 2.25 0 0 1 15.667 5.25v3.083m-8.913.677L7.5 21m0-8.25v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75m0-1.5v.75M7.5 15C10.5 15 12 15.75 12 18s-1.5 3-4.5 3c-3 0-4.5-1.5-4.5-3s1.5-3 4.5-3Z"/></svg>);

const IconSoftware = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21.75l-.75-.75A3 3 0 0 1 6.243 18.257V17.25m6.75-6.75V15m0-2.25v-1.5m0 3.75v1.5m0 3.75V21m-3-12h.008v.008H9V9zm-3 0h.008v.008H6V9zm0 3h.008v.008H6V12zm0 3h.008v.008H6V15zm0 3h.008v.008H6V18zm0 3h.008v.008H6V21zm9 3h.008v.008h-.008V24zM12 6h.008v.008H12V6zM9 9h.008v.008H9V9zM12 9h.008v.008H12V9zM15 9h.008v.008H15V9zM18 9h.008v.008H18V9zM21 9h.008v.008H21V9zM12 12h.008v.008H12V12zM15 12h.008v.008H15V12zM18 12h.008v.008H18V12zM21 12h.008v.008H21V12zM12 15h.008v.008H12V15zM15 15h.008v.008H15V15zM18 15h.008v.008H18V15zM21 15h.008v.008H21V15zM12 18h.008v.008H12V18zM15 18h.008v.008H15V18zM18 18h.008v.008H18V18zM21 18h.008v.008H21V18zM12 21h.008v.008H12V21zM15 21h.008v.008H15V21zM18 21h.008v.008H18V21zM21 21h.008v.008H21V21zM10.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM13.5 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>);

const IconCourses = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347m6.574-2.585a48.657 48.657 0 0 1-1.892 0m-.335-.573V9.75m9.283 0v.685m-1.04 7.647L14.75 19.5m-3.997 0a48.334 48.334 0 0 0-2.553.409m10.157-1.428a48.324 48.324 0 0 0 2.553-.409M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>);

const IconMusic = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 1 1-4.5 0v-.375M13.5 5.997l10.5-3M13.5 12.253v3.75a2.25 2.25 0 1 1-4.5 0v-.375M5.25 17.25h14.25M5.25 11.25h14.25"/></svg>);

const IconClothes = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.05 0 0 0-3.072-3.072L3 10.5l2.846-.813a4.5 4.05 0 0 0 3.072-3.072L9 3.75l.813 2.846a4.5 4.05 0 0 0 3.072 3.072L15 10.5l-2.846.813a4.5 4.05 0 0 0-3.072 3.072Zm0 0 2.123 2.123"/></svg>);

const IconDesigns = (props) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.412 1.993a6.75 6.75 0 0 1 6.64-1.993 6.75 6.75 0 0 1 6.64 1.993 6.75 6.75 0 0 1 1.993 6.64 6.75 6.75 0 0 1-1.993 6.64 6.75 6.75 0 0 1-6.64 1.993 6.75 6.75 0 0 1-6.64-1.993A6.75 6.75 0 0 1 1.993 8.633a6.75 6.75 0 0 1 1.993-6.64Z"/></svg>);


const CategoriesPage = () => {
  const categoryIcons = {
    "Eletrônicos": IconElectronics,
    "Livros Digitais": IconBooks,
    "Softwares": IconSoftware,
    "Cursos Online": IconCourses,
    "Música e Áudio": IconMusic, 
    "Roupas": IconClothes,
    "Designs e Templates": IconDesigns,
  };

  const categories = [
    { name: "Eletrônicos", description: "Smartphones, notebooks, fones de ouvido e mais.", iconName: "Eletrônicos" },
    { name: "Livros Digitais", description: "E-books de ficção, não-ficção, tecnologia e autoajuda.", iconName: "Livros Digitais" },
    { name: "Softwares", description: "Sistemas operacionais, aplicativos de produtividade e segurança.", iconName: "Softwares" },
    { name: "Cursos Online", description: "Aprenda novas habilidades com cursos de diversas áreas.", iconName: "Cursos Online" },
    { name: "Música e Áudio", description: "Faixas, álbuns e efeitos sonoros para seus projetos.", iconName: "Música e Áudio" },
    { name: "Roupas", description: "Moda masculina, feminina e infantil para todas as ocasiões.", iconName: "Roupas" },
    { name: "Designs e Templates", description: "Modelos para sites, apresentações e artes gráficas.", iconName: "Designs e Templates" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 text-center min-h-screen bg-gray-50 font-body">
      <h2 className="text-4xl md:text-5xl font-display text-gray-900 mb-6 leading-tight">
        Explore Nossas <span className="text-blue-600">Categorias</span>
      </h2>
      <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
        Descubra um universo de produtos digitais selecionados para você.
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