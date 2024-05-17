import React from "react";
import { Modal, Button } from "antd";

const DeleteModal = ({ visible, onCancel, onConfirm }) => {
  return (
    <Modal
      title="Confirmation"
     open
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" type="primary" onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
};

export default DeleteModal;
