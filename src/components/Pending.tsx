import { useState } from 'react'
import { useTodoContext } from '../context/TodoContext'
import { Pen, Trash } from 'lucide-react'
const Pending = () => {
  
  const {items, toggleCompleted, deleteTodoItem, editTodoItem} = useTodoContext()

  const pendingItems = items.filter(item => !item.completed)

  const [activeItemId, setActiveItemId] = useState<string | null>(null)
  const [editModeId, setEditModeId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>("");

  const startEditing = (item: {id: string; title: string}) =>{
    setEditModeId(item.id);
    setEditTitle(item.title);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setEditTitle(e.target.value)
  };

  const handleEditSubmit = (id: string) =>{
    editTodoItem(id, editTitle)
    setEditModeId(null)
  }

  return (
    <div>
      {!pendingItems.length ?(
        <p className="text-gray-500 text-center m-6">No todos available. Start by adding a new task!</p>
      ):(
      <ul>
        {pendingItems.map((item) => (
          <div className="flex justify-between items-center border-b">
            <li 
          className='my-4 p-2 ' 
          key={item.id}
          >
            <span className={`flex items-center gap-2 ${item.completed ? 'line-through' : ''}`}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(item.id)}  
              />
              {editModeId === item.id ? (
                <input type="text" value={editTitle} onChange={handleEditChange} onBlur={() => handleEditSubmit(item.id)} 
                className='outline-none border-b'/>
              ):(
                <span onClick={() => toggleCompleted(item.id)}>{item.title}</span>  
              )}
              
            </span>
                    
            </li>
            <div className="relative ">
              <button onClick={() =>  setActiveItemId(activeItemId === item.id ? null : item.id)} className='text-xl font-bold'>...</button>
              {activeItemId === item.id &&(
                <div className={` absolute -left-4 flex flex-col  gap-2  p-2 rounded border bg-white shadow-lg z-10  mt-2`}>
                <button onClick={() => startEditing(item)} className='flex items-center gap-1'><Pen size={16}/>Edit</button>
                <button onClick={() => deleteTodoItem(item.id)} className='flex items-center gap-1'><Trash size={16}/>Delete</button>
              </div>
              )}
              
            
            </div>
            
          </div>
          
           
        ))}
      </ul>
      )}
    </div>
  )
}
export default Pending