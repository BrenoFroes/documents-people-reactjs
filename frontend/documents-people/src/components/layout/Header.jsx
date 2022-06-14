import React from 'react'
import logo from '../../assets/logo.png'
import './Header.css'

export default props =>
  <div className='container flex h-fit justify-center items-center'>
    <img src={logo} alt='Logo Sogo Tecnologia' width='30' height='30'></img>
    <h1>SOGO Tecnologia</h1>
  </div>