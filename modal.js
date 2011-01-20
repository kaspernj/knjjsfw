function modalClose(){
	$.modal.close();
}

function modal_close(){
	$.modal.close();
}

function modal(args){
	if (!args["width"]){
		args["width"] = "640px";
	}
	
	if (!args["height"]){
		args["height"] = "480px";
	}
	
	modal_opts = {
		overlay: 80,
		overlayCss: {backgroundColor: "#000000"},
		containerId: "simplemodal_box",
		onOpen: function(dialog){
			$(".youtube object").hide();
			
			dialog.overlay.fadeIn("fast", function(){
				dialog.container.fadeIn(0, function(){
					dialog.data.fadeIn("fast", function(){
						
					});
				});
			});
		},
		onClose: function(dialog){
			dialog.data.fadeOut("fast", function(){
				dialog.container.fadeOut("fast", function(){
					dialog.overlay.fadeOut("fast", function(){
						$.modal.close();
						$(".youtube object").show();
					});
				});
			});
		}
	};
	
	if (args["url"]){
		$.ajax({type: "GET", url: args["url"], cache: false, async: false,
			complete: function(data){
				if (data.getResponseHeader("Title")){
					args["title"] = data.getResponseHeader("Title");
				}
				
				args["content"] = data.responseText;
			}
		});
	}
	
	tha_style = "";
	if (args["width"]){
		tha_style += "width: " + args["width"] + ";";
		
		if (navigator.appName == "Microsoft Internet Explorer"){
			xpos = (document.documentElement.clientWidth / 2) - (parseInt(args["width"]) / 2);
		}else{
			xpos = (window.innerWidth / 2) - (parseInt(args["width"]) / 2);
		}
	}
	if (args["height"]){
		tha_style += "height: " + args["height"] + ";";
		
		if (navigator.appName == "Microsoft Internet Explorer"){
			ypos = (document.documentElement.clientHeight / 2) - (parseInt(args["height"]) / 2);
		}else{
			ypos = (window.innerHeight / 2) - (parseInt(args["height"]) / 2);
		}
		
		modal_opts["position"] = [ypos, xpos];
	}
	
	realcontent = "<div class=\"simplemodal_box\" style=\"" + tha_style + "\">";
	
	if (args["title"]){
		realcontent += "<div class=\"simplemodal_header\">";
		realcontent += "<div style=\"float: right; font-size: 9px; font-weight: normal; padding-top: 5px;\"><a href=\"javascript: modalClose();\">[" + locale_strings["close"] + "]</a></div>";
		realcontent += args["title"] + "</div>";
	}
	
	realcontent += args["content"];
	realcontent += "</div>";
	
	$(realcontent).modal(modal_opts);
}

function modal_setup(args){
	var head = document.getElementsByTagName("head")[0] || document.body;
	var script = document.createElement("script");
	script.type = "text/javascript";
	
	if (args["url"]){
		script.src = args["url"] + "/includes/jquery.simplemodal-1.4.1.js";
	}else{
		script.src = "https://www.kaspernj.org/js/includes/jquery.simplemodal-1.4.1.js";
	}
	
	sh = ""
	sh += ".simplemodal_box{";
	
	for(key in args["css"]){
		sh += key + ": " + args["css"][key] + ";";
	}
	
	sh += "}";
	
	sh += ".simplemodal_header{";
	
	for(key in args["css_header"]){
		sh += key + ":	" + args["css_header"][key] + ";";
	}
	sh += "}";
	
	if (navigator.appName == "Netscape"){
		var divele = document.createElement("div");
		divele.innerHTML = "<style type=\"text/css\">" + sh + "</style>";
		
		document.body.appendChild(divele);
	}else if(navigator.appName == "Microsoft Internet Explorer"){
		var style = document.createElement("style");
		style.type = "text/css";
		style.styleSheet.cssText = sh;
		head.appendChild(style);
	}else{
		var style = document.createElement("style");
		style.type = "text/css";
		style.innerHTML = sh;
		head.appendChild(style);
	}
	
	head.appendChild(script);
}