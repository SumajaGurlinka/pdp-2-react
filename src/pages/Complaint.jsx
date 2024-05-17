import React, { useState, useContext, useEffect } from "react";
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
import AddComplaintModal from "../components/AddComplaintModal";
import { EditComplaintData } from "../api";
import { fetchComplaintsData } from "../api";
import Loader from "../components/Loader";
import { DeleteComplaintData } from "../api";
const Complaint = () => {
  const navigate = useNavigate();
  const [ComplaintsOpen, setComplaintsOpen] = useState(false);
  const [AddComplaint, setAddcomplaint] = useState(false);
  const { state, dispatch } = useContext(Store);
  const {
    selectedProject,
    loading_complaint,
    loading_addcomplaint,
    loading_editcomplaint,
    ComplaintIsEdit,
    loading_deletecomplaint,
  } = state;
  useEffect(() => {
    if (selectedProject.value) {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: " loading_complaint",
        value: true,
      });

      fetchComplaintsData({
        uri: URI.GET_DATA_COMPLAINTS,
        params: { hrmsProjectId: selectedProject.value },
        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: " loading_complaint",
            value: false,
          });

          if (!isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `ComplaintData`,
              value: data,
            });
          } else {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: "selectedProject",
              value: project,
            });
          }
        },
      });
    }
  }, []);
  const handleEdit = (id) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "ComplaintIsEdit",
      value: true,
    });
    EditComplaintData({
      uri: URI.EDIT_COMPLAINTS,
      params: { id: id },
      callback: (data, isError) => {
        dispatch({
          type: ActionTypes.SET_DATA,
          key: "loading_editcomplaint",
          value: false,
        });

        if (isError) {
          setAddcomplaint(true);
        } else {
          console.log("error ,edit Complaint");
        }
      },
    });
  };
  const handleDelete = (id) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_deletecomplaint",
      value: true,
    });
    DeleteComplaintData({
      uri: URI.GET_DATA_COMPLAINTS,
      params: { id: id },
      callback: (data, isError) => {
        dispatch({
          type: ActionTypes.SET_DATA,
          key: "loading_deletecomplaint",
          value: false,
        });

        if (!isError) {
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
              } else {
                console.log("Error fetching complaint data after deletion");
              }
            },
          });
        } else {
          console.log("Error deleting complaint data");
        }
      },
    });
  };

  const data = [
    {
      id: "1",

      key: "1",
      dateReceived: "2024-04-01",
      receivedFrom: "John Doe",
      context: "Teamwork",
      receivedFor: "Jane Smith",
      complaintDetails: "Great job on the project!",
    },
    {
      id: "2",
      key: "2",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      complaintDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "3",
      key: "3",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      complaintDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "4",
      key: "4",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      complaintDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "5",
      key: "5",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      complaintDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "6",
      key: "6",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      complaintDetails: "Exceptional leadership skills demonstrated.",
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
      title: "Complaint Details",
      dataIndex: "complaintDetails",
      key: "complaintDetails",
      sorter: (a, b) => a.complaintDetails.localeCompare(b.complaintDetails),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const handlebackComplaint = () => {
    setComplaintsOpen(true);
  };
  const handleAddComplaint = () => {
    setAddcomplaint(true);
  };
  const handleComplaintClose = () => {
    setAddcomplaint(false);
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "ComplaintIsEdit",
      value: false,
    });
  };

  return (
    <>
      {loading_complaint && <Loader />}
      {loading_addcomplaint && <Loader />}
      {loading_editcomplaint && <Loader />}
      {loading_deletecomplaint && <Loader />}
      {ComplaintsOpen ? (
        <Settings />
      ) : (
        <Element marginTop="16px" marginLeft="10px" marginRight="10px">
          <Tooltip title="Back to settings">
            <img
              src={back}
              alt="Back"
              style={{
                width: "20px",
                height: "20px",
                filter: "grayscale(100%)",
              }}
              onClick={handlebackComplaint}
            />
          </Tooltip>
          <Card
            title="Complaint"
            className="COMPL_card card_width_100"
            extra={
              <Button
                type="default"
                style={{ border: "1px solid #b4dd21" }}
                onClick={handleAddComplaint}
              >
                Add Complaint
              </Button>
            }
          >
            <CardTexts title="Complaints Received" />

            <Table
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
          {AddComplaint && (
            <AddComplaintModal onCancel={handleComplaintClose} />
          )}
        </Element>
      )}
    </>
  );
};

export default Complaint;
