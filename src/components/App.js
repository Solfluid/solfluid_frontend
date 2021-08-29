import React, { useState } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import Sider from './sections/Sider';
import Header from './sections/Header';
import './css/navbar.css';
import Dashboard from './layouts/Dashboard';
import MyStreams from './layouts/MyStreams';
import Stream from './layouts/Stream';
import CreateStream from './layouts/CreateStream';

const { Content }  = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout>
            <Header 
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
        
            <Layout>
                <Sider collapsed={collapsed}/>
                <Layout className="site-layout" style={{marginLeft:`${collapsed?'80px':'200px'}`}}>
                    <Content
                        className="site-layout-background"
                        style={{
                        marginRight: 16,
                        marginLeft: 16,
                        marginTop: 80,
                        padding: 20,
                        height: '87vh',//?
                        overflow: 'initial' 
                        }}>
                            <Switch>
                                <Route path='/mystreams/:address'>
                                    <MyStreams/>
                                </Route>
                                <Route path='/stream/:streamID'>
                                    <Stream/>
                                </Route>
                                <Route path='/createstream'>
                                    <CreateStream/>
                                </Route>
                                <Route path='/'>
                                    <Dashboard/>
                                </Route>
                            </Switch>
                    </Content>
                </Layout>
                
            </Layout>
        </Layout>
    );
}

export default App;