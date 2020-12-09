import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { customTheme } from './components/theme';
import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { ProvideAuth } from './hooks/use-auth';
import ForgotPassword from './components/ForgotPassword';
import NavBar from './components/NavBar';
import CalendarScreen from './screens/calendar/CalendarScreen.jsx';
import ContactScreen from './screens/ContactScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import PrivacyScreen from './screens/PrivacyScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import SignInScreen from './screens/SignInScreen.jsx';
import SummaryScreen from './screens/SummaryScreen.jsx';

const App = () => {
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <ThemeProvider theme={customTheme}>
            <NavBar/>
            <Box mt={5}/>
            <Switch>
              <Route exact path="/">
                <HomeScreen/>
              </Route>
              <Route path="/home">
                <HomeScreen/>
              </Route>
              <Route path="/calendar">
                <CalendarScreen/>
              </Route>
              <Route path="/summary">
                <SummaryScreen/>
              </Route>
              <Route path="/profile">
                <ProfileScreen/>
              </Route>
              <Route path="/settings">
                <SettingsScreen/>
              </Route>
              <Route path="/contact">
                <ContactScreen/>
              </Route>
              <Route path="/privacy">
                <PrivacyScreen/>
              </Route>
              <Route path="/signin">
                <SignInScreen/>
              </Route>
              <Route path="/register">
                <RegisterScreen/>
              </Route>
              <Route path="/forgotpassword">
                <ForgotPassword/>
              </Route>
            </Switch>
          </ThemeProvider>
        </Router>
      </ProvideAuth>
    </div>
  );
};

export default App;
