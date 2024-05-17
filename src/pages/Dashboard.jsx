import { Avatar, Button, Layout, Popover, Tabs } from "antd";
import Element from "../components/Element";
import { useContext, useEffect, useState } from "react";
import { Store } from "../StateProvider";
import { URI } from "../api/uri";
import axios from "axios";
import ActionTypes from "../ActionTypes";
import { get } from "lodash";
import ProjectSelect from "./ProjectSelect";
import { LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../auth/AuthProvider";
import CS from "./CS";
import DME from "./DME";
import DE from "./DE";
import PE from "./PE";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

import { SettingOutlined } from "@ant-design/icons";
const { Text } = Typography;

const TABS_DATA = [
  { key: "CS", label: "CLIENT SATISFACTION", children: <CS /> },
  {
    key: "DME",
    label: "DELIVERY MANAGEMENT EFFECTIVENESS",
    children: <DME />,
  },
  { key: "DE", label: "DEVELOPMENT EFFECTIVENESS", children: <DE /> },
  { key: "PE", label: "PROCESS EFFECTIVENESS", children: <PE /> },
];

const Dashboard = () => {
  const { state, dispatch } = useContext(Store);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { logout } = useContext(AuthContext);
  const { associateDetails } = state;
  const navigate = useNavigate();

  const fetchProjects = async () => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_app",
      value: true,
    });
    let res = null;
    try {
      res = await axios.get(
        `${URI.GET_PROJECTS}${state?.associateDetails?.email}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    const projects = get(res, "data.Projects");
    dispatch({ type: ActionTypes.SET_DATA, key: "projects", value: projects });
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_app",
      value: false,
    });
  };
  const handleClick = () => {
    setSelectedIndex(1);
    navigate("/dashboard");
  };

  const handleClick1 = () => {
    setSelectedIndex(2);
    navigate("/dme");
  };

  const handleClick2 = () => {
    setSelectedIndex(3);
    navigate("/de");
  };

  const handleClick3 = () => {
    console.log("yes");
    setSelectedIndex(4);
    navigate("/pe");
  };
  const handleSettings = () => {
    setSelectedIndex(5);
    navigate("/settings");
  };

  useEffect(() => {
    if (!state.token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (state?.token && !state?.projects) {
      fetchProjects();
    }
  }, [state?.projects]);

  return (
    <>
      {state?.loading_app && <Loader />}
      <Element>
        <Layout>
          <Layout.Header
            style={{
              backgroundColor: "#0761ba",
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {state?.selectedProject && (
              <>
                <ProjectSelect width="22%" style={{ marginRight: "20px" }} />

                <Text
                  style={{
                    color: "#ffffff",
                    marginRight: "20px",
                    fontWeight: selectedIndex === 1 ? "800" : "normal",
                    borderBottom:
                      selectedIndex === 1 ? "4px solid white" : "none",
                    paddingBottom: selectedIndex === 1 ? "5px" : "0",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick}
                >
                  CLIENT SATISFACTION
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    marginRight: "20px",
                    fontWeight: selectedIndex === 2 ? "800" : "normal",
                    borderBottom:
                      selectedIndex === 2 ? "4px solid white" : "none",
                    paddingBottom: selectedIndex === 2 ? "5px" : "0",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick1}
                >
                  DELIVERY MANAGEMENT EFFECTIVENESS
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    marginRight: "20px",
                    fontWeight: selectedIndex === 3 ? "800" : "normal",
                    borderBottom:
                      selectedIndex === 3 ? "4px solid white" : "none",
                    paddingBottom: selectedIndex === 3 ? "5px" : "0",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick2}
                >
                  DEVELOPMENT EFFECTIVENESS
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    marginRight: "20px",
                    fontWeight: selectedIndex === 4 ? "800" : "normal",
                    borderBottom:
                      selectedIndex === 4 ? "4px solid white" : "none",
                    paddingBottom: selectedIndex === 4 ? "5px" : "0",
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                  onClick={handleClick3}
                >
                  PROCESS EFFECTIVENESS
                </Text>

                <SettingOutlined
                  size="sm"
                  style={{
                    paddingBottom: selectedIndex === 5 ? "5px" : "0",
                    fontWeight: selectedIndex === 5 ? "800" : "normal",
                    borderBottom:
                      selectedIndex === 5 ? "4px solid white" : "none",
                    color: "white",
                    padding: "6px",
                    margin: "8px",
                  }}
                  onClick={handleSettings}
                />
              </>
            )}

            <Element marginLeft="auto">
              <Popover
                title={
                  <Element>
                    <Element type="p">{associateDetails?.full_name}</Element>
                    <Element
                      type="p"
                      fontSize="12px"
                      fontWeight="normal"
                      color="gray"
                    >
                      {associateDetails?.email}
                    </Element>
                  </Element>
                }
                content={
                  <Button
                    block
                    icon={<LogoutOutlined />}
                    style={{ color: "red", marginTop: "15px" }}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                }
              >
                <Avatar size="large" src={state?.profilePic} />
              </Popover>
            </Element>
          </Layout.Header>
        </Layout>
        {!state?.selectedProject && (
          <Element
            marginTop="163px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="80%"
          >
            <Element
              width="40%"
              backgroundColor="#f5f5f5"
              padding="40px"
              textAlign="center"
            >
              <Element type="p" marginBottom="20px" fontSize="16px">
                Please select a project to display the project details
              </Element>
              <ProjectSelect />
            </Element>
          </Element>
        )}
      </Element>
    </>
  );
};

export default Dashboard;
