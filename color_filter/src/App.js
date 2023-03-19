import './App.css';
import selectFrom from './components/Select_form';

function App() {

  return (
    <div className="App">
      <div className='background_image'>
        <header className="App-header">
          <div className='interactive-section'>
            <div className="heading">
                <h1>Color Filter</h1>
            </div>
            <selectFrom  />
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
