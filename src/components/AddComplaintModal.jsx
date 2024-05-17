import React, { useEffect } from "react";
import Modal from "antd/es/modal/Modal";
import { Button, Form, Input, DatePicker } from "antd";
import { useContext } from "react";
import { URI } from "../api/uri";
import ActionTypes from "../ActionTypes";
import { Store } from "../StateProvider";
import { AddComplaintData } from "../api";
import Loader from "./Loader";
import dayjs from "dayjs";
const { TextArea } = Input;

const complaintMockData = {
  id: "1",
  dateReceived: dayjs("2024-04-01"),
  receivedFrom: "John Doe",
  context: "Teamwork",
  receivedFor: "Jane Smith",
  complaintDetails: "Great job on the project!",
};

const AddComplaintModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext(Store);
  const {
    Complaint,
    projectsDetails,
    selectedProject,
    loading_app,
    associateDetails,
    ComplaintIsEdit,
  } = state;

  const handleSubmit = async () => {
    try {
      dispatch({
        type: ActionTypes.SET_DATA,
        key: "ComplaintIsEdit",
        value: false,
      });
      await form.validateFields();

      const values = form.getFieldsValue();

      const dateReceived = new Date(values.dateReceived);

      const formattedDate = dateReceived.toISOString();

      const formData = {
        projectCode: selectedProject.value,
        dateReceived: formattedDate,
        receivedFrom: values.receivedFrom,
        context: values.context,
        receivedFor: values.receivedFor,
        complaintDetails: values.complaintDetails,
        lastModifiedBy: associateDetails?.full_name,
        lastModifiedDate: new Date().toISOString(),
      };

      onCancel();

      dispatch({
        type: ActionTypes.SET_DATA,
        key: "loading_addcomplaint",
        value: true,
      });

      AddComplaintData({
        uri: URI.GET_DATA_COMPLAINTS,
        formData: formData,
        callback: (data, isError) => {
          dispatch({
            type: ActionTypes.SET_DATA,
            key: "loading_addcomplaint",
            value: false,
          });
        },
      });
    } catch (errorInfo) {
      console.log("Validation failed:", errorInfo);
    }
  };

  return (
    <>
      loading_addcomplaint
      <Modal
        title={state?.ComplaintIsEdit ? "Edit Complaint" : "Add Complaint"}
        style={{ marginTop: "-70px", height: "550px" }}
        open
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {state?.ComplaintIsEdit ? "Edit" : "Submit"}
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginBottom: "40px" }}
          initialValues={state?.ComplaintIsEdit ? complaintMockData : "null"}
        >
          <Form.Item
            label="Date Received"
            name="dateReceived"
            rules={[
              { required: true, message: "Please select the date received!" },
            ]}
            style={{ marginBottom: "8px" }}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Select the date"
              onBlur={() => form.validateFields(["dateReceived"])}
            />
          </Form.Item>
          <Form.Item
            label="Received From"
            name="receivedFrom"
            rules={[
              { required: true, message: "Please input the received from!" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Received from field should contain only alphabets.",
              },
            ]}
            style={{ marginBottom: "8px" }}
          >
            <Input
              placeholder="Enter the sender's name"
              onBlur={() => form.validateFields(["receivedFrom"])}
            />
          </Form.Item>
          <Form.Item
            label="Received For"
            name="receivedFor"
            rules={[
              { required: true, message: "Please input the received for!" },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: "Received for field should contain only alphabets.",
              },
            ]}
            style={{ marginBottom: "8px" }}
          >
            <Input
              placeholder="Enter the purpose"
              onBlur={() => form.validateFields(["receiveFor"])}
            />
          </Form.Item>
          <Form.Item
            label="Context"
            name="context"
            rules={[{ required: true, message: "Please input the context!" }]}
            style={{ marginBottom: "8px" }}
          >
            <Input.TextArea
              showCount
              placeholder="Describe the context"
              maxLength={1000}
              rows={3}
              autoSize={{ minRows: 3, maxRows: 3 }}
              onBlur={() => form.validateFields(["context"])}
            />
          </Form.Item>
          <Form.Item
            label="Complaint Details"
            name="complaintDetails"
            rules={[
              {
                required: true,
                message: "Please input the complaint details!",
              },
            ]}
            style={{ marginBottom: "8px" }}
          >
            <Input.TextArea
              showCount
              maxLength={5000}
              rows={3}
              placeholder="Enter the complaint details"
              autoSize={{ minRows: 3, maxRows: 3 }}
              onBlur={() => form.validateFields(["complaintDetails"])}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddComplaintModal;
