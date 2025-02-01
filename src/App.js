import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import MainPage from './Pages/MainPage/MainPage';
import CocktailsList from './Pages/CoctailsList/CoctailsList'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/cocktail_database' element={<CocktailsList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
