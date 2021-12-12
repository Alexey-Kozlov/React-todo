import React from 'react';
import './SearchPanel.css'

export default class SearchPanel extends React.Component {
  state = {
    searchText: ''
  }

  searchChange = (e) =>{
    this.setState({
      searchText: e.target.value
    });
    this.props.searchChanged(e.target.value);
  }

  render(){
    return(
      <input type="text"
      onChange = { this.searchChange }
      className="form-control search-input" 
      value={ this.state.searchText }
      placeholder="поиск" />
    );
  };
}
