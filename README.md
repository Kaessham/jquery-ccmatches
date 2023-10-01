jquery-ccmatches
================

A JQuery credit card validator that matches partial and full cards.
It will allow you to specify a callback on input field which will return the card type as well as whether or not it
passes a full regular expression check of the card and the credit card luhn check algorithm.


**Example**
```javascript
$('.creditcard').ccmatches(function(type, fullmatch) {
  // do what you wish
  if (type) {
    console.log(type + ' ' + fullmatch);
  } else {
    console.log("unknown card");
  }
});
```
4024007112216683