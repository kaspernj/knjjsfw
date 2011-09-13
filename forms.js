function forms_inputs_read(form_ele){
  data = {}
  
  $("input, textarea, select", form_ele).each(function(){
    if (this.type == "checkbox"){
      if ($(this).attr("checked")){
        data[this.name] = "on";
      }else{
        data[this.name] = "";
      }
    }else if(this.name.length > 0){
      data[this.name] = this.value;
    }
  });
  
  $("iframe", form_ele).each(function(){
    match = this.id.match(/^(.+)___Frame$/);
    
    if (match){
      fck = FCKeditorAPI.GetInstance(match[1]);
      data[match[1]] = fck.GetHTML();
    }
  });
  
  return data;
}