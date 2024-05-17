import axios from "axios";
import { URI } from "./uri";
import { get } from "lodash";
import ActionTypes from "../ActionTypes";

// This will configure the singleton axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
const Api=   axios.create({
  baseURL: 'http://localhost:8082/',
})

const fetchProjectData = ({ state, dispatch, project, activeTab, callback }) => {
  const loading = get(state, `loading_${activeTab}`);
  if(loading) {
    return;
  }
  const data = get(state, `projectsData.${project?.value}.${activeTab}`);
  if (data) {
    callback && callback(data, false);
    return;
  }
  dispatch({
    type: ActionTypes.SET_DATA,
    key: `loading_${activeTab}`,
    value: true,
  });
  fetchData({
    uri: URI[`GET_DATA_${activeTab}`],
    params: { hrmsProjectId: project?.value },
    callback: (data, isError) => {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: `loading_${activeTab}`,
        value: false,
      });
      if (!isError) {
        dispatch({
          type: ActionTypes.SET_DATA,
          key: `projectsData.${project?.value}.${activeTab}`,
          value: data,
        });
      }
      callback && callback(data, isError);
    },
  });
};

const fetchData = async ({ params, callback, method = "GET", uri }) => {
  try {
    let res = null;
    if (method === "GET") {
      res = await API.get(uri, { params });
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const fetchAppreciationsData = async ({ callback, method = "GET", uri,params }) => {
  try {
    let res = null;
    if (method === "GET") {
      res = await Api.get(uri, { params });
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const AddAppreciationData =  async({callback, method ="POST",uri,formData}) =>{
  try {
    let res = null;
    if (method === "POST") {
      res = await API.post(uri,formData);
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const EditAppreciationData = async ({ callback, method = "PUT", uri, params }) => {
  try {
    
    let res = null;
    if (method === "PUT") {
      res = await API.put(uri, null, { params });
      
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const DeleteAppreciationData = async ({ callback, method = "DELETE", uri, params }) => {
  try {
    
    let res = null;
    if (method === "DELETE") {
      res = await API.delete(uri, null, { params });
      
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const fetchComplaintsData = async ({ callback, method = "GET", uri,params }) => {
  try {
    let res = null;
    if (method === "GET") {
      const res = await API.get(uri, { params });
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const AddComplaintData =  async({callback, method ="POST",uri,formData}) =>{
  try {
    let res = null;
    if (method === "POST") {
      res = await API.post(uri,formData);
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const EditComplaintData = async ({ callback, method = "PUT", uri, params }) => {
  try {
    
    let res = null;
    if (method === "PUT") {
      res = await API.put(uri, null, { params });
      
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const DeleteComplaintData = async ({ callback, method = "DELETE", uri, params }) => {
  try {
    
    let res = null;
    if (method === "DELETE") {
      res = await API.delete(uri, null, { params });
      
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const fetchRisksData = async ({ callback, method = "GET", uri,params }) => {
  try {
    let res = null;
    if (method === "GET") {
      const res = await API.get(uri, { params });
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const AddRiskData =  async({callback, method ="POST",uri,formData}) =>{
  try {
    let res = null;
    if (method === "POST") {
      res = await API.post(uri,formData);
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};

const EditRiskData = async ({ callback, method = "PUT", uri, params }) => {
  try {
    
    let res = null;
    if (method === "PUT") {
      res = await API.put(uri, null, { params });
      
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
const DeleteRiskData = async ({ callback, method = "DELETE", uri, params }) => {
  try {
    
    let res = null;
    if (method === "DELETE") {
      res = await API.delete(uri, null, { params });
      
    }
    callback && callback(res.data);
  } catch (err) {
    callback && callback(get(err, "response.data"), true);
  }
};
export { fetchProjectData, fetchData ,fetchAppreciationsData,AddAppreciationData,EditAppreciationData,DeleteAppreciationData,DeleteComplaintData,EditComplaintData,AddComplaintData,fetchComplaintsData,DeleteRiskData,EditRiskData,AddRiskData,fetchRisksData};
