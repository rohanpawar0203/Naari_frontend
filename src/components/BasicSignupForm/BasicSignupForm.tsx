import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { AiFillPhone } from "react-icons/ai";
import { CgRowLast } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from "./BasicSignupForm.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ISignupFormData } from "../../pages/Signup/Signup";

export interface SignupFormProps {
  signupInput: ISignupFormData;
  setSignupInput: React.Dispatch<React.SetStateAction<ISignupFormData>>;
}

const BasicSignupForm: React.FC<SignupFormProps> = ({
  signupInput,
  setSignupInput,
}) => {
  const navigate = useNavigate();

  const signupInputRef = React.useRef(signupInput);

  useEffect(() => {
    if (signupInputRef.current !== signupInput) {
      localStorage.setItem("signupInput", JSON.stringify(signupInput));
      signupInputRef.current = signupInput;
    }
  }, [signupInput]);

  useEffect(() => {
    const signupDraftString = localStorage.getItem("signupInput");
    if (signupDraftString) {
      const signupDraft: ISignupFormData = JSON.parse(signupDraftString);
      setSignupInput(signupDraft);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/auth/register",
        {
          method: "POST",
          body: JSON.stringify(signupInput),
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
    <Box>
      <Box className={styles.inputBox}>
        <Box className={styles.signupIcons}>
          <FaUser fontSize="20px" />
        </Box>
        <TextField
          size="small"
          label="Enter First Name"
          variant="filled"
          name="firstName"
          value={signupInput.firstName}
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
          value={signupInput.lastName}
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
          value={signupInput.email}
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
          value={signupInput.contact}
          onInput={handleChange}
        />
      </Box>
      <FormGroup>
        <FormControlLabel
          sx={{
            color: "white",
            fontSize: "9px",
            letterSpacing: "0.5px",
          }}
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
    </Box>
  );
};

export default BasicSignupForm;
