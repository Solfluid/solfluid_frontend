import React from "react";
import { Layout, Row, Col, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { connectWallet, disconnectWallet } from "../../actions";

const { Header } = Layout;

const HeaderSection = (props) => {
    const toggle = () => {
      props.setCollapsed(!props.collapsed);
    };

    const selector = useSelector(state=>state.walletConfig);
    const dispatch = useDispatch();

    const handleOnClick = (e) => {
      e.preventDefault();
      if(selector.wallet.connected){
        dispatch(disconnectWallet());
      }else{
        dispatch(connectWallet());
      }
    }

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
              icon={(selector.wallet.connected)?<LogoutOutlined/>:<LoginOutlined />}
              onClick={handleOnClick}
              shape="round"
            >
			{selector.wallet.connected?"Disconnect Wallet":"Connect Wallet"}
            </Button>
          </Col>
        </Row>
      </Header>
    );
};

export default HeaderSection;
