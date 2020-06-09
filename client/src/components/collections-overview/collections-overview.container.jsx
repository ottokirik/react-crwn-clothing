import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner';
import CollectionsOverview from './collections-overview.component';

//createStructuredSelector автоматически калдет state в селектор, ex. selectIsCollectionFetching(state)
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});

//Функция compose работает слева на право и вызывает WithSpinner с аргументом CollectionsOverview, а затем результат вызова кладет в connect(mapStateToProps)
const CollectionsOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;
