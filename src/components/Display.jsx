import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const Display = () => {
    const[authorList, setAuthorList] = useState([])

    const [deleteToggle, setDeleteToggle] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
        .then((res) => {
            console.log(res.data)
            setAuthorList(res.data)
        })
        .catch((err) => {console.log(err)})
    }, [deleteToggle])


    const handleDelete = (e, id) => {
        console.log(`Deleting hero ${id}`, e)
        axios.delete(`http://localhost:8000/api/author/delete/${id}`)
        .then((res) => {
            setDeleteToggle(!deleteToggle)
        })
        .catch((err) => {console.log(err)})
    }



  return (
    <div>
        <button><Link to={'/create'}>Add an Author</Link></button>
        <p>We have quotes by:</p>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions Available</th>
                </tr>
            </thead>
            <tbody>
                {
                authorList.map((author, idx) => {
                    return(
                        <tr key={idx}>
                            <td>{author.name}</td>
                            <td><button><Link to={`/edit/${author._id}`}>Edit</Link></button> | <button onClick={(e) => {handleDelete(e, author._id)}}>Delete</button></td>
                        </tr>
                    )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default Display