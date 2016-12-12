import NewsItems from './news-items';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { loadData } from '../actions'

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(loadData, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsItems)
