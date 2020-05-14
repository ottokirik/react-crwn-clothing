import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { selectCurrentUser } from './redux/user/user.selectors';

import './App.sass';

import Header from './components/header';
import HomePage from './pages/homepage';
import ShopPage from './pages/shop';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up';
import CheckoutPage from './pages/checkout';

import { createStructuredSelector } from 'reselect';

class App extends Component {
  /*   unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    
    //Подписка на событие входа/выхода пользователя в Firebase
    //возвращает функцию для закрытия соединения
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //Событие изменения объекта
        userRef.onSnapshot((snapShot) => {
          const { id } = snapShot;
          setCurrentUser({
            id,
            ...snapShot.data(),
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
 */
  render() {
    const {
      props: { currentUser },
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
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
