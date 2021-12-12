import React from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {

  render() {
    let defaultClassName = 'btn btn-outline-primary btn-default';
    return (
      <div  >
        <button type="button"
            onClick = { () => this.props.allItemsClick() }
            className= { defaultClassName }>All</button>
        <button  type="button"
            onClick = { () => this.props.activeItemsClick() }
            className={ defaultClassName }>Active</button>
        <button  type="button"
             onClick = { () => this.props.doneItemsClick() }
            className={ defaultClassName }>Done</button>
      </div>
    );
  };
}
