import { useContext, useEffect, useState } from "react";
import { fetchProjectData } from "../api";
import { Store } from "../StateProvider";
import { get, includes, map } from "lodash";
import Loader from "../components/Loader";
import { Card, Table } from "antd";
import Element from "../components/Element";
import DetailsModal from "../components/DetailsModal";
import { getText } from "../utils";
import CardTitle from "../components/CardTitle";
import LineChart from "../components/LineChart";
import CardTexts from "../components/CardTexts";

const DME = () => {
  const [tableData, setTableData] = useState(null);
  const [showCharts, setShowCharts] = useState({});
  const [selectedRisk, setSelectedRisk] = useState(null);
  const { state, dispatch } = useContext(Store);
  const { selectedProject, projectsData, projectsDetails, loading_DME } = state;
  const data = get(projectsData, `${selectedProject?.value}.DME`);
  const projectType = get(
    projectsDetails,
    `${selectedProject?.value}.projectType`
  );
  const isReleaseMode = includes(projectType, "release mode");

  const renderCount = (key, record) => {
    const count = get(record, `${key}.length`);
    return count > 0 ? (
      <a
        onClick={() =>
          setSelectedRisk({ month: record.month, key, data: record[key] })
        }
      >
        {count}
      </a>
    ) : (
      count
    );
  };

  const COLUMNS = {
    RC: [
      { title: isReleaseMode ? "Iteration" : "Month", dataIndex: "month" },
      {
        title: "Work Requests Assigned",
        dataIndex: "wrAssigned",
        hidden: isReleaseMode,
      },
      {
        title: isReleaseMode
          ? "No. of Requirements Planned"
          : "Work Requests Committed",
        dataIndex: "wrCommitted",
      },
      {
        title: isReleaseMode
          ? "No. Of Requirements Delivered"
          : "Work Requests Delivered On-Time",
        dataIndex: "wrDeliveredOnTime",
      },
      {
        title: "Work Requests Delivered With Delay",
        dataIndex: "wrDeliveredWithDelay",
        hidden: isReleaseMode,
      },
      {
        title: "Work Requests Delivered",
        dataIndex: "wrTotalDelivered",
        hidden: isReleaseMode,
      },
      {
        title: isReleaseMode
          ? "No. Requirements Moved to Backlog"
          : "Work Requests Backlog",
        dataIndex: "wrInprogress",
      },
      { title: "Task", dataIndex: "tcount", hidden: isReleaseMode },
      { title: "New Requirement", dataIndex: "nrCount", hidden: isReleaseMode },
      { title: "Change Request", dataIndex: "crCount", hidden: isReleaseMode },
      {
        title: "Delivered Defect",
        dataIndex: "deldefCount",
        hidden: isReleaseMode,
      },
      {
        title: "Work Requests Delivered On-time (%)",
        dataIndex: "reqDelOnTime",
      },
    ],
    MCT: [
      {
        title: "Month",
        dataIndex: "month",
        onCell: (val, index) => {
          if ((index + index * 3) % 3 === 0) {
            return {
              rowSpan: 3,
            };
          }
          return {
            rowSpan: 0,
          };
        },
      },
      {
        title: "Work Request Complexity",
        dataIndex: "complexity",
      },
      {
        title: "Work Request Delivery Cycle Time(d)",
        children: [
          {
            title: "Minimum",
            dataIndex: "min",
          },
          {
            title: "Maximum",
            dataIndex: "max",
          },
          {
            title: "Average",
            dataIndex: "avg",
          },
        ],
      },
    ],
    DR: [
      {
        title: "Month",
        dataIndex: "month",
      },
      {
        title: "Critical Delivery Risks Identified",
        render: (count, record) =>
          renderCount("criticalDeliveryRisksIdentified", record),
      },
      {
        title: "Delivery Risks Treated to Acceptable Level",
        dataIndex: "deliveryRisksTreatedToAcceptableLevel",
      },
      {
        title: "Risk Occurrence",
        render: (count, record) => renderCount("riskOccurrence", record),
      },
      {
        title: "Delivery Risk Exposure Rating[Target <= 1.0 - Quarterly]",
        children: [
          {
            title: "Before Risk Treatment",
            dataIndex: ["deliveryRiskExposureRating", "avg_risk_value"],
          },
          {
            title: "After Risk Treatment",
            dataIndex: ["deliveryRiskExposureRating", "avg_residual_value"],
          },
        ],
      },
    ],
    VC: [
      {
        title: "Iteration",
        dataIndex: "sprintName",
      },
      {
        title: "Committed Story Points",
        dataIndex: "committedStoryPoints",
      },
      {
        title: "Completed Story Points",
        dataIndex: "completedStoryPoints",
      },
    ],
  };

  const DETAILED_COLUMNS = {
    criticalDeliveryRisksIdentified: [
      {
        title: "Risk Key",
        dataIndex: "issueKey",
        render: (text, record) => (
          <a href={record?.issueLink} target="_blank">
            {text}
          </a>
        ),
      },
      {
        title: "Date",
        dataIndex: "reportedDate",
      },
      {
        title: "Risk Description",
        dataIndex: "riskDescription",
      },
      {
        title: "Impacted Parameter",
        dataIndex: "impactedParameter",
      },
      {
        title: "Risk Probability(RP)",
        dataIndex: "riskProbability",
      },
      {
        title: "Business Impact(BI)",
        dataIndex: "businessImpact",
      },
      {
        title: "Risk Value",
        dataIndex: "riskValue",
      },
      {
        title: "Business Impact Description",
        dataIndex: "businessImpactDes",
      },
      {
        title: "Risk Treatment Option",
        dataIndex: "riskTreatmentOp",
      },
      {
        title: "Risk Treatment Action / Control",
        dataIndex: "riskAction",
      },
      {
        title: "Responsibility",
        dataIndex: "responsibility",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
    ],
    riskOccurrence: [
      {
        title: "Risk Key",
        dataIndex: "key",
        render: (text, record) =>
          record?.issueLink ? (
            <a href={record?.issueLink} target="_blank">
              {text}
            </a>
          ) : (
            text
          ),
      },
      {
        title: "Risk Description",
        dataIndex: "riskDescription",
        render: (text) => getText(text),
      },
      {
        title: "Risk Occurrence Date",
        dataIndex: "occurrenceDate",
      },
      {
        title: "Risk Event Response Action",
        dataIndex: "eventResponseAction",
        render: (text) => getText(text),
      },
      {
        title: "Responsibility",
        dataIndex: "responsibility",
      },
      {
        title: "Remarks",
        dataIndex: "remarks",
      },
      {
        title: "Status",
        dataIndex: "status",
      },
    ],
  };

  const structureData = () => {
    const mctData = get(data, "meanCycleTime[0]", []);
    const finalDataMCT = [];
    map(mctData, (mct) => {
      map(["High", "Medium", "Low"], (complexity, idx) => {
        finalDataMCT.push({
          month: mct.month,
          complexity,
          min: get(mct, `min${complexity}Time`),
          max: get(mct, `max${complexity}Time`),
          avg: get(
            mct,
            `Med${complexity === "Medium" ? "Avg" : complexity}Time`
          ),
        });
      });
    });

    const riskData = get(data, "deliveryRisk", []);
    const monthsObj = {};
    map(riskData, (val, key) => {
      map(val, (arr, month) => {
        monthsObj[month] = {
          ...monthsObj[month],
          [key]: arr,
        };
        if (key === "deliveryRiskExposureRating") {
          arr.avg_residual_value =
            arr.avg_residual_value == "-" ? 0 : arr.avg_residual_value;
          arr.avg_risk_value =
            arr.avg_risk_value == "-" ? 0 : arr.avg_risk_value;
        }
      });
    });
    const finalDataDR = map(monthsObj, (obj, month) => ({
      month,
      ...obj,
    }));

    setTableData({
      ...tableData,
      MCT: { data: finalDataMCT },
      DR: { data: finalDataDR },
    });
  };

  useEffect(() => {
    if (!data) {
      fetchProjectData({
        state,
        dispatch,
        project: selectedProject,
        activeTab: "DME",
      });
    } else {
      structureData();
      map(["CS", "DE", "PE"], (tab) =>
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
      {loading_DME && <Loader />}
      {!loading_DME && (
        <Element display="flex" justifyContent="space-between" flexWrap="wrap" marginTop="16px" marginLeft="10px" marginRight="10px">
          <Card
            title="Requirements Compliance"
            className="DME_card card_width_100"
          >
            <CardTexts
              title="Requirements Compliance"
              subTitles={["[Requirements Delivered on Time Target = 100.0%]"]}
            />
            <Table
              scroll={{ x: true }}
              size="small"
              pagination={false}
              dataSource={get(data, "requirementComplaince", [])}
              columns={COLUMNS["RC"]}
            />
          </Card>
          {!isReleaseMode && (
            <Card title="Mean Cycle Time" className="DME_card">
              <CardTexts
                title="Mean Cycle Time"
                subTitles={["[Mean Cycle Time Target (d) = Reduce by 2.5%]"]}
              />
              <Table
                scroll={{ x: true }}
                size="small"
                pagination={false}
                dataSource={get(tableData, "MCT.data", [])}
                columns={COLUMNS["MCT"]}
              />
            </Card>
          )}
          {isReleaseMode && (
            <Card title="Velocity Chart" className="DME_card">
              <CardTexts title="Velocity Data" />
              <Table
                scroll={{ x: true }}
                size="small"
                pagination={false}
                dataSource={get(data, "velocityData", [])}
                columns={COLUMNS["VC"]}
              />
            </Card>
          )}
          <Card
            title={
              <CardTitle
                card={{
                  label: "Delivery Risk",
                  charts: true,
                  key: "DR",
                }}
                showCharts={showCharts}
                setShowCharts={setShowCharts}
              />
            }
            className="DME_card"
          >
            {!showCharts["DR"] && (
              <>
                <CardTexts title="Delivery Risk" />
                <Table
                  scroll={{ x: true }}
                  size="small"
                  pagination={false}
                  dataSource={get(tableData, "DR.data", [])}
                  columns={COLUMNS["DR"]}
                />
              </>
            )}
            {showCharts["DR"] && (
              <LineChart
                title="Risk Exposure Rating [Target <=1.0- Quarterly]"
                data={get(tableData, "DR.data", [])}
                xAxisKey="month"
                dataKey="deliveryRiskExposureRating.avg_risk_value"
                dataKey2="deliveryRiskExposureRating.avg_residual_value"
                xAxisLabel="Months"
                yAxisLabel="Risk Exposure Rating"
                target={1}
                ticks={[0, 1, 2, 3, 4, 5]}
                cardType="DR"
              />
            )}
          </Card>
        </Element>
      )}
      {selectedRisk && (
        <DetailsModal
          title={`Total Risks (${selectedRisk.month})`}
          columns={DETAILED_COLUMNS[selectedRisk.key]}
          data={selectedRisk.data}
          onClose={() => setSelectedRisk(null)}
        />
      )}
    </>
  );
};

export default DME;
