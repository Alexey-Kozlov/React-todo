import React from 'react';
import './ItemAdd.css';

export default class ItemAdd extends React.Component {
    render() {
        const { itemAdded } = this.props;
        return (
            <button type="button"
            className = "btn btn-secondary"
            onClick= { itemAdded } >Вставить</button>
        )
    }
}