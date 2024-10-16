import './App.css';
import { Routes, Route } from 'react-router-dom'
import MainRoutes from './routes/MainRoutes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<MainRoutes/>} />
      </Routes>
    </>
  );
}

export default App;
