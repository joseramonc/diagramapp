$('form.editable').on('keypress', function(e) {
    /*Right arrow*/
    if (e.keyCode === 39){
      element = $('#flow-element');
      //Actualizar data attributes DONE
      element   = $('#flow-element');
      flow_shape = $('#flow-shape');
      node_content = $('#node-content').html(data.text);

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

          
    }
});