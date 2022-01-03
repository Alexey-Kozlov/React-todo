import React from 'react';
import AppHeader from '../AppHeader';
import SearchPanel from '../SearchPanel';
import ToDoList from '../ToDoList';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAdd from '../ItemAdd';
import DataService from '../DataService';
import './App.css';

export default class App extends React.Component {

  maxId = 0;

  dataService = new DataService();

  state = {
    todoData: null,
    searchExp: '',
    filterExp: ''
  };

  componentDidMount() {
    this.dataService.getNote().then((items) => {
      this.setState({
        todoData: items
      })
    });
  }

  deleteItem = (id) => {
    this.dataService.deleteNote(id).then((items) => {
      this.setState({
        todoData: items
      })
    });
  }

  insertItem = (label) => {
    const newNote = {
      id: 0,
      label: label,
      important: false,
      done: false
    };
    this.dataService.addNote(newNote).then((items) => {
      this.setState({
        todoData: items
      })
    });
  }

  editProperty = (id, pName, newVal) => {
    //debugger;
    const oldNote = this.state.todoData.filter((item) => item.id === id)[0];
    switch (pName) {
      case 'done': oldNote.done = newVal;
        break;
      case 'important': oldNote.important = newVal;
        break;
      case 'label': oldNote.label = newVal;
        break;
      default:
        break;
    }

    this.dataService.updateNote(oldNote).then((items) => {
      this.setState({
        todoData: items
      })
    });
  }

  searchChanged = (searchText) => {
    this.setState({
      searchExp: searchText
    });
  }

  searchItems(arr) {
    if (this.state.searchExp.length > 0) {
      return arr.filter((item) =>
        item.label.toLowerCase().includes(this.state.searchExp.toLowerCase()));
    } else {
      return arr;
    }
  }

  filterData(arr) {
    switch (this.state.filterExp) {
      case '':
        return arr;
      case 'active':
        return arr.filter((item) => !item.done);
      case 'done':
        return arr.filter((item) => item.done);      
      default:
        break;
    }
  }

  visibleData() {
    return this.filterData(this.searchItems(this.state.todoData));
  }

  allItemsFilterClick = () => {
    this.setState({
      filterExp: ''
    });
  }

  activeItemsFilterClick = () => {
    this.setState({
      filterExp: 'active'
    });
  }

  doneItemsFilterClick = () => {
    this.setState({
      filterExp: 'done'
    });
  }

  render() {
    if (this.state.todoData == null) {
      return <div></div>;
    }
    const doneCount = Array.from(this.state.todoData).filter((item) => item.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    return (
      <div>
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel searchChanged={this.searchChanged} />
          <ItemStatusFilter
            allItemsClick={this.allItemsFilterClick}
            activeItemsClick={this.activeItemsFilterClick}
            doneItemsClick={this.doneItemsFilterClick}
            filterExp={this.state.filterExp}
          />
        </div>
        <ToDoList
          onDeleted={this.deleteItem}
          todoData={this.visibleData()}
          editProperty = {this.editProperty}
        />
        <ItemAdd itemAdded={this.insertItem}></ItemAdd>
      </div>
    );
  };
};
