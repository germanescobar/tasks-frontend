/* eslint-disable */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth0 } from '@auth0/auth0-react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Message from './components/Message';
import Footer from './components/Footer';
import Loader from './components/Loader';
import UploadImage from './components/UploadImage';
import AuthVerified from './components/AuthVerified';
import Card from './components/Card';
import LoginButton from './components/Login';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';

import logo from './logo.svg';
import './App.css';

const RenderView = ({ match }) => <TodoList filter={match.params.filter} />;

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <div className="Todo-App">
          <Message />
          <Loader />
          <TodoForm />

          <Switch>
            <Route exact path="/:filter?" render={RenderView} />
            <Route exact path="/verified/:token" component={AuthVerified} />
            <Route exact path="/upload" component={UploadImage} />
            <Route exact path="/card" component={Card} />
          </Switch>
          {isAuthenticated ? (
            <>
              <Profile />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
          <Footer />
          <br />
          {/* <ImageCloud /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

/**
 * Typechecking props
 */
RenderView.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default App;
