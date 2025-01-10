import {useContext, useState, useEffect } from "react";
import Card from "../components/card";
import Header from "../components/header";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";


interface TodoItem {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  user_id?: number;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const navigate = useNavigate()
  const {theme} = useContext(ThemeContext)
  console.log({theme})
  const { token } = useContext(AuthContext);

  const handleSorting = () => {
    const sortedTodos = [...todos];
    sortedTodos.sort((a, b) => {
      console.log(a.isCompleted, b.isCompleted);
      return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
    });
    setTodos(sortedTodos);
    console.log(todos);
  };

  // fetch todos from the server
  const handleFetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: TodoItem[] = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch todos on page load
  useEffect(() => {
    handleFetchTodos();
    handleSorting();
  }, []);

  const completedTodos = todos?.filter((todo) => todo.isCompleted) || [];


  return (
    <div className="app">
      <Header />
      <button className="addtask-button" onClick={() => navigate("add")}>Add New Todo </button>
      <div className="container">

        <div>
          <h1 className="todo-list">Todo List</h1>
          {todos
            ?.filter((todo) => !todo.isCompleted)
            .sort((a,b) => a.id - b.id)
            .map((todo) => (
              <Card
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                isCompleted={todo.isCompleted}
              />
            ))}
        </div>
        {completedTodos.length > 0 && (

        <div>
          <h1 className="Completed-todo-list">Completed Todo List</h1>
          {completedTodos.map((todo) => ( 
              <Card
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                isCompleted={todo.isCompleted}
              />
            ))}
        </div>
        )}
      </div>
    </div>
  );
}