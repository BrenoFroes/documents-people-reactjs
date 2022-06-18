import React from 'react'
import './Menu.css'
import { useState, useEffect } from 'react'
import ModalCustom from '../ModalCustom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import FormContract from '../FormContract'
import GetPeople from '../GetPeople'


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function Menu(props) {
  const [validate, setValidate] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      cpf: '',
      address: ''
    }
  })

  async function registerUser (payload) {
    try {
      const res = await fetch('http://localhost:3333/people', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZmFrZSB0b2tlbiJ9.-tvEhfr6_VHfKU9bumcmdvku-IfwZDz2LtjeqZOuH-g', 
          'Content-Type': 'application/json'
        }
      })

      const responseEnv = await res.json()

      alert(responseEnv.error ? "Erro. Tente novamente mais tarde!" : responseEnv)
    } catch(err) {
      alert(err ? err : "Erro. Tente novamente mais tarde!")
    }
  }

  function defineValidate(e, param) {
    e.preventDefault()
    localStorage.setItem('validate', param)
    window.location.reload()
  }
  

  return (
    <div className="menu">
      <div className="filters">
        <h4>Filtros</h4>
        <button onClick={e => (defineValidate(e, 0))}>Vencem hoje</button>
        <button onClick={e => (defineValidate(e, 7))}>Vencem em 7 dias</button>
        <button onClick={e => (defineValidate(e, 15))}>Vencem em 15 dias</button>
        <button onClick={e => (defineValidate(e, 30))}>Vencem em 30 dias</button>
      </div>

      <ModalCustom title="Cadastrar usuário" button="Cadastrar usuário">
        <hr></hr>
        <form onSubmit={handleSubmit(data => { registerUser(data)})}>
          <label htmlFor="name">Nome:</label>
          <input id="name" type="text" placeholder="ex: Francisco Assis" className={ errors.name ? 'form-control input-red' : 'form-control' } {...register("name", { required: "Este campo é obrigatório." })}></input>
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="error">{message}</p>}
          />
          <label htmlFor="cpf">CPF:</label>
          <input
            id="cpf"
            type="text" 
            placeholder="ex: 12345678909" 
            className={ errors.cpf ? 'form-control input-red' : 'form-control' } 
            {...register("cpf", { required: "Este campo é obrigatório." })}>
          </input>
          <ErrorMessage
            errors={errors}
            name="cpf"
            render={({ message }) => <p className="error">{message}</p>}
          />
          <label htmlFor="address">Endereço completo:</label>
          <input type="text" placeholder="ex: Av. Paulista, 1120, São Paulo - SP" className={ errors.address ? 'form-control input-red' : 'form-control' } {...register("address", { required: "Este campo é obrigatório." })}></input>
          <ErrorMessage
            errors={errors}
            name="address"
            render={({ message }) => <p className="error">{message}</p>}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </ModalCustom>
      <ModalCustom title="Criar contrato" button="Criar contrato">
        <hr></hr>
        <FormContract></FormContract>
      </ModalCustom>
      <button className="modal">
        <a href="/dashboard"></a>
      </button>
    </div>
  )
}