var React = require('react');
var AltContainer = require('alt/AltContainer');
var FavoritesStore = require('../stores/FavoritesStore');
var UserStore = require('../stores/UserStore');
var UserAction = require('../actions/UserAction');

var User = React.createClass({

    fetchUser(ev){
        var val = ev.target.value;
        // console.log(val);
        UserAction.selectedId(val);
        FavoritesStore.fetchFavoriteLocations(val);
    },

    componentDidMount:function() {
        UserStore.fetchUserInformation(this.val);  
    },

  render() {
   // console.log("user information");
    var options = this.props.user.map((_user) => {
        return(
            // React.createElement("option", {value: _user.id}, 
            //    _user.name
            // )
            <option value = {_user.id}>
                 {_user.name}
            </option>
        );
    });
    return (
    //   React.createElement("div", null, 
    //    React.createElement("select", {onChange: this.fetchUser}, 
    //    React.createElement("option", {value: "0"}, "Select User"), 
    //         options 
    //     )
    //   )
        <div>
            <select onChange={this.fetchUser}> 
                <option value={0}>Select User</option> 
                    {options}
            </select>
        </div>
    ); 
  }  
});
var AllUser = React.createClass({
    
    componentDidMount:function(){
        UserStore.fetchUserInformation();
    },

    render() {

        return 
        (
         
          <div>
              <h1>Users</h1>
            <AltContainer store={UserStore}>
                <User />
            </AltContainer>
        </div>
        );
    }
})

module.exports = User;