import './App.css';
import Display from './components/Display';
import Create from './components/Create';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Edit from './components/Edit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <h1>Favorite Authors!</h1>
      <Routes>
        <Route path='/' element={<Display/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/edit/:id' element={<Edit/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
