
import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
//import Todo from './Todo';
import {v4 as uuidv4} from 'uuid' // library for creating random id.

const LOCOL_STORAGE_KEY = 'todoApp.todos'

function App() {
 const [todos, setTodos] = useState([]); //setTodos is function that allows update of todos
const todoNameRef = useRef() // to access the input field

// useEffect to load the stored tasks when page reloads.
useEffect(() => {
const storedTodos =JSON.parse(localStorage.getItem(LOCOL_STORAGE_KEY))
if (storedTodos) setTodos(storedTodos)
}, [])

// useEffect to store the typed tasks even when the page is reloaded
useEffect(() =>{
localStorage.setItem(LOCOL_STORAGE_KEY, JSON.stringify(todos))
}, [todos])


// function to handle 
function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo=> todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)

}
 function handleAddTask(e){
  const name = todoNameRef.current.value // to access the current value of the user types in the input field
  if (name === '') return
  setTodos(prevTodos => {
    return[...prevTodos, {id: uuidv4(), name:name, complete: false}]
  })
  todoNameRef.current.value = null // to clear the input field when the button is clicked.

 }

 function handleClearTodos(){
  const newTodos = todos.filter(todo => !todo.commplete)
  setTodos(newTodos)
 }
  return (
    <> {/**Fragment */}
     <TodoList todos={todos} toggleTodo = {toggleTodo} />
     <input ref={todoNameRef} type="text"/>
     <button onClick ={handleAddTask}>Add Task</button>
     <button onClick ={handleClearTodos}>Clear Complete</button>
     <div> {todos.filter(todo=> !todo.complete).length} left to do</div>
    </>
 
  );
}

export default App;
