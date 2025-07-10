import React from 'react';

const Modal = ({ children, title, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 font-body">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative transform scale-100 opacity-100 transition-all duration-300 ease-out">
        <h3 className="text-3xl font-display text-gray-900 mb-6 text-center leading-tight">
          {title}
        </h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar pr-2"> 
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;