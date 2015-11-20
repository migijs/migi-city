var style = require('./style.cssx');console.log(style)

class Select extends migi.CacheComponent {
  constructor(...data) {
    super(...data);
    var self = this;
    self._list = data[0].list || [];
    if(self._list[0]) {
      self._value = self._list[0];
    }
    self._show = false;
    self.style = style;
    self.on(migi.Event.DOM, function() {
      if(migi.browser.lie && document.body.attachEvent) {
        window.attachEvent('onclick', function(e) {
          e = e || window.event;
          if(e.srcElement != self.$.element) {
            self.$.show = false;
          }
        });
      }
      else {
        window.addEventListener('click', function(e) {
          if(e.target != self.element) {
            self.$.show = false;
          }
        });
      }
    });
  }
  get list() {
    return this._list;
  }
  set list(v) {
    this._list = v;
    if(v.length) {
      this.value = v[0];
    }
    else {
      this.value = '';
    }
  }
  get show() {
    return this._show;
  }
  set show(v) {
    this._show = v;
  }
  set value(v) {
    this._value = v || {};
  }
  get value(list) {
    return this._value;
  }
  handleClick(e) {
    this.show = !this.show;
    if(e.target.tagName == 'LI') {
      var index = e.target.getAttribute('index');
      this.value = this.list[index];
    }
    this.emit('click');
  }
  render() {
    return (
      <div class={ this.show ? 'select show' : 'select' } onClick={ this.handleClick } style={ this.props.style }>
        <input type="hidden" value={ this.value.value } name={ this.props.name }/>
        <div class="place">
          {
            this.list.map(function(item) {
              return <div>{ item.name }</div>;
            })
          }
        </div>
        <strong>{ this.value.name || '&nbsp;' }</strong>
        <b></b>
        <ul class={ this.show ? 'c show' : 'c' }>
          {
            this.list.map(function(item, i) {
              return <li title={ item.name } index={ i }>{ item.name }</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = Select;