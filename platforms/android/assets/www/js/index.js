var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// Variables for referencing the canvas and 2dcanvas context
        var canvas,ctx;
        var coloring;
        
        

  $(document).ready( function() {

            $('.demo').each( function() {
                $(this).minicolors({
                    control: $(this).attr('data-control') || 'hue',
                    defaultValue: $(this).attr('data-defaultValue') || '',
                    inline: $(this).attr('data-inline') === 'true',
                    letterCase: $(this).attr('data-letterCase') || 'lowercase',
                    opacity: $(this).attr('data-opacity'),
                    position: $(this).attr('data-position') || 'bottom right',
                    change: function(hex, opacity) {
                        var log;
                        try {
                            log = hex ? hex : 'transparent';
                      
                            if( opacity ) log += ', ' + opacity;

                            var c = log;
                            coloring= c;
                            var c2 = log;
                            coloring2= c2;
                          
                            console.log("HEX: " + '' + log);
                            
                        } catch(e) {}
                    },
                    
                    theme: 'default'
                });



            });

              
        });
        var s2; 

              $(function() {
              $( "#slider2" ).slider({
                  value:1,
                    min: 1,
                    max: 15,
                    step: 1,
                slide: function( event, ui ) {
                var x2 = ui.value;
                s2= x2;
                console.log(s2);
                      }
                  });   
              });

              

