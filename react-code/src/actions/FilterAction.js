var alt = require('../alt');

class FilterAction{

    changeValue(location){
        this.dispatch(location);
      };

    filterLocation(location){
        this.dispatch(location);
      };

    searchLocation(location) {
          this.dispatch(location);
    };
  
}


module.exports = alt.createActions(FilterAction);