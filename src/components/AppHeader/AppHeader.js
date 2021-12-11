import React from 'react';
import './AppHeader.css'

const AppHeader = ({todo, done}) =>{
    return(
      <div className="app-header d-flex">
      <h1 className="app-header">Мой список</h1>
      <h2>{todo} more to do, {done} done</h2>
      </div>
    );
  };

  export default AppHeader;