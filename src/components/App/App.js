import React from 'react';
import AppHeader from '../AppHeader'
import SearchPanel from '../SearchPanel';
import ToDoList from '../ToDoList';
import ItemStatusFilter from '../ItemStatusFilter';
import './App.css'

export default class App extends React.Component {

  state = {
    todoData: [
      {label: "Item первый", important: false, id: 1},
      {label: "Item второй", important: false, id: 2},
      {label: "Item третий", important: true, id: 3}
    ]
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const newArray = JSON.parse(JSON.stringify(todoData));//deep copy
      newArray.splice(index, 1);//удаление элемента

      return {
        todoData: newArray
      }
    })
  }

  render () { 
    return(
    <div>
      <AppHeader todo={1} done={3} />
      <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
      <ToDoList 
        onDeleted = { this.deleteItem }
        todoData = { this.state.todoData }
        />
    </div>  
    );
   };
};
