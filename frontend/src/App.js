// import logo from './logo.svg';
import './App.css';
// import HomePage from './pages/HomePage';
// import LogIn from './pages/LogIn';
import 'antd/dist/antd.css';
import './styles/_base.scss';
import NavigationBar from './components/common/NavigationBar';
// import Matching from './pages/Matching';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div style={{ marginTop: 100 }}>
        <HomePage />
      </div>
    </div>
  );
}

export default App;
