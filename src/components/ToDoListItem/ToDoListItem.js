import React from 'react';
import './ToDoListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class ToDoListItem extends React.Component {

  state = {
    done: false,
    important: false
  };

onLabelClick = () => {
  this.setState((state) => {
    return{
      done: !state.done
    }
  });
};
onMarkImportant = () => {
  this.setState((state) =>
    {
      return{
        important: !state.important
      }
  });
};

render() {
    const { label } = this.props;
    const {done, important} = this.state;

    let classNames = 'todo-list-item';
    let exclaimButtonDefaultStyle = 'btn btn-outline-success btn-sm float-end';

    if(done){
      classNames += ' done';
    }
    if(important){
      classNames += ' important';
      exclaimButtonDefaultStyle += ' todo-btn-important-toggle';
    }

  return (
    <span className = {classNames}>
      <span className="todo-list-item-label" 
      onClick = { this.onLabelClick } >{label}</span>
      <button type="button"
          className= { exclaimButtonDefaultStyle }
          onClick={this.onMarkImportant}>
          <FontAwesomeIcon icon={faExclamation} />
      </button>
      <button type="button"
          className="btn btn-outline-danger btn-sm float-end">
          <FontAwesomeIcon icon={faTrash} />
      </button>
    </span>   
  );
  }
}

