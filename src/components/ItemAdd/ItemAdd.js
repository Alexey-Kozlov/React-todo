import React from 'react';
import './ItemAdd.css';

export default class ItemAdd extends React.Component {

    state = {
        label: ''
    }

    onLabelChanged = (e) => {
        this.setState({
            label :e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.itemAdded(this.state.label);
        this.setState({
            label: ''
        })
    }

    render() {
        return (
            <form className = 'item-add-form d-flex'
            onSubmit={ this.onSubmit }>
                <input type = 'text' placeholder = 'Введите текст'
                className = 'form-control'
                onChange = { this.onLabelChanged } 
                value = { this.state.label }/>
            <button
            className = "btn btn-outline-secondary item-add"
                >Вставить</button>
            </form>
        )
    }
}