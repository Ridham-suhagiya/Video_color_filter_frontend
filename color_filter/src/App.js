import './App.css';
import Select_from from './components/Select_form';
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <div className='background_image'>
        <header className="App-header">
          <div className='interactive-section'>
            <div className="heading">
                <h1>Color Filter</h1>
            </div>
            <Select_from  />
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
