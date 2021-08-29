import React from 'react';
import { Steps, Descriptions, Badge, Table, Tag, Space } from 'antd';

const { Step } = Steps;


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];    

const MyStreams = () => {
    return (
        <div>
            <Descriptions title="Stream Info" bordered>
                    <Descriptions.Item label="ID">2</Descriptions.Item>
                    <Descriptions.Item label="Token">SOL</Descriptions.Item>
                    <Descriptions.Item label="Start Time">2018-04-24 18:00:00</Descriptions.Item>
                    <Descriptions.Item label="End Time" span={2}>
                        2019-04-24 18:00:00
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="Amount">800.00</Descriptions.Item>
                    <Descriptions.Item label="Withdrawn">20.00</Descriptions.Item>
                    <Descriptions.Item label="Remaining">60.00</Descriptions.Item>
                    <Descriptions.Item label="Creation Info">
                        On: 2018-04-24 18:00:00
                        <br/>
                        Recipient: sol131jbibisbdsoiqnnzzz
                    </Descriptions.Item>
            </Descriptions>
            <br/>
            <br/>
            <Steps current={1}>
                <Step title="Started Streaming" description="On 25 Feb, 2021 @5:00 PM" />
                <Step title="In Progress" subTitle="Left 00:50:00" description="Streamed 234.22 SOL" />
                <Step title="Ends" description="On 25 Feb, 2021 @5:50 PM" />
            </Steps>
            <br/>
            <br/>
            <div>Select Stream</div>
            <Table bordered={true} columns={columns} dataSource={data} />
        </div>
    )
}

export default MyStreams;