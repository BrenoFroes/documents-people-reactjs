import React from 'react'
import '../components/layout/Content.css'
import { useState, useEffect } from 'react'


export default function Dashboard() {
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
  
    function getDue () {
      let due = 0
      for (let i = 0; i<data.length; i++) {
        let date1 = new Date(data[i].date_validate)
        let date2 = new Date()
        var diffDays = -1
        if(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
          diffDays = 0
        } else if (date1.getFullYear() >= date2.getFullYear()) {
          let timeDiff = Math.abs(date2.getTime() - date1.getTime())
          diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
        }
        if(diffDays >= 0) {
          due += 1
        }
      }
      return due
    }

    function getAverage () {
      let average = 0
      for (let i = 0; i<data.length; i++) {
        let date1 = new Date(data[i].date_validate)
        let date2 = new Date(data[i].date_register)
        var diffDays = -1
        if(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
          diffDays = 0
        } else if (date1.getFullYear() >= date2.getFullYear()) {
          let timeDiff = Math.abs(date2.getTime() - date1.getTime())
          diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
        }
        average += diffDays
      }
      return average / data.length
    }
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
  
    return (
      <div className="content-custom dashboard">
        <div className="flex">
          <div className="total">
            <h2 className="dash">Há {data.length} contratos registrados.</h2>
            <h2 className="dash">Há {getDue(false)} contratos para vencer.</h2>
            <h2 className="dash">A média de vencimento é {getAverage()}.</h2>
          </div>
        </div>
      </div>
    )
}