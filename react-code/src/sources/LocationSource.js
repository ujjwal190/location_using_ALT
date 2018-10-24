var LocationActions = require('../actions/LocationActions');
var UserAction = require('../actions/UserAction');

var LocationSource = {
	//api hit to fetch the all the location from the master_location from the database
  fetchLocations() {
    return {
      remote()
        {
        	return new Promise(function (resolve, reject) {
						var xhr = new XMLHttpRequest();
						xhr.open('GET', "http://localhost:2643/api/getLocation", true);
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
						xhr.onload = function () {
						if (xhr.status == 200) 
						{
							var data =xhr.responseText;
							//console.log(data);
							if(true)
							{
									//console.log(JSON.parse(data));
									var location = JSON.parse(data);
									resolve(location);
							}
							else
							{
								reject('Something went wrong!!');
							}
					}
		};
			xhr.send();
        });
      },
      local() {
        return null;
			},
			success: LocationActions.updateLocations,
      loading: LocationActions.fetchLocations
    }
	},

//api to fetch the favorite location from the favorite_location table from the database.
	fetchFavoriteLocations() {
    return {
      remote(state,userId)
        {
        	return new Promise(function (resolve, reject) {
						var path = "http://localhost:2643/api/getuserfavoritelocation";
						var params = userId;
						var xhr = new XMLHttpRequest();
						xhr.open('GET',path+"/"+params, true);
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
						xhr.onload = function () {	
							if (xhr.status == 200) {
								var data =xhr.responseText;
								// console.log(data);
								if(true)
								{
										// console.log(JSON.parse(data));
										var location = JSON.parse(data);
										resolve(location);
								}
								else{
										reject('Something went wrong!!');
								}
							}
						};
					xhr.send();
        });
      },
      local() {
        return null;
      },
     		success: LocationActions.fetchFavorite,
    }
	},

	//api hit to push the location in the favorite_location table in the database
	addFavorite(){
    return {
			remote(state,location)
        {
					// console.log("hiting addFavorite from the api"); 
					// console.log(location);
					return new Promise(function (resolve, reject) {
					var xhr = new XMLHttpRequest();
					xhr.open('POST',"http://localhost:2643/api/adduserfavoritelocation", true);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("Accept", "application/json");
					xhr.setRequestHeader("Vary", "Access-Control-Request-Method")
					xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
					xhr.send(JSON.stringify(location));
        });
      },

      local() {
        return null;
      },

      success: LocationActions.updateLocations,
      error: LocationActions.locationsFailed,
      loading: LocationActions.fetchLocations
    }
	},
//api hit to fetch the user from the User_Information table from the database
	fetchUserInformation() {
    return {
      remote()
        {
        	return new Promise(function (resolve, reject) {
						var xhr = new XMLHttpRequest();
						xhr.open('GET', "http://localhost:2643/api/userInformation", true);
						xhr.setRequestHeader("Accept", "application/json");
						xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
						xhr.onload = function () {
						if (xhr.status == 200) {
						var data =xhr.responseText;
					//	console.log(data);
					
					if(true){
								//console.log(JSON.parse(data));
								var user = JSON.parse(data);
								resolve(user);
					}
					else{
						reject('Something went wrong!!');
					}
				}
		};
					xhr.send();
        });
      },
      local() {
        return null;
      },

     	success: UserAction.fetchUser
      
      
    }
	},
	//api hit to push the location in the favorite_location table in the database
	deleteFavorite(){
    return {
			remote(state,location)
        {
				// console.log("hiting deleteFavorite from the api to delete location"); 
				// console.log(location);
     		return new Promise(function (resolve, reject) {
				var url = "http://localhost:2643/api/DeleteFavorite";
				var params = location.id;
				var y = location.user_id;

				var xhr = new XMLHttpRequest();
				xhr.open('GET',url+"/"+params+"/"+y, true);
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

				xhr.onload = function () {
					if (xhr.status == 200) {
					var data =xhr.responseText;
				//	console.log(data);
				
				if(true){
							//console.log(JSON.parse(data));
							var location = JSON.parse(data);
							resolve(location);
				}
				else{
					reject('Something went wrong!!');
				}
			}
	};

				xhr.send();
        });
      },

      local() {
        return null;
      },

      success: LocationActions.fetchLocations
    }
	}
};

module.exports = LocationSource;