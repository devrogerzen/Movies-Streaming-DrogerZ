import React from 'react'
import swAlert from '@sweetalert/with-react'
import {  useNavigate, Navigate } from 'react-router-dom'

const Buscador = () => {
  let token = sessionStorage.getItem("token");
  const navigator = useNavigate()
  const submitHandler = e => {
    //preventDefault() para que no se refresque la pagina al enviar el formulario
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value.trim()

    if(keyword.length === 0) {
      swAlert(<h5>Tienes que escribir una palabra clave</h5>)
    } else if(keyword.length < 4 ) {
      swAlert(<h5>Tienes que escribir mas de 4 caracteres</h5>)
    } else if(!token) {
      <Navigate replace to='/' />
      swAlert(<h5>Deber Iniciar Session</h5>)
    }else {
      e.currentTarget.keyword.value = ''
      navigator(`/resultados?keyword=${keyword}`)
    }
  }
  return (
    <form className='d-flex align-items-center' onSubmit={submitHandler} >
      <label className='form-label mb-0'>
        <input className='form-control' type="text" name='keyword' placeholder='Buscar...' />
      </label>
      <button type='submit' className='btn btn-secondary mx-2 mr-2 '>Buscar</button>
    </form>
  )
}

export default Buscador