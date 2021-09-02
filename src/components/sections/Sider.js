import React, {useEffect} from "react";
import { Layout, Menu } from "antd";
import {
	HomeOutlined,
	DownloadOutlined,
	SendOutlined,
	FormOutlined,
	BarChartOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const SiderSection = (props) => {
	const location = useLocation()
	useEffect(()=>{
		props.setKey(props.getKey(location.pathname));
	},[props.keyName]);
	
	return (
		<Sider
			style={{
				overflow: "auto",
				height: "100vh",
				position: "fixed",
				left: 0,
				marginTop: 64,
				background: "white",
				border: "rgb(0,0,0,0.09) solid 1px",
			}}
			trigger={null}
			collapsible
			collapsed={props.collapsed}
		>
			<Menu theme="light" mode="inline" defaultSelectedKeys={[props.keyName]}>
				<Menu.Item key="1" icon={<HomeOutlined />}>
					<Link to="/"> Home </Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<SendOutlined />}>
					<Link to="/sending"> My Streams </Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<DownloadOutlined />}>
					<Link to="/receiving"> Receiving </Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<FormOutlined />}>
					<Link to="/createstream"> Create Stream </Link>
				</Menu.Item>
				<Menu.Item key="5" icon={<BarChartOutlined />}>
					<a href="https://solfluid.gitbook.io/docs/" target="_blank">Info</a>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default SiderSection;
