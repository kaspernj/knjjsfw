function modalClose(){
	$.modal.close();
}

function modal_close(){
	$.modal.close();
}

function modal(paras){
	if (!paras["width"]){
		paras["width"] = "640px";
	}
	
	if (!paras["height"]){
		paras["height"] = "480px";
	}
	
	modal_opts = {
		overlay: 80,
		overlayCss: {backgroundColor: "#000000"},
		containerId: "simplemodal_box",
		onOpen: function(dialog){
			$(".youtube object").hide();
			
			dialog.overlay.fadeIn(400, function(){
				dialog.container.fadeIn(0, function(){
					dialog.data.fadeIn(400, function(){
						
					});
				});
			});
		},
		onClose: function(dialog){
			dialog.data.fadeOut(400, function(){
				dialog.container.fadeOut(400, function(){
					dialog.overlay.fadeOut(400, function(){
						$.modal.close();
						$(".youtube object").show();
					});
				});
			});
		}
	};
	
	if (paras["url"]){
		$.ajax({type: "GET", url: paras["url"], cache: false, async: false,
			complete: function(data){
				if (data.getResponseHeader("Title")){
					paras["title"] = data.getResponseHeader("Title");
				}
				
				paras["content"] = data.responseText;
			}
		});
	}
	
	tha_style = "";
	if (paras["width"]){
		tha_style += "width: " + paras["width"] + ";";
		
		if (navigator.appName == "Microsoft Internet Explorer"){
			xpos = (document.documentElement.clientWidth / 2) - (parseInt(paras["width"]) / 2);
		}else{
			xpos = (window.innerWidth / 2) - (parseInt(paras["width"]) / 2);
		}
	}
	if (paras["height"]){
		tha_style += "height: " + paras["height"] + ";";
		
		if (navigator.appName == "Microsoft Internet Explorer"){
			ypos = (document.documentElement.clientHeight / 2) - (parseInt(paras["height"]) / 2);
		}else{
			ypos = (window.innerHeight / 2) - (parseInt(paras["height"]) / 2);
		}
		
		modal_opts["position"] = [ypos, xpos];
	}
	
	realcontent = "<div class=\"simplemodal_box\" style=\"" + tha_style + "\">";
	
	if (paras["title"]){
		realcontent += "<div class=\"simplemodal_header\">";
		realcontent += "<div style=\"float: right; font-size: 9px; font-weight: normal; padding-top: 5px;\"><a href=\"javascript: modalClose();\">[" + locale_strings["close"] + "]</a></div>";
		
		realcontent += paras["title"] + "</div>";
	}
	
	realcontent += paras["content"];
	realcontent += "</div>";
	
	$(realcontent).modal(modal_opts);
}

function modal_setup(paras){
	var head = document.getElementsByTagName("head")[0] || document.body;
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "https://www.kaspernj.org/js/includes/jquery.simplemodal-1.3.5.min.js";
	
	sh = ""
	sh += ".simplemodal_box{";
	
	for(key in paras["css"]){
		sh += key + ": " + paras["css"][key] + ";";
	}
	
	sh += "}";
	
	sh += ".simplemodal_header{";
	
	for(key in paras["css_header"]){
		sh += key + ":	" + paras["css_header"][key] + ";";
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