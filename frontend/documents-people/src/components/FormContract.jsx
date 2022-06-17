import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import GetPeople from './GetPeople'


export default function (props) {

  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
      person_id: '',
      date_register: '',
      date_validate: '',
    }
  })


  async function registerContract (payload) {
    console.log(payload)
    payload.person_id = parseInt(payload.person_id)
    payload.date_register = new Date()
    let year = payload.date_validate.substring(0, 4)
    let month = payload.date_validate.substring(5, 7)
    let day = payload.date_validate.substring(8, 10)
    payload.date_validate = new Date(`${year}-${month}-${day}`)
    
    console.log(payload)
    try {
      const res = await fetch('http://localhost:3333/contracts', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZmFrZSB0b2tlbiJ9.-tvEhfr6_VHfKU9bumcmdvku-IfwZDz2LtjeqZOuH-g', 
          'Content-Type': 'application/json'
        }
      })

      const responseEnv = await res.json()
      alert(responseEnv.error ? "Erro. Tente novamente mais tarde!" : "Contrato criado com sucesso!")
    } catch(err) {
      alert(err ? err : "Erro. Tente novamente mais tarde!")
    }
  }

  return (
    <form onSubmit={handleSubmit(data => { registerContract(data)})}>
      <label htmlFor="person_id">Pessoa:</label>
      <select id="person_id" className={ errors.person_id ? 'form-control input-red' : 'form-control' } {...register("person_id", { required: "Este campo é obrigatório." })}>
        <GetPeople></GetPeople>
      </select>
      <ErrorMessage
        errors={errors}
        name="person_id"
        render={({ message }) => <p className="error">{message}</p>}
      />
      <label htmlFor="date_validate">Data de validade:</label>
      <input
        id="date_validate"
        type="date" 
        placeholder="ex: 29/11/2022" 
        className={ errors.date_validate ? 'form-control input-red' : 'form-control' } 
        {...register("date_validate", { required: "Este campo é obrigatório." })}>
      </input>
      <ErrorMessage
        errors={errors}
        name="date_validate"
        render={({ message }) => <p className="error">{message}</p>}
      />
      <button type="submit">Cadastrar</button>
    </form>
  )
}