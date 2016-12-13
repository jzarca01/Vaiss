import NewsItems from './news-items';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeView, loadData } from '../containers'

function mapStateToProps(state) {
  return state.view;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeView, loadData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsItems)
