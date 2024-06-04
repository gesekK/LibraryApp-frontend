import React, { useState } from 'react';
import { Menu } from 'antd';
import Logo from './Logo';
import { Link } from 'react-router-dom';

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
      <Menu.SubMenu key="loan" title="Loan">
        <Menu.Item key="loanList">
          <Link to="/loanList">Loan List</Link>
        </Menu.Item>
        <Menu.Item key="borrowBook">
          <Link to="/borrowBook">Borrow Book</Link>
        </Menu.Item>
        <Menu.Item key="returnBook">
          <Link to="/returnBook">Return Book</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="user" title="Users">
        <Menu.Item key="addUser">
          <Link to="/addUser">Add User</Link>
        </Menu.Item>
        <Menu.Item key="userList">
          <Link to="/userList">User List</Link>
        </Menu.Item>
        <Menu.Item key="updateUser">
          <Link to="/updateUser">Update User</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="books" title="Books">
        <Menu.Item key="addBook">
          <Link to="/addBook">Add Book</Link>
        </Menu.Item>
        <Menu.Item key="bookList">
          <Link to="/bookList">Book List</Link>
        </Menu.Item>
        <Menu.Item key="updateBook">
          <Link to="/updateBook">Update Book</Link>
        </Menu.Item>
        <Menu.Item key="deleteBook">
          <Link to="/deleteBook">Delete Book</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="reviews" title="Reviews">
        <Menu.Item key="addReview">
          <Link to="/addReview">Add Review</Link>
        </Menu.Item>
        <Menu.Item key="reviewList">
          <Link to="/reviewList">Review List</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default MenuList;
