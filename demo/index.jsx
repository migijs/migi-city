require('es5-shim');
require('es6-shim');
require('migi');

var MigiCity = require('../src/MigiCity.jsx');

migi.render(<MigiCity showCity="1" showCountry="1" name="province" cityName="city" countryName="country"/>, '#test');