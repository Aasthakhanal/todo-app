import { useContext, useState } from "react";
import TodoInput from "../components/todoInput";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/authContext";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const {token } = useContext(AuthContext);


  // create a new todo item
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateTodo = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      setTitle("");
      setDescription("");
      navigate("/todo");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      setError(error?.message || "Unknown error");
    }
  };
  return (
    <div className="addtodo-container">
      <h1 style={{color: " rgb(9, 77, 171)"}}>ADD TODO</h1>
      <form action="post" onSubmit={handleCreateTodo}>
        <div className="input-container">
          <TodoInput
            value={title}
            name="Title"
            placeholder="Enter Title"
            onChange={setTitle}
          />
          <TodoInput
            required={false}
            value={description}
            name="Description"
            placeholder="Enter Description"
            onChange={setDescription}
          />
        </div>
        {error && <p className="error">Title already exists</p>}
        <button className="button" type="submit">Add</button>
      </form>
    </div>
  );
}