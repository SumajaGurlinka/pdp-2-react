import { useContext, useEffect, useState } from "react";
import { fetchProjectData } from "../api";
import { Store } from "../StateProvider";
import { cloneDeep, get, includes, map, omit, set, slice } from "lodash";
import Loader from "../components/Loader";
import Element from "../components/Element";
import { Button, Card, Table } from "antd";
import DetailsModal from "../components/DetailsModal";
import CardTitle from "../components/CardTitle";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import CardTexts from "../components/CardTexts";

const CARDS_DATA = [
  {
    key: "DD",
    label: "Defect Data",
    title: "Defect Distribution Data",
    subTitles: [
      "[Delivered Defects Target: High = 0.0, Medium = 0.0, Low <= 2.0]",
      "[In-Process Defects Target = Reduce by 2.5%]",
    ],
    charts: true,
    chartType: "bar",
    chartTitle: "Defects Count",
    xAxisKey: "month",
    dataKeys: [
      {
        key: "defectData.deliveryTotalCount",
        color: "#CD3629",
        label: "Delivered Defects",
      },
      {
        key: "defectData.reviewTotalCount",
        color: "#FA6834",
        label: "Review Defects",
      },
      {
        key: "defectData.testingTotalCount",
        color: "#FFDD99",
        label: "Testing Defects",
      },
    ],
    xAxisLabel: "Months",
    yAxisLabel: "Count of defects",
    ticks: [0, 10, 20, 30, 40, 50],
  },
  {
    key: "REA",
    label: "Review Effectiveness (Analysis, Design And Coding)",
    title: "Review Effectiveness (Analysis, Design and Coding)",
  },
  {
    key: "RE",
    label: "Review Effectiveness",
    title: "Defect Removal Efficiency",
    charts: true,
    chartTitle: "Review Effectiveness[Target>=60.0% - Quarterly]",
    xAxisKey: "month",
    dataKey: "reviewEffectiveness",
    xAxisLabel: "Months",
    yAxisLabel: "Review Effectiveness %",
    target: "60",
    ticks: [0, 25, 50, 75, 100],
  },
  { key: "TEST", label: "Testing", title: "Testing" },

  {
    key: "DRE",
    label: "DRE",
    title: "Defect Removal Efficiency",
    charts: true,
    chartTitle: "Defect Removal Efficiency [Target>=97.0% - Quarterly]",
    xAxisKey: "month",
    dataKey: "defectRemovalEffectiveness",
    xAxisLabel: "Months",
    yAxisLabel: "DRE(%)",
    target: "97",
    ticks: [0, 25, 50, 75, 100],
  },
  {
    key: "FTR",
    label: "FTR Requirements",
    title: "Software Quality",
    charts: true,
    chartTitle:
      "Requirements Delivered First Time Right[Target>=97.0% - Quarterly]",
    xAxisKey: "month",
    dataKey: "requirements_delivered_first_time_right",
    xAxisLabel: "Months",
    yAxisLabel: "SRF(%)",
    target: "97",
    ticks: [0, 25, 50, 75, 100],
  },
];

