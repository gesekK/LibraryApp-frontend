import React, { useState } from 'react';
import { Menu } from 'antd';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';

interface MenuListProps {
  darkTheme: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ darkTheme }) => {
  const sidebarColor: string = darkTheme ? '#483C32' : '#f5f2e9';
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode="inline"
      className="menu-bar"
      style={{ background: sidebarColor }}
    >
      <Logo />
      <Menu.Item className="menu-item" key="home">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="loan" title="Loans">
        <Link to="/loanList">Loans</Link>
      </Menu.Item>
      <Menu.SubMenu key="user" title="Users">
        <Menu.Item key="addUser">
          <Link to="/addUser">Add User</Link>
        </Menu.Item>
        <Menu.Item key="userList">
          <Link to="/userList">User List</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="books" title="Books">
        <Menu.Item key="addBook">
          <Link to="/addBook">Add Book</Link>
        </Menu.Item>
        <Menu.Item key="bookList">
          <Link to="/bookList">Book List</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="reviews" title="Reviews">
        <Link to="/reviewList">Reviews</Link>
      </Menu.Item>
      <div className="language-switcher">
        <LanguageSwitcher></LanguageSwitcher>
      </div>
    </Menu>
  );
};

export default MenuList;
