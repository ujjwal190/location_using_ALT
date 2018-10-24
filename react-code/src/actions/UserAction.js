var alt = require('../alt');

class UserAction{
  
  fetchUser(user){
    this.dispatch(user);
  };

  selectedId(val){
    this.dispatch(val);
  };
}



module.exports = alt.createActions(UserAction);