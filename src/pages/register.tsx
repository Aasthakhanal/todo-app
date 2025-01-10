import { NavLink } from "react-router"
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../constants";
import { AuthContext } from "../context/authContext";



export default function Register() {
  const [registerData, setRegisterData] = useState({username: "", email: "", mobile: "", password: ""});
  const navigate = useNavigate();
   const {setToken} = useContext(AuthContext)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const register = async () => {
     try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          body: JSON.stringify({
            username: registerData.username,
            email: registerData.email,
            mobile: registerData.mobile,
            password: registerData.password,
         
          }),
          
        });
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setToken(data.token)
        navigate("/todo");
      }
     catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register-box">
    <div className="register-head">

    <h1>REGISTER</h1>
    <p>Create your account.</p>
    </div>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      register();
    }}
  >
    <div className="name">
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={registerData.username}
        onChange={handleChange}
        required
      />
    </div>
    <div className="email">
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={registerData.email}
        onChange={handleChange}
        required
      />
    </div>
    <div className="mobile">
      <label>Mobile:</label>
      <input
        type="tel"
        name="mobile"
        value={registerData.mobile}
        onChange={handleChange}
        required
      />
    </div>
    <div className="password">
      <br />
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={registerData.password}
        onChange={handleChange}
        required
      />
    </div>
    <div className="btn">
    <button type="submit">Register</button>
    </div>
    <h2 className="h-30 w-20 bg-sky-300">hello hello</h2>
  </form>
  <NavLink to="/login">Already have a account? LOGIN</NavLink>
</div>
    // <div>
    //   <h1>Register</h1>
    //   <NavLink to="/login">Already have a account? LOGIN</NavLink>
    // </div>
  );
}