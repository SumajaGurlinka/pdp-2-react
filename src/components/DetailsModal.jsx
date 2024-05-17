import { Modal, Table } from "antd";

const DetailsModal = ({ title, columns, data, onClose, children }) => {
  return (
    <Modal
      title={title}
      centered
      open
      onCancel={onClose}
      width={1200}
      classNames={{ header: "details-header", footer: "details-footer" }}
      okButtonProps={{ style: { display: "none" } }}
    >
      <Table
        scroll={{ x: true }}
        bordered
        size="small"
        pagination={false}
        dataSource={data}
        columns={columns}
      />
      {children}
    </Modal>
  );
};

export default DetailsModal;
