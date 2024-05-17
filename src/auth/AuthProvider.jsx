import axios from "axios";
import { get } from "lodash";
import { createContext, useContext, useEffect } from "react";
import { URI } from "../api/uri";
import AuthConfig from "./AuthConfig";
import { Store } from "../StateProvider";
import ActionTypes from "../ActionTypes";
import Loader from "../components/Loader";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { state, dispatch } = useContext(Store);
  const { loading_app } = state;
  const location = window.location;

  const login = () => {
    window.location.replace(`${URI.LOGIN}${window.origin}`);
  };

  const logout = () => {
    dispatch({ type: ActionTypes.RESET_DATA });
    window.location.replace(`${URI.LOGOUT}${window.origin}`);
  };

  const fetchAssociateDetails = async (associateId, token) => {
    let res = null;
    try {
      res = await axios.post(
        URI.GET_ASSOCIATE_DETAILS,
        { associate_id: associateId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    const details = get(res, "data.data");
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "associateDetails",
      value: details,
    });
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "token",
      value: token,
    });
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_app",
      value: false,
    });
  };

  const fetchProfilePic = async (token) => {
    let res = null;
    try {
      res = await fetch(URI.GET_ASSOCIATE_PIC, {
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: "blob",
        },
      });
      const blob = await res.blob();
      const imageUrl = URL.createObjectURL(blob);
      dispatch({
        type: ActionTypes.SET_DATA,
        key: "profilePic",
        value: imageUrl,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchToken = async (authCode) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_app",
      value: true,
    });
    let res = null;
    try {
      res = await axios.post(
        URI.ACCESS_TOKEN,
        JSON.stringify({
          authorization_code: authCode,
          client_id: AuthConfig.CLIENT_ID,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: "loading_app",
        value: false,
      });
      console.log(err);
    }
    const associateId = get(res, "data.data.associate_id");
    const token = get(res, "data.data.access_token");
    if (associateId) {
      fetchAssociateDetails(associateId, token);
      fetchProfilePic(token);
    }
  };

  const checkAuth = () => {
    if (!state?.token) {
      const params = new URLSearchParams(location.search);
      const authCode = params.get("auth_code");
      if (authCode) {
        fetchToken(authCode);
      }
    }
  };

  useEffect(() => {
    // checkAuth();
  }, []);

  return (
    <>
      {loading_app && <Loader />}
      <AuthContext.Provider value={{ checkAuth, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
export { AuthContext };
