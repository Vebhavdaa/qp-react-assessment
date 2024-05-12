import React from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';

const Header: React.FC = () => {
  return (
    <header>
      <AddTaskIcon />
      <h1>
        ToDoList
      </h1>
    </header>
  );
};

export default Header;
