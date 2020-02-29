import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.sass';

const CollectionPage = ({ collection: { title, items } }) => (
  <div className="collection-page">
    <h2 className="title">{title}</h2>
    <div className="items">
      {items.map(item => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
