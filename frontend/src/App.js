// import logo from './logo.svg';
import './App.css';
// import HomePage from './pages/HomePage';
// import LogIn from './pages/LogIn';
import 'antd/dist/antd.css';
import './styles/_base.scss';
import NavigationBar from './components/common/NavigationBar';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div style={{ marginTop: 100 }}>
        <Profile />
      </div>
    </div>
  );
}

export default App;
