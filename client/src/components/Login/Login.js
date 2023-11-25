import { useContext, useState } from "react";
import { SERVER_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "./Login.css";
import FamilyPhoto from "../../assets/images/home.png";
import { useUser } from "../../context/UserContext";

const LoginForm = ({ login, signup }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (login) {
      login(user);
    } else if (signup) {
      signup(user);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="login-form">
        {signup && (
          <>
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={user.name}
              onChange={handleInput}
              required
            />
          </>
        )}
        <label>Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          name="email"
          value={user.email}
          onChange={handleInput}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="minimum 8 characters"
          name="password"
          value={user.password}
          onChange={handleInput}
          required
        />
        <button className="login-btn" type="submit">
          {login ? "Login" : "Signup"}
        </button>
      </form>
    </>
  );
};

const Login = () => {
  const { setUser } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(`${SERVER_URL}/login`, {
        userData: {
          email: email,
          password: password,
        },
      });

      const data = res.data;
      console.log(data);
      setUser(data);

      // localStorage.setItem("rim-authToken", data?.authToken);
      localStorage.setItem("rim-userdata", JSON.stringify(data));

      await swal("Welcome Back!", "Project is ready to use", "success");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/signup`, {
        userData: {
          name: name,
          email: email,
          password: password,
        },
      });
      const data = response.data;
      console.log(data);
      setUser({
        username: data?.username,
        email: data?.email,
        authToken: data?.authToken,
      });
      await swal("Welcome!", data?.successMessage, "success");
      navigate("/");
    } catch (error) {
      console.log(error);
      await swal("Oops!", "error?.response?.data?.errorMessage", "error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-main-container">
        <div className="login-form-section">
          {isLogin ? (
            <>
              <h2>Login</h2>
              <LoginForm login={login} />
            </>
          ) : (
            <>
              <h2>Signup</h2>
              <LoginForm signup={signup} />
            </>
          )}
          <div
            className="login-form-change-btn"
            onClick={() => {
              setIsLogin((prev) => !prev);
            }}
          >
            {isLogin ? "Create an Account" : "Already have Account"}
          </div>
        </div>
        <div className="login-img-section">
          <img src={FamilyPhoto} alt="Family Photo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
