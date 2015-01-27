//Custom javascript for seat booking
//defining N x N seats in the seat type
var setting = {"Gold": [7, 5], "Silver": [5, 6], "Bronze": [6, 7]};
//Array containing ids of seats, which are booked
var booked_seat = [11, 35, 56, 67];

$(function(){
  
  //Initially hiding seat view
  $('div .seven').hide();

  //After filling form showing seatmap
  $('#proceed').on('click', function(){

    var number_of_tickets = $('#no_of_tickets').val();
    var ticket_type = $('#ticket_type').val();
  	$('div .seven').show();
  	$('#seat_type').html(ticket_type); //Changing seat category in green heaading
  	//Removing previous category
  	$('.visual').html("");

  	//Setting sentinel beofrehand for performance optimization
    //outer_sentinel = Number of rows, inner_sentinel = Number of columns
  	outer_sentinel = setting[ticket_type][0];
  	inner_sentinel = setting[ticket_type][1];
//console.log(booked_seat.length);
    //Calling seatmap generator function
    generate_seatmap(outer_sentinel, inner_sentinel, ticket_type);
    //Applying css for pre-booked seat
    for(i = 0; i < booked_seat.length; i++){
      $('#'+booked_seat[i]).prop("class", "bookedSeat");
    }

  });

//Function : when user selects seats
  $('.visual').on('click', '.visual div', function(){
    $('.selectedSeat').prop("class", "seatCss");
    var no = $('#no_of_tickets').val();
    var type = $('#ticket_type').val();
    var id = this.id;
    check = check_silos(no, type, id);
    //loop for selecting adjacent seats, based on number of seats
    if(!check){
     for(i = 0; i < no; i++){
       next_id = parseInt(id) + i;
       //Checking if adjacents seat is not booked
       if($('#'+next_id).hasClass('bookedSeat')){
         alert("Oops! Sorry, "+no+" adjacents seats are not available !");
       }
       else{
         $('#'+next_id).prop("class", "selectedSeat");
       }
     }
    }
    else{
      alert("Can not select seat: Silos Condition or not adjacent seats");
    }
  });
});

function generate_seatmap(outer, inner, type){
  for(i = 1; i <= outer; i++){
    for(j = 1; j <= inner; j++){
      //uniq_id = type + i.toString() + j.toString();
      uniq_id = i.toString() + j.toString();
      $('.visual').append(' <div id="'+uniq_id+'" class="seatCss"></div>');
    }
    $('.visual').append("<br/>");
  }
}

//Function for checking silos condition
function check_silos(no, type, id){
  if(no == (setting[type][1] - 2)){
    for(i = 1; i <= setting[type][0]; i++){
      //Checking if user selected second column for silos condition to occur
      if(id.toString() == (i.toString() + '2')){
        //Checking if last seat is booked or not
        last_id = parseInt(id) + parseInt(no);
        alternative = document.getElementById(last_id).classList.contains("bookedSeat");
        if(alternative){
          return false;
        }
        else{
          return true;
        }
      }
    }
  }
}