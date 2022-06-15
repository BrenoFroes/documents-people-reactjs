import { useState, useEffect } from 'react'

export default (props) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:3333/people', { 
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

  if (isLoading) return <option>Loading...</option>
  if (!data) return <option>No profile data</option>

  return data.map(person => {
    return <option key={person.id} value={person.id}>{person.name}</option>
  })
}