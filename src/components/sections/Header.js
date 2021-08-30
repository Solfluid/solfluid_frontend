import React from "react";
import { Layout, Row, Col, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { toggleWallet } from "../../solana/wallet";
const { Header } = Layout;

const HeaderSection = (props) => {
  const toggle = () => {
    props.setCollapsed(!props.collapsed);
  };

  return (
    <Header
      className="site-layout-background"
      style={{ padding: 0, position: "fixed", zIndex: 1, width: "100%" }}
    >
      <Row justify="space-between">
        <Row>
          <Col>
            <span className="trigger" onClick={toggle}>
              {props.collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            </span>
          </Col>
          <Col>
            <div className="logo">SOLFUILD</div>
          </Col>
        </Row>
        <Col style={{ marginRight: "15px" }}>
          <Button
            type="primary"
            icon={<LoginOutlined />}
            onClick={(e) => {
              e.preventDefault();
              toggleWallet();
            }}
            shape="round"
          >
            Connect Wallet
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderSection;
