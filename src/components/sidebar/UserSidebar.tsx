import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import '../../styles/Sidebar.css';
import UsersMenuList from './UsersMenuList';

const { Sider, Content } = Layout;

const UserSidebar: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const updatedColorBgContainer: string = darkTheme ? '#483C32' : '#f5f2e9';

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        collapsible
        trigger={null}
        theme={darkTheme ? 'dark' : 'light'}
        className="usersidebar"
      >
        <UsersMenuList darkTheme={darkTheme} />
      </Sider>
      <Layout>
        <Content
          style={{ padding: '20px', backgroundColor: updatedColorBgContainer }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserSidebar;
