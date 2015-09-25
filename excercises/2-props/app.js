////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// http://facebook.github.io/react/docs/reusable-components.html#prop-validation
//
// - Don't access `USERS` directly in the app, use a prop
// - Validate Gravatar's `size` property, allow it to be a
//   a number, or a string that can be converted to a number,
//   ie: `size="asdf"` should warn (hint: parseInt)
// - in emailType, what if the prop name isn't email? what if we wanted
//   the prop to be "userEmail" or "loginId"? Switch the Gravatar
//   prop name from "email" to "loginId", send a bad value, and then
//   fix the code to make the warning make sense.
// - how many times does `getDefaultProps` get called?
// - experiment with some of the other propTypes, send improper values
//   and look at the messages you get
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var md5 = require('MD5');
var validateEmail = require('./validateEmail');
var warning = require('react/lib/warning');

var GRAVATAR_URL = "http://gravatar.com/avatar";

var USERS = [
  { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com', size: '128', gender: 'male' },
  { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com', size: '256', gender:''}
];

var emailType = (props, propName, componentName) => {
  warning(
    validateEmail(props.loginId),
    `Invalid email '${props.loginId}' sent to 'Gravatar'. Check the render method of '${componentName}'.`
  );
};

var validateSize = function(size) {
  return !isNaN(parseInt(size, 10));
};

var sizeType = (props, propName, componentName) => {
  warning(
    validateSize(props.size),
    `Invalid size '${props.size}' sent to 'Gravatar'. Check the render method of '${componentName}'.`
  );
};

var validateHidden = function(hidden) {
  return true;
};

var hiddenType = (props, propName, componentName) => {
  warning(
    validateHidden(props.hide),
    `Invalid attribute hide '${props.hide}' sent to 'Gravatar'. Check the render method of '${componentName}'.`
  );
};

var validateGender = function(gender) {
  var genders = ['male', 'female', 'both', 'neither', 'other', ''];
  return genders.indexOf(gender) !== -1;
};

var genderType = (props, propName, componentName) => {
  warning(
    validateGender(props.gender),
    `Invalid attribute gender '${props.gender}' sent to 'Gravatar'. Check the render method of '${componentName}'.`
  );
};


var Gravatar = React.createClass({
  propTypes: {
    loginId: emailType,
    size: sizeType,
    hide: hiddenType,
    gender: genderType
  },

  getDefaultProps () {
    console.log('called getDefaultProps');
    return {
      size: 16
    };
  },

  render () {
    var { loginId, size } = this.props;
    var hash = md5(loginId);
    var url = `${GRAVATAR_URL}/${hash}?s=${size*2}`;
    return <img src={url} width={size} />;
  }
});

var GravatarSummaryBox = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      gender: genderType
    })
  },

  render () {
    var user = this.props.user;
    return <p>{user.gender}</p>
  }
});

var App = React.createClass({
  render () {
    var users = this.props.users.map((user) => {
      return (
        <li key={user.id}>
          <Gravatar loginId={user.email} size={user.size} hide={user.hidden} gender={user.gender} /> {user.name}
          <GravatarSummaryBox user={user} />
        </li>
      );
    });
    return (
      <div>
        <h1>Users</h1>
        <ul>{users}</ul>
      </div>
    );
  }
});

React.render(<App users={USERS} />, document.body);

//require('./tests').run(Gravatar, emailType);

