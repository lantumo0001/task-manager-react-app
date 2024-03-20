import { useDispatch } from 'react-redux';
import { updateTask } from './TaskSlice';
function UpdateTask({ id, title, description, priority, setTitle, setDescription, setPriority, setEditMode }) {
  const dispatch = useDispatch();

  function handleTaskUpdate() {
    // Dispatch the updateTask action
    dispatch(updateTask({ id, title, description, priority }));
    // Set edit mode to false to exit edit mode
    setEditMode(false);
  }

  return (
    <div className='edit-task-container'>
      <div className='edit-task'>
        <h2>Edit Task</h2>
        <div className='edit-task-title'>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='edit-task-description'>
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className='edit-task-priority'>
          <label>Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div className='save-btn'>
          <button onClick={()=>handleTaskUpdate(id)}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
