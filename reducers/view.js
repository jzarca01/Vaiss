import { CHANGE_VIEW, LOAD_DATA, DATA_LOADED } from '../actions/';

let cloneObject = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

let newState = {
    "selectedTab": "Vice",
    "json_feed": 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.vice.com%2Ffr%2Frss',
    "data": [],
    "loading": true
}

export default function(state = newState, action) {
  switch ( action.type ) {
    case CHANGE_VIEW:
      newState = cloneObject(state);
      newState.selectedTab = action.selectedTab;
      newState.json_feed = action.json_feed;
      return newState;
    case LOAD_DATA:
      newState = cloneObject(state);
      newState.loading = action.loading
      return newState;
    case DATA_LOADED:
      newState = cloneObject(state);
      newState.data = action.data;
      newState.loading = action.loading;
      return newState;
    default:
      return state || newState;
  }
}
