import React from 'react';
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    DownloadOutlined,
    SendOutlined,
    FormOutlined,
    BarChartOutlined
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const SiderSection = (props) => {
    return (
        <Sider style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            marginTop:64,
            background:'white',
            border:"rgb(0,0,0,0.09) solid 1px"
          }} trigger={null} collapsible collapsed={props.collapsed}>
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<HomeOutlined/>}>
                   <Link to="/"> Home </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<SendOutlined/>}>
                    <Link to="/mystreams/address"> My Streams </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<DownloadOutlined/>}>
                    <Link to="/stream/id"> Receiving </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FormOutlined/>}>
                    <Link to="/createstream"> Create Stream </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<BarChartOutlined/>}>
                    <Link to="info"> Info </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default SiderSection;