const DE = () => {
  const [columns, setColumns] = useState([]);
  const [showCharts, setShowCharts] = useState({});
  const [showDistribution, setShowDistribution] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { selectedProject, projectsData, projectsDetails, loading_DE } = state;
  const data = get(projectsData, `${selectedProject?.value}.DE`);
  const projectType = get(
    projectsDetails,
    `${selectedProject?.value}.projectType`
  );
  const isReleaseMode = includes(projectType, "release mode");

  const COLUMNS = {
    DD: [
      {
        title: isReleaseMode ? "Iteration" : "Month",
        dataIndex: "month",
      },
      {
        title: "Total Delivered Defects",
        dataIndex: ["defectData", "deliveryTotalCount"],
        children: [
          {
            title: "High",
            dataIndex: ["defectData", "deliveryHighCount"],
          },
          {
            title: "Medium",
            dataIndex: ["defectData", "deliveryMediumCount"],
          },
          {
            title: "Low",
            dataIndex: ["defectData", "deliveryLowCount"],
          },
          {
            title: "Total",
            dataIndex: ["defectData", "deliveryTotalCount"],
          },
        ],
      },
      {
        title: "Total Review Defects",
        dataIndex: ["defectData", "reviewTotalCount"],
        children: [
          {
            title: "High",
            dataIndex: ["defectData", "reviewHighCount"],
          },
          {
            title: "Medium",
            dataIndex: ["defectData", "reviewMediumCount"],
          },
          {
            title: "Low",
            dataIndex: ["defectData", "reviewLowCount"],
          },
          {
            title: "Total",
            dataIndex: ["defectData", "reviewTotalCount"],
          },
        ],
      },
      {
        title: "Total Testing Defects",
        dataIndex: ["defectData", "testingTotalCount"],
        children: [
          {
            title: "High",
            dataIndex: ["defectData", "testingHighCount"],
          },
          {
            title: "Medium",
            dataIndex: ["defectData", "testingMediumCount"],
          },
          {
            title: "Low",
            dataIndex: ["defectData", "testingLowCount"],
          },
          {
            title: "Total",
            dataIndex: ["defectData", "testingTotalCount"],
          },
        ],
      },
      {
        title: "Total InProcess Defects",
        dataIndex: ["defectData", "inprocessTotalCount"],
        children: [
          {
            title: "High",
            dataIndex: ["defectData", "inprocessHighCount"],
          },
          {
            title: "Medium",
            dataIndex: ["defectData", "inprocessMediumCount"],
          },
          {
            title: "Low",
            dataIndex: ["defectData", "inprocessLowCount"],
          },
          {
            title: "Total",
            dataIndex: ["defectData", "inprocessTotalCount"],
          },
        ],
      },
    ],
    REA: [
      {
        title: isReleaseMode ? "Iteration" : "Month",
        dataIndex: "month",
      },
      {
        title: "Total Testing Defects",
        dataIndex: "total_testing_defects",
      },
      {
        title: "Review Defects (Analysis, Design and Coding)",
        dataIndex: "total_review_defects",
      },
      {
        title: "Inprocess Defects (Analysis, Design and Coding)",
        dataIndex: "total_inprocess_defects",
      },
      {
        title: "Review Effectiveness(%) (Analysis, Design and Coding)",
        dataIndex: "reviewEffectiveness",
      },
    ],
    RE: [
      {
        title: isReleaseMode ? "Iteration" : "Month",
        dataIndex: "month",
      },
      {
        title: "Unit Testing Defects",
        dataIndex: "total_unit_test_design_review_effort",
      },
      {
        title: "Total Testing Defects",
        dataIndex: "total_testing_defects",
      },
      {
        title: "Total Review Defects",
        dataIndex: "total_review_defects",
      },
      {
        title: "Total Inprocess Defects",
        dataIndex: "total_inprocess_defects",
      },
      {
        title: "Review Effectiveness(%)",
        dataIndex: "reviewEffectiveness",
      },
      {
        title: "Testing Effectiveness(%)",
        dataIndex: "testingEffectiveness",
      },
      {
        title: "Delivered Defects",
        dataIndex: "deliveredDefects",
      },
      {
        title: "Defect Removal Efficiency(DRE)(%)",
        dataIndex: "defectRemovalEffectiveness",
      },
    ],
    TEST: [
      {
        title: isReleaseMode ? "Iteration" : "Month",
        dataIndex: "month",
      },
      {
        title: "Test Design Planned",
        dataIndex: "testdesign_planned",
      },
      {
        title: "Test Design Developed",
        dataIndex: "testdesign_developed",
      },
      {
        title: "Total No. of Defects in Test Design",
        dataIndex: "total_defects_inTestDesign",
      },
      {
        title: "Test Design Quality",
        dataIndex: "test_design_quality",
      },
      {
        title: "Test Cases Planned for Execution",
        dataIndex: "test_cases_planned_for_execution",
      },
      {
        title: "Test Cases Actually Executed",
        dataIndex: "test_cases_actually_executed",
      },
      {
        title: "Test Execution (%)",
        dataIndex: "testExecution",
      },
      {
        title: "Test Coverage (%)",
        dataIndex: "testCoverage",
      },
    ],
    DRE: [
      {
        title: isReleaseMode ? "Iteration" : "Month",
        dataIndex: "month",
      },
      {
        title: "Unit Testing Defects",
        dataIndex: "total_unit_test_design_review_effort",
      },
      {
        title: "Total Testing Defects",
        dataIndex: "total_testing_defects",
      },
      {
        title: "Total Review Defects",
        dataIndex: "total_review_defects",
      },
      {
        title: "Total Inprocess Defects",
        dataIndex: "total_inprocess_defects",
      },
      {
        title: "Review Effectiveness(%)",
        dataIndex: "reviewEffectiveness",
      },
      {
        title: "Testing Effectiveness(%)",
        dataIndex: "testingEffectiveness",
      },
      {
        title: "Delivered Defects",
        dataIndex: "deliveredDefects",
      },
      {
        title: "Defect Removal Efficiency(DRE)(%)",
        dataIndex: "defectRemovalEffectiveness",
      },
    ],
    FTR: [
      {
        title: isReleaseMode ? "Iteration" : "Month",
        dataIndex: "month",
      },
      {
        title: "Total Software Requirements Delivered",
        dataIndex: "total_software_requirements_delivered",
      },
      {
        title: "Total Software Requirements Passed FTR (by client)",
        dataIndex: "total_software_requirements_passedFTR",
      },
      {
        title: "Requirements Delivered First Time Right (%)",
        dataIndex: "requirements_delivered_first_time_right",
      },
    ],
  };

  const configColumns = () => {
    let ddCols = cloneDeep(COLUMNS.DD);
    ddCols = map(ddCols, (col) => omit(col, "children"));
    setColumns({
      ...columns,
      DD: ddCols,
    });
  };

  const getData = (key) => {
    if (["TEST", "FTR"].includes(key)) {
      return get(data, "testingAndFTR");
    }
    let array = get(data, "reviewEffectivenessAndDRE");
    const lastItem = slice(array, -1);
    if (get(lastItem, "0.month") === "Cumulative") {
      array = cloneDeep(array);
      array.pop();
    }
    return array;
  };

  useEffect(() => {
    if (!data) {
      fetchProjectData({
        state,
        dispatch,
        project: selectedProject,
        activeTab: "DE",
      });
    } else {
      configColumns();
      map(["CS", "DME", "PE"], (tab) =>
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
      {loading_DE && <Loader />}
      {!loading_DE && (
        <Element display="flex" justifyContent="space-around" flexWrap="wrap" marginTop="16px">
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
              className="DE_card"
            >
              {!showCharts[card.key] && (
                <>
                  <CardTexts title={card.title} subTitles={card.subTitles} />
                  <Table
                    scroll={{ x: true }}
                    size="small"
                    pagination={false}
                    dataSource={getData(card.key)}
                    columns={
                      card.key === "DD"
                        ? get(columns, `${card.key}`)
                        : COLUMNS[card.key]
                    }
                  />
                </>
              )}
              {showCharts[card.key] && card.chartType !== "bar" && (
                <LineChart
                  title={card.chartTitle}
                  data={getData(card.key)}
                  xAxisKey={card.xAxisKey}
                  dataKey={card.dataKey}
                  xAxisLabel={card.xAxisLabel}
                  yAxisLabel={card.yAxisLabel}
                  target={card.target}
                  ticks={card.ticks}
                  cardType={card.key}
                />
              )}
              {showCharts[card.key] && card.chartType === "bar" && (
                <BarChart
                  title={card.chartTitle}
                  data={getData(card.key)}
                  xAxisKey={card.xAxisKey}
                  dataKeys={card.dataKeys}
                  xAxisLabel={card.xAxisLabel}
                  yAxisLabel={card.yAxisLabel}
                  ticks={card.ticks}
                />
              )}

              {card.key === "DD" && (
                <Element textAlign="right" marginTop="20px">
                  <Button onClick={() => setShowDistribution(true)}>
                    More
                  </Button>
                </Element>
              )}
            </Card>
          ))}
        </Element>
      )}
      {showDistribution && (
        <DetailsModal
          title="Defect Distribution Data"
          columns={get(COLUMNS, "DD")}
          data={get(data, `reviewEffectivenessAndDRE`)}
          onClose={() => setShowDistribution(false)}
        />
      )}
    </>
  );
};

export default DE;
