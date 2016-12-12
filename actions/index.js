export const CHANGE_VIEW = 'CHANGE_VIEW';
export const LOAD_DATA = 'LOAD_DATA'
export const DATA_LOADED = 'DATA_LOADED';

export function changeView(newState) {
  return {
    type: CHANGE_VIEW,
    selectedTab: newState.selectedTab,
    json_feed: newState.json_feed,
    data: [],
    loading: true
  }
}

export function loadData(newState) {

  return function (dispatch) {
    fetch(newState.json_feed)
       .then((response) => response.json())
       .then((responseData) => {
         dispatch(dataLoaded(responseData.items))
       });
    };

}

export function dataLoaded(newState) {
  return {
    type: DATA_LOADED,
    loading: false,
    data : newState.data
  }
}
