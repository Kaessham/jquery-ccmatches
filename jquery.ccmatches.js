/**
 * jQuery Credit Card Validator
 *
 * Thanks to https://gist.github.com/tkissing/1344175 for the luhnCheck
 */
(function($) {
	$.fn.ccmatches  = function(callback) {
		var cards = [
			{
				key: "american-express",
				full_pattern: /^3[47][0-9]{13}$/,
				partial_pattern: /^3[47][0-9]{0,13}$/
			},
			{
				key: "diners",
				full_pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
				partial_pattern: /^3((0[0-5][0-9]{0,11})|([68][0-9]{0,12}))$/
			},
			{
				key: "discover",
				full_pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
				partial_pattern: /^6((011[0-9]{0,12})|(5[0-9]{0,14}))$/
			},
			{
				key: "jcb",
				full_pattern: /^(2131|1800|35[0-9]{3})[0-9]{11}$/,
				partial_pattern: /^((2131|1800[0-9]{0,11})|(35[0-9]{0,14}))$/
			},
			{
				key: "mastercard",
				full_pattern: /^5[1-5][0-9]{14}$/,
				partial_pattern: /^5[1-5][0-9]{0,14}$/
			},
			{
				key: "visa",
				full_pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
				partial_pattern: /^4[0-9]{0,15}$/
			}
		];
		
		var clean = function(ccnumber) {
			return ccnumber.replace(/[- ]/g,'');
		};
		
		var findType = function(ccnumber) {
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].partial_pattern.test(ccnumber)) {
					return cards[i].key;
				}
			}
			return null;
		};
		
		var isValid = function(ccnumber) {
			for (var i = 0; i < cards.length; i++) {
				if (cards[i].full_pattern.test(ccnumber)) {
					return cards[i].key && luhnCheck(ccnumber);
				}
			}
			return false;
		};
		
		var luhnCheck = function(ccnumber, y, t, e, s, u) {
		    // initialize sum s=0 and multiplicator
		    s = 0; u = y ? 1 : 2;
		    // ensure ccnumber is a string and iterate over digits in ccnumber from right to left
		    for (t = ( ccnumber = ccnumber + '').length; t--;) {
		        e = ccnumber[t] * (u^=3); // if we are at an "even" position, double the digit
		        s += e-(e>9?9:0); // reduce to one digit and add up
		    }
		    t = 10 - (s % 10 || 10); // calculate the difference to modulo10
		    return y ? ccnumber + t : !t; // if calculating checksum, concat; if validating, 0 is a pass
		};
		
		var perform = function() {
			var ccnumber = clean($(this).val());
			var type = findType(ccnumber);
			var fullmatch = isValid(ccnumber);
			callback.call($(this), type, fullmatch);
		};
		
		$(this).on('input', function() {
			// psuedo graceful fallback for non-html5
			$(this).off('keyup');
			perform.apply($(this), arguments);
		});

		$(this).on('keyup', perform);
		
		return $(this);
	}
})(jQuery);
