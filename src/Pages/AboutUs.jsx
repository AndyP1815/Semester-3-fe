import React, { useEffect, useState } from "react"

const AboutUs = () => {
  const [users, setUsers] = useState([])

  const fetchUserData = () => {
    fetch("http://localhost:8080/catogories")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data.catogories)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div>
      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default  AboutUs;