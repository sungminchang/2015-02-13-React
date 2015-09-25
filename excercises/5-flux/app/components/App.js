var React = require('react');
var ContactsStore = require('../stores/ContactsStore');
var ViewActionCreators = require('../actions/ViewActionCreators');

var App = React.createClass({
  getInitialState () {
    return ContactsStore.getState();
  },

  componentDidMount () {
    ContactsStore.addChangeListener(this.handleStoreChange);
    ViewActionCreators.loadContacts();
  },

  componentWillUnmount () {
    ContactsStore.removeChangeListener(this.handleStoreChange);
  },

  handleStoreChange () {
    this.setState(ContactsStore.getState());
  },

  removeContact (id) {
    ViewActionCreators.removeContact(id);
  },

  renderContacts () {
    return this.state.contacts.map((contact) => {
      return <li onClick={this.removeContact.bind(this, contact.id)}>{contact.first} {contact.last}</li>;
    });
  },

// hint: use `xhr.deleteJSON(url)` where the url is `/contacts/:id`

  render () {
    if (!this.state.loaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul>{this.renderContacts()}</ul>
      </div>
    );
  }
});

module.exports = App;

