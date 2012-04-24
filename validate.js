var validate_settings = {
  invalid_email_str: "You have not entered a valid email in the '%2$s'-element: '%1$s'.",
  invalid_phone_no_str: "You have not entered a valid phone number in the '%2$s'-element: '%1$s'. Your should use this format: '+4512345678'.",
  required_str: "The element '%s' is required, please enter something in it.",
  length_min_str: "Please enter at least %1$s characters in the '%2$s'-element.",
  confirm_str: "The %1$s element is not the same as the '%2$s'-element."
}

function validate(args){
  valid_all = true
  errors = []
  
  for(key in args.elements){
    data = args.elements[key]
    element = data.element
    val = String(element.val())
    valid = true
    
    if (data.name){
      element_name = data.name
    }else if(element && element.attr("name")){
      element_name = element.attr("name")
    }else if(element && element.attr("id")){
      element_name = element.attr("id")
    }else{
      element_name = "[no element-name]"
    }
    
    if (!data.element || element.length <= 0){
      valid_all = false
      alert("Invalid element: " + element_name)
      continue
    }
    
    if (data.type == "email"){
      if (!validate_email(val)){
        valid = false
        errors.push(sprintf(validate_settings.invalid_email_str, val, element_name))
      }
    }else if(data.type == "phone_no"){
      if (!validate_phone_no(val)){
        valid = false
        errors.push(sprintf(validate_settings.invalid_phone_no_str, val, element_name))
      }
    }
    
    if (data.required){
      if ($.trim(val).length <= 0){
        valid = false
        errors.push(sprintf(validate_settings.required_str, element_name))
      }
    }
    
    if (data.length_min){
      if (val.length < data.length_min){
        valid = false
        errors.push(sprintf(validate_settings.length_min_str, data.length_min, element_name))
      }
    }
    
    if (data.confirm){
      val_confirm = data.confirm.val()
      
      if (val != val_confirm){
        valid = false
      }
    }
    
    if (!valid){
      valid_all = false
      element.css({
        border: "1px solid red"
      })
    }else{
      element.css({
        border: ""
      })
    }
  }
  
  if (errors.length > 0){
    alert(errors.join("\n\n"))
  }
  
  return valid_all
}

function validate_email(email_str){
  match = email_str.match(/^\S+@\S+\.\S+$/)
  
  if (match){
    return true
  }else{
    return false
  }
}

function validate_phone_no(phone_no_str){
  match = phone_no_str.match(/^\+\d{2}\d+$/)
  
  if (match){
    return true
  }else{
    return false
  }
}