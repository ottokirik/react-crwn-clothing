import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.sass";

import Header from "./components/header";
import HomePage from "./pages/homepage";
import ShopPage from "./pages/shop";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up";

class App extends Component {
  state = {
    currentUser: null
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    //Подписка на событие входа/выхода пользователя в Firebase
    //возвращает функцию для закрытия соединения
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Событие изменения объекта
        userRef.onSnapshot(snapShot => {
          const { id } = snapShot;
          this.setState({
            currentUser: {
              id,
              ...snapShot.data()
            }
          });
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    //Закрытие соединения с Firebase
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Header currentUser={currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
