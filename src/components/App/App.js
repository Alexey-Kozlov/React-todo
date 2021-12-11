import React from 'react';
import AppHeader from '../AppHeader'
import SearchPanel from '../SearchPanel';
import ToDoList from '../ToDoList';
import ItemStatusFilter from '../ItemStatusFilter';
import './App.css'

const App = () =>{

    const AppData = [
      {label: "Item первый", important: false, id:1},
      {label: "Item второй", important: false, id:2},
      {label: "Item третий", important: true, id:3}
    ];
  
    return(
    <div>
      <AppHeader todo={1} done={3} />
      <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
      <ToDoList todoData = { AppData }/>
    </div>  
    );
};

export default App;