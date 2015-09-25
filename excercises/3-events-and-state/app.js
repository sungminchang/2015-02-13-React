 ////////////////////////////////////////////////////////////////////////////////
// Excercise:
// - make these tabs work when you click them
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var assign = require('react/lib/Object.assign');

var DATA = [
  { name: 'USA', description: 'Land of the Free, Home of the brave' },
  { name: 'China', description: 'Lots of concrete' },
  { name: 'Russia', description: 'World Cup 2018!' },
];

var App = React.createClass({

  getInitialState () {
   return {selectedTab: 0}
  },

  switchToTab (e) {
    console.log(e);
    var target = e.dispatchMarker.split('.');
    console.log(target[target.length - 1]);
    var newSelectedTab = parseInt(target[target.length - 1], 10);

    this.setState({selectedTab: newSelectedTab});
  },

  renderTabs () {
    console.log('rendertabls called');
    return this.props.countries.map((country, index) => {
      //console.log('index', index, 'seelcted tab', this.state.selectedTab);
      //console.log('index === this.state.selectedTab', index === this.state.selectedTab);
      var styling = index === this.state.selectedTab ? this.props.styles.activeTab : this.props.styles.tab;
      //console.log('styling', styling);
      //console.log('this.props.styles.activeTab', this.props.styles.activeTab);

      return (
        <div onClick={this.switchToTab} style={index === this.state.selectedTab ? this.props.styles.activeTab : this.props.styles.tab}>
          {country.name}
        </div>
      );
    });
  },

  renderPanel () {
    console.log('rendering Panel');
    var country = this.props.countries[this.state.selectedTab];
    return (
      <div>
        <p>{country.description}</p>
      </div>
    );
  },

  render () {
   var styles = this.props.styles;
   return (
      <div style={this.props.styles.app}>
        <div style={this.props.styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={this.props.styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );

  }
});

var styles = {};

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

styles.activeTab = assign({}, styles.tab, {
  borderBottomColor: '#000'
});

styles.tabPanels = {
  padding: 10
};

React.render(<App countries={DATA} styles={styles}/>, document.body);

