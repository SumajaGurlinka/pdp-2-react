import { useContext, useEffect, useState } from "react";
import { fetchProjectData } from "../api";
import { Store } from "../StateProvider";
import { get, map } from "lodash";
import Loader from "../components/Loader";
import Element from "../components/Element";
import { Card, Table } from "antd";
import { getText } from "../utils";
import DetailsModal from "../components/DetailsModal";
import CardTexts from "../components/CardTexts";

const ROWS = [
  {
    label: "Client Complaints",
    key: "cc",
  },
  {
    label: "Client Satisfaction Feedback Aspect",
    key: "csfa",
  },
  {
    label: "Project Delivery Performance Issue",
    key: "pdpi",
  },
  {
    label: "Process Compliance Issue",
    key: "pci",
  },
  {
    label: "Information Security Weakness",
    key: "isw",
  },
  {
    label: "Information Security Event",
    key: "ise",
  },
  {
    label: "Risk Event",
    key: "re",
  },
  {
    label: "Delivery Improvement",
    key: "di",
  },
  {
    label: "Creative Idea",
    key: "ci",
  },
];

const DETAILED_COLUMNS = [
  {
    title: "Date",
    dataIndex: "reported_Date",
  },
  {
    title: "Description",
    dataIndex: "issueDescParsed",
  },
  {
    title: "Creative Idea/ Delivery Improvement Actions",
    dataIndex: "priority",
    children: [
      {
        title: "Cause",
        dataIndex: "rootCauseParsed",
      },
      {
        title: "Action Type",
        dataIndex: "action_Type",
      },
      {
        title: "Action",
        dataIndex: "actionParsed",
      },
      {
        title: "Responsibility",
        dataIndex: "responsibility",
      },
      {
        title: "Target Date",
        dataIndex: "target_Date",
      },
      {
        title: "Actual Date",
        dataIndex: "actual_Date",
      },
    ],
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Remarks",
    dataIndex: "remarksParsed",
  },
];

const PE = () => {
  const [overviewColumns, setOverviewColumns] = useState([]);
  const [detailedData, setDetailedData] = useState(null);
  const { state, dispatch } = useContext(Store);
  const { selectedProject, projectsData, loading_PE } = state;
  const data = get(projectsData, `${selectedProject?.value}.PE`);

  const structureOverviewData = () => {
    const processData = get(data, "data");
    const columns = [];
    columns.push({
      title: "Month",
      dataIndex: "label",
      render: (text, row) => <b>{text}</b>,
    });
    map(processData, (val, key) => {
      columns.push({
        title: key,
        children: [
          {
            title: "Count",
            render: (text, record) => {
              const data = processData[key];
              const count = get(data, `${record.key}DataSize`, 0);
              return count > 0 ? (
                <a onClick={() => structureDetailedData(key, record)}>
                  {count}
                </a>
              ) : (
                count
              );
            },
          },
          {
            title: "Implemented On Time(%)",
            render: (text, record) => {
              const data = processData[key];
              const val = get(
                data,
                `${record.key}ImplementedOnTime
              `,
                0
              );
              return val;
            },
          },
        ],
      });
    });

    setOverviewColumns(columns);
  };

  const structureDetailedData = (month, record) => {
    let details = get(data, `data.${month}.CIDIData.${record.key}data`);
    details = map(details, (item) => {
      item.issueDescParsed = getText(item.issue_Description);
      item.rootCauseParsed = getText(item.root_Cause);
      item.actionParsed = getText(item.action);
      item.remarksParsed = getText(item.remarks);
      return item;
    });
    setDetailedData({
      title: month,
      data: details,
    });
  };

  useEffect(() => {
    if (!data) {
      fetchProjectData({
        state,
        dispatch,
        project: selectedProject,
        activeTab: "PE",
      });
    } else {
      structureOverviewData();
      map(["CS", "DME", "DE"], (tab) =>
        fetchProjectData({
          state,
          dispatch,
          project: selectedProject,
          activeTab: tab,
        })
      );
    }
  }, [selectedProject, data]);

  return (
    <>
      {loading_PE && <Loader />}
      {!loading_PE && (
        <Element display="flex" justifyContent="space-around" flexWrap="wrap" marginTop="16px"marginLeft="10px" marginRight="10px">
          <Card
            title="Creative Ideas/Delivery Improvements"
            className="PE_card card_width_100"
          >
            <CardTexts
              title="Creative Ideas/Delivery Improvements [CIDI]"
              subTitles={["[CIDI Implemented on Time Target >= 90.0%]"]}
            />
            <Table
              bordered
              scroll={{ x: true }}
              size="small"
              pagination={false}
              dataSource={ROWS}
              columns={overviewColumns}
            />
          </Card>
        </Element>
      )}
      {detailedData && (
        <DetailsModal
          title={get(detailedData, "title")}
          columns={DETAILED_COLUMNS}
          data={get(detailedData, "data")}
          onClose={() => setDetailedData(null)}
        />
      )}
    </>
  );
};

export default PE;
