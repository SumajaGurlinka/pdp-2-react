import { useContext, useEffect, useState } from "react";
import { fetchProjectData } from "../api";
import { Store } from "../StateProvider";
import { Legend } from "recharts";
import { get, map } from "lodash";
import Loader from "../components/Loader";
import { Card, Table } from "antd";
import Element from "../components/Element";
import DetailsModal from "../components/DetailsModal";
import { getText } from "../utils";
import LineChart from "../components/LineChart";
import CardTitle from "../components/CardTitle";
import CardTexts from "../components/CardTexts";

const CARDS_DATA = [
  {
    key: "FR",
    label: "Feedback Rating",
    charts: true,
    title: "Client Rating [Target >= 3.0]",
  },
  {
    key: "FFDI",
    label: "Feedback For Delivery Improvement",
    title: "Client Satisfaction Feedback Aspect",
  },
  { key: "AP", label: "Appreciations", title: "Client Appreciations" },
  {
    key: "CP",
    label: "Complaints",
    title: "Client Complaints [Target <= 1.0 - Half-Yearly]",
    subTitles: [
      "[Recurrence of same Client Complaint Target = 0.0 - Half-yearly]",
    ],
  },
];

const CS = () => {
  const [tableData, setTableData] = useState(null);
  const [showCharts, setShowCharts] = useState({});
  const [selectedCard, setSelectedCard] = useState("");
  const { state, dispatch } = useContext(Store);
  const { selectedProject, projectsData, loading_CS } = state;
  const data = get(projectsData, `${selectedProject?.value}.CS`);

  const renderCount = (count, record) => {
    return count > 0 ? (
      <a onClick={() => structureDetailedData(record)}>{count}</a>
    ) : (
      count
    );
  };

  const DETAILED_COLUMNS = {
    FR: [
      {
        title: "Client Name",
        dataIndex: "client_Name",
      },
      {
        title: "Period",
        dataIndex: "issueDescParsed",
        render: (text, record) =>
          `${get(record, "quarter_Start_Date")} ${get(record, "year")}`,
      },
      {
        title: "Sent Date",
        dataIndex: "sent_Date",
      },
      {
        title: "Received Date",
        dataIndex: "received_Date",
      },
    ],
    FFDI: [
      {
        title: "Date",
        dataIndex: "reported_Date",
      },
      {
        title: "Description",
        dataIndex: "issueDescParsed",
      },
      {
        title: "Priority",
        dataIndex: "priority",
      },
      {
        title: "Creative Idea/Delivery Improvement Actions",
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
        title: "Remarks",
        dataIndex: "remarksParsed",
      },
    ],
    AP: [
      { title: "Date Received", dataIndex: "dreceived" },
      { title: "Received From", dataIndex: "rfrom" },
      { title: "Context", dataIndex: "context" },
      { title: "Received For", dataIndex: "rfor" },
      {
        title: "Appreciation Details",
        dataIndex: "detailsParsed",
      },
    ],
    CP: [
      { title: "Date Received", dataIndex: "rdate" },
      { title: "Received From", dataIndex: "rfrom" },
      { title: "Context", dataIndex: "context" },
      { title: "Complaint Details", dataIndex: "descParsed" },
      {
        title: "Response Action Plan",
        dataIndex: "actionParsed",
      },
      { title: "Resolution Status", dataIndex: "status" },
    ],
  };

  const COLUMNS = [
    { title: "Quarter", dataIndex: "quarter" },
    {
      title: "Count",
      dataIndex: "count",
      render: (count, record) => renderCount(count, record),
    },
  ];

  const FR_COLUMNS = [
    { title: "Period", dataIndex: "quarter" },
    { title: "Rating", dataIndex: "count", render: renderCount },
  ];

  const OVERVIEW_COLUMNS = {
    FR: FR_COLUMNS,
    FFDI: COLUMNS,
    AP: COLUMNS,
    CP: COLUMNS,
  };

  const structureOverviewData = () => {
    const frData = [];
    map(get(data, "clientCSAT"), (val, key) => {
      frData.push({
        quarter: key,
        count: isNaN(val.overallRating) ? 0 : val.overallRating,
        type: "FR",
      });
    });
    const ffdiData = [];
    map(get(data, "clientSatisFactionFeedbackAspect"), (val, key) => {
      ffdiData.push({ quarter: key, count: val.length, type: "FFDI" });
    });
    const apData = [];
    map(get(data, "appreciationData"), (val, key) => {
      apData.push({ quarter: key, count: val.length, type: "AP" });
    });
    const cpData = [];
    map(get(data, "complaintData"), (val, key) => {
      cpData.push({ quarter: key, count: val.length, type: "CP" });
    });
    setTableData({
      ...tableData,
      FR: {
        overview: {
          data: frData,
        },
      },
      FFDI: { overview: { data: ffdiData } },
      CP: { overview: { data: cpData } },
      AP: { overview: { data: apData } },
    });
  };

  const structureDetailedData = (record) => {
    setSelectedCard(record.type);
    if (record.type === "FR") {
      let detailedData = data["clientCSAT"][record.quarter];
      setTableData({
        ...tableData,
        [record.type]: {
          ...tableData[record.type],
          details: {
            title: `Client Rating (${record.quarter})`,
            data: [detailedData],
          },
        },
      });
    } else if (record.type === "CP") {
      let detailedData = data["complaintData"][record.quarter];
      detailedData = map(detailedData, (item) => {
        item.actionParsed = getText(item.action);
        item.descParsed = getText(item.description);
        return item;
      });
      setTableData({
        ...tableData,
        [record.type]: {
          ...tableData[record.type],
          details: {
            title: `Client Complaints (${record.quarter})`,
            data: detailedData,
          },
        },
      });
    } else if (record.type === "AP") {
      let detailedData = data["appreciationData"][record.quarter];
      detailedData = map(detailedData, (item) => {
        item.detailsParsed = getText(item.details);
        return item;
      });
      setTableData({
        ...tableData,
        [record.type]: {
          ...tableData[record.type],
          details: {
            title: `Client Appreciations (${record.quarter})`,
            data: detailedData,
          },
        },
      });
    } else if (record.type === "FFDI") {
      let detailedData =
        data["clientSatisFactionFeedbackAspect"][record.quarter];
      detailedData = map(detailedData, (item) => {
        item.issueDescParsed = getText(item.issue_Description);
        item.rootCauseParsed = getText(item.root_Cause);
        item.actionParsed = getText(item.action);
        item.remarksParsed = getText(item.remarks);
        return item;
      });
      setTableData({
        ...tableData,
        [record.type]: {
          ...tableData[record.type],
          details: {
            title: `Client Satisfaction Feedback Aspect (${record.quarter})`,
            data: detailedData,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (!data) {
      fetchProjectData({
        state,
        dispatch,
        project: selectedProject,
        activeTab: "CS",
      });
    } else {
      structureOverviewData();
      map(["DME", "DE", "PE"], (tab) =>
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
      {loading_CS && <Loader />}
      {!loading_CS && (
        <Element display="flex" justifyContent="space-around" flexWrap="wrap" marginTop="16px" marginLeft="30px" marginRight="20px">
          {map(CARDS_DATA, (card) => (
            <Card
              title={
                <CardTitle
                  card={card}
                  showCharts={showCharts}
                  setShowCharts={setShowCharts}
                />
              }
              key={card.key}
              className="CS_card"
            >
              {!showCharts[card.key] && (
                <>
                  <CardTexts title={card.title} subTitles={card.subTitles} />
                  <Table
                    size="small"
                    pagination={false}
                    dataSource={get(tableData, `${card.key}.overview.data`)}
                    columns={get(OVERVIEW_COLUMNS, `${card.key}`)}
                  />
                </>
              )}
              {showCharts[card.key] && (
             
               
                <LineChart
                  title="Client Rating [Target >= 3.0]"
                  data={get(tableData, `${card.key}.overview.data`)}
                  xAxisKey="quarter"
                  dataKey="count"
                  xAxisLabel="Period"
                  yAxisLabel="CSAT Rating"
                  target={3}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  cardType={card.key}
                />
               
              )}
            </Card>
          ))}
        </Element>
      )}
      {selectedCard && (
        <DetailsModal
          title={get(tableData, `${selectedCard}.details.title`)}
          columns={get(DETAILED_COLUMNS, `${selectedCard}`)}
          data={get(tableData, `${selectedCard}.details.data`)}
          onClose={() => setSelectedCard(null)}
        >
          {selectedCard === "FR" && (
            <Element margin="40px 0">
              {map(
                get(tableData, "FR.details.data[0].clientRating"),
                (item) => (
                  <Element
                    key={item.question}
                    backgroundColor="rgb(0,0,0,0.04)"
                    padding="12px"
                    margin="4px 0"
                  >
                    <Element type="p" fontWeight="bold">
                      {item.question}
                    </Element>
                    <Element type="p">{item.response || '-'}</Element>
                  </Element>
                )
              )}
            </Element>
          )}
        </DetailsModal>
      )}
    </>
  );
};

export default CS;
