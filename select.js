function select_moveopt(select_from, select_to){
	$(select_from + " option:selected").remove().appendTo(select_to);
}

function select_moveup(sel){
	$(sel).find("option:selected").each(function(){
		$(this).insertBefore($(this).prev());
	});
}

function select_movedown(sel){
	$($(sel).find("option:selected").get().reverse()).each(function(){
		$(this).insertAfter($(this).next());
	});
}

function select_values(args){
	val = "";
	
	findstr = "option";
	
	if (args["selected"]){
		findstr += ":selected";
	}
	
	first = true;
	$(args["sel"]).find(findstr).each(function(){
		if (first){
			first = false;
		}else{
			val += args["expl"];
		}
		
		val += $(this).val();
	});
	
	return val;
}