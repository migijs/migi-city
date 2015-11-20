var Select = require('./Select.jsx');
var list = require('./city.json');

class MigiCity extends migi.CacheComponent {
  constructor(...data) {
    super(...data);
    this.on(migi.Event.DOM, function() {
      var selects = this.findAll(Select);
      var province = selects[0];
      var city = selects[1];
      var country = selects[2];
      province.bridge(city, 'value', 'list', function(d) {
        for(var i = 0, len = this.list.length; i < len; i++) {
          if(this.list[i].name == d.name) {
            return this.list[i].citys;
          }
        }
        return [];
      });
      city.bridge(country, 'value', 'list', function(d) {
        for(var i = 0, len = this.list.length; i < len; i++) {
          if(this.list[i].name == d.name) {
            return this.list[i].countys;
          }
        }
        return [];
      });
      province.on('click', function() {
        city.$.show = false;
        country.$.show = false;
      });
      city.on('click', function() {
        province.$.show = false;
        country.$.show = false;
      });
      country.on('click', function() {
        city.$.show = false;
        province.$.show = false;
      });
    });
  }

  render() {
    var args = this.props;

    var showCity = args.showCity;
    var showCountry = args.showCountry;

    var name = args.name;
    var cityName = args.cityName;
    var countryName = args.countryName;

    return <div>
        <Select name={ name } list={ list } allowPropagation="1"/>
        <Select name={ cityName } style={ showCity ? 'margin-left:10px' : 'display:none' } list={ list[0].citys } allowPropagation="1"/>
        <Select name={ countryName } style={ showCountry ? 'margin-left:10px' : 'display:none' } list={ list[0].citys[0].countys } allowPropagation="1"/>
      </div>;
  }
}

module.exports = MigiCity;