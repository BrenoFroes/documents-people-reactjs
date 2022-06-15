import React from 'react'
import './Content.css'
import Contract from '../Contract'
import { useState, useEffect } from 'react'


export default function Content() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:3333/contracts', { 
          method: 'GET',
          headers: new Headers({
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZmFrZSB0b2tlbiJ9.-tvEhfr6_VHfKU9bumcmdvku-IfwZDz2LtjeqZOuH-g', 
            'Content-Type': 'application/json'
          }), })
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
    }, [])
    
    function getContractsListItem() {
      return data.map(contract => {
        return <Contract key={contract.id} person_id={contract.id} date_register={contract.date_register} date_validate={contract.date_validate}></Contract>
      })
    }

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
  
    return (
      <div className='content-custom'>
        <ul>
          {getContractsListItem()}
        </ul>
      </div>
    )
}