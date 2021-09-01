import React from 'react';
import { Descriptions, Badge, Steps, Button, Row, Col, Card } from 'antd';

const { Step } = Steps;
const { Meta } = Card;

const TableContent = ({startTime, endTime, withdrawn, receiver, streamed, statusID}) => {
    return (
        <div style={{padding:30, border:"rgb(0,0,0,0.09) solid 1px"}}>
            <Row justify="space-between" align="middle">
                <Col span={15}>
                    <Row gutter={[16,16]}>
                        <Col span={12}>
                            <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="Start Time" description={new Date().toUTCString()}>
                            </Meta>
                        </Col>
                        <Col span={12}>
                            <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="End Time" description={new Date().toUTCString()}>
                            </Meta>
                        </Col>
                        <Col span={12}>
                            <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="Withdrawn" description="100">
                            </Meta>
                        </Col>
                        <Col span={12}>
                            <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="Recipient" description="HDcjW4MVa5rENKAMHcyzzXYnRRKVEw8Y8FmYv9QdoGct">
                            </Meta>
                        </Col>
                    </Row>
                </Col>

                <Col span={8}>
                        <Card style={{backgroundColor:"white"}} className="card-custom-extra" title="Rewards Earned">
                            <Row justify="space-between">
                                <div className="card-earned-number">0.00</div>
                                <Button type="primary" shape="round">Cancel Stream</Button>
                            </Row>
                        </Card>
                </Col>
                {/* <Descriptions bordered>
                        <Descriptions.Item className="card" label="Start Time" labelStyle={{color: "rgba(24, 24, 24, 0.8)",fontWeight: "500",fontSize: "small"}}>{startTime}</Descriptions.Item>
                        <Descriptions.Item label="End Time" labelStyle={{color: "rgba(24, 24, 24, 0.8)",fontWeight: "500",fontSize: "small"}} span={2}>
                            {endTime}
                        </Descriptions.Item>
                        <Descriptions.Item label="Withdrawn" labelStyle={{color: "rgba(24, 24, 24, 0.8)",fontWeight: "500",fontSize: "small"}}>{withdrawn}</Descriptions.Item>
                        <Descriptions.Item label="Recipient" labelStyle={{color: "rgba(24, 24, 24, 0.8)",fontWeight: "500",fontSize: "small"}}>
                            {receiver}
                        </Descriptions.Item>
                </Descriptions>
                <Col align="center">
                    <div className="card-custom-both" style={{margin:10, backgroundColor:"white"}}>Earned: 10</div>
                    <Button type="primary" shape="round">Cancel Stream</Button>
                </Col> */}
              </Row>
              <br/>
              <br/>
              <Steps current={statusID}>
                  <Step title="Started Streaming" description={`On ${startTime}`} />
                  <Step title="In Progress" subTitle="Left 00:50:00" description={`Streamed ${streamed}`} />
                  <Step title="Ends" description={`On ${endTime}`} />
              </Steps>
        </div>
    );
}

export default TableContent;