import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import i18n from "../../i18n";

const Home = () => {
  const changeLanguage = (e: SelectChangeEvent) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <Box>
      <Navbar />
      <Box>This is the HomePage</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 200,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="language">Language</InputLabel>
            <Select
              labelId="language"
              label="language"
              onChange={changeLanguage}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="hi">Hindi</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
