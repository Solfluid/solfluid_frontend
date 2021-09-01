import React, { useState } from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import Sider from "./sections/Sider";
import Header from "./sections/Header";
import "./css/main-layout.css";
import "./css/create-stream.css";
import Dashboard from "./layouts/Dashboard";
import MyStreams from "./layouts/MyStreams";
import Stream from "./layouts/Stream";
import CreateStream from "./layouts/CreateStream";

const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout>
        <Sider collapsed={collapsed} />
        <Layout
          className="site-layout"
          style={{ marginLeft: `${collapsed ? "80px" : "200px"}` }}
        >
          <Content
            className="site-layout-background"
            style={{
              // marginRight: 16,
              // marginLeft: 16,
              // marginTop: 80,
              marginTop: 64,
              // marginBottom: 20,
              height: "89vh", //?
              overflow: "initial",
              backgroundColor: "rgb(234,249,254)",
            }}
          >
            <Switch>
              <Route path="/sending">
                <MyStreams />
              </Route>
              <Route path="/receiving">
                <Stream />
              </Route>
              <Route path="/createstream">
                <CreateStream />
              </Route>
              <Route path="/">
                <Dashboard collapsed={collapsed} />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
