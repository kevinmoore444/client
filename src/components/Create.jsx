import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'


const Create = () => {
    const [name, setName] = useState("")

    const [errors, setErrors] = useState([]); 

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:8000/api/author/new`, {name})
        .then(res => {
            navigate('/')
        })
        .catch(err =>{
            console.log("This is our create page catch error:", err)
            const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            const errorArr = []; // Define a temp error array to push the messages in
            for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
        })            
    }



  return (
    <div>
        <button><Link to={'/'}>Home</Link></button>
        <p>Add a new author:</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}}></input>
            </div>
            <button><Link to={'/'}>Cancel</Link></button>
            <button type="submit">Submit</button>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
        </form>


    </div>
  )
}

export default Create