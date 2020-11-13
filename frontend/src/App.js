// import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import './styles/_base.scss';
import {
  Route, Switch, BrowserRouter as Router,
} from 'react-router-dom';
import NavigationBar from './components/common/NavigationBar';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import Questionaire from './pages/Questionaire';
import Matching from './pages/Matching';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signin"><LogIn /></Route>
          <Route path="/signup"><LogIn /></Route>
          <Route path="/profile/:userId">
            <NavigationBar />
            <Profile />
          </Route>
          <Route path="/questionaire">
            <NavigationBar />
            <Questionaire />
          </Route>
          <Route path="/matching">
            <NavigationBar />
            <Matching />
          </Route>
          <Route path="/chat/:chatId">
            <NavigationBar />
            <Chat />
          </Route>
          <Route path="/">
            <NavigationBar />
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
