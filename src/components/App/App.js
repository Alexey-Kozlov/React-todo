import React from 'react';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ToDoList from '../ToDoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAdd from '../ItemAdd';
import './App.css';

export default class App extends React.Component {

  maxId = 0;

  state = {
    todoData: [
      this.createToDoItem('Drink coffe'),
      this.createToDoItem('Make some app'),
      this.createToDoItem('Have a lunch')
    ],
    unfilteredData:[
      this.createToDoItem('Drink coffe'),
      this.createToDoItem('Make some app'),
      this.createToDoItem('Have a lunch')
    ]
  };

  deleteItem = (id) => {
    this.setState(({ todoData, unfilteredData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const newArray = JSON.parse(JSON.stringify(todoData));//deep copy
      newArray.splice(index, 1);//удаление элемента      
      return {
        todoData: newArray,
        unfilteredData: newArray
      }
    })
  }

  createToDoItem (label){
    return {
      id: this.maxId++,
      label: label,
      important: false,
      done: false
    }
  }

  insertItem = (label) => {
    this.setState(({ todoData, unfilteredData }) =>{
      const newItem = this.createToDoItem(label);
      return {
        todoData: [...todoData, newItem],
        unfilteredData: [...todoData, newItem]
      }
    })
  }

  onToggleImportant = (id) =>{
    this.setState(({ todoData }) =>{      
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) =>{      
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
        unfilteredData: this.toggleProperty(todoData, id, 'done')
      };
    })
  }

  toggleProperty(arr, id, propName){

      const index = arr.findIndex((item) => item.id === id);
      const oldItem = arr[index];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index + 1)
      ];
  }

  searchChanged = (searchText) => {
    const filterItems = this.state.unfilteredData.filter((item) => item.label.includes(searchText));
    this.setState(({ todoData }) =>{      
      return {
        todoData: filterItems
      };
    })
  }

  allItemsFilterClick = () =>{
    this.setState(({ todoData }) =>{      
      return {
        todoData: this.state.unfilteredData
      };
    })
  }

  activeItemsFilterClick = () =>{
    const filterItems = this.state.unfilteredData.filter((item) => !item.done);
    this.setState(({ todoData }) =>{      
      return {
        todoData: filterItems
      };
    })
  }

  doneItemsFilterClick = () =>{
    const filterItems = this.state.unfilteredData.filter((item) => item.done);
    this.setState(({ todoData }) =>{      
      return {
        todoData: filterItems
      };
    })
  }

  render () { 

    const doneCount = this.state.todoData.filter((item) => item.done ).length;
    const todoCount = this.state.todoData.length - doneCount;
    

    return(
    <div>
      <AppHeader todo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
          <SearchPanel searchChanged = { this.searchChanged }/>
          <ItemStatusFilter 
            allItemsClick = { this.allItemsFilterClick }
            activeItemsClick = { this.activeItemsFilterClick }
            doneItemsClick = { this.doneItemsFilterClick }
          />
        </div>
      <ToDoList 
        onDeleted = { this.deleteItem }
        todoData = { this.state.todoData }
        onToggleImportant = { this.onToggleImportant}
        onToggleDone = { this.onToggleDone}
        />
      <ItemAdd itemAdded={ this.insertItem }></ItemAdd>
    </div>  
    );
   };
};
