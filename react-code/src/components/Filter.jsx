var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FilterStore = require('../stores/FilterStore');
var FilterAction = require('../actions/FilterAction');
var LocationActions = require('../actions/LocationActions');


var Filter = React.createClass({displayName: "Filter",
  
  handleChange(event) { 
    this.setState({ value: event.target.value });
    
    
      FilterAction.changeValue(event.target.value);
      this.setState({ state: this.state });

     
         

  },
  
  search(locations) {
    LocationActions.searchLocation("");
  },
  resetAll:function(){
     LocationActions.resetAll();
  },


  render:function() {
    
    return (
    
        <div>
            <input type="text" placeholder="enter location to search" value={FilterStore.getState().searchContent} onChange={this.handleChange} />
            <span>
            </span>
            <br/>   
        </div>
    );
  }
});


module.exports = Filter;