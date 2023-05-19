import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./HomePage";
import UserProfilePage from "./UserProfilePage";
import ItineraryForm from "./ItineraryForm";
import ItineraryShowPage from "./ItineraryShowPage";
import UserItineraryList from "./UserItineraryList";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfilePage} user={currentUser} />
        <AuthenticatedRoute exact path="/itineraries/new" component={ItineraryForm} user={currentUser} />
        <Route exact path="/itineraries/:id" render={(props) => <ItineraryShowPage user={currentUser} {...props}/>}/>
        <Route exact path="/itineraries" render={(props) => <UserItineraryList user={currentUser} {...props}/>}/>
        
      </Switch>
    </Router>
  );
};

export default hot(App);
