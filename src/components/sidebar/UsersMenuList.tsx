import React, { useState } from 'react';
import { Menu } from 'antd';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface MenuListProps {
  darkTheme: boolean;
}

const UsersMenuList: React.FC<MenuListProps> = ({ darkTheme }) => {
  const sidebarColor: string = darkTheme ? '#483C32' : '#f5f2e9';
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode="inline"
      className="menu-bar"
      style={{ background: sidebarColor }}
    >
      <Menu.Item className="user-menu-item" key="loan" title="Loans">
        <Link to="/reader/usersLoanList">{t('sidebar.Loans')}</Link>
      </Menu.Item>
      <Menu.Item key="bookList">
        <Link to="/reader/usersBookList">{t('sidebar.Books')}</Link>
      </Menu.Item>
      <Menu.Item key="reviews" title="Reviews">
        <Link to="/reader/reviewList">{t('sidebar.Reviews')}</Link>
      </Menu.Item>
      <Menu.Item key="LogOut" onClick={handleLogout}>
        <Link to="/login">{t('sidebar.Log Out')}</Link>
      </Menu.Item>
      <div className="language-switcher">
        <LanguageSwitcher></LanguageSwitcher>
      </div>
    </Menu>
  );
};

export default UsersMenuList;
