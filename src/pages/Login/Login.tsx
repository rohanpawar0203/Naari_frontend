import React from "react";
import {
  Box,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { MdVpnKey } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import styles from "./Login.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Actions/LoginAction";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
}

export interface IUserData {
  token: string;
  user: IUser;
}

interface FormData {
  email: string;
  password: string;
}

const formData: FormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [input, setInput] = React.useState(formData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const loginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/auth/login",
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data: IUserData = await res.json();
      console.log("data:", data);
      if (res.ok) {
        toast.success("Login successful");
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("userId", data.user._id);
        loginAction(true, dispatch);
        navigate("/");
      } else {
        loginAction(false, dispatch);
        toast.error("Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <Box className={styles.login}>
      <ToastContainer
        position="top-center"
        autoClose={500}
        limit={2}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <Box className={styles.loginForm}>
        <h1>Sign In</h1>
        <Box className={styles.inputBox}>
          <Box className={styles.loginIcons}>
            <MdEmail fontSize="20px" />
          </Box>
          <TextField
            size="small"
            id="outlined-basic"
            label="Enter Email"
            variant="filled"
            name="email"
            onChange={handleChange}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Box className={styles.loginIcons}>
            <MdVpnKey fontSize="20px" />
          </Box>
          <TextField
            size="small"
            id="outlined-basic"
            label="Enter Password"
            variant="filled"
            name="password"
            onChange={handleChange}
          />
        </Box>
        <FormGroup>
          <FormControlLabel
            sx={{ color: "white", fontWeight: "600" }}
            control={
              <Checkbox
                sx={{
                  color: "rgb(60, 60, 60)",
                  "&.Mui-checked": { color: "rgb(60, 60, 60)" },
                }}
              />
            }
            label="Remember Me"
          />
        </FormGroup>
        <Box className={styles.buttonBox}>
          <Button size="medium" variant="contained" onClick={loginUser}>
            Login
          </Button>
        </Box>
        <Box className={styles.partitionBox}>
          <Box className={styles.partitionLine}></Box>
          <span>OR</span>
          <Box className={styles.partitionLine}></Box>
        </Box>
        <Box className={styles.googleAuth}>
          <Box className={styles.googleIconBox}>
            <img
              className={styles.googleIcon}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </Box>
          <p className={styles.googleText}>Sign in with google</p>
        </Box>
        <Box className={styles.endBox}>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
          <p>
            <Link to="/signup">Forgot your password ?</Link>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
