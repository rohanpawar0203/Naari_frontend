import React from "react";
import {
  Box,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { CgRowLast } from "react-icons/cg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signup.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
}
const formData: IFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  contact: "",
};

const Signup = () => {
  const [input, setInput] = React.useState(formData);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/auth/register",
        {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        toast.success("Signup successful");
        navigate("/login");
      } else {
        const data = await res.json();
        toast.error("Signup failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <Box className={styles.signup}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
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
      <Box className={styles.signupForm}>
        <h1>Sign Up</h1>
        {/* <Box> */}
        <Box className={styles.inputBox}>
          <Box className={styles.signupIcons}>
            <FaUser fontSize="20px" />
          </Box>
          <TextField
            size="small"
            label="Enter First Name"
            variant="filled"
            name="firstName"
            onInput={handleChange}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Box className={styles.signupIcons}>
            <CgRowLast fontSize="20px" />
          </Box>
          <TextField
            size="small"
            label="Enter Last Name"
            variant="filled"
            name="lastName"
            onInput={handleChange}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Box className={styles.signupIcons}>
            <MdEmail fontSize="20px" />
          </Box>
          <TextField
            size="small"
            label="Enter Email"
            variant="filled"
            name="email"
            onInput={handleChange}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Box className={styles.signupIcons}>
            <AiFillPhone fontSize="20px" />
          </Box>
          <TextField
            size="small"
            label="Enter Contact Number"
            variant="filled"
            name="contact"
            onInput={handleChange}
          />
        </Box>
        <Box className={styles.inputBox}>
          <Box className={styles.signupIcons}>
            <MdVpnKey fontSize="20px" />
          </Box>
          <TextField
            size="small"
            label="Enter Password"
            variant="filled"
            name="password"
            onInput={handleChange}
          />
        </Box>
        <FormGroup>
          <FormControlLabel
            sx={{ color: "white", fontSize: "9px", letterSpacing: "0.5px" }}
            control={
              <Checkbox
                sx={{
                  color: "rgb(60, 60, 60)",
                  "&.Mui-checked": { color: "rgb(60, 60, 60)" },
                }}
              />
            }
            label="I accept the Terms & Conditions"
          />
        </FormGroup>
        <Box className={styles.buttonBox}>
          <Button size="medium" variant="contained" onClick={registerUser}>
            Register
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
              alt="google"
              width={60}
            />
          </Box>
          <p className={styles.googleText}>Sign in with google</p>
        </Box>
        <Box className={styles.endBox}>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
