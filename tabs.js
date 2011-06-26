function knjtabs_init(){
	//Find out if an active tab is given in the URL.
	match = ("" + window.location).match(/\#(.+)/);
	
	if (match){
		active = match[1];
	}else{
		active = false;
	}
	
	//An active tab was given in the URL - find out if it actually exists (and the active stuff in the URL refers to something else.
	if (active){
		active_found = false;
		
		$(".knjtabs > ul > li").each(function(count, ele){
			a_ele = $("a", this);
			li_ele = a_ele.parent();
			cont_ele_id = a_ele.attr("href").substring(1);
			if (cont_ele_id == active){
				active_found = true;
			}
		});
		
		//The active tab was not found - reset the active so the default item is active instead of nothing.
		if (!active_found){
			active = false;
		}
	}
	
	$(".knjtabs > ul > li").each(function(count, ele){
		a_ele = $("a", this);
		li_ele = a_ele.parent();
		
		cont_ele_id = a_ele.attr("href").substring(1);
		cont_ele = $("#" + cont_ele_id);
		
		if (active && active == cont_ele_id){
			li_ele.addClass("active");
		}else if (!li_ele.hasClass("active") || (!active && !li_ele.hasClass("active")) || (active && active != cont_ele_id)){
			li_ele.removeClass("active");
			cont_ele.slideUp(0);
		}
		
		a_ele.click(function(){
			eles = 0;
			eles_finished = 0;
			eles_cur = $(this);
			eles_cur_id = eles_cur.attr("href").substring(1);
			eles_cur_ele = $("#" + eles_cur_id);
			
			$("a", $(this).parent().parent()).each(function(){
				$("li", $(this).parent().parent()).removeClass("active");
				eles += 1;
			});
			
			$(this).parent().addClass("active");
			
			$("a", $(this).parent().parent()).each(function(){
				cont_ele_id = $(this).attr("href").substring(1);
				cont_ele = $("#" + cont_ele_id);
				cont_ele.slideUp("fast", function(){
					eles_finished += 1;
					
					if (eles_finished >= eles){
						eles_cur_ele.slideDown("fast");
					}
				});
			});
		});
	});
}