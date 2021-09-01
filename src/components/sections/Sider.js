import React from "react";
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
  const location = useLocation();
  const key = getKey(location.pathname);
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        marginTop: 64,
        background: "white",
      }}
      trigger={null}
      collapsible
      collapsed={props.collapsed}
    >
      <Menu theme="light" mode="inline" defaultSelectedKeys={[key]}>
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
          <Link to="/info"> Info </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

function getKey(path) {
  if (path.includes("/sending")) return "2";
  if (path.includes("/receiving")) return "3";
  if (path.includes("/createstream")) return "4";
  if (path.includes("/info")) return "5";
  return "1";
}

export default SiderSection;
