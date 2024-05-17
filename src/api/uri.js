// Relative Api Paths
const RelativePath = "pdp";

const URI = {
  LOGIN: "https://dev-auth.senecaglobal.in/login?redirect_url=",
  LOGOUT: "https://dev-auth.senecaglobal.in/logout?redirect_url=",
  ACCESS_TOKEN: "https://dev-auth.senecaglobal.in/get_access_token",
  GET_ASSOCIATE_DETAILS: "https://dev-auth.senecaglobal.in/api/user/get_by_id",
  GET_ASSOCIATE_PIC: "https://dev-auth.senecaglobal.in/api/user/profile_pic",
  // GET_PROJECTS: "http://192.168.11.50:7075/projects/GetEmpPMRMProject/",
  GET_PROJECTS: "http://192.168.11.50:4022/employee/api/v1/HRMSExternal/GetProjectsByEmailAndRole/",

  PROJECT_DETAILS: `${RelativePath}/projectDetails`,
  GET_DATA_CS: `${RelativePath}/clientSatisfaction`,
  GET_DATA_DME: `${RelativePath}/deliveryManagementEffectiveness`,
  GET_DATA_DE: `${RelativePath}/developmentEffectiveness`,
  GET_DATA_PE: `${RelativePath}/processEffectiveness`,
  GET_DATA_APPRECIATIONS: `/jira/appreciations`,
  EDIT_APPRECIATIONS:`${RelativePath}/jira/apprecaitions`,
  GET_DATA_COMPLAINTS: `${RelativePath}/apprecaitions`,
  EDIT_COMPLAINTS:`${RelativePath}/jira/apprecaitions`,
};

export { URI };
