import { useEffect, useState } from 'react'
import { TodoContextProvider } from './context';
import Todoform from './components/Todoform';
import Todoitem from './components/Todoitem';

function App() {

  const [todos, setTodos] = useState([]);


  function addTodo(todo) {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  function updateTodo(id, todo) {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  function completedTodo(id) {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: (prevTodo.completed ? false : true) } : prevTodo))
  }


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, removeTodo, completedTodo }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <Todoform />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div className='w-full'>
                <Todoitem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
