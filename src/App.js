import React, {useState, useEffect}from 'react';
import './App.css';
//importing components
import Form from "./components/Form"
import TodoList from "./components/TodoList"

function App() {
  
  //state 
  const [ inputText, setImputText] = useState ("");
  const [todos, setTodos] = useState([]);
  const [ status, setStatus] = useState ("all");
  const [filteredTodos, setFilteredTodos] = useState ([]);

  //run once when app starts
  useEffect (() => {
   getLocalTodos();
 }, []);

  //USE EFFECT
  useEffect (() => {
    filterHandler();
    saveLocalTodos();
  }, [todos,status]);

  //function
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos (todos.filter ((todo) => todo.completed === true))
        break;
      case "uncompleted":
        setFilteredTodos (todos.filter ((todo) => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  //save to local-addign things to local storage
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };
// checking it if we dont set empty array if we do get it and push it up to the state
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  


  return (
    <div className="App">
      <header>
        <h1>Val's Todo List  </h1>
      </header>
      <Form 
      inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setImputText={setImputText}
      setStatus={setStatus}
      />
      <TodoList 
      setTodos={setTodos}
      todos={todos}
      filteredTodos={filteredTodos}
      />

      Created by Valentina

    </div>
  );
}

export default App;
