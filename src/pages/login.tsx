import { NavLink } from "react-router";
import { useContext,useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";

 


export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  
  const navigate = useNavigate();
  const {setToken} = useContext(AuthContext)
 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const {theme, toggleTheme} = useContext(ThemeContext)
  console.log({theme})
  console.log({toggleTheme})



  const login = async () => {
    console.log(formData);
   try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
     
      }),
    });
    const data = await response.json();
    localStorage.setItem("token", data.token);
    setToken(data.token)
    navigate("/todo");
  } catch (error) {
    console.log(error);
  } 
};
    
  return (
    <div className="login-box">
        <div className="login-head">

        <h1 className={theme === "light" ? "light-header" : "dark-header"} >LOGIN</h1>
        <p>Log in to continue your journey</p>
        </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <div className="name">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btn">
        <button type="submit">Login</button>
        <h1 className="bg-sky-300">hellobchjv</h1>
        </div>
      </form>
      <NavLink to="/register">Go to Register</NavLink>
    </div>
  );
}
