var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');
var FilterAction = require('../actions/FilterAction');
var UserAction = require('../actions/UserAction');
var LocationSource = require('../sources/LocationSource');
var FilterStore = require('../stores/FilterStore');
var UserStore = require('../stores/UserStore');
var LocationStore = require('./LocationStore');



  class FavoritesStore {
    constructor(){
    this.favoritedLocations = [];
    this.nonFavoritelocations = '';
    this.userFavoriteLocationsMaster = [];
    this.alllocations = '';
    this.user = [];
    this.SearchText = '';
   
    this.bindListeners({
      addFavoriteLocation: LocationActions.FAVORITE_LOCATION,
      searchFilter: FilterAction.CHANGE_VALUE,
      removeFavoriteLocation: LocationActions.REMOVE_FAV,
      fetchFavoriteLocation: LocationActions.FETCH_FAVORITE
     
    });

    this.exportPublicMethods({
      
    });

    this.registerAsync(LocationSource);
    
  }

  addFavoriteLocation(location) {
    
    this.userFavoriteLocationsMaster.push(location);
    this.SearchLocations();

    
  };  
  removeFavoriteLocation(location) {
     
    for (var c = 0; c < this.userFavoriteLocationsMaster.length; c++) {
      if (location.id === this.userFavoriteLocationsMaster[c].id) {
        this.userFavoriteLocationsMaster.splice(c,1);
      }
    }
    this.SearchLocations();
  }; 
  

  searchFilter(searchContent){
    this.SearchText=searchContent;
    this.SearchLocations();   
  };
  
  SearchLocations(){
    this.favoritedLocations = [];
    if(this.SearchText == null || this.SearchText == "")
    {
      for(var x = 0; x < this.userFavoriteLocationsMaster.length ; x++)
      {
       this.favoritedLocations.push(this.userFavoriteLocationsMaster[x]);
      }
    }
    else{
      var scope=this;
        this.favoritedLocations = this.userFavoriteLocationsMaster.filter(function(location){
          return location.name.toLowerCase().includes(scope.SearchText.toLowerCase());
        });
    }
  };


  fetchFavoriteLocation(locations){
    this.favoritedLocations = locations ;
    this.userFavoriteLocationsMaster= locations;
    this.SearchLocations();
  };  

  }


module.exports = alt.createStore(FavoritesStore, 'FavoritesStore');