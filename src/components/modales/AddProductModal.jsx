import React, {useState} from 'react'
import reactDOM from 'react-dom'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './styles/Modal.scss'

function AddProductModal(props) {

  const {fetchProducts} = props

  const [form, setForm] = useState({})

  const handleSubmit = async () => {
    const req = await fetch('http://localhost:8000/add_product', {
      method: 'POST',
      body: JSON.stringify(form)
    })
    fetchProducts()
    props.setIsOpen(false)
  }

  const handleChange = ({target}) => {
      setForm({...form, [target.name] : target.value })
  }

  if(!props.isOpen){
    return null;
  }; 

  return reactDOM.createPortal (
    <div className='modal-cont'>
      <div className='modal-card'>
        <div 
          onClick={() => { props.setIsOpen(false) }}  
          className='closeButtonContainer'
        >
          <p >X</p>
        </div>
        <p className='title2' >Agregar producto</p>
        <Box
          className='form-add'
          component="form"  
          noValidate  
          autoComplete="off"
        >
          <TextField 
            className='input col-2'  
            label="Nombre" 
            variant="filled" 
            name='nombre'
            onChange={(e) => handleChange(e) }
          />
          <TextField 
            className='input col-2'  
            label="Descripción" 
            variant="filled" 
            name='descripcion'
            onChange={(e) => handleChange(e) }
          />
        </Box>
        <button onClick={handleSubmit} className='button button-success'>Guardar</button>
      </div>
    </div>,
    document.getElementById('add_prod')
  )
}

export { AddProductModal }