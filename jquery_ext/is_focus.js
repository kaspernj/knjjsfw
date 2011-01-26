jQuery.extend(jQuery.expr[':'], {
	focus: function(e){
		return e == document.activeElement;
	}
});