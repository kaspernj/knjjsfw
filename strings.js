//Returns boolean if the strings is a correctly formatted email: k@spernj.org.
function knj_strings_is_email(str){
  if (str.match(/^\S+@\S+\.\S+$/)){
    return true
  }
  
  return false
}