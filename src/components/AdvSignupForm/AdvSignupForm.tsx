import { Box, Button, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./AdvSignupForm.module.scss";
import { IUser } from "../../pages/Login/Login";
import { toast } from "react-toastify";
import { SignupFormProps } from "../BasicSignupForm/BasicSignupForm";
import { ISignupFormData } from "../../pages/Signup/Signup";
import { useNavigate } from "react-router-dom";

export interface IProfileData {}

const AdvSignupForm: React.FC<SignupFormProps> = ({
  signupInput,
  setSignupInput,
}) => {
  const signupInputRef = React.useRef(signupInput);

  const navigate = useNavigate();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setSignupInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSignupFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/profile",
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
      <Box>
        <form onSubmit={handleSignupFormSubmit}>
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="companyName">
                Company Name<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="companyName"
                label="Enter Company Name"
                variant="filled"
                name="companyName"
                value={signupInput.companyName}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="revenuePerYear">
                Per Year Revenue<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="revenuePerYear"
                label="Enter Per Year Revenue"
                variant="filled"
                name="revenuePerYear"
                value={signupInput.revenuePerYear}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
          {/* <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="type">
                Type<span style={{ color: "red" }}>*</span>
              </label>
              <FormControl fullWidth>
                <InputLabel id="gender">Choose Type</InputLabel>
                <Select
                  id="type"
                  value={signupInput.type}
                  label="Choose Type"
                  onChange={handleSelectChange}
                  name="type"
                  required
                >
                  <MenuItem value="male">Normal</MenuItem>
                  <MenuItem value="female">abc</MenuItem>
                  <MenuItem value="other">xyz</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="role">
                Role<span style={{ color: "red" }}>*</span>
              </label>
              <FormControl fullWidth>
                <InputLabel id="role">Choose Role</InputLabel>
                <Select
                  value={signupInput.role}
                  label="Choose Role"
                  id="role"
                  onChange={handleSelectChange}
                  name="role"
                  type="string"
                  required
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="entrepreneur">Entrepreneur</MenuItem>
                  <MenuItem value="investor">Investor</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box> */}
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="gst_in">
                GST Number<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="gst_in"
                label="Enter GST Number"
                variant="filled"
                name="gst_in"
                value={signupInput.gst_in}
                onChange={handleInputChange}
                type="string"
                required
              />
            </Box>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="pan_number">
                Pan Number<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="pan_number"
                label="Enter Pan Number"
                variant="filled"
                name="pan_number"
                value={signupInput.pan_number}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="aadhar_number">
                Aadhar Number<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="aadhar_number"
                label="Enter Aadhar Number"
                variant="filled"
                name="aadhar_number"
                value={signupInput.aadhar_number}
                onChange={handleInputChange}
                type="number"
                required
              />
            </Box>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="account_number">
                Account Number<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="account_number"
                label="Enter Account Number"
                variant="filled"
                name="account_number"
                value={signupInput.account_number}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="account_name">
                Account Name<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="account_name"
                label="Enter Account Name"
                variant="filled"
                name="account_name"
                value={signupInput.account_name}
                onChange={handleInputChange}
                required
              />
            </Box>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="ifsc_code">
                IFSC Code<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="ifsc_code"
                label="Enter IFSC Code"
                variant="filled"
                name="ifsc_code"
                value={signupInput.ifsc_code}
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
          <Box className={styles.buttonBox}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AdvSignupForm;
