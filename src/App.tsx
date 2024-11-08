import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Pending from "./components/Pending"
import Completed from "./components/Completed"
import TodoContextProvider from "./context/TodoContext"
import AllTodos from "./components/AllTodos"


function App() {

  return (
    <BrowserRouter>
    
      <div className="flex justify-center items-center bg-white rounded mx-5 w-full">
      <TodoContextProvider>
        <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<AllTodos/>}/>
          <Route path="pending" element={<Pending/>}/>
          <Route path="completed" element={<Completed/>}/>
        </Route>
        </Routes>
      </TodoContextProvider>
      
      </div>
      
   
    
    </BrowserRouter>
   
  )
}

export default App
