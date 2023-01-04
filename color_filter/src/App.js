import './App.css';
import Select_from from './components/Select_form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='interactive-section'>
          <div className="heading">
              <h1>Color Filter</h1>
          </div>
          <Select_from />
        </div>
      </header>
    </div>
  );
}

export default App;
