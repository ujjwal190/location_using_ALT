var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var FilterAction = require('../actions/FilterAction');
var LocationSource = require('../sources/LocationSource');
var FavoritesStore = require('./FavoritesStore');
var UserStore = require('./UserStore');
var UserAction = require('../actions/UserAction');



  class LocationStore {
    constructor(){
    this.nonFavoritelocations = [];
    this.errorMessage = null;
    this.value = "";
    this.alllocations = [];
    this.favoritedLocations = [];
   

    this.bindListeners({
      handleUpdateLocations: LocationActions.UPDATE_LOCATIONS,
      handleFetchLocations: LocationActions.FETCH_LOCATIONS,
      handleLocationsFailed: LocationActions.LOCATIONS_FAILED,
      setFavorites: LocationActions.REMOVE_FAV,
      searchFilter: FilterAction.CHANGE_VALUE,
      removeLocation: LocationActions.FAVORITE_LOCATION,
      filter: LocationActions.FETCH_FAVORITE     
    });

    this.exportPublicMethods({
         getLocation: this.getLocation
    });

    this.exportAsync(LocationSource);
  }

  handleUpdateLocations(nonFavoritelocations) {

      this.alllocations = nonFavoritelocations;   
      this.nonFavoritelocations = nonFavoritelocations;
      this.errorMessage = null;
    };
 
  
  removeLocation(location) {

  //  console.log("removing the item from the master_location list and pushing to the favorite_location!!");

      var tempNonFav = [];
      for (var count = 0; count < this.nonFavoritelocations.length; count++) {
        if (location != this.nonFavoritelocations[count]) {
          tempNonFav.push(this.nonFavoritelocations[count]);
        }

    }


   this.nonFavoritelocations = tempNonFav;
  };
 
  

  searchFilter(searchContent) {
   
    var favoritedLocations = FavoritesStore.getState().favoritedLocations;
    var nonFavoritelocations = this.nonFavoritelocations.filter(function (location) {
      return favoritedLocations.indexOf(location) < 0;
    });
     
    
    if (searchContent == null || searchContent == "") 
    {
      var use = [];
        for(var i=0;i<this.alllocations.length;i++){
          use.push(this.alllocations[i]);
        }

        favoritedLocations.forEach(function(location){
          for(var i = 0; i < use.length; i++){
              if(use[i].id===location.id){
                use.splice(i,1);
                // break;
              }
          }
        });
         this.nonFavoritelocations = use;
    }
    else {
      this.nonFavoritelocations = nonFavoritelocations.filter(function (location) {
        return location.name.toLowerCase().includes(searchContent.toLowerCase());
      });
    }

  };

  handleFetchLocations() {
     //this.nonFavoritelocations = [];
    
  };

  handleLocationsFailed(errorMessage) {
    this.errorMessage = errorMessage;
  };


  setFavorites(location) {
    
    this.nonFavoritelocations.push(location);
   
  };

  getLocation(id) {
    //destructring
    var $__0=    this.getState(),alllocations=$__0.alllocations;
    for (var i = 0; i < alllocations.length; i += 1) {
      if (alllocations[i].id === id) {
        return alllocations[i];
      }
    }
    return null;
  };


  
  filter(location){
     var obj = this;

      if (UserStore.getState().user_id) {
      
      var favoritedLocations = FavoritesStore.getState().favoritedLocations;

      this.nonFavoritelocations =[];
      for(var i=0;i<this.alllocations.length;i++){
         this.nonFavoritelocations.push(this.alllocations[i]);
      }

        favoritedLocations.forEach(function(location){
          for(var i=0;i<this.nonFavoritelocations.length;i++){
              if(this.nonFavoritelocations[i].id===location.id){
                this.nonFavoritelocations.splice(i,1);
                break;
            }
          }
        }.bind(this));
       
      }
    else
    {
      alert("no user selected.")
    }
    
  
  };
  filterAgain(val){
    this.searchFilter();
  };

}
 


module.exports = alt.createStore(LocationStore, 'LocationStore');