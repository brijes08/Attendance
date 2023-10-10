import './App.css';
import MainPage from './components/MainPage';
import { BrowserRouter } from 'react-router-dom';
// import SelectDropdown from './components/SelectDropdown';
// import InvoiceMaker from './components/InvoiceMaker';

function App() {
  return <>
  {/* <Login /> */}
  <BrowserRouter>
    <MainPage />
    {/* <InvoiceMaker /> */}
    {/* <SelectDropdown /> */}
  </BrowserRouter>
  </>
}

export default App;
