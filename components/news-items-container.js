import NewsItems from './news-items';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {getData} from '../actions';

function mapStateToProps(state) {
  return {
    ...state.view
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadData}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsItems);
