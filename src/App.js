import {useState, useEffect} from 'react'

import './App.scss';

import { AddProductModal } from './components/modales/AddProductModal'
import { DetailModal } from './components/modales/DetailModal'


import {Listado} from './components/Listado'

function App() {

  const [modal, setModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [item, setItem] = useState({})
  const [initialState, setInitialState] = useState({
    loading: false,
    error: null,
    data: {},
    permisos: {}
  })

  const openDetails = (item) => {

    setEditModal(true)
    setItem(item)

  }

  const fetchProducts = async () => {
    const req = await fetch('http://localhost:8000/product')
    const res = await req.json()
    setInitialState({...initialState, data: res.data, permisos: res.permisos})
  }

  const deleteProduct = async (id) => {
    const req = await fetch(`http://localhost:8000/delete_product/${id}`, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body: { "id": id }
    })
    fetchProducts()
  }




  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Listado de productos</h1>
      </header>
      <main className='App-main' >
        <Listado 
          fetchProducts={fetchProducts}
          deleteProduct={deleteProduct}
          initialState={initialState}
          editModal={editModal}
          setEditModal={setEditModal}
          openDetails={openDetails}
        />
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
        fetchProducts={fetchProducts}
      
      />
      <DetailModal
        isOpen={editModal}
        setIsOpen={setEditModal}
        fetchProducts={fetchProducts}
        item={item}
        setItem={setItem}
      />
    </div>
  );
}

export default App;
