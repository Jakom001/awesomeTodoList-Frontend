import { AlignLeft } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useTodoContext } from '../context/TodoContext';

interface Task{
  newTask: string;
  setNewTask:(newTask: string) => void;
}

const MainLayout = () => {
  const {} = useTodoContext
  const {addTodoItem, clearAll} = useTodoContext()
  const [newTask, setNewTask] = useState<string>("")

  const handleAddTask = () =>{
    addTodoItem(newTask);
    setNewTask("")
  }
  return (
    <div className=''>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 border rounded-l m-4 p-1">
          <AlignLeft/>
          <input type="text" value={newTask}  onChange={(e) => setNewTask(e.target.value)} className='outline-none' placeholder='add a new task'/>
        </div>
        <button className='border p-1 rounded bg-blue-500' onClick={handleAddTask}>Add task</button>
      </div>
      <div className="flex justify-between items-center">
        <NavLink className="text-gray-400" to='/' >All</NavLink>
        <NavLink className="text-gray-400" to='pending' >Pending</NavLink>
        <NavLink className="text-gray-400" to='completed' >Completed</NavLink>
        <button onClick={clearAll} className='bg-blue-500 rounded py-1 px-2 text-white'>Clear All</button>
      </div>
      


      <Outlet/>
    </div>
    
  )
}

export default MainLayout