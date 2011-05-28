function box(args){
	knjbox_args["shown"] = true;
	treat_box = true;
	
	if (args["width"]){
		knjbox.css("width", args["width"]);
	}
	
	if (args["height"]){
		knjbox.css("height", args["height"]);
	}
	
	if (args["url"]){
		if (args["loading"]){
			if (args["width"]){
				knjbox_args["width"] = args["width"];
			}else{
				knjbox_args["width"] = parseInt(knjbox.css("width"));
			}
			
			if (args["height"]){
				knjbox_args["height"] = parseInt(args["height"]);
			}else{
				knjbox_args["height"] = 150;
			}
			
			ajaxargs = {type: "GET", url: args["url"], cache: false, async: true, complete: function(data){
					$("#box_content", knjbox).html(data.responseText);
					$("#box_loading", knjbox).slideUp("fast", function(){
						$("#box_content", knjbox).slideDown("fast", function(){
							knjbox_args["width"] = knjbox.width();
							knjbox_args["height"] = knjbox.height();
						});
					});
			}};
			args["content"] = "<div style=\"display: none;\" id=\"box_content\"></div><div id=\"box_loading\">Loading...</div>";
		}else{
			if (args["async"]){
				ajaxargs = {type: "GET", url: args["url"], cache: false, async: true, complete: function(data){
					args["content"] = data.responseText;
					knjbox_args["width"] = knjbox.width();
					knjbox_args["height"] = knjbox.height();
					
					knjbox.stop();
					knjbox.html(args["content"]);
					knjbox.fadeTo("fast", 1);
					
					if (args["event"]){
						box_update(args["event"]);
					}
				}};
			}else{
				ajaxargs = {type: "GET", url: args["url"], cache: false, async: false, complete: function(data){
					args["content"] = data.responseText;
					knjbox_args["width"] = knjbox.width();
					knjbox_args["height"] = knjbox.height();
				}};
			}
		}
		
		$.ajax(ajaxargs);
	}
	
	if (!args["async"]){
		knjbox.stop();
		knjbox.html(args["content"]);
		knjbox.fadeTo("fast", 1);
		
		if (args["event"]){
			box_update(args["event"]);
		}
	}
}

function box_update(event){
	if (!knjbox_args["shown"]){
		return null;
	}
	
	if ($.browser.webkit){
		scroll_top = document.body.scrollTop;
		scroll_left = document.body.scrollLeft;
	}else if(document.documentElement){
		scroll_top = $("html").scrollTop();
		scroll_left = $("html").scrollLeft();
	}
	
	sh = $("html").height() + scroll_top;
	sw = $("html").width() + scroll_left;
	
	pos_top = event.clientY + scroll_top + 17;
	pos_left = event.clientX + scroll_left + 25;
	
	popbox_bottom_pos = pos_top + knjbox_args["height"] + 40;
	popbox_right_pos = pos_left + knjbox_args["width"] + 55;
	
	old_reverse_top = knjbox_args["reverse_top"];
	old_reverse_left = knjbox_args["reverse_left"];
	
	if (popbox_bottom_pos > sh){
		knjbox_args["reverse_top"] = true;
		pos_top = event.clientY + scroll_top - knjbox_args["height"] - 45;
	}else{
		knjbox_args["reverse_top"] = false;
	}
	
	if (popbox_right_pos > sw){
		knjbox_args["reverse_left"] = true;
		pos_left = event.clientX + scroll_left - knjbox_args["width"] - 45;
	}else{
		knjbox_args["reverse_left"] = false;
	}
	
	old_left = parseInt(knjbox.css("left"));
	old_top = parseInt(knjbox.css("top"));
	
	if (old_left > pos_left){
		diff_left = old_left - pos_left;
	}else{
		diff_left = pos_left - old_left;
	}
	
	if (old_top > pos_top){
		diff_top = old_top - pos_top;
	}else{
		diff_top = pos_top - old_top;
	}
	
	args_animate = {opacity: 1};
	do_animate = false;
	do_animate_top = false;
	do_animate_left = false;
	
	if (knjbox_args["animating_top"]){
		do_animate_top = true;
	}else if(diff_top > 50 && diff_top < 300){
		if (knjbox_args["reverse_top"] && !old_reverse_top){
			do_animate_top = true;
		}else if(!knjbox_args["reverse_top"] && old_reverse_top){
			do_animate_top = true;
		}
	}
	
	if (knjbox_args["animating_top"]){
		//if boxes run over the mouse they will be hidden... avoide like this.
		do_animate_left = false;
	}else if (knjbox_args["animating_left"]){
		do_animate_left = true;
	}else if(diff_left > 50 && diff_left < 600){
		if (knjbox_args["reverse_left"] && !old_reverse_left){
			do_animate_left = true;
		}else if(!knjbox_args["reverse_left"] && old_reverse_left){
			do_animate_left = true;
		}
	}
	
	if (do_animate_top){
		do_animate = true;
		knjbox_args["animating_top"] = true;
		args_animate["top"] = pos_top + "px";
	}else{
		knjbox.css("top", pos_top + "px");
	}
	
	if (do_animate_left){
		do_animate = true;
		knjbox_args["animating_left"] = true;
		args_animate["left"] = pos_left + "px";
	}else{
		knjbox.css("left", pos_left + "px");
	}
	
	if (do_animate){
		knjbox.stop();
		knjbox.animate(args_animate, "fast", function(){
			knjbox_args["animating_left"] = false;
			knjbox_args["animating_top"] = false;
		});
	}
}

function box_hide(){
	knjbox_args["shown"] = false;
	knjbox.stop();
	knjbox.fadeOut("fast", function(){
		knjbox.html("");
		knjbox.css("top", "0px");
		knjbox.css("left", "0px");
	});
	
	knjbox_args = {
		width: 0,
		height: 0,
		animating_left: false,
		animating_top: false,
		reverse_top: false,
		reverse_left: false,
		shown: false
	};
}

var knjbox = "";
var knjbox_args = {
	width: 0,
	height: 0,
	animating_left: false,
	animating_top: false,
	reverse_top: false,
	reverse_left: false,
	shown: false
};

$(document).ready(function(){
	$("body").prepend("<div id=\"knjbox\"></div>");
	knjbox = $("#knjbox");
	knjbox_content = $("#knjbox_content");
	
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
	knjbox = $("#knjbox"); //fixes bug - the variable would have been unset.
	knjbox.stop();
	knjbox.fadeTo(0, 0, function(){
		knjbox.html("");
		knjbox.css("top", "0px");
		knjbox.css("left", "0px");
	});
});