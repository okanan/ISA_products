import {useState, useEffect} from 'react'

import './styles/Listado.scss'


function Listado({
  initialState, 
  fetchProducts, 
  deleteProduct, 
  editModal,
  setEditModal,
  openDetails 
}) {




 
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      {initialState?.data?.length 
        ? 
        <div className='table'>
        <div className='table-header'>
          <div>ID</div>
          <div>Nombre</div>
          <div>Descripción</div>
          <div>Acciones</div>
        </div>
        <div className='table-item_list' >
          {initialState?.data?.map((prod, index) => {
            return(
              <div className='item' key={index}>
                <div>
                  {index}
                </div>
                <div>
                  {prod.nombre}
                </div>
                <div>
                  {prod.descripcion}
                </div>
                <div>
                  {initialState?.permisos?.editar && 
                    <button 
                      className='button button-detail'
                      onClick={() => openDetails(prod)}
                    >
                      Ver más
                    </button>
                  }
                  {initialState?.permisos?.eliminar && 
                    <button 
                      className='button button-delete'
                      onClick={() => deleteProduct(prod.id ? prod.id : index)}
                    >
                      Eliminar
                    </button>}
                </div>
              </div>
            )
          })}
        </div>

        
        </div>
        :
        <div className='App-main_no-item' >Aún no se han agregado productos.</div>
      }

      
    </>
  )
}

export { Listado }
