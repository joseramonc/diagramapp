$(document).ready(function($) {
  
  var myElement = document.getElementById('flow-element');
  var hammertime = new Hammer(myElement);
  hammertime.on('tap', function(ev) {
      console.log(ev);
  });
  
});