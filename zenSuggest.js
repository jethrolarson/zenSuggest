$(function(){
  /*: zenSuggest - Really simple search search suggest jQuery plugin
      #author: [Jethro Larson]:http://jethrolarson.com
      #license: [dwl]: http://github.com/jethrolarson/dwl
    @update: #function 
      #takes: search #string, data returned from AJAX request(if specified)
      #returns array of keywords. 
    @ajaxOptions: #object [jQuery AJAX options]:http://docs.jquery.com/Ajax/jQuery.ajax#options. 
      #returns array of keywords. #takes: query #string. #required
  */
  $.fn.zenSuggest = function(update, ajaxOptions){
    var sg={};
    sg.ajaxOptions = ajaxOptions;
    sg.$q = this;
    sg.set = [];
    sg.index = -1;
    sg.q = "";
    sg.$form=sg.$q.closest("form");
    sg.setFromIndex = function(){
      var $li = sg.$list.find("li").removeClass("on");
      if(sg.index>=0){
        var newQ = $li.eq(sg.index).addClass('on').text();
        sg.$q.val(newQ);
      }else{
        sg.$q.val(sg.q);
      }
    };
    //create list
    sg.$list = $('<ul id="sgList"></ul>').width(sg.$q.outerWidth()-2).hide().appendTo(document.body);
    sg.listShow = function(){
      var pos = sg.$q.offset();
      pos.top += sg.$q.outerHeight();
      sg.$list.css({left:pos.left,top:pos.top}).show();
    }
    function render(){
      var html="";
      for(var i=0;i<sg.set.length;i++){
        html+="<li>"+sg.set[i]+"</li>";
      }
      if(html.length>0){
        sg.$list.html(html);
        sg.listShow();
      }else{
        sg.$list.hide();
      }
    }
    //bind handlers
    sg.$q.keyup(function(e){
      if(e.keyCode === 40){//kbd:arrow down
        if(sg.index<sg.set.length-1){   
          sg.index++;
          sg.setFromIndex();
          return false;
        }
      }else if(e.keyCode ===38){//kbd:arrow up
        if(sg.index>=0){
          sg.index--;
          sg.setFromIndex();
          return false;
        }
      }
      else if(e.keyCode == 13){//kbd:enter
        return true;//allow form to submit normally
      }
      else if(this.value.length>0){
        sg.index=-1;
        sg.q = this.value;
        if(ajaxOptions){
          var rdata ={};
          rdata[this.name] = this.value;
          var opts = $.extend({
            success:function(data){
              sg.set = update(sg.q,data);
              render();
            },
            data: rdata
          },ajaxOptions);
          $.ajax(opts)
          
        }else{
          sg.set = update(sg.q);
          render();
        }
        
      }else{
        sg.$list.hide();
      }
    });
    sg.$list.click(function(e){
      sg.index=sg.$list.children().index(e.target);
      sg.setFromIndex();
      sg.$form.submit();
    }).mouseover(function(e){
      var c = sg.$list.children().removeClass("on");
      sg.index =c.index(e.target);
      $(e.target).addClass("on");
    });
    
    //:#TODO Hide on scroll
    $(document).click(function(e){
      if(sg.$list.is(":visible") && e.target.parentNode.parentNode != sg.$list[0] && e.target!=sg.$q[0]){
        sg.$list.hide();
        sg.index = -1;
      }
    });
  };
});