import {
  Box,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import styles from "./Security.module.scss";

const Security = () => {
  const [gender, setGender] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  return (
    <Box>
      <Box>
        <Box className={styles.inputBox}>
          <label className={styles.labelTag} htmlFor="oldPass">
            Enter Old Password
          </label>
          <TextField
            className={styles.inputTag}
            id="oldPass"
            label="Enter Old Password"
            variant="outlined"
            type="password"
          />
        </Box>
        <Box className={styles.inputBox}>
          <label className={styles.labelTag} htmlFor="newPass">
            Enter New Password
          </label>
          <TextField
            className={styles.inputTag}
            id="newPass"
            label="Enter New Password"
            variant="outlined"
            type="password"
          />
        </Box>
        <Box className={styles.inputBox}>
          <label className={styles.labelTag} htmlFor="confirmPass">
            Confirm Password
          </label>
          <TextField
            className={styles.inputTag}
            id="confirmPass"
            label="Confirm Password"
            variant="outlined"
            type="password"
          />
        </Box>
        <Button className={styles.saveButton} variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Security;
