import React from 'react';
import ToDoListItem from '../ToDoListItem';
import './ToDoList.css'

const ToDoList = ( {todoData} ) =>{

    const items = todoData.map((item, index) => {
        return(
        <li key={item.id} className="list-group-item">
            <ToDoListItem 
                label = { item.label }
                important = { item.important }
            />
        </li>
        );
    });

    return(
      <ul className="list-group todo-list">
          {items}
      </ul>
    );
  };

  export default ToDoList;