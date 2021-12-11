import React from 'react';
import './ToDoListItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation, faTrash } from '@fortawesome/free-solid-svg-icons';

export default class ToDoListItem extends React.Component {

render() {
    const { label, 
      onDeleted, 
      onToggleDone, 
      onToggleImportant,
      done,
      important} = this.props;

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
      onClick = { onToggleDone } >{label}</span>
      <button type="button"
          className= { exclaimButtonDefaultStyle }
          onClick={ onToggleImportant }>
          <FontAwesomeIcon icon={faExclamation} />
      </button>
      <button type="button"
          className="btn btn-outline-danger btn-sm float-end"
          onClick={ onDeleted }>
          <FontAwesomeIcon icon={faTrash} />
      </button>
    </span>   
  );
  }
}

