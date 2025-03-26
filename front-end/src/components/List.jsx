import React, { useState } from 'react'
import api from '../api/axiosInstance'

function List({todo:Todo,id,fnc}) {
    const [togle, setTogle] = useState(false)
    const [todo,setTodo]=useState("")

    function handleChange(e){
        setTodo(e.target.value)
    }

    async function handleEdit(){
        setTogle(togle => !togle)
    }

    async function handleSubmit(){
        const res =await api.put("todo/update",{todo,id})
        console.log(res.data)
        fnc()
    }
    
    async function handleDelete(id){
        const obj={
            todoId:id
        }
        console.log(obj)
        const res=await api.delete(`todo/delete/${id}`)
        console.log(res)
        fnc()
    }
  return (
    <li className='flex'>
        <div>{Todo}</div>
        { togle &&<>
            <input type="text" onChange={handleChange} value={todo} className='bg-white rounded w-[140px]' />
            <button onClick={handleSubmit} className='bg-green-500 rounded ml-2 '>submit</button>
        </> }
        <button onClick={()=>handleEdit(id)} className='bg-amber-200 text-white px-3 rounded ml-2'>edit</button>
        <button onClick={()=>handleDelete(id)} className='bg-red-400 text-white px-3 rounded ml-2'>delete</button>
    </li>
  )
}

export default List