import React, { useState } from 'react';
import { Steps, Result, Layout, Form, Input, Button, InputNumber, Col, Select, DatePicker } from 'antd';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';

const { Step } = Steps;
const { Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;


const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};

const CreateStream = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [token, setToken] = useState();

    const stepContent = [
        (
            <Result
                icon={<SmileOutlined/>}
                title="Great, Lets get started!"
                extra={<Button type="primary" onClick={()=>setCurrentStep(1)}>Next</Button>}
            />
            
        ),
        (
            <Result
                icon={<SmileTwoTone/>}
                title=""    
            >
                <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}>
                    <Form.Item
                    label="Token"
                    name="Token"
                    rules={[{ required: true, message: 'Please Select Token!' }]}
                    >
                        <Select
                            placeholder="Select Token you want to stream"
                            onChange={setToken}
                            allowClear
                        >
                            <Option value="SOL">SOL</Option>
                            <Option disabled={true} value="NA">Coming soon</Option>
                            <Option disabled={true} value="NA">Coming soon</Option>
                        </Select>
                    </Form.Item>
            
                    <Form.Item
                    label="Amount"
                    name="Amount"
                    rules={[{ required: true, message: 'Enter a valid amount' }]}
                    >
                        <Input placeholder="Amount in Sol" />
                    </Form.Item>
                    <Form.Item name="range-time-picker" label="Start Time - End Time" {...rangeConfig}>
                        <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                    <Form.Item
                    label="Recipient"
                    name="Address"
                    rules={[{ required: true, message: 'Enter a valid address' }]}
                    >
                        <Input placeholder="Enter the address of recipient."/>
                    </Form.Item>
            
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    <Button style={{marginLeft:"5px"}} type="primary" onClick={()=>{setCurrentStep(0)}}>
                        Back
                    </Button>
                    </Form.Item>
                </Form>
          </Result>
        ),
    ]


    return (
        <div>
            <Col className="site-page-header">
                <h3 className="page-heading">Stream Tokens<br/><div className="page-sub-heading">Just follows two simple steps to start streaming SOL.</div></h3>
                
            </Col>
            <div style={{ backgroundColor: 'white', width:"100%", height:"80vh", padding:20 }}>
                <Steps className="steps" current={currentStep}>
                    <Step title="Step 1" description="Confirmation" />
                    <Step title="Step 2" description="Fill the details" />
                    <Step title="Step 3" description="All Done!" />
                </Steps>
                <Content className="form-content">
                    {stepContent[currentStep]}
                </Content>
            </div>
        </div>
    );
}

export default CreateStream;