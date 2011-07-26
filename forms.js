function forms_inputs_read(form_ele){
  data = {}
  
  $("input, textarea, select", form_ele).each(function(){
    if (this.name.length > 0){
      data[this.name] = this.value;
    }
  });
  
  return data;
}