function Knj(){
  
}

Knj.remove_prepending_slashes = function(){
  md = location.href.match(/^http(s|):\/\/([0-9A-z\.]+)\.([0-9A-z]{2,6})([\/]{2,})(.*)$/);
  if (md){
    newurl = "http" + md[1] + "://" + md[2] + "." + md[3] + "/" + md[5];
    location.href = newurl
  }
}