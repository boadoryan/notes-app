// import React from "react";
// import axios from "axios";
// import setCookies from "react-cookie";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate();
// export const fetchNewAccessTokenRequest = async () => {
//   try {
//     const refreshResponse = await axios.get(
//       "http://localhost:5555/auth/refresh",
//       {
//         withCredentials: true,
//       }
//     );
//     return refreshResponse.data.accessToken;
//   } catch (error) {
//     console.log("Error refreshing access token:", error);
//     return null;
//   }
// };

// export const handleLogout = async (route) => {
//   try {
//     await axios.post(
//       "http://localhost:5555/auth/logout",
//       {},
//       {
//         withCredentials: true,
//       }
//     );
//     setCookies("access_token", "");
//     setCookies("expires_in", "");
//     window.localStorage.clear("userId");
//     navigate(`/${route}`);
//     return true;
//   } catch (error) {
//     console.log("Error logging out:", error);
//     return false;
//   }
// };
