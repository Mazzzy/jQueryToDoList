// JavaScript Document for todolist
var todoMain = {
  init : function(){
	//attach add button event 
	$('input[name=addBtn]').on('click', function(){
		//hide add button and show form
		if(!$(this).hasClass('hide')){
		  if($(this).parents('div.addWrapper').find('form').hasClass('hide')){
			  $(this).parents('div.addWrapper').find('form').removeClass('hide');
		  }
		  $(this).addClass('hide');
		}
	});
	
	//attach form submit event for adding new list 
	$('form').submit(function () {
      if ($('input[type=text]').val() !== '') {
        var input_value = $('input[type=text]').val();
        $('ul.todolist').append('<li><span class="title">' + input_value + '</span><ul class="sub-list"></ul><a href="" class="main-del">x</a></li>');
      };
	  
	  //hide form and show add button
	  if(!$(this).hasClass('hide')){
		if($(this).parents('div.addWrapper').find('input[name=addBtn]').hasClass('hide')){
		 $(this).parents('div.addWrapper').find('input[name=addBtn]').removeClass('hide');
		}
		$(this).addClass('hide');
	  }
      $('input[type=text]').val('');
      return false;
	});
	
	//attach cancel button event
	
	$('input[name=cancelBtn]').on('click', function(){
		//hide form and show add button
		if($(this).parents('div.addWrapper').find('input[name=addBtn]').hasClass('hide')){
		  $(this).parents('div.addWrapper').find('input[name=addBtn]').removeClass('hide');
		}	
		$(this).parent().find('input[type=text]').val('');
		$(this).parent().addClass('hide');
	});
	
	//attach cross button event for deleting list item
	$(document).on('click', 'ul.todolist li a.main-del', function (e) {
		//e.preventDefault();
		if(confirm('Are you sure, wanna remove it?')) {
      	  $(this).parent().remove();
		}
		return false;
	});
	
	//attach cross button event for deleting list item
	$(document).on('click', 'ul.todolist li', todoMain.editItem);
  },
  editItem : function(e) { /* for editing list item contents  */
	  var current = $(this);
	  var titleItem = current.find('span.title');
	  
	  var titleValue  = titleItem.text();
	  var htmlValue = current.html();
	  
	  var thisEditbox = $('div.edit-overlay');
	  if(thisEditbox.hasClass('hide')){
		thisEditbox.removeClass('hide');	  
	  }
	  
	  var inputField = thisEditbox.find('input[name=editTitle]');
	  var saveBtn = thisEditbox.find('input[name=saveBtn]');
	  
	  inputField.val(titleValue).focus();
	  
	  $(inputField).keyup(function(){
		var updatedTitle = inputField.val();
		titleItem.text(updatedTitle);
	  });	  
	  
	  var currentSublist = current.find('ul.sub-list');
	  var thisSublist = thisEditbox.find('ul.subtodoList');
	  
	  thisSublist.html(currentSublist.html());
	  
	  $(saveBtn).click(function(){
		if(!thisEditbox.hasClass('hide')){
		 thisEditbox.addClass('hide');	
		 currentSublist.html(thisSublist.html()); 
		}
	  });	 
	  
	  //for list sub items
	  $('input[name=addSublistBtn]').on('click', function(){		
		var input_box = $(this).parents('div.addsublist').find('input[type=text]');
        if (input_box.val() !== '') {    
		  var input_value = input_box.val();
          $(this).parents('div.edit-overlay').find('ul.subtodoList').append('<li><input type="checkbox"/><span>' + input_value + '</span><a href="" class="sub-del">x</a></li>');
        };	  
	    input_box.val('');
        return false;
	  });	
	  
	  //attach cross button event for deleting list item
	$(document).on('click', 'ul.subtodoList li a.sub-del', function (e) {
		if(confirm('Are you sure, wanna remove it?')) {
      	  $(this).parent().remove();
		}
		return false;
	});
	
	var deleteBtn = thisEditbox.find('input[name=deleteSublistBtn]');
	$(deleteBtn).on('click', function(){		
	  thisSublist.find('li input[type=checkbox]').each(function(){
		  if($(this).is(":checked")){
			 $(this).parent().remove(); 
		  }
	  });
	  return false;
	});	
  },
  run : function(){	
	todoMain.init();
  }  
};

$(document).ready(function(e) { todoMain.run(); });