// Variables to keep track of the mouse position and left-button status 
    var mouseX2,mouseY2,mouseDown2=0;
    // Variables to keep track of the touch position
    var touchX2,touchY2;
    // Keep track of the old/last position when drawing a line
    // We set it to -1 at the start to indicate that we don't have a good value for it yet
    var lastX2,lastY2=-1;
    
    
      
    
        // Draws a line between the specified position on the supplied canvas name
        // Parameters are: A canvas context, the x position, the y position, the size of the dot
        function drawLine2(ctx2,x,y,s2) {
        // If lastX is not set, set lastX and lastY to the current position 
        if (lastX2==-1) {
            lastX2=x;
            lastY2=y;
        }
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=0; g=0; b=0; a=255;



        // Select a fill style
        // ctx.strokeStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        ctx2.strokeStyle = coloring2;
        // Set the line "cap" style to round, so lines at different angles can join into each other
        ctx2.lineCap = "round";
        //ctx.lineJoin = "round";
        // Draw a filled line
        ctx2.beginPath();
        // First, move to the old (previous) position
        ctx2.moveTo(lastX2,lastY2);
        // Now draw a line to the current touch/pointer position
        ctx2.lineTo(x,y);
        // Set the line thickness and draw the line
        ctx2.lineWidth = s2;
        ctx2.stroke();
        ctx2.closePath();
        // Update the last position to reference the current position
        lastX2=x;
        lastY2=y;
    } 
    
        // Clear the canvas context using the canvas width and height
        function clearCanvas2(canvas2,ctx2) {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        // var outlineImage = new Image();
        // outlineImage.src = "img/crayon.png";
          ctx2.drawImage(outlineImage,100,100,100,100);
        }
        // Keep track of the mouse button being pressed and draw a dot at current location
        function sketchpad_mouseDown2() {
        mouseDown2=1;
        drawLine2(ctx2,mouseX2,mouseY2,s2);
        }
        // Keep track of the mouse button being released
        function sketchpad_mouseUp2() {
        mouseDown2=0;
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX2=-1;
        lastY2=-1;
        }
        // Keep track of the mouse position and draw a dot if mouse button is currently pressed
        function sketchpad_mouseMove2(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos2(e);
        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown2==1) {
            drawLine2(ctx2,mouseX2,mouseY2,s2);
        }
      }
        // Get the current mouse position relative to the top-left of the canvas
        function getMousePos2(e) {
        if (!e)
            var e = event;
        if (e.offsetX) {
            mouseX2 = e.offsetX;
            mouseY2 = e.offsetY;
        }
        else if (e.layerX) {
            mouseX2 = e.layerX;
            mouseY2 = e.layerY;
        }
     }
      // Draw something when a touch start is detected
        function sketchpad_touchStart2() {
        // Update the touch co-ordinates
        getTouchPos2();
        drawLine2(ctx2,touchX2,touchY2,s2);
        // Prevents an additional mousedown event being triggered
        event.preventDefault();


    }
        function sketchpad_touchEnd2() {
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX2=-1;
        lastY2=-1;
    }
        // Draw something and prevent the default scrolling when touch movement is detected
        function sketchpad_touchMove2(e) { 
        // Update the touch co-ordinates
        getTouchPos2(e);
        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        
        drawLine2(ctx2,touchX2,touchY2,s2); 
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();

        var outlineImage = new Image();
        outlineImage.src = "img/girlsoccer.png";
          ctx2.drawImage(outlineImage,100,100,100,100);
          console.log("reDraw");
    }
    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
        function getTouchPos2(e) {
        if (!e)
            var e = event;
           //  "onmousedown" = true;
        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX2=touch.pageX-touch.target.offsetLeft;
                touchY2=touch.pageY-touch.target.offsetTop;
                console.log(e.touches);
                
            }
        }
    }

        //erases with the same size stroke  
        function myEraser2(){
        ctx2.globalCompositeOperation = "destination-out";
        ctx2.strokeStyle = "rgba(0,0,0,1)";

      // drawLine(ctx,touchX,touchY,s);
   }
   
        //goes back to the proportties of marker 
        function myMarker2(){
        ctx2.globalCompositeOperation = "source-over";
        ctx2.strokeStyle = c2;
        // var c = document.getElementById("color").value;
        $('.demo').css('backgroundColor', '#' + hex);
    }

       // Clear the canvas context using the canvas width and height
        function clearCanvas2(canvas2,ctx2) {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        var outlineImage = new Image();
        outlineImage.src = "img/girlsoccer.png";
        ctx2.drawImage(outlineImage,100,100,100,100);
    }

    


    var s; 

      $(function() {
        $( "#slider" ).slider({
            value:1,
            min: 1,
            max: 15,
            step: 1,
            slide: function( event, ui ) {
            var x = ui.value;
            s= x;
         console.log(s);
        }
    });   
  });

    // Variables to keep track of the mouse position and left-button status 
    var mouseX,mouseY,mouseDown=0;
    // Variables to keep track of the touch position
    var touchX,touchY;
    // Keep track of the old/last position when drawing a line
    // We set it to -1 at the start to indicate that we don't have a good value for it yet
    var lastX,lastY=-1;
    // Draws a line between the specified position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
        function drawLine(ctx,x,y,s) {
        // If lastX is not set, set lastX and lastY to the current position 
        if (lastX==-1) {
            lastX=x;
            lastY=y;
        }
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=0; g=0; b=0; a=255;


        // Select a fill style
        // ctx.strokeStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        ctx.strokeStyle = coloring;
        // Set the line "cap" style to round, so lines at different angles can join into each other
        ctx.lineCap = "round";
        //ctx.lineJoin = "round";
        // Draw a filled line
        ctx.beginPath();
        // First, move to the old (previous) position
        ctx.moveTo(lastX,lastY);
        // Now draw a line to the current touch/pointer position
        ctx.lineTo(x,y);
        // Set the line thickness and draw the line
        ctx.lineWidth = s;
        ctx.stroke();
        ctx.closePath();
        // Update the last position to reference the current position
        lastX=x;
        lastY=y;
    } 
        // Clear the canvas context using the canvas width and height
        function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Keep track of the mouse button being pressed and draw a dot at current location
        function sketchpad_mouseDown() {
        mouseDown=1;
        drawLine(ctx,mouseX,mouseY,s);
    }
    // Keep track of the mouse button being released
        function sketchpad_mouseUp() {
        mouseDown=0;
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX=-1;
        lastY=-1;
    }
    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
        function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);
        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
            drawLine(ctx,mouseX,mouseY,s);
        }
    }
    // Get the current mouse position relative to the top-left of the canvas
        function getMousePos(e) {
        if (!e)
            var e = event;
        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }
    // Draw something when a touch start is detected
        function sketchpad_touchStart() {
      
        
        // Update the touch co-ordinates
        getTouchPos();
        drawLine(ctx,touchX,touchY,s);
        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }
        function sketchpad_touchEnd() {
        // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
        lastX=-1;
        lastY=-1;
    }
    // Draw something and prevent the default scrolling when touch movement is detected
        function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);
        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        
        drawLine(ctx,touchX,touchY,s); 
        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }
    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
        function getTouchPos(e) {
        if (!e)
            var e = event;
           //  "onmousedown" = true;
        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
                console.log(e.touches);
                
            }
        }
    }
  
    //erases with the same size stroke  
      function myEraser(){
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      // drawLine(ctx,touchX,touchY,s);
   }
   
    //goes back to the proportties of marker 
      function myMarker(){
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = c;
      // var c = document.getElementById("color").value;
      $('.demo').css('backgroundColor', '#' + hex);
    }
   
    // Clear the canvas context using the canvas width and height
      function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Set-up the canvas and add our event handlers after the page has loaded
    
      function init() {

        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('can');
        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');
        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);
            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchend', sketchpad_touchEnd, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }
        // Get the specific canvas element from the HTML document
        canvas2 = document.getElementById('can2');
        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas2.getContext)
            ctx2 = canvas2.getContext('2d');
            var outlineImage = new Image();
            outlineImage.src = "img/girlsoccer.png";
            ctx2.drawImage(outlineImage,100,100,100,100);
        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx2) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas2.addEventListener('mousedown', sketchpad_mouseDown2, false);
            canvas2.addEventListener('mousemove', sketchpad_mouseMove2, false);
            window.addEventListener('mouseup', sketchpad_mouseUp2, false);
            // React to touch events on the canvas
            canvas2.addEventListener('touchstart', sketchpad_touchStart2, false);
            canvas2.addEventListener('touchend', sketchpad_touchEnd2, false);
            canvas2.addEventListener('touchmove', sketchpad_touchMove2, false);
        }
        
    }

