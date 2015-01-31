$(document).ready(function($) {
  
  /* Cargando meSpeak */
  meSpeak.loadConfig("mespeak/mespeak_config.json");
  meSpeak.loadVoice('mespeak/voices/es.json');
  instrucciones =  'Diagrama N, Presiona una vez, para escuchar contenido,' ;
  instrucciones += 'Presiona rápidamente dos veces, para escuchar las notas,';
  instrucciones += 'Desliza de, derecha a izquierda, para ir al siguiente elemento';
  meSpeak.speak(instrucciones);

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
      meSpeak.speak('Me gustan las chicas grandes');
  });

  /*
  * Mostrar el siguiente o ir a true
  */
  hammertime.on('swipeleft', function(ev) {
      //console.log(ev);
      //0 = false, 1 = true
      element = $('#flow-element');

      // url = "node/:id/next?=0"
      // node/4
      id = element.data('id');
      url = "/nodes/" + id +"/next";
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
        else if(data['type'] == 'Condition')
          shapeClass = 'rombo';
        else
          shapeClass = 'rectangle';
        console.log(shapeClass);
        console.log(data.type);
        console.log(data);
        text = $(element.find('h4')[0]);
        text.html(data.text);
        flow_shape.attr('class', shapeClass);
      });
      
      meSpeak.speak('Me gustan las chicas grandes');
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
      
      meSpeak.speak('Me gustan las chicas grandes');
  });

});