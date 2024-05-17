import React, { useState ,useContext,useEffect} from "react";
import Element from "../components/Element";
import { useNavigate } from "react-router-dom";
import ActionTypes from "../ActionTypes";
import { Store } from "../StateProvider";
import back from "../assets/back.svg";
import { Button, Card, Tooltip, Table } from "antd";
import CardTexts from "../components/CardTexts";
import { EditOutlined } from "@ant-design/icons";
import Settings from "./Setting";
import { DeleteOutlined } from "@ant-design/icons";
import { URI } from "../api/uri";
import AddRiskModal from "../components/AddRiskModal";
import { EditRiskData } from "../api";
import { fetchRisksData } from "../api";
import Loader from "../components/Loader";
import { DeleteRiskData } from "../api";
const Risk = () => {
    const navigate=useNavigate();
    const[RiskOpen,setRiskOpen] = useState(false)
   const[AddRisk,setAddrisk] = useState(false);
    const { state, dispatch } = useContext(Store);
  const {selectedProject,projectsDetails, loading_risk,loading_editrisk,RiskIsEdit,loading_deleterisk} = state;
  useEffect(() => {
  
    if (selectedProject.value) {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: " loading_risk",
        value: true,
      });
  
      fetchRisksData({
        uri: URI.GET_DATA_APPRECIATIONS,
        // params: { projectCode: selectedProject.value },
        params:  { projectCode: projectsDetails[selectedProject.value].projectId },
      
        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: " loading_risk",
            value: false,
          });
  
          if (!isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `RiskData`,
              value: data,
            });
          } else {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: "selectedProject",
              value: project,
            });
            
          }
        }
      });
    }
  }, []); 
  const handleEdit = (id) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "RiskIsEdit",
      value: true,
    });
    EditRiskData(
      {
        uri: URI.EDIT_APPRECIATIONS,
        params: { id: id },
        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: "loading_editrisk",
            value: false,
          });
  
          if (isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `EditRiskData`,
              value: data,
            });
            setAddrisk(true);
          } else {
            console.log("error ,edit Risk")
            
          }
        }
      }
    )
  };
  const handleDelete = (id) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_deleterisk",
      value: true,
    });
    DeleteRiskData({
      uri: URI.GET_DATA_APPRECIATIONS,
      params: { id: id },
      callback: (data, isError) => {
        dispatch({
          type: ActionTypes.SET_DATA,
          key: "loading_deleterisk",
          value: false,
        });
  
        if (!isError) {
         
          fetchRisksData({
            uri: URI.GET_DATA_APPRECIATIONS,
            params: { hrmsProjectId: selectedProject.value },
            callback: (data, isError) => {
              if (!isError) {
                dispatch({
                  type: ActionTypes.SET_DATA,
                  key: `RiskData`,
                  value: data,
                });
              } else {
                console.log("Error fetching Risk data after deletion");
              }
            }
          });
        } else {
          console.log("Error deleting Risk data");
        }
      }
    });
  };
  
  
  const data = [
    {
      id:"1",

      key: "1",
      dateReceived: "2024-04-01",
      receivedFrom: "John Doe",
      context: "Teamwork",
      receivedFor: "Jane Smith",
      riskDetails: "Great job on the project!",
    },
    {
      id:"2",
      key: "2",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      riskDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id:"3",
      key: "3",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      riskDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id:"4",
      key: "4",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      riskDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id:"5",
      key: "5",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      riskDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id:"6",
      key: "6",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      riskDetails: "Exceptional leadership skills demonstrated.",
    },
  ];

  const columns = [
    {
      title: "Date Received",
      dataIndex: "dateReceived",
      key: "dateReceived",
     
      sorter: (a, b) => a.dateReceived.localeCompare(b.dateReceived),
      
    },
    {
      title: "Received From",
      dataIndex: "receivedFrom",
      key: "receivedFrom",
      sorter: (a, b) => a.receivedFrom.localeCompare(b.receivedFrom),
    },
    {
      title: "Context",
      dataIndex: "context",
      key: "context",
      sorter: (a, b) => a.context.localeCompare(b.context),
    },
    {
      title: "Received For",
      dataIndex: "receivedFor",
      key: "receivedFor",
      sorter: (a, b) => a.receivedFor.localeCompare(b.receivedFor),
    },
    {
      title: "Risk Details",
      dataIndex: "riskDetails",
      key: "riskDetails",
      sorter: (a, b) => a.riskDetails.localeCompare(b.riskDetails),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.id)}/>
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
          </Tooltip>
        </>
      ),
    },
  ];
  const handlebackRisk=()=>{
   setRiskOpen(true);
  }
  const handleAddRisk=()=>{
    setAddrisk(true);
  }
  const handleClose=()=>{
    setAddrisk(false);
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "RiskIsEdit",
      value: false,
    });
  }
  // useEffect(() => {
  //   if (!data) {
  //     fetchProjectData({
  //       state,
  //       dispatch,
  //       project: selectedProject,
  //       activeTab: "PE",
  //       location: location
  //     });
  //   } else {
     
  //     map(["CS", "DME", "DE"], (tab) =>
  //       fetchProjectData({
  //         state,
  //         dispatch,
  //         project: selectedProject,
  //         activeTab: tab,
  //         location: location
  //       })
  //     );
  //   }
  // }, [selectedProject, data]);

  return (
    <>
    { loading_risk && <Loader />}
    { loading_editrisk && <Loader />}
    { loading_deleterisk && <Loader />}
     {RiskOpen ? <Settings /> : 
      <Element marginTop="16px" marginLeft="10px" marginRight="10px">
        <Tooltip title="Back to settings">
          <img
            src={back}
            alt="Back"
            style={{ width: "20px", height: "20px", filter: "grayscale(100%)" }}onClick={handlebackRisk}
          />
        </Tooltip>
        <Card
          title="Risk"
          className="RISK_card card_width_100"
          extra={
            <Button type="default" style={{ border: "1px solid #3bb9a4" }} onClick={handleAddRisk}>
              Add Risk
            </Button>
          }
        >
          <CardTexts
            title="Risks Received"
            
          />

          <Table dataSource={data} columns={columns} pagination={{ pageSize: 5 }} />
        </Card>
        {AddRisk&&
        <AddRiskModal onCancel={handleClose}/>}
       
      </Element>}
   
    </>
  );
};

export default Risk;
