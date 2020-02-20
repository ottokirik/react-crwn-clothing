import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

import "./App.sass";

import Header from "./components/header";
import HomePage from "./pages/homepage";
import ShopPage from "./pages/shop";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    //Подписка на событие входа/выхода пользователя в Firebase
    //возвращает функцию для закрытия соединения
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Событие изменения объекта
        userRef.onSnapshot(snapShot => {
          const { id } = snapShot;
          setCurrentUser({
            id,
            ...snapShot.data()
          });
        });
        //Есил нет текущего пользователя, то установить его в null
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    //Закрытие соединения с Firebase
    this.unsubscribeFromAuth();
  }

  render() {
    const {
      props: { currentUser }
    } = this;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
