import React, {useState} from 'react'
import reactDOM from 'react-dom'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import './styles/Modal.scss'

function DetailModal(props) {

  const IVA = 0.19;

  const {fetchProducts, item, setItem} = props

  const [form, setForm] = useState({})

  const [cant, setCant] = useState(1)
  const [precioIVA, setPrecioIVA] = useState('')

  const handleSubmit = async () => {

    const req = await fetch('http://localhost:8000/add_product', {
      method: 'POST',
      body: JSON.stringify(form)
    })

    const res = await req.json()

    fetchProducts()

    props.setIsOpen(false)

  }

  const handleChange = ({target}) => {
      setForm({...form, [target.name] : target.value })

      
      if(target.name === 'precio'){

        
        const valorIVA = ((parseFloat(target.value) * cant) + parseFloat(target.value * IVA));
        setPrecioIVA(valorIVA)
      }

      if(target.name === 'cantidad'){
        setCant(target.value)

        const valorIVA = ((parseFloat(form.precio) * cant) + parseFloat(form.precio * IVA));
        setPrecioIVA(valorIVA)
      }

      console.log(form)
  }

  // Funciones para calcular los precios

 
   

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
        <p className='title2' >Detalle de producto</p>
        <Box
          className='form-add'
          component="form"  
          noValidate  
          autoComplete="off"
        >
          <TextField 
            className='input col-1'  
            label="Producto" 
            variant="filled" 
            name='producto'
            defaultValue={item.nombre}
            onChange={(e) => handleChange(e) }
          />
          <TextField 
            className='input col-1'  
            label="Cantidad" 
            variant="filled" 
            name='cantidad'
            value={cant}
            onChange={(e) => handleChange(e) }
          />
          <TextField 
            className='input col-1'  
            label="Precio unitario" 
            variant="filled" 
            name='precio'
            onChange={(e) => handleChange(e) }
          />
          <TextField 
            className='input col-1'  
            label="Precio total (IVA incluido)" 
            variant="filled" 
            name='total'
            value={precioIVA}
            onChange={(e) => handleChange(e) }
          />
          <TextField 
            className='input col-2'  
            label="Descripción" 
            variant="filled" 
            name='descripcion'
            defaultValue={item.descripcion}

            onChange={(e) => handleChange(e) }
          />
        </Box>
        <button onClick={handleSubmit} className='button button-success'>Guardar</button>
      </div>
    </div>,
    document.getElementById('detail_prod')
  )
}

export { DetailModal }