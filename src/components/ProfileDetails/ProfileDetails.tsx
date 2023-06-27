import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEventHandler } from "react";
import styles from "./ProfileDetails.module.scss";
import { IUser } from "../../pages/Login/Login";
import { toast } from "react-toastify";

export interface IProfileData {
  userId: string;
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

const profileData: IProfileData = {
  userId: "",
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

const ProfileDetails = () => {
  const [profileInput, setProfileInput] = React.useState(profileData);
  console.log("profileInput:", profileInput);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setProfileInput((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/profile",
        {
          method: "POST",
          body: JSON.stringify(profileInput),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        toast.success("Profile Updated");
      } else {
        const data = await res.json();
        toast.error("Profile Updation failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <Box>
      <Box>
        <form onSubmit={handleProfileSubmit}>
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="companyName">
                Company Name<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="companyName"
                label="Enter Company Name"
                variant="outlined"
                name="companyName"
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
                variant="outlined"
                name="revenuePerYear"
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="type">
                Type<span style={{ color: "red" }}>*</span>
              </label>
              <FormControl fullWidth>
                <InputLabel id="gender">Choose Type</InputLabel>
                <Select
                  id="type"
                  value={profileInput.type}
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
                  value={profileInput.role}
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
          </Box>
          <Box className={styles.profileFormRow}>
            <Box className={styles.inputBox}>
              <label className={styles.labelTag} htmlFor="gst_in">
                GST Number<span style={{ color: "red" }}>*</span>
              </label>
              <TextField
                className={styles.inputTag}
                id="gst_in"
                label="Enter GST Number"
                variant="outlined"
                name="gst_in"
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
                variant="outlined"
                name="pan_number"
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
                variant="outlined"
                name="aadhar_number"
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
                variant="outlined"
                name="account_number"
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
                variant="outlined"
                name="account_name"
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
                variant="outlined"
                name="ifsc_code"
                onChange={handleInputChange}
                required
              />
            </Box>
          </Box>
          <Button
            type="submit"
            className={styles.saveButton}
            variant="contained"
            // style={{backgroundColor: "red"}}
          >
            Save
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ProfileDetails;
