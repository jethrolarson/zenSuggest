/*
  var lib = {};
  lib.getObWithProp = function(v,prop,value){
    if($.isArray(v)){
      for(var i=0;i<v.length;i++){
        if(typeof v[i]!=="object")continue;
        if(v[i][prop] && v[i][prop] == value){
          return v[i];
        }else{
          for(var o in v[i]){
            if(typeof v[i][o] ==="object"){
              var child = lib.getObWithProp(v[i][o],prop,value);
              if(child!=null) return child;
            }
          }
        }
      }
    }
    return null;
  };
  Array.prototype.unique = function(){
    var a=[],i,l=this.length;
    for(i=0; i<l; i++){
      if(a.indexOf(this[i]) < 0) a.push(this[i]); 
    }
    return a;
  };
  //get keywords
  var keywords = [];
  $.getJSON("http://live.auctivaws.com/categorytree/?appid=8880C662E0F2708FBF679809C1A4A4FE&fmt=json&callback=?", function(data){
    var categories = data.ResultObject.TopLevelCategories;
    function flat(cat){
      if(cat.SubCategories && cat.SubCategories.length>0)
        for(var i = 0; i<cat.SubCategories.length; i++){
          flat(cat.SubCategories[i]);
        }
      if(cat.CategoryID)
        keywords.push(cat.CategoryName);
    }
    for(var i = 0; i<categories.length; i++){
      flat(categories[i]);
    }
    keywords = keywords.unique();
  });
  
  function pare(str,ar,maxlength){
    var out = [];
    for(var i=0;i<ar.length;i++){
      if(ar[i].substr(0,str.length).toLowerCase() === str.toLowerCase()){
        out.push(ar[i]);
        if(out.length>=maxlength) break;
      }
    }
    return out;
  };
  function update(q){
    return pare(q,keywords,10);
  }*/