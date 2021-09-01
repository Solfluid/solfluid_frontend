import React, { useState } from 'react';
import { Drawer, Steps, Button, Row, Col, Card, Slider } from 'antd';
import { useDispatch } from 'react-redux';

import { cancelStream } from '../../../actions';

const { Step } = Steps;
const { Meta } = Card;

const TableContent = ({startTime, endTime, withdrawn, receiver, streamed, statusID, earned, streamID}) => {
    const [drawer, setDrawer] = useState(false);
    const [ratio, setRatio] = useState(50);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    return (
        <div className="site-drawer-render-in-current-wrapper">
            <div style={{padding:30, border:"rgb(0,0,0,0.09) solid 1px"}}>
                <Row justify="space-between" align="middle">
                    <Col span={15}>
                        <Row gutter={[16,16]}>
                            <Col span={12}>
                                <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="Start Time" description={startTime}>
                                </Meta>
                            </Col>
                            <Col span={12}>
                                <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="End Time" description={endTime}>
                                </Meta>
                            </Col>
                            <Col span={12}>
                                <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="Withdrawn" description={withdrawn.toString()}>
                                </Meta>
                            </Col>
                            <Col span={12}>
                                <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-heading" title="Recipient" description={receiver}>
                                </Meta>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={8}>
                            <Card style={{backgroundColor:"white"}} className="card-custom-extra" title="Rewards Earned">
                                <Row justify="space-between">
                                    <div className="card-earned-number">{earned.toString()}</div>
                                    <Button type="primary" shape="round" onClick={()=>setDrawer(true)}>Close Stream</Button>
                                </Row>
                            </Card>
                    </Col>
                </Row>
                <br/>
                <br/>
                <Steps current={statusID}>
                    <Step title="Started Streaming" description={`On ${startTime}`} />
                    <Step title="In Progress" description={`Streaming ${streamed.toString()}`} />
                    <Step title="Ends" description={`On ${endTime}`} />
                </Steps>
            </div>
            <Drawer
          title="Choose reward ratio"
          placement="right"
          closable={true}
          onClose={()=>setDrawer(false)}
          visible={drawer}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
            <Slider
                min={0}
                max={100}
                onChange={(e)=>setRatio(e)}
                value={ratio}
            />
            <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-sub-heading" title="Sender reward" description={(earned - (earned*ratio)/100).toString()}>
            </Meta>
            <br/>
            <Meta style={{backgroundColor:"white"}} className="card-custom-extra item-sub-heading" title="Recipient reward" description={((earned*ratio)/100).toString()}>
            </Meta>
            <br/>
            <Button type="primary" shape="round" loading={loading} onClick={()=>{dispatch(cancelStream(streamID, ratio, receiver));setLoading(true); setTimeout(()=>setLoading(false),6000);}}>Submit</Button>
        </Drawer>
        </div>
    );
}

export default TableContent;