import { useContext } from "react";
import Element from "../components/Element";
import { Select } from "antd";
import { get, map } from "lodash";
import { Store } from "../StateProvider";
import ActionTypes from "../ActionTypes";
import { URI } from "../api/uri";
import { fetchData } from "../api";
import { fetchAppreciationsData } from "../api";
const ProjectSelect = ({ width, style }) => {
  const { state, dispatch } = useContext(Store);
  const { Appreciation,projectsDetails,selectedProject } = state;
  const getProjectDetails = (project) => {
    if (!get(state, `projectsDetails.${project.value}`)) {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: "loading_app",
        value: true,
      });
      fetchData({
        uri: URI.PROJECT_DETAILS,
        params: { hrmsProjectId: project.value },
        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: "loading_app",
            value: false,
          });
          if (!isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `projectsDetails.${project.value}`,
              value: data,
            });
            dispatch({
              type: ActionTypes.SET_DATA,
              key: "selectedProject",
              value: project,
            });
          }
        },
      });
      fetchAppreciationsData({
        uri: URI.GET_DATA_APPRECIATIONS,
        params: { hrmsProjectId: selectedProject.value },
        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: "loading_app",
            value: false,
          });
  
          if (!isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `AppreciationData`,
              value: data,
            });
          }
           else {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: "selectedProject",
              value: project,
            });
          }
        }
      });
      fetchComplaintsData({
        uri: URI.GET_DATA_COMPLAINTS,
        params: { hrmsProjectId: selectedProject.value },
        callback: (data, isError) => {
          if (!isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `CompalaintData`,
              value: data,
            });
          } 
          else {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: "selectedProject",
              value: project,
            });
          }
        }
      });
    } else {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: "selectedProject",
        value: project,
      });
    }
  };

  return (
    <Select
      style={{ width: width || "50%", textAlign: "left", ...style }}
      placeholder={<p>Project</p>}
      options={map(state?.projects, (project) => ({
        label: project?.ProjectName,
        value: project?.ProjectCode,
      }))}
      onSelect={(val, option) => getProjectDetails(option)}
      value={state?.selectedProject?.value}
     
    />
  );
};

export default ProjectSelect;
