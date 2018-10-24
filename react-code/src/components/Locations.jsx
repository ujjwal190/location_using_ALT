var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');
var FilterAction = require('../actions/FilterAction');
var UserStore = require('../stores/UserStore');
var FilterStore = require('../stores/FilterStore');
var User = require('../components/User.jsx');
var Filter = require('../components/Filter.jsx');



var Favorites = React.createClass({displayName: "Favorites",

  removeFav(ev) {
    var abcd=ev.target.getAttribute('data-id');
    var locationId = Number(abcd);
    var location = LocationStore.getLocation(locationId);
    // console.log("aaaaaaaaaaa");
    // console.log(location);
    LocationActions.removeFav(location);
    
    //hiting the api to delete the favorite location from favorite_location table
    location.user_id = UserStore.getState().user_id;
    LocationStore.deleteFavorite(location);
    
  
  },
  render() {
     return (
      <ul>
        { this.props.favoritedLocations.map((location, i) => {
          
          return (
         
            <li key={i}>{location.name}
              <button onClick={this.removeFav} data-id= {location.id}>undo</button>
            </li>        
          );
        })}
      </ul>
      
    );
  }
});

var AllLocations = React.createClass({displayName: "AllLocations",
  addFave(ev) {
    //var t = UserStore.getState().user_id;
    //console.log(t);
    //calling the API - addFavorite method in the locationSource to add the user favorite location in the db
    if (UserStore.getState().user_id == "" || UserStore.getState().user_id == 0) 
    {
      alert("Please select the user then click on add favorite!!");
    }
    else
    {
      var location = LocationStore.getLocation(
        Number(ev.target.getAttribute('data-id'))
      );
      LocationActions.favoriteLocation(location);
      location.user_id = UserStore.getState().user_id;
      FavoritesStore.addFavorite(location);
    }
    
  },
  render() {
    if (this.props.errorMessage) {
      return (
       <div>{this.props.errorMessage}</div>
        // React.createElement("div", null, this.props.errorMessage)
      );
    }
    if (LocationStore.isLoading()) {
      return (
       
        <div>
          <img src="ajax-loader.gif" />
        </div>
        )
      
    }

    return (
      
        //React.createElement("ul", null, 
        <ul>
          { this.props.nonFavoritelocations.map((location, i) => {
            var faveButton = (
            
              <button onClick={this.addFave} data-id={location.id}>
                Favorite
              </button>
            );

            return (
              <li>
                {location.name} {location.has_favorite ? '<3' : faveButton}
              </li>
            );
          })}
      </ul>
    );
  }
});

const divStyle1 = {
 // margin: '90px',
 
};

const divStyle2 = {
 
  //margin: '90px',

 
};

var Locations = React.createClass({
  componentDidMount() {
    document.title = "React Simple App";
    
    //api hit to get the master location list in the app at first time loading ..
    LocationStore.fetchLocations();
    
    // FavoritesStore.fetchFavoriteLocations();
    this.nonFavoritelocations = [];        
  },
  
  render() {
    return (
      
      
       <div>
         
          <h1>Users</h1>
          <AltContainer store={UserStore}>
            <User />
          </AltContainer>
         
        <br />
        
        <h1>Locations</h1>
        <AltContainer store={FilterStore}>
          <Filter />
        </AltContainer>
        
        <h1>Locations</h1>
        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer> 
         
         <h1>Favorites</h1>
        <AltContainer store={FavoritesStore}>
          <Favorites />
        </AltContainer>
        
      </div>
      
    );
  }
});


module.exports = Locations;
