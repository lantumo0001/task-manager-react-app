import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // Removed duplicate import
import { updateTask, removeTask, sortTask, toggleTask, searchTask } from './TaskSlice';
import noTaskImage from '../no-task.jpg';
import { IoMdAddCircleOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import './App.css';
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewTask from './NewTask';
import UpdateTask from './UpdateTask';

export default function App() {
  const params = useParams();
  const [showPopUp, setShowPopUp] = useState(false);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [searchTaskText, setSearchTaskText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const task = tasks.find(task => task.id === parseInt(params.id));

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setIsCompleted(task.completed); 
    }
  }, [task]);

  function togglePopUp() {
    setShowPopUp(!showPopUp);
  }

  function handleTaskDelete(id) {
    dispatch(removeTask(id));
  }

  function handleTaskCompleted(id) {
    dispatch(toggleTask(id));
  }

  function handleTaskSort(event) {
    dispatch(sortTask(event.target.value));
  }

  function handleSearchTask() {
    dispatch(searchTask(searchTaskText));
    setSearchTaskText('');
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
      return text.slice(0, lastSpaceIndex) + '...';
    }
  }

  return (
    <main className='app'>
      <div className='task-manager'>
        <div className='add-btn'>
          <div className='search-bar'>
            <input value={searchTaskText} onChange={(e) => setSearchTaskText(e.target.value)} type='text' className='sear-input' />
            <button onClick={handleSearchTask} className='search-btn'><CiSearch className='search-icon' /></button>
          </div>
          <button onClick={togglePopUp} className='add-task-btn'><strong className='add-txt'>Add</strong><IoMdAddCircleOutline className='add-icon' /></button>
          {showPopUp && <div className="overlay" onClick={togglePopUp}></div>}
          {/* Prevent click propagation to the background page */}
          {showPopUp && <div onClick={(e) => e.stopPropagation()}><NewTask onClose={togglePopUp} /></div>}
        </div>
        <div className='task-heading'>
          <h3>Task</h3>
          <div className='sort'>
            <p>sorted by </p>
            <select onChange={handleTaskSort}>
              <option value='date'>date</option>
              <option value='priority'>priority</option>
              <option value='name'>name</option>
            </select>
          </div>
        </div>
        <div className='task-body'>
          {tasks.length > 0 ? tasks.map((task) => (
            <div className='task' key={task.id}>
              {task.completed && <div className='completed'>completed</div>}
              
                <Link to={`/task/${task.id}`}>
                  <h3 className='title'>{truncateText(task.title, 75)}</h3>
                  <p className='description'>
                    {truncateText(task.description, 120)}
                    {task.description.length > 120 && <button className='see-more'>see more...</button>}
                  </p>
                </Link>
              

              <div className='task-footer'>
                {!task.completed && <div className='checkbox'>
                  <label>completed</label>
                  <input onChange={() => handleTaskCompleted(task.id)} type='checkbox' checked={task.completed} />
                </div>}
               <Link to={`/task/${task.id}`}>
                <button onClick={() =>{ setEditMode(!editMode)}} className='edit-btn'><FaRegPenToSquare /></button>
               </Link>
                <button onClick={() => handleTaskDelete(task.id)} className='delete-btn'><RiDeleteBin6Line /></button>
              </div>
            </div>
          )) : (
            <div className="background-image">
              <div className="foreground-content">
                <div>
                  <h2>No tasks added yet!</h2>
                  <p>Here's a cool quote to inspire you:</p>
                  <blockquote>
                    "The secret of getting ahead is getting started." - Mark Twain
                  </blockquote>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer>
        <p>Copyright &copy; All rights reserved. Developed by LN2.</p>
      </footer>
    </main>
  );
}
