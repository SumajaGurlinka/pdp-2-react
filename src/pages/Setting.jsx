import React, { useContext } from "react";
import { Card, Tooltip } from "antd";
import { SecurityScanOutlined } from "@ant-design/icons";
import { ControlOutlined } from "@ant-design/icons";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import image from "../assets/image.png";
import risk from "../assets/risk1.jpg";
import appreciation from "../assets/hands.png";
import client11 from "../assets/client11.png";
import technology from "../assets/technology.jpg";
import complaint from "../assets/complaint.jpg";
import satisfaction from "../assets/satisfaction.jpg";
import { useState, useEffect } from "react";
import { FileTextOutlined } from "@ant-design/icons";
import Element from "../components/Element";
import Appreciation from "./Appreciation";
import ActionTypes from "../ActionTypes";
import { Store } from "../StateProvider";
import Complaint from "./Complaint";
import Risk from "./Risk";
import CSAT from "./CSAT";

const Settings = () => {
  const [Appreciationclick, setAppreciationclick] = useState(false);
  const [ComplaintClick, setComplaintClick] = useState(false);
  const [RiskClick, setRiskClick] = useState(false);
  const [CSATClick, setCSATClick] = useState(false);
  const { state, dispatch } = useContext(Store);

  const handleCardClick = () => {
    const url = "https://example.com";

    window.open(url, "_blank");
  };
  const handleAppreciationCardClick = () => {
    setAppreciationclick(true);
  };
  const handleComplaintCardClick = () => {
    setComplaintClick(true);
  };
  const handleRiskCardClick = () => {
    setRiskClick(true);
  };
  const handleComplaintCSATClick = () => {
    setCSATClick(true);
  };

  return (
    <>
      {!Appreciationclick && !ComplaintClick && !RiskClick && !CSATClick ? (
        <Element marginTop="10px" marginLeft="8px" marginRight="8px">
          <Card title="Settings" className="PR_card card_width_100">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
              <Card
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                onClick={handleCardClick}
                hoverable
                cover={<FileTextOutlined style={{ fontSize: "46px" }} />}
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip title="About Project" placement="bottom">
                    <Card.Meta title="About Project" />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={client11}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </div>
                }
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip title="Client Supplied Item" placement="bottom">
                    <Card.Meta title="Client Supplied Item" />
                  </Tooltip>
                </div>
              </Card>

              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={image}
                        style={{ width: "40px", height: "50px" }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Tooltip title="Retrospective" placement="bottom">
                        <Card.Meta title="Retrospective" />
                      </Tooltip>
                    </div>
                  </>
                }
              ></Card>

              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={<AccountTreeIcon style={{ fontSize: "48px" }} />}
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip title="Project Process" placement="bottom">
                    <Card.Meta title="Project Process" />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={technology}
                      style={{ width: "70px", height: "50px" }}
                    />
                  </div>
                }
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip title="Technology Environment" placement="bottom">
                    <Card.Meta title="Technology Environment" />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={<PendingActionsIcon style={{ fontSize: "48px" }} />}
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip title="Action Item Status" placement="bottom">
                    <Card.Meta title="Action Item Status" />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={<SecurityScanOutlined style={{ fontSize: "48px" }} />}
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip
                    title="Network Connectivity and Information Security"
                    placement="bottom"
                  >
                    {" "}
                    <Card.Meta
                      title={
                        <div style={{ whiteSpace: "normal" }}>
                          Network Connectivity and Information Security
                        </div>
                      }
                    />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",

                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={<ControlOutlined style={{ fontSize: "48px" }} />}
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip
                    title="Configurration and Change Control"
                    placement="bottom"
                  >
                    <Card.Meta
                      title={
                        <div style={{ whiteSpace: "normal" }}>
                          Configuration and Change Control
                        </div>
                      }
                    />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                cover={<AccessTimeIcon style={{ fontSize: "48px" }} />}
              >
                <div style={{ textAlign: "center" }}>
                  <Tooltip title="Minutes of Meeting" placement="bottom">
                    <Card.Meta title="Minutes of Meeting" />
                  </Tooltip>
                </div>
              </Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                onClick={handleAppreciationCardClick}
                cover={
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={appreciation}
                        style={{ width: "40px", height: "50px" }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Tooltip title="Appreciation" placement="bottom">
                        <Card.Meta title="Appreciation" />
                      </Tooltip>
                    </div>
                  </>
                }
              ></Card>

              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                onClick={handleRiskCardClick}
                cover={
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={risk}
                        style={{ width: "40px", height: "50px" }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Tooltip title="Risk" placement="bottom">
                        <Card.Meta title="Risk" />
                      </Tooltip>
                    </div>
                  </>
                }
              ></Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                onClick={handleComplaintCardClick}
                cover={
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={complaint}
                        style={{ width: "60px", height: "50px" }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Tooltip title="Complaints" placement="bottom">
                        <Card.Meta title="Complaints" />
                      </Tooltip>
                    </div>
                  </>
                }
              ></Card>
              <Card
                hoverable
                style={{
                  width: 270,
                  height: "150px",
                  padding: "10px",
                  border: "1px solid rgba(159, 62, 141, 0.3)",
                }}
                onClick={handleComplaintCSATClick}
                cover={
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={satisfaction}
                        style={{ width: "60px", height: "50px" }}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <Tooltip title="CSAT" placement="bottom">
                        <Card.Meta title="CSAT" />
                      </Tooltip>
                    </div>
                  </>
                }
              ></Card>
            </div>
          </Card>{" "}
        </Element>
      ) : null}
      {Appreciationclick && <Appreciation />}
      {ComplaintClick && <Complaint />}
      {RiskClick && <Risk />}
      {CSATClick && <CSAT />}
    </>
  );
};
export default Settings;
