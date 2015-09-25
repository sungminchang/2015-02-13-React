////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// Render `DATA` to the page
// - put the title in an h1
// - only render mexican food (hint: arrays have a "filter" method)
// - sort the items in alphabetical order by name
//   (might want to use `sort-by` https://github.com/staygrimm/sort-by#example)
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var sortBy = require('sort-by');

var DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' }
  ]
};

var Menu = React.createClass({
  render () {
    var items = DATA.items.filter(function(e, i, arr) {
      return e.type === 'mexican';
    }).sort(function(a, b) {
      return b.name < a.name;
    }).map(function(e, i, arr) {
      return <li key={e.id}>{e.name}</li>;
    });
    return (
        <div>
          <h1 key={DATA.items.length}>{DATA.title}</h1>
          <ul>{items}</ul>
        </div>
    );
  }
});

React.render(<Menu/>, document.body, () => {
  require('./tests').run();
});

