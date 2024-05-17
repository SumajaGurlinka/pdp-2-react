import { set } from "lodash";
import ActionTypes from "./ActionTypes";

const initialState = {
  token: null,
  associateDetails: null,
  profilePic: null,
  projects:
    import.meta.env.MODE === "development"
      ? [
          {
            ProjectCode: "P000851903",
            ProjectName: "In-telligent",
          },
          {
            ProjectCode: "P012011905",
            ProjectName: "Wunderman",
          },
          {
            ProjectCode: "P011662312",
            ProjectName: "Strivant Health",
          },
          {
            ProjectCode: "P023131101",
            ProjectName: "BradyPlus",
          },
          {
            ProjectCode: "P049261805",
            ProjectName: "Randa Accessories",
          },
          {
            ProjectCode: "P006181910",
            ProjectName: "Safco dental",
          },
          {
            ProjectCode: "P003811906",
            ProjectName: "Medline",
          },
          {
            ProjectCode: "P037201505",
            ProjectName: "IMS",
          },
        ]
      : null,
  loading_CS: false,
  loading_DME: false,
  loading_DE: false,
  loading_PE: false,
  loading_app: false,
  loading_appreciation: false,
  loading_addappreciation: false,
  loading_editappreciation:false,
  loading_risk: false,
  loading_addrisk: false,
  loading_editrisk:false,
  loading_deleterisk:false,
  loading_deleteappreciation:false,
  loading_compalint: false,
  loading_addcompalint: false,
  loading_editcompalint:false,
  loading_deletecompalint:false,
  selectedProject: null,
  projectsDetails: {},
  projectsData: {},
  Appreciationclicked:false,
  AppreciationData:{},
  RiskData:{},
  ComplaintData:{},
  EditAppreciationData:{},
  IsEdit:false,
  ComplaintIsEdit:false,
  RiskIsEdit:false
};

const reducer = (state, action) => {
  if (action.type === ActionTypes.SET_DATA) {
    const modifiedState = set(state, action.key, action.value);
    return {
      ...modifiedState,
    };
  }
  if (action.type === ActionTypes.RESET_DATA) {
    URL.revokeObjectURL(state.profilePic)
    return {
      ...initialState,
    };
  }
};

export default reducer;
export { initialState };
