$(function(){
  function handleData(q,data){
    return data[1];
  }
  $("#q").zenSuggest(handleData,{dataType:"jsonp", url: "/suggest.json"});
  
  $("#q2").zenSuggest(function(q,data){
    var ar = [],
        prod = data.Products;
    for(var i=0;i<prod.length;i++){
      ar.push(prod[i].Name);
    }
    return ar;
  },{dataType:"jsonp", url: "http://live.auctivaws.com/product/?appid=8880C662E0F2708FBF679809C1A4A4FE&fmt=json&take=10"});
});