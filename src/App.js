import {useState, useEffect} from 'react'

import './App.scss';

import { AddProductModal } from './components/modales/AddProductModal'


import {Listado} from './components/Listado'

function App() {

  const [modal, setModal] = useState(false)



  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Listado de productos</h1>
      </header>
      <main className='App-main' >
        <Listado />
      </main>
      <footer className='App-footer' >
        <button 
          className='button button-success'
          onClick={() => setModal(true)}
        > 
          Agregar
        </button>
      </footer>
      <AddProductModal
        isOpen={modal}
        setIsOpen={setModal}
      
      />
    </div>
  );
}

export default App;
