//Custom javascript for seat booking

//defining N x N seats in the seat type
$(function(){
  var setting = {"Gold": [7, 5], "Silver": [5, 6], "Bronze": [6, 7]};
  
  //Initially hiding seat view
  $('div .seven').hide();

  //onChange event on seat category selection
  $('#proceed').on('click', function(){

    var number_of_tickets = $('#no_of_tickets').val();
    var ticket_type = $('#ticket_type').val();
  	$('div .seven').show();
  	$('#seat_type').html(ticket_type); //Changing seat category in green heaading
  	//Removing previous category
  	$('.visual').html("");

  	//Setting sentinel for performance optimization
  	outer_sentinel = setting[ticket_type][0];
  	inner_sentinel = setting[ticket_type][1];

    //Calling seatmap generator function
    generate_seatmap(outer_sentinel, inner_sentinel, ticket_type);

  });

//Function : when user selects seats
  $('.visual').on('click', '.seatCss', function(){
    $('.seatCss').prop("disabled", false);
    var no = $('#no_of_tickets').val();
    id = this.id;
    for(i = 0; i < no; i++){
      next_id = parseInt(id) + i;
      $('#'+next_id).prop("disabled", true);
    }
    //split(id);
  });

});

function generate_seatmap(outer, inner, type){
  for(i = 1; i <= outer; i++){
    for(j = 1; j <= inner; j++){
      //uniq_id = type + i.toString() + j.toString();
      uniq_id = i.toString() + j.toString();
      $('.visual').append(i,j + ' <input type="checkbox" id="'+uniq_id+'" class="seatCss"/>');
    }
    $('.visual').append("<br/>");
  }
}

//window.addEventListener("load", init, false);
	
	