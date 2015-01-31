$(document).ready(function($) {
  
  /* Cargando meSpeak */
  meSpeak.loadConfig("/mespeak/mespeak_config.json");
  meSpeak.loadVoice('/mespeak/voices/es-la.json');

  diagram_name = $('#diagram_name').html();
  node_content = $('#node-content').html();

  instrucciones =  diagram_name + ', Presiona una vez, para escuchar el contenido,' ;
  instrucciones += 'Presiona rápidamente dos veces, para escuchar las notas,';
  instrucciones += 'Desliza de, derecha a izquierda, para ir al siguiente elemento, ';
  instrucciones += 'El Contenido del nodo es , '+ node_content;

  meSpeak.speak(instrucciones, { "speed": "130", "amplitude": "120", "wordgap": "2", "variant": "m5"});

  var myElement = document.getElementById('flow-element');
  var hammertime = new Hammer(myElement);

  /*
  * Dice la información del nodo
  */
  hammertime.on('tap', function(ev) {
    console.log(ev.tapCount);
    node_content = $('#node-content').html();
    contenido = 'El Contenido del nodo es , '+ node_content;
    meSpeak.speak(contenido);
  });

  /*
  * Dice la información de ayuda del profesor
  */
  var mc = new Hammer.Manager(myElement, {});
  mc.add( new Hammer.Tap({ event: 'doubletap', taps: 1, interval: 10000 }) );
  hammertime.on('pinch', function(ev) {
      nodeHelp = $('#node-help').html();
      meSpeak.speak('Información Adicional, '+ nodeHelp);
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
        node_content = $('#node-content').html(data.text);

        element.data('id',   data.id);
        element.data('type', data.type);
        console.log(data);
        //console.log(data);
        //Y renderizar el dibujo
        shapeClass = "";
        tipoNodo   = "";
        if(data.position == 'initial' || data.position == 'final'){
          if (data.position == 'initial') {
            tipoNodo = "Inicio";
          }else{
            tipoNodo = "Final";
          }
          shapeClass = 'oval';
        }
        else if(data.type == 'Condition'){
          tipoNodo   = "Condición";
          shapeClass = 'rombo';
          }
        else{
          tipoNodo   = "Actividad";
          shapeClass = 'rectangle';
        }

        text = $(element.find('h4')[0]);
        text.html(data.text);
        flow_shape.attr('class', shapeClass);

        node_content = $('#node-content').html();      
        instrucciones = 'Tipo de nodo , '+ tipoNodo;
        instrucciones += ', Contenido , '+ node_content;
        meSpeak.speak(instrucciones, { "speed": "130", "amplitude": "120", "wordgap": "2", "variant": "m5"});
      });
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