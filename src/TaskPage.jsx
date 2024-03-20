import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaRegPenToSquare } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeTask, toggleTask } from './TaskSlice';
import './taskpage.css';
import UpdateTask from './UpdateTask'; // Import the UpdateTask component

function TaskPage() {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id, 'from taskpage')
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const task = tasks.find(task => task.id === parseInt(params.id));

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setIsCompleted(task.completed); 
    }
  }, [task]);

  function handleTaskCompleted(taskId) {
    dispatch(toggleTask(taskId));
  }

  function handleTaskDelete(taskId) {
    dispatch(removeTask(taskId));
    navigate('/'); 
  }

  function handleNavigate() {
    navigate('/');
  }

  return (
    <div className='task-container'>
      {task ? (
        <div className='task-page'>
          {task.completed && <p className='completed-task'>completed</p>}
          <button className='back-btn' onClick={handleNavigate}>back</button>
          {editMode ? (
            <UpdateTask
              id = {task.id}
              title={title}
              description={description}
              priority={priority}
              setTitle={setTitle}
              setDescription={setDescription}
              setPriority={setPriority}
              setEditMode={setEditMode}
            />
          ) : (
            <div className='display-task'>
              <h3 className='task-heading'>{task.title.length > 60 ? `${task.title.slice(0, 60).toUpperCase()}` : task.title.toUpperCase()}</h3>
              <p className='task-description'>{task.description}</p>
              <p className='task-priority'>{task.priority}</p>
            </div>
          )}
          <div className='task-page-footer'>
            {!task.completed && (
              <div className='checkbox'>
                <label>Completed</label>
                <input onChange={() => handleTaskCompleted(task.id)} type='checkbox' checked={isCompleted} />
              </div>
            )}
            <button onClick={() => setEditMode(!editMode)} className='edit-btn'>
              <FaRegPenToSquare />
            </button>
            <button onClick={() => handleTaskDelete(task.id)} className='delete-btn'>
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      ) : (
        <div className='task-container'>
          <h3>There is nothing to show</h3>
          <button className='back-btn' onClick={handleNavigate}>back</button>
        </div>
      )}
    </div>
  );
}

export default TaskPage;
