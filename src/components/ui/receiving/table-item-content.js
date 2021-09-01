import React from "react";
import { Descriptions, Badge, Steps, Button, Row, Col } from "antd";
import { useDispatch } from "react-redux";

import { cancelStream } from "../../../actions";

const { Step } = Steps;

const TableContent = ({
  startTime,
  endTime,
  withdrawn,
  receiver,
  streamid,
  streamed,
  statusID,
}) => {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 30 }}>
      <Row justify="space-around" align="middle">
        <Descriptions bordered>
          <Descriptions.Item label="Start Time">{startTime}</Descriptions.Item>
          <Descriptions.Item label="End Time" span={2}>
            {endTime}
          </Descriptions.Item>
          <Descriptions.Item label="Withdrawn">{withdrawn}</Descriptions.Item>
          <Descriptions.Item label="Recipient">{receiver}</Descriptions.Item>
        </Descriptions>
        <Col align="center">
          <div
            className="card-custom-both"
            style={{ margin: 10, backgroundColor: "white" }}
          >
            Earned: 10
          </div>
          <Button
            onClick={() => dispatch(cancelStream(streamid, 50, receiver))}
          >
            Cancel Stream
          </Button>
        </Col>
      </Row>
      <br />
      <br />
      <Steps current={statusID}>
        <Step title="Started Streaming" description={`On ${startTime}`} />
        <Step
          title="In Progress"
          subTitle="Left 00:50:00"
          description={`Streamed ${streamed}`}
        />
        <Step title="Ends" description={`On ${endTime}`} />
      </Steps>
    </div>
  );
};

export default TableContent;
