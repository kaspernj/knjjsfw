function box(args){
	if (args["url"]){
		if (args["loading"]){
			ajaxargs = {type: "GET", url: args["url"], cache: false, async: true,
				complete: function(data){
					$("#box_content").html(data.responseText);
					$("#box_loading").slideUp("fast", function(){
						$("#box_content").slideDown("fast");
					});
				}
			};
			args["content"] = "<div style=\"display: none;\" id=\"box_content\"></div><div id=\"box_loading\">Loading...</div>";
		}else{
			ajaxargs = {type: "GET", url: args["url"], cache: false, async: false,
				complete: function(data){
					args["content"] = data.responseText;
				}
			};
		}
		
		$.ajax(ajaxargs);
	}
	
	knjbox.stop();
	knjbox.html(args["content"]);
	knjbox.fadeTo("fast", 1);
}

function box_update(event){
	if (document.body.scrollTop){
		scroll_top = document.body.scrollTop;
		scroll_left = document.body.scrollLeft;
	}else if(document.documentElement){
		scroll_top = document.documentElement.scrollTop;
		scroll_left = document.documentElement.scrollLeft
	}
	
	pos_top = event.clientY + scroll_top + 17;
	pos_left = event.clientX + scroll_left + 10;
	
	knjbox.css("top", pos_top + "px");
	knjbox.css("left", pos_left + "px");
}

function box_hide(){
	knjbox.stop();
	knjbox.fadeTo(150, 0, function(){
		knjbox.html("");
		knjbox.css("top", "0px");
		knjbox.css("left", "0px");
	});
}

var knjbox = ""

$(document).ready(function(){
	$("body").prepend("<div id=\"knjbox\"></div>");
	knjbox = $("#knjbox");
	
	knjbox.css("border", "1px solid white");
	knjbox.css("background-color", "black");
	knjbox.css("padding", "15px");
	knjbox.css("width", "400px");
	knjbox.css("position", "absolute");
	knjbox.css("color", "white");
	knjbox.css("z-index", 9999);
	
	knjbox.fadeOut(0);
	
	$(".knjbox").mousemove(function(event){
		box_update(event);
	});
	$(".knjbox").mouseout(function(){
		box_hide();
	});
});

$(window).unload(function(){
	knjbox = $("#knjbox");
	knjbox.stop();
	knjbox.fadeTo(0, 0, function(){
		knjbox.html("");
		knjbox.css("top", "0px");
		knjbox.css("left", "0px");
	});
});