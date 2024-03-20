
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import {addTask} from './TaskSlice'
import './newtask.css'
import { IoCloseCircleOutline } from "react-icons/io5";

function NewTask({onClose}){


  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')

  function handleNewTask(e){
    e.preventDefault()
    // Check if title is empty
    if (!title.trim()) {
      // If title is empty, don't save anything
      return;
    }
    dispatch(addTask({id: Date.now() , title, description, priority}))
    setTitle('')
    setDescription('')
    setPriority('')
    onClose()
  }
  
  return(
    <div className='new-task-container'>
    <div className="new-task">
      <button onClick = {onClose} className='close-btn'><IoCloseCircleOutline className='close-icon'/></button>
      <div className='title'>
      <p>title</p>
      <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder="write your title..."/>
      </div>
      <div className='discription'>
      <p>description</p>
      <textarea onChange = {(e)=>setDescription(e.target.value)} placeholder="write your description (optional)..."/>
      </div>
      <div className='priority'>
      <p>priority </p>
      <select onChange = {(e)=>setPriority(e.target.value)}>
       <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
      </div>
      <button onClick={(e)=>handleNewTask(e)} className="btn add-task-btn">Save</button>
    </div>
    </div>
  )
  
}
export default NewTask;