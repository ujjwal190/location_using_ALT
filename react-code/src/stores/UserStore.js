var alt = require('../alt');
var UserAction = require('../actions/UserAction');
var LocationActions = require('../actions/LocationActions');
var LocationSource = require('../sources/LocationSource');
var LocationStore = require('../stores/LocationStore');


    class UserStore{
        constructor(){
        this.user = [];
        this.user_id = '';
       
        this.bindListeners({

            getUserList: UserAction.FETCH_USER,
            selectedUser: UserAction.SELECTED_ID,
            
        });
 
       this.exportAsync(LocationSource);
    }

    getUserList(user){
        this.user = user;
    };

    selectedUser(val){
      
        this.user_id = val;  
       
    };
    
  
}      


module.exports = alt.createStore(UserStore, 'UserStore');
