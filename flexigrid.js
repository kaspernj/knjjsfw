function flexigrid_settings(ele){
	root_ele = ele.parent().parent().parent();
	
	count = 0;
	cols_settings = {
		hidden: {},
		width: {},
		rp: $("select[name=rp]", root_ele).val(),
		twidth: parseInt($("div.flexigrid", root_ele).css("width")),
		theight: parseInt($("div.cDrag > div", root_ele).css("height")) - 25
	}
	
	$("th", root_ele).each(function(){
		if ($(this).css("display") == "none"){
			cols_settings["hidden"][count] = "hidden";
		}else{
			cols_settings["width"][count] = parseInt($(this).css("width"));
		}
		count += 1;
	});
	
	return cols_settings;
}

function flexigrid_set(ele, shash){
	root_ele = ele.parent().parent().parent();
	
	for(i in shash){
		val = shash[i];
		
		if (i == "width"){
			$("div.flexigrid", root_ele).css("width", val);
		}else if(i == "height"){
			//doesnt work??
			$("div.cDrag > div", root_ele).css("height", val);
		}else{
			alert("Unknown key: " + i);
		}
	}
}

function flexigrid_fix_buttons(){
	$(".fbutton span.input_button").css("padding-left", "0px");
	$(".fbutton span.input_button").css("padding", "2px 15px 2px 15px");
}

function flexigrid_autosave(table_ele, callback){
	root_ele = table_ele.parent().parent().parent();
	$("select[name=rp]", root_ele).change(function(){
		setTimeout(function(){
			callback.call(table_ele);
		}, 250);
	});
	
	in_col_eles = $(".togCol", root_ele.parent().parent().parent());
	in_col_eles.each(function(no, raw_ele){
		ele = $(raw_ele);
		ele.parent().parent().click(function(){
			setTimeout(function(){
				callback.call(table_ele);
			}, 250);
		});
	});
}