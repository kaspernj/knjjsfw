var contextmenu_settings = {};
function contextmenu_setup(settings){
	contextmenu_settings = settings;
	
	var head = document.getElementsByTagName("head")[0] || document.body;
	var script = document.createElement("script");
	script.type = "text/javascript";
	
	if (contextmenu_settings["url"]){
		script.src = contextmenu_settings["url"] + "/jquery.contextmenu.r2.packed.js";
	}else{
		script.src = "https://www.kaspernj.org/js/jquery.contextmenu.r2.packed.js";
	}
	
	head.appendChild(script);
	setTimeout("contextmenu_init();", 100);
}

function contextmenu_init(args){
	if (!$.contextMenu){
		setTimeout("contextmenu_init();", 100);
		return null;
	}
	
	menustyle = {width: "260px"}
	if (contextmenu_settings["width"]){
		menustyle["width"] = contextmenu_settings["width"];
	}
	
	for(var i in contextmenu_settings["menus"]){
		val = contextmenu_settings["menus"][i];
		
		$(i).contextMenu(val["menu"], {
			bindings: val["binding"]
		});
	}
	
	$.contextMenu.defaults({
		menuStyle: menustyle
	});
}