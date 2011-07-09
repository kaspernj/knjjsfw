function Events(){
  this.events = {}
  this.connects = {}
}

Events.prototype.add_event = function(data){
  if (!this.events[data["name"]]){
    this.events[data["name"]] = [];
  }
  
  this.events[data["name"]] = data;
}

Events.prototype.call = function(name, args){
  if (this.connects[name]){
    for(key in this.connects[name]){
      this.connects[name][key].call();
    }
  }
}

Events.prototype.connect = function(name, callback){
  if (!this.connects[name]){
    this.connects[name] = [];
  }
  
  this.connects[name].push(callback);
}