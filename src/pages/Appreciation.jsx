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
import AddAppreciationModal from "../components/AddAppreciationModal";
import { EditAppreciationData } from "../api";
import { fetchAppreciationsData } from "../api";
import Loader from "../components/Loader";
import { DeleteAppreciationData } from "../api";
import DeleteModal from "../components/DeleteModal";
const Appreciation = () => {
  const navigate = useNavigate();
  const [AppreciationOpen, setAppreciationOpen] = useState(false);
  const [AddAppreciation, setAddappreciation] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { state, dispatch } = useContext(Store);
  const {
    selectedProject,
    projectsDetails,
    loading_appreciation,
    loading_editappreciation,
    IsEdit,
    loading_deleteappreciation,
  } = state;
  useEffect(() => {
    if (selectedProject.value) {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: " loading_appreciation",
        value: true,
      });

      fetchAppreciationsData({
        uri: URI.GET_DATA_APPRECIATIONS,
        // params: { projectCode: selectedProject.value },
        params: {
          projectCode: projectsDetails[selectedProject.value].projectId,
        },

        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: " loading_appreciation",
            value: false,
          });

          if (!isError) {
            dispatch({
              type: ActionTypes.SET_DATA,
              key: `AppreciationData`,
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
  const handleCancel = () => {
    setDeleteOpen(false);
  };
  const handleEdit = (id) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "IsEdit",
      value: true,
    });
    EditAppreciationData({
      uri: URI.EDIT_APPRECIATIONS,
      params: { id: id },
      callback: (data, isError) => {
        dispatch({
          type: ActionTypes.SET_DATA,
          key: "loading_editappreciation",
          value: false,
        });

        if (isError) {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: `EditAppreciationData`,
            value: data,
          });
          setAddappreciation(true);
        } else {
          console.log("error ,edit Appreciation");
        }
      },
    });
  };
  const handleConfirm = (id) => {
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "loading_deleteappreciation",
      value: true,
    });
    DeleteAppreciationData({
      uri: URI.GET_DATA_APPRECIATIONS,
      params: { id: id },
      callback: (data, isError) => {
        dispatch({
          type: ActionTypes.SET_DATA,
          key: "loading_deleteappreciation",
          value: false,
        });

        if (!isError) {
          fetchAppreciationsData({
            uri: URI.GET_DATA_APPRECIATIONS,
            params: { hrmsProjectId: selectedProject.value },
            callback: (data, isError) => {
              if (!isError) {
                dispatch({
                  type: ActionTypes.SET_DATA,
                  key: `AppreciationData`,
                  value: data,
                });
              } else {
                console.log("Error fetching appreciation data after deletion");
              }
            },
          });
        } else {
          console.log("Error deleting appreciation data");
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
      appreciationDetails: "Great job on the project!",
    },
    {
      id: "2",
      key: "2",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      appreciationDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "3",
      key: "3",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      appreciationDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "4",
      key: "4",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      appreciationDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "5",
      key: "5",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      appreciationDetails: "Exceptional leadership skills demonstrated.",
    },
    {
      id: "6",
      key: "6",
      dateReceived: "2024-03-28",
      receivedFrom: "Alice Johnson",
      context: "Leadership",
      receivedFor: "Bob Williams",
      appreciationDetails: "Exceptional leadership skills demonstrated.",
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
      title: "Appreciation Details",
      dataIndex: "appreciationDetails",
      key: "appreciationDetails",
      sorter: (a, b) =>
        a.appreciationDetails.localeCompare(b.appreciationDetails),
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
  const handlebackAppreciation = () => {
    setAppreciationOpen(true);
  };
  const handleDelete = (id) => {
    setDeleteOpen(true);
  };
  const handleAddAppreciation = () => {
    setAddappreciation(true);
  };
  const handleClose = () => {
    setAddappreciation(false);
    dispatch({
      type: ActionTypes.SET_DATA,
      key: "IsEdit",
      value: false,
    });
  };

  return (
    <>
      {loading_appreciation && <Loader />}
      {loading_editappreciation && <Loader />}
      {loading_deleteappreciation && <Loader />}
      {AppreciationOpen ? (
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
              onClick={handlebackAppreciation}
            />
          </Tooltip>
          <Card
            title="Appreciation"
            className="APP_card card_width_100"
            extra={
              <Button
                type="default"
                style={{ border: "1px solid #b4dd21" }}
                onClick={handleAddAppreciation}
              >
                Add Appreciation
              </Button>
            }
          >
            <CardTexts title="Appreciations Received" />

            <Table
              dataSource={data}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
          </Card>
          {AddAppreciation && <AddAppreciationModal onCancel={handleClose} />}
          {deleteOpen && (
            <DeleteModal onCancel={handleCancel} onConfirm={handleConfirm} />
          )}
        </Element>
      )}
    </>
  );
};

export default Appreciation;
