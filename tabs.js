function knjtabs_init(args){
  //Find out if an active tab is given in the URL.
  match = ("" + window.location).match(/\#(.+)/);
  
  if (match){
    active = match[1];
  }else{
    active = false;
  }
  
  //An active tab was given in the URL - find out if it actually exists (and the active stuff in the URL refers to something else.
  active_found = false;
  active_first = null;
  
  $(".knjtabs").prepend("<div style=\"height: 31px;\"></div>");
  
  $(".knjtabs > ul > li").each(function(count, ele){
    a_ele = $("a", this);
    li_ele = a_ele.parent();
    
    cont_ele_id = a_ele.attr("href").substring(1);
    if (cont_ele_id == active){
      active_found = true;
    }
    
    if (!active_first){
      active_first = cont_ele_id;
    }
  });
  
  //The active tab was not found - reset the active so the default item is active instead of nothing.
  if (!active_found){
    active = active_first;
  }
  
  $(".knjtabs > ul > li").each(function(count, ele){
    a_ele = $("a", this);
    li_ele = a_ele.parent();
    
    cont_ele_id = a_ele.attr("href").substring(1);
    cont_ele = $("#" + cont_ele_id);
    
    if (active && active == cont_ele_id){
      li_ele.addClass("active");
      
      if (args && args.onload && args.onload[cont_ele_id]){
        setTimeout(function(){
          args.onload[cont_ele_id]();
        }, 25);
      }
      
      if (args && args.content_url && args.content_url[cont_ele_id] && !cont_ele.get(0).html_loaded){
        cont_ele.get(0).html_loaded = true;
        $.ajax({type: "GET", url: args.content_url[cont_ele_id], cache: false, async: false, complete: function(data){
          cont_ele.html(data.responseText);
        }});
      }
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
      
      if (args && args.content_url && args.content_url[eles_cur_id] && !eles_cur_ele.get(0).html_loaded){
        eles_cur_ele.get(0).html_loaded = true;
        $.ajax({type: "GET", url: args.content_url[eles_cur_id], cache: false, async: false, complete: function(data){
          eles_cur_ele.html(data.responseText);
        }});
      }
      
      $("a", $(this).parent().parent()).each(function(){
        $("li", $(this).parent().parent()).removeClass("active");
        eles += 1;
      });
      
      $(this).parent().addClass("active");
      
      $("a", $(this).parent().parent()).each(function(){
        cont_ele_id = $(this).attr("href").substring(1);
        cont_ele = $("#" + cont_ele_id);
        
        if (cont_ele.length <= 0){
          throw "Could not element by ID: " + cont_ele_id;
        }
        
        cont_ele.slideUp("fast", function(){
          eles_finished += 1;
          
          if (eles_finished >= eles){
            eles_cur_ele.slideDown("fast", function(){
              if (args && args.onload && args.onload[eles_cur_id]){
                setTimeout(function(){
                  args.onload[eles_cur_id].call();
                }, 25);
              }
            });
          }
        });
      });
    });
  });
}