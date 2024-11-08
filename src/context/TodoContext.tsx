import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
interface TodoItem{
  id: string;
  title: string;
  completed: boolean;
}

interface TodoItems{
  items: TodoItem[]
  clearAll: () => void;
  addTodoItem: (title: string) => void;
  deleteTodoItem: (id: string) => void;
  toggleCompleted: (id: string) => void;
  editTodoItem: (id: string, newTitle: string) => void;

}

const TodoContext = createContext<TodoItems | undefined>(undefined)

const localData = localStorage.getItem('todoItems');
const intialItems = localData ? JSON.parse(localData) : []

const TodoContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [items, setItems] = useState<TodoItem[]>(intialItems)

  const addTodoItem = (title: string) =>{
    if (title.trim()){
      setItems((prevItem) => ([...prevItem, {title, id:uuidv4(), completed:false }]))
    
    }
    
  }
  
  const deleteTodoItem = (id:string) =>{
    setItems((prevItems) => prevItems.filter((item) => item.id !== id ))
  };

  const toggleCompleted = (id:string) =>{
    setItems(prevItems => (
      prevItems.map((item) => item.id === id ? {...item, completed: !item.completed}: item)
    ))
  }
  const editTodoItem = (id:string, newTitle:string) =>{
    setItems((prevItems) => 
      prevItems.map((item) => (item.id === id ? {...item, title: newTitle} : item)) )
  }
  const clearAll =() =>{
    setItems([])
  }
 
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items))
  }, [items]);

  return (
    <div>
      <TodoContext.Provider value={{items, addTodoItem, deleteTodoItem, toggleCompleted, editTodoItem, clearAll}}>
        {children}
      </TodoContext.Provider>
    </div>
  )
}

export const useTodoContext = () =>{
  const context = useContext(TodoContext)
  if (!context){
    throw new Error("useTodo must be used within a TodoContextProvider")
    
  }
  return context;
};

export default TodoContextProvider