//var style = require('./style.cssx');

console.log(style);

class Select extends migi.Component {
  constructor(...data) {
    super(...data);
    var self = this;
    self._list = [];
    self._value = '';
    self._show = false;
    self.on(migi.Event.DOM, function() {
      if(migi.browser.lie && document.body.attachEvent) {
        document.body.attachEvent('onclick', function(e) {
          e = e || window.event;
          if(e.srcElement != self.$.element) {
            self.$.show = false;
          }
        });
      }
      else {
        document.body.addEventListener('click', function(e) {
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
      this.value = v[0].name;
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
    if(v) {
      var cur = this.element.querySelector('.cur');
      if(cur) {
        cur.className = '';
      }
      cur = this.element.querySelector('li[title="' + this.value + '"]');
      if(cur) {
        cur.className = 'cur';
      }
    }
  }
  set value(v) {
    this._value = v;
  }
  get value(list) {
    return this._value;
  }
  handleClick(e) {
    this.show = !this.show;
    if(e.target.tagName == 'LI') {
      this.value = e.target.innerHTML;
    }
    this.emit('show');
  }
  handlerOver(e) {
    if(e.target.tagName == 'LI' && e.target.className != 'cur') {
      var cur = this.element.querySelector('.cur');
      if(cur) {
        cur.className = '';
      }
      e.target.className = 'cur';
    }
  }
  render() {
    return (
      <div class={ this.show ? 'select show' : 'select' } onClick={ this.handleClick }>
        <input type="hidden" value={ this.value }/>
        <div class="place">
          {
            this.list.map(function(item) {
              return <div>{ item.name }</div>;
            })
          }
        </div>
        <strong>{ this.value || '&nbsp;' }</strong>
        <b></b>
        <ul class={ this.show ? 'c show' : 'c' } onMouseOver={ this.handlerOver }>
          {
            this.list.map(function(item) {
              return <li title={ item.name }>{ item.name }</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

module.exports = Select;