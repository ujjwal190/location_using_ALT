
var alt = require('../alt');

 class LocationActions{

    updateLocations(locations) {
      this.dispatch(locations);
    };

    fetchLocations() {
      this.dispatch();
    };

    locationsFailed(errorMessage) {
      this.dispatch(errorMessage);
    };

    favoriteLocation(location) {
      this.dispatch(location);
    };

    removeFav(location){
      this.dispatch(location);
    };

    fetchFavorite(location){
      this.dispatch(location);
    };

    resetAll(locations){
      this.dispatch(locations);
    };
    
    fetchUser(user){
      this.dispatch(user);
    };
}

 



module.exports = alt.createActions(LocationActions);