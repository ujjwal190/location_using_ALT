var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var LocationSource = require('../sources/LocationSource');
var FilterAction = require('../actions/FilterAction');


    class FilterStore {
        constructor(){
      this.searchContent = ''; 

      this.bindListeners({
        searchLocation: FilterAction.FILTER_LOCATION,
        setChangeValue: FilterAction.CHANGE_VALUE,
        searchFilter: FilterAction.FILTER_LOCATION
      });
    }
  //searchfilter
  searchFilter(){
    console.log("searching the content!!");
  };
 
      
    searchLocation(location) {
         this.locations.push(location);
      };

      setChangeValue(searchContent) {
        this.searchContent = searchContent;
  
    };
}
    
  
  

module.exports = alt.createStore(FilterStore, 'FilterStore');