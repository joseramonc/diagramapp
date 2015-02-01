$(document).ready(function($) {

  setTimeout(function() {
    $('#st').attr('fill', 'yellow');
  }, 1000);

  
});

$(document).on('keydown', function(e) {
  //$('#4').attr('fill', 'blue');
  //#E8CAAF
  /*Right arrow*/
  nums = 1;
  if (e.keyCode === 39){
    $("#"+nums).attr('fill', 'yellow');
  }
});