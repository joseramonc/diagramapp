$(document).ready(function($) {
  
  /* Cargando meSpeak */
  meSpeak.loadConfig("mespeak/mespeak_config.json");
  meSpeak.loadVoice('mespeak/voices/es.json');
  meSpeak.speak('Me gustan las chicas grandes');

  var myElement = document.getElementById('flow-element');
  var hammertime = new Hammer(myElement);
  hammertime.on('tap', function(ev) {
      console.log(ev);
  });

});