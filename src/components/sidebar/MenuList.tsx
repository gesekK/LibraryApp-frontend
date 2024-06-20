import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface MenuListProps {
  darkTheme: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ darkTheme }) => {
  const sidebarColor: string = darkTheme ? '#483C32' : '#f5f2e9';
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    // Navigate to login page
    window.location.href = '/login'; // This will refresh the page and redirect to /login
  };

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode="inline"
      className="user-menu-bar"
      style={{ background: sidebarColor }}
    >
      <Menu.Item className="menu-item" key="loan" title="Loans">
        <Link to="/admin/loanList">{t('sidebar.Loans')}</Link>
      </Menu.Item>
      <Menu.SubMenu key="user" title="Users">
        <Menu.Item key="addUser">
          <Link to="/admin/addUser">{t('sidebar.Add User')}</Link>
        </Menu.Item>
        <Menu.Item key="userList">
          <Link to="/admin/userList">{t('sidebar.User List')}</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="books" title="Books">
        <Menu.Item key="addBook">
          <Link to="/admin/addBook">{t('sidebar.Add Book')}</Link>
        </Menu.Item>
        <Menu.Item key="bookList">
          <Link to="/admin/bookList">{t('sidebar.Book List')}</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="reviews" title="Reviews">
        <Link to="/admin/reviewList">{t('sidebar.Reviews')}</Link>
      </Menu.Item>
      <Menu.Item key="LogOut" onClick={handleLogout}>
        {t('sidebar.Log Out')}
      </Menu.Item>
      <div className="language-switcher">
        <LanguageSwitcher />
      </div>
    </Menu>
  );
};

export default MenuList;
