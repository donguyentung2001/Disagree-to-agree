// import logo from './logo.svg';
import './App.css';
// import HomePage from './pages/HomePage';
// import LogIn from './pages/LogIn';
import 'antd/dist/antd.css';
import './styles/_base.scss';
import Questionaire from './pages/Questionaire';
import NavigationBar from './components/common/NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div style={{ marginTop: 100 }}>
        <Questionaire />
      </div>
    </div>
  );
}

export default App;