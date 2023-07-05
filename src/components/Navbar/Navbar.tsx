import { Box, Button, Typography } from "@mui/material";
import styles from "./Navbar.module.scss";
import { BiLogInCircle } from "react-icons/bi";
import { ImUserPlus } from "react-icons/im";
import { IUser } from "../../pages/Login/Login";
import { Link } from "react-router-dom";
import Naari_Logo from "../../assets/Naari_Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { IProfileData } from "../AdvSignupForm/AdvSignupForm";
import { loginAction } from "../../Redux/Actions/loginAction";

export interface IStore {
  Reducer: {
    userData: IUser;
    loggedInUser: boolean;
    profileData: IProfileData;
  };
}

const Navbar = () => {
  const dispatch = useDispatch();

  const reducer = useSelector((store: IStore) => {
    return store.Reducer;
  });

  const loggedInUser = reducer.loggedInUser;

  const logoutUser = () => {
    toast.info("Logged out");
    localStorage.clear();
    loginAction(false, dispatch);
  };

  return (
    <Box id={styles.navbar}>
      <Box>
        <Link to={"/"}>
          <img src={Naari_Logo} alt="Naari Logo" width="140" height="50" />
        </Link>
      </Box>
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

      {loggedInUser ? (
        <Box>
          <Button onClick={logoutUser}>Logged In</Button>
          <Button>
            <Link to={"/profile"}>Profile</Link>
          </Button>
        </Box>
      ) : (
        <Box className={styles.LoginSignup}>
          <Link to="/login">
            <BiLogInCircle fontSize="15px" />
            <span>SignIn</span>
          </Link>
          <Link to="/signup">
            <ImUserPlus fontSize="15px" />
            <span>Register</span>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
