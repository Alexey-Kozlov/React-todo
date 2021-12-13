import React from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends React.Component {

  render() {
    const {filterExp, allItemsClick, activeItemsClick, doneItemsClick} = this.props;
    const defaultClassName = 'btn btn-outline-primary btn-default';
    const activeClassName = 'btn btn-primary';
    return (
      <div  >
        <button type="button"
            onClick = { () => allItemsClick() }
            className= { filterExp == '' ? activeClassName : defaultClassName }>All</button>
        <button  type="button"
            onClick = { () => activeItemsClick() }
            className={ filterExp == 'active' ? activeClassName : defaultClassName }>Active</button>
        <button  type="button"
             onClick = { () => doneItemsClick() }
            className={ filterExp == 'done' ? activeClassName : defaultClassName }>Done</button>
      </div>
    );
  };
}
