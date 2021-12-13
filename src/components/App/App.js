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
    searchExp: '',
    filterExp: ''
  };

  deleteItem = (id) => {
    this.setState(({ todoData, unfilteredData }) => {
      const index = todoData.findIndex((item) => item.id === id);
      const newArray = JSON.parse(JSON.stringify(todoData));//deep copy
      newArray.splice(index, 1);//удаление элемента      
      return {
        todoData: newArray
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
        todoData: [...todoData, newItem]
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
        todoData: this.toggleProperty(todoData, id, 'done')
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
    this.setState({      
        searchExp: searchText
    });
  }

  searchItems(arr){
    if(this.state.searchExp.length > 0){
      return arr.filter((item) => 
      item.label.toLowerCase().includes(this.state.searchExp.toLowerCase()));
    } else {
      return arr;
    }
  }

  filterData(arr){
    switch(this.state.filterExp){
      case '':
        return arr;
        break;
      case 'active':
        return arr.filter((item) => !item.done);
        break;
      case 'done':
        return arr.filter((item) => item.done);
        break;
    }
  }

  visibleData () { 
    const searchItems = this.searchItems(this.state.todoData);
    return this.filterData(searchItems);
  }

  allItemsFilterClick = () =>{
    this.setState({      
      filterExp: ''
  });
  }

  activeItemsFilterClick = () =>{
    this.setState({      
      filterExp: 'active'
  });
  }

  doneItemsFilterClick = () =>{
    this.setState({      
      filterExp: 'done'
  });
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
        todoData = { this.visibleData() }
        onToggleImportant = { this.onToggleImportant}
        onToggleDone = { this.onToggleDone}
        />
      <ItemAdd itemAdded={ this.insertItem }></ItemAdd>
    </div>  
    );
   };
};
