import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './components/signup/Signup';
import Signin from './components/signin/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Producted from './components/Producted';
// import Home from './components/Home/Home';
import Forgetpass from './components/forgotpass/Forgotpass';
import Resetpass from './components/resetpass/Resetpass';
import DataProvider from './context';
import Profile from './pages/Profile/Profile';
import ShowMemories from './pages/ShowMemories/ShowMemories';
import PostMemories from './pages/PostMemories/PostMemories';

export default function App() {
  return (
    <div>
      <DataProvider>
        <Router>
          <ToastContainer />
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
            <Route path="/forgot" component={Forgetpass} />
            <Route path="/reset/:token" component={Resetpass} />
            <Producted exact path="/" component={ShowMemories} />
            <Producted exact path="/home" component={ShowMemories} />
            <Producted exact path="/profile" component={Profile} />
            <Producted exact path="/showmemories" component={ShowMemories} />
            <Producted exact path="/postmemories" component={PostMemories} />
          </Switch>
        </Router>
      </DataProvider>
    </div>
  )
}
