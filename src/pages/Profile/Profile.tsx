import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "../../components/TabPanel/TabPanel";
import Security from "../../components/Security/Security";
import Notifications from "../../components/Notifications/Notifications";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "./Profile.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { loginAction } from "../../Redux/Actions/loginAction";
import { userAction } from "../../Redux/Actions/userAction";

const Profile = () => {
  const [value, setValue] = React.useState("security");

  const dispatch = useDispatch();
  const getUser = async () => {
    let token = localStorage.getItem("loginToken");
    if (token) {
      let res = await fetch(
        "https://naari-backend-lzy3caj3ca-el.a.run.app/getUser",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      let userData = await res.json();
      console.log("userData:", userData);
      userAction(userData, dispatch);
      loginAction(true, dispatch);
      localStorage.setItem("userId", userData._id);
    } else {
      loginAction(false, dispatch);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Navbar />
      <Box className={styles.profile}>
        <Typography variant="h5" className={styles.profileTitle}>
          Profile
        </Typography>
        <Box className={styles.HeadSection}>
          <img
            src="https://img.freepik.com/free-photo/particle-lines-futuristic-network-background_53876-129729.jpg"
            alt="cover image"
            style={{ position: "absolute", width: "100%" }}
          />
          <Box className={styles.profileImageBox}>
            <Box className={styles.profileImage}>
              <img
                src="https://wallpapers.com/images/featured/87h46gcobjl5e4xu.jpg"
                alt="Profile Image"
                width={"100%"}
              />
              <Box className={styles.cameraIcon}>
                <label htmlFor="fileInput">
                  <AiOutlineCamera />
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: "none" }}
                  />
                </label>
              </Box>
            </Box>
            <Box>
              <Typography>Pankaj Mehra</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Security" value="security" />
              <Tab label="Notifications" value="notifications" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={"security"}>
            <Security />
          </TabPanel>
          <TabPanel value={value} index={"notifications"}>
            <Notifications />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
