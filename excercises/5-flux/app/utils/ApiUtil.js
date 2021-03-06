var xhr = require('../lib/xhr');
var { API, ActionTypes } = require('../Constants');
var ServerActionCreators = require('../actions/ServerActionCreators');

var ApiUtils = {
  loadContacts () {
    xhr.getJSON(`${API}/contacts`, (err, res) => {
      ServerActionCreators.loadedContacts(res.contacts);
    });
  },

  removeContact (id) {
    console.log(`${API}/contacts/:${id}`);
    xhr.deleteJSON(`${API}/contacts/:${id}`, (err, res) => {
      //console.log(res);
      this.loadContacts();
      //ServerActionCreators.loadedContacts(res.contacts);
    });
  }
};

module.exports = ApiUtils;

