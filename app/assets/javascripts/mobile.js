function speak (text) {
  $('#speech').remove();
  var dom_element = ('<audio id="speech" src="http://translate.google.com/translate_tts?tl=es&q=' + text + '"controls="controls" autoplay="autoplay">Your browser does not support the audio element.</audio>');
  $('body').prepend(dom_element);
}

$(document).ready(function($) {

  /* Cargando meSpeak */
  var text = '';
  text = 'Desliza de, derecha a izquierda, para ir al siguiente elemento';
  var dom_element = ('<audio id="speech" src="http://translate.google.com/translate_tts?tl=es&q=' + text + '"controls="controls" autoplay="autoplay">Your browser does not support the audio element.</audio>');
  $('body').prepend(dom_element);

  $("#speech").bind('ended', function(){

      $(this).remove();
      text = 'Presiona rápidamente dos veces, para escuchar las notas';
      var dom_element = ('<audio id="speech" src="http://translate.google.com/translate_tts?tl=es&q=' + text + '"controls="controls" autoplay="autoplay">Your browser does not support the audio element.</audio>');
      $('body').prepend(dom_element);

      $("#speech").bind('ended', function(){

          $(this).remove();
          text = 'Presiona una vez, para escuchar contenido,';
          var dom_element = ('<audio id="speech" src="http://translate.google.com/translate_tts?tl=es&q=' + text + '"controls="controls" autoplay="autoplay">Your browser does not support the audio element.</audio>');
          $('body').prepend(dom_element);
      });
  });

  var myElement = document.getElementById('flow-element');
  var hammertime = new Hammer(myElement);

  /*
  * Dice la información del nodo
  */
  /*hammertime.on('tap', function(ev) {
      meSpeak.speak('Me gustan las chicas grandes');
  });*/

  /*
  * Dice la información de ayuda del profesor
  */
  hammertime.on('doubletap', function(ev) {
    speak('Aprende algo dinero');
  });

  /*
  * Mostrar el siguiente o ir a true
  */
  hammertime.on('tap', function(ev) {
      //console.log(ev);
      //0 = false, 1 = true
      element = $('#flow-element');

      // url = "node/:id/next?=0"
      // node/4
      id = element.data('id');
      url = "/nodes/" + id + "/next";
      if(element.data('type') === 'Content'){
        url += "?condition=1"
      }

      $.ajax({
        url: url,
        type: 'GET',
        data: { },
      })
      .done(function(data) {
        //Actualizar data attributes DONE
        element   = $('#flow-element');
        flow_shape = $('#flow-shape');

        element.data('id',   data.id);
        element.data('type', data.type);
        //console.log(data);
        //Y renderizar el dibujo
        shapeClass = "";
        if(data.position == 'initial' || data.position == 'final')
          shapeClass = 'oval';
        else if(data.type == 'Condition')
          shapeClass = 'rombo';
        else
          shapeClass = 'rectangle';
        console.log(data);
        text = $(element.find('h4')[0]);
        text.html(data.text);
        flow_shape.attr('class', shapeClass);
      });

      speak('Me gustan las chicas grandes tap');
  });

  /*
  * Ir a false
  */
  hammertime.on('press', function(ev) {
      //console.log(ev);
      //0 = false, 1 = true
      url = "node/:id/next?=0"
      $.ajax({
        url: url,
        type: 'GET',
        data: {param1: 'value1'},
      })
      .done(function() {
        console.log("success");
      });

      speak('Me gustan las chicas grandes');
  });

});
