import React from 'react';
import ToDoListItem from '../ToDoListItem';
import './ToDoList.css'

const ToDoList = ( {todoData, onDeleted, editProperty} ) => {

    const items = todoData.map((item, index) => {
        return(
        <li key={item.id} className="list-group-item">
            <ToDoListItem 
                id = { item.id }
                label = { item.label }
                important = { item.important }
                done = { item.done }
                onDeleted = { () => onDeleted(item.id) }
                editProperty = { (id,pName,newVal) => editProperty(id,pName,newVal) }
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