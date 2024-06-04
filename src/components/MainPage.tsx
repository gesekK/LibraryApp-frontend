import React, { useState } from 'react';
import '../styles/MainPage.css';
import SearchBar from './SearchBar';

const MainPage: React.FC = () => {
  return (
    <div className="container">
      <div className="greeting">Hello, username</div>
      <div className="info">
        A Great Book Should Leave You With Many Experience
      </div>
      <div className="search-bar">
        {' '}
        <SearchBar />{' '}
      </div>
      <div className="subheader">Most frequently borrowed books</div>
      <div className="subheader">Top rated </div>
    </div>
  );
};

export default MainPage;
