import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const Edit = () => {
    const [name, setName] = useState("")

    const [errors, setErrors] = useState([]);


    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:8000/api/author/" + id)
        .then((res) => {
            console.log("This is my update get request: " + res.data)
            const author = res.data
            setName(author.name)

        })
        .catch(err => console.log("This my update request error: ", err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/author/${id}`, {name})
        .then((res) => {
            navigate("/")
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
        <p>Edit author:</p>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}} value={name}></input>
            </div>
            <button><Link to={'/'}>Cancel</Link></button>
            <button type="submit">Submit</button>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
        </form>
    </div>
  )
}

export default Edit