////////////////////////SECTION PAGES
      $(document).on("pagecreate","#section1",function(){
        $("#section1").on("swipeleft",function(){
          console.log("section1 left"); 
        $.mobile.changePage("#section2",{transition:"slide"});
       
        });  
  
        });


      $(document).on("pagecreate","#section2",function swipe(e1){
        $("#section2").on("swiperight",function(e2){
            console.log("section2 right");


        if(document.getElementById('drop').style.display==="block") {
        // swipe.preventDefault();
                console.log("1");
       // swipe.stopPropagation();
                console.log("2");
        } else {
          $.mobile.changePage("#section1",{transition:"slide", reverse:true        });


        }

        



      
    

        }); 


        });

      $(document).on("pagecreate","#section2",function swipe2(){
         $("#section2").on("swipeleft",function(){
          console.log("section2 left");


          if(document.getElementById('drop').style.display==="block") {
            //swipe2.stopPropagation();
            // swipe2.preventDefault();
            console.log("remove");
          } else {

          $.mobile.changePage("#section3",{transition:"slide",
      
        });
    }

        }); 


        });


      $(document).on("pagecreate","#section3",function(){
        $("#section3").on("swiperight",function(){
        $.mobile.changePage("#section2",{transition:"slide", reverse:true
      
        });

    
        });  
        });

      $(document).on("pagecreate","#section3",function(){
        $("#section3").on("swipeleft",function(){
        $.mobile.changePage("#section4",{transition:"slide",
      
        });
        });  
        });

      $(document).on("pagecreate","#section4",function swipe3(){
        $("#section4").on("swiperight",function (){


        if($(".minicolors-panel.minicolors-slider-hue").css("display", "block")) {
        
        console.log("color drag"); 
        }
        else 
        {

        $.mobile.changePage("#section3",{transition:"slide", reverse:true
              });
        }

        }); 

        });



      $(document).on("pagecreate","#section4",function swipe4(){
        $("#section4").on("swipeleft",function(){


        $.mobile.changePage("#section5",{transition:"slide", 
      
        });
        });  
        });

      $(document).on("pagecreate","#section5",function(){
        $("#section5").on("swiperight",function(){
        $.mobile.changePage("#section4",{transition:"slide", reverse:true
      
      
        });
        });  
        });


////////////////////////////////////////////////////external panel

  var panel = '<div data-role="panel" class="panel" id="mypanel" data-position="right" data-display="overlay" data-position-fixed="true" ></div>';

  $(document).one('pagebeforecreate', function(){

      $.mobile.pageContainer.prepend(panel);
      $("#mypanel").panel().listview();
      $("#mypanel").listview().scrollLeft( 300 );
      //prompts for the drawing section 
      $('#mypanel').append('<div id="house" class="zoomwrapper1"><div id="zoom1"><img id="house" src="img/house.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="cloud" class="zoomwrapper1"><div id="zoom1"><img id="cloud" src="img/cloud.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="tree"  class="zoomwrapper1"><div id="zoom1"><img id="tree"  src="img/tree.png"  height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="flower" class="zoomwrapper1"><div id="zoom1"><img id="flower" src="img/flower.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="sun" class="zoomwrapper1"><div id="zoom1"><img id="sun" src="img/sun.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="p1" class="zoomwrapper1"><div id="zoom1"><img id="p1" src="img/p01.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="p2" class="zoomwrapper1"><div id="zoom1"><img id="p2" src="img/p02.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="p3" class="zoomwrapper1"><div id="zoom1"><img id="p3" src="img/p03.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="p4" class="zoomwrapper1"><div id="zoom1"><img id="p4" src="img/p04.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="p5" class="zoomwrapper1"><div id="zoom1"><img id="p5" src="img/p05.png" height="100" weight="100"></img></div></div>');
      $('#mypanel').append('<div id="p6" class="zoomwrapper1"><div id="zoom1"><img id="p6" src="img/p06.png" height="100" weight="100"></img></div></div>');



      $('#section2').append($("#mypanel"))


      var x="100";
      var y="100";
      var counter=0;
      var myImage = ["house", "cloud", "tree", "flower", "sun"];

      $(".zoomwrapper1").on("tap",function(event){
      $("#drop").show();
      console.log(Object.keys(event));
      console.log(event.target.id);
      // console.log($(".zoomwrapper1" + ('#' + event.target.id)));
      // return;
      ////clone items with a sepecific class on it but also clone specific "id" accordingly
      var element=$(".zoomwrapper1" + ('#' + event.target.id)).clone();

      $(element).removeAttr('class', 'zoomwrapper1');
      $(element).removeAttr('id', '#zoom1');

      element.addClass("tempclass");
      counter++;
      $(element).attr("id", "b1c" + counter);
 
      $(element).removeClass("clone");
      $(element).removeClass("tempclass");
 
 
      $(element).css('position', 'absolute');
      $(element).css('top','300px');
      $(element).css('right', '400px');
      $(element).css('z-index', '99999');
      $(element).css('width', '100');
      $(element).css('height', '100');
      console.log("cloned");

      $(element).appendTo("#drop");



///////////////////////////////////////////////////////TRANSFORM START
    
    var hammertime = Hammer(document.getElementById('b1c' + counter), {
        transform_always_block: true,
         transform_min_scale: 1,
         drag_block_horizontal: true,
         drag_block_vertical: true,
        drag_min_distance: 0,
        domEvents: true
    });
 
        var posX=0, posY=0,
        lastPosX=0, lastPosY=0,
        bufferX=0, bufferY=0,
        scale=1, last_scale;
         // rotation= 0, last_rotation, dragReady=0;
 
        hammertime.on('touch drag dragend transform', function(ev) {
        elemRect = document.getElementById('b1c' + counter);
        manageMultitouch(ev);
    }, true);


    var rotation = null;
    var scale = null;

      function manageMultitouch(ev){
          switch(ev.type) {
            case 'touch':
                 last_scale = scale;
                 // last_rotation = rotation;
 
                 break;
 
             case 'drag':
                   posX = ev.gesture.deltaX + lastPosX;
                   posY = ev.gesture.deltaY + lastPosY;
                 break;
 
             case 'transform':
                 // rotation = last_rotation + ev.gesture.rotation;
                 scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 10));
                 break;
 
             case 'dragend':
                  lastPosX = posX;
                  lastPosY = posY;
                break;
          }
 
                console.log("Scale: " + scale);
                console.log("Rotation: " + rotation);

            var transform =
                 "translate3d("+posX+"px,"+posY+"px, 0) " +
                 "scale3d("+scale+","+scale+", 1) ";
                 // "rotate("+rotation+"deg) ";
 
                  elemRect.style.transform = transform;
                  elemRect.style.oTransform = transform;
                  elemRect.style.msTransform = transform;
                  elemRect.style.mozTransform = transform;
                  elemRect.style.webkitTransform = transform;
      }
///////////////////////////////////////////////////////TRANSFORM END
      

      var width= 100;
      var height= 100;
      var x= lastPosX;
      var y = lastPosY;
      var TO_RADIANS = Math.PI/180; 

      $("#b1c" + counter).on("tap",function(event){
            // $("#drop").on("tap",function(){
  
          if (confirm('draw?')) {

              var p = $( "#b1c" + counter );
              var position = p.position(); 
              // var r = p.rotate(); 
              var c=document.getElementById("can");
              var ctx=canvas.getContext("2d");
              var img=document.getElementById(event.target.id);

              ///grabbing 

    
            // ctx.rotate(rotation * Math.PI / 180);
            // ctx.rotate(rotation);
              ctx.save();
            // ctx.translate(335,205);
            // ctx.translate(position.left/2,position.top/2);
            // ctx.rotate(rotation * TO_RADIANS);
              console.log(rotation * TO_RADIANS);

              ctx.drawImage(img,position.left,position.top,width*scale,height*scale);


            // ctx.drawImage(img,position.left,position.top,-(width*scale)/2,-(height*scale)/2);
            // ctx.drawImage(img,-(img.width)/2),-(img.height)/2));
    
              console.log("left:" + position.left);
              console.log("top:"+ position.top);
              console.log("W-scale:"+ width*scale);
              console.log("H-scale:" + height*scale);
              console.log("draw");
              ctx.restore();

              $("#b1c" + counter).remove();
              $("#drop").hide();
              $("#drop").empty();
     
            } 
  
        });

    });
 
});

////////////////////////////////////CLOUD


//slider
      function showValue(newValue){
      y=newValue;}
   
////////////////save picture 


      function save(dataURL){
        alert("do you want to save?");
  
        window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){//the file of the images
            console.log(msg);
     
        },
        
        function(err){
            console.log(err);
            
        },
       
        document.getElementById('can')
        );

        alert("hi");
      }

////////////////////////////////////////button states for emotion section 
      $(function(){
          $( "#happy1" ).bind( "tap", tapHandler );
 
      function tapHandler( event ){
          if ($(event.target)){
          $(this).addClass( "tap" );
          console.log("happy1");
          $("#happy2").removeClass( "tap" );
          $("#happy3").removeClass( "tap" );
          $("#happy4").removeClass( "tap" );
          $("#happy5").removeClass( "tap" );
        }
      }
  });

      $(function(){
      $( "#happy2" ).bind( "tap", tapHandler );
 
      function tapHandler( event ){
          if ($(event.target)){
          $(this).addClass( "tap" );
          console.log("happy2");
          $("#happy1").removeClass( "tap" );
          $("#happy3").removeClass( "tap" );
          $("#happy4").removeClass( "tap" );
          $("#happy5").removeClass( "tap" );
        }
    }
});

      $(function(){
      $( "#happy3" ).bind( "tap", tapHandler );
 
      function tapHandler( event ){
          if ($(event.target)){
          $(this).addClass( "tap" );
          console.log("happy3");
          $("#happy1").removeClass( "tap" );
          $("#happy2").removeClass( "tap" );
          $("#happy4").removeClass( "tap" );
          $("#happy5").removeClass( "tap" );
        }
    }
});

      $(function(){
      $( "#happy4" ).bind( "tap", tapHandler );
 
      function tapHandler( event ){
          if ($(event.target)){
          $(this).addClass( "tap" );
          console.log("happy4");
          $("#happy1").removeClass( "tap" );
          $("#happy2").removeClass( "tap" );
          $("#happy3").removeClass( "tap" );
          $("#happy5").removeClass( "tap" );
        }
    }
});

      $(function(){
      $( "#happy5" ).bind( "tap", tapHandler );
 
      function tapHandler( event ){
         if ($(event.target)){
         $(this).addClass( "tap" );
        console.log("happy5");
        $("#happy1").removeClass( "tap" );
        $("#happy2").removeClass( "tap" );
        $("#happy4").removeClass( "tap" );
        $("#happy3").removeClass( "tap" );
      }

    }
});

///////////////////////////////////////////////////////////////////////////////////////SECTION 4
      // Variables for referencing the canvas and 2dcanvas context
  // 
   var canvas2,ctx2;
  var coloring2;
