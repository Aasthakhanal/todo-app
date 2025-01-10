import { Navigate, Outlet, Route, Routes } from "react-router";
import Todo from "./pages/todo";
import Login from "./pages/login";
import Register from "./pages/register";
import AddTodo from "./pages/addTodo";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

const ProtectedRoutes = () => {
  const { token } = useContext(AuthContext);
  console.log({token})
  return token ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes> 
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Todo />} />

        <Route path="/todo" element={<Todo />} />
        <Route path="todo/add" element={<AddTodo />} />
      </Route>
    </Routes>
  );
}

export default App;