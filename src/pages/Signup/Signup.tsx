import React from "react";
import { Box, Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signup.module.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import BasicSignupForm from "../../components/BasicSignupForm/BasicSignupForm";
import AdvSignupForm from "../../components/AdvSignupForm/AdvSignupForm";

export interface ISignupFormData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  type: string;
  role: string;
  companyName: string;
  revenuePerYear: string;
  gst_in: string;
  pan_number: string;
  aadhar_number: string;
  account_number: string;
  account_name: string;
  ifsc_code: string;
}
const signupFormData: ISignupFormData = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  type: "",
  role: "",
  companyName: "",
  revenuePerYear: "",
  gst_in: "",
  pan_number: "",
  aadhar_number: "",
  account_number: "",
  account_name: "",
  ifsc_code: "",
};

const Signup = () => {
  const [signupInput, setSignupInput] = React.useState(signupFormData);
  const [basicForm, setBasicForm] = React.useState<boolean>(true);

  const toggleForm = () => {
    setBasicForm(false);
  };

  return (
    <Box>
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
      <Box className={styles.signup}>
        <Box className={styles.signupForm}>
          <h1>Sign Up</h1>
          {basicForm ? (
            <BasicSignupForm
              signupInput={signupInput}
              setSignupInput={setSignupInput}
            />
          ) : (
            <AdvSignupForm
              signupInput={signupInput}
              setSignupInput={setSignupInput}
            />
          )}
          {basicForm ? (
            <Box>
              <Box className={styles.buttonBox}>
                <Button size="medium" variant="contained" onClick={toggleForm}>
                  Next
                </Button>
              </Box>
              <Box className={styles.partitionBox}>
                <Box className={styles.partitionLine}></Box>
                <span>OR</span>
                <Box className={styles.partitionLine}></Box>
              </Box>
              <Box className={styles.endBox}>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </Box>
            </Box>
          ) : (
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box className={styles.buttonBox}>
                <Button
                  size="medium"
                  variant="contained"
                  onClick={(e) => setBasicForm(true)}
                >
                  Back
                </Button>
              </Box>
              {/* <Box className={styles.buttonBox}>
                <Button
                  size="medium"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Box> */}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
