import React from  'react'
import './Contract.css'
import { useState, useEffect } from 'react'
import contract from '../assets/contract.svg'

export default function Content(props) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if(props.person_id){
          fetch(`http://localhost:3333/people/${props.person_id}`, { 
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
        }
    }, [])
    
    function getPerson() {
      return <h2>{data.name}</h2> 
    }

    function getValidate() {
      let date1 = new Date(props.date_validate)
      let date2 = new Date()
      var timeDiff = Math.abs(date2.getTime() - date1.getTime())
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return diffDays
    }

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
  
    return (
      <div className="contract">
        <img className="imgContract" src={contract} alt="Contrato" width="50" height="50"></img>
        <div className="texts">
          {getPerson()}
          <p>{props.date_register}</p>
        </div>
        <h3>vence em {getValidate()} dias</h3>
      </div>
    )
}