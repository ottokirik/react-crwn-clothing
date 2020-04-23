import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/';
import CollectionContainer from '../collection';

//Route автоматически кладет в props компонента match, history, текущий url
class ShopPage extends Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const {
      props: { fetchCollectionsStart },
    } = this;
    fetchCollectionsStart();
  }

  componentWillUnmount() {}

  render() {
    const {
      props: { match },
    } = this;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
