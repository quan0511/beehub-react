import React, {useState} from "react";
import {Layout, Menu, SiderProps, theme} from 'antd';
import {Link} from "react-router-dom";

import "./HomeLayout.scss";
import {Trigger} from "../components/Trigger/Trigger";

const {Header, Content, Footer, Sider} = Layout;

const siderProps: SiderProps = {
    breakpoint: "lg",
    collapsedWidth: "0",
    onBreakpoint: (broken) => {
        console.log(broken);
    },
    onCollapse: (collapsed, type) => {
        console.log(collapsed, type);
    },
    style: {background: "unset"},
    trigger: null,
};

export function HomeLayout() {
    const isLargeScreen = window.matchMedia('(min-width: 1024px)').matches;
    const [collapsed, setCollapsed] = useState<boolean>(!isLargeScreen);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                {...siderProps}
                collapsed={collapsed}
            >
                <div className="logo d-flex justify-content-center">
                    <img
                        src="https://mythemestore.com/beehive-preview/wp-content/themes/beehive/assets/images/logo-icon.svg"
                        alt="logo"/>
                </div>

                <Menu className="menu" theme="light" mode="inline" defaultSelectedKeys={['home']}
                      selectedKeys={['home']}>
                    <Menu.Item key={"home"} icon={'🏠'}><Link to={'/'}>Home</Link></Menu.Item>
                    <Menu.Item key={"admin"} icon={'🥷'}><Link to={'/admin'}>Admin</Link></Menu.Item>
                    <Menu.Item key={"login"} icon={'🚪'}><Link to={'/login'}>Login</Link></Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className={"header"}>
                    <div className="d-flex align-items-center">
                        <Trigger collapsed={collapsed} setCollapsed={setCollapsed}/>
                        <div>
                            Header goes here!
                        </div>
                    </div>
                </Header>
                <Content style={{margin: '24px 16px 0'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        content goes here !!!
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Beehub Design ©{new Date().getFullYear()} Created by RailwaySquad
                </Footer>
            </Layout>
        </Layout>
    );
}