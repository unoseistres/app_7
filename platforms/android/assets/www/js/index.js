/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 //askjsah dsakhds kshd 
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

///////////////////////// CANVAS!!

    
   // Variables for referencing the canvas and 2dcanvas context
    var canvas,ctx;
    
  var coloring;
  
  function updateColor(colorAmount) {
    var c = document.getElementById("color").value;
    coloring = c;
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
  
      // ctx.globalCompositeOperation = "destination-out";
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = c;
      var c = document.getElementById("color").value;
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
    }



   //  </script>

////////////////////////


$(document).on("pagecreate","#section1",function(){
  $("#section1").on("swipeleft",function(){
    console.log("section1 left"); 
    $.mobile.changePage("#section2",{transition:"slide"});
       
  });  
  
});


$(document).on("pagecreate","#section2",function(){
  $("#section2").on("swiperight",function(){
    $.mobile.changePage("#section1",{transition:"slide", reverse:true
      
    });
    

  }); 
  // if ($("#drop").show()){
  //       section2.removeEventListener("swiperight swipeleft", false);
  //    }
  // console.log("section2 right"); 
});


$(document).on("pagecreate","#section2",function(){
  $("#section2").on("swipeleft",function(){
    $.mobile.changePage("#section3",{transition:"slide", 
      
    });

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

$(document).on("pagecreate","#section4",function(){
  $("#section4").on("swiperight",function(){
    $.mobile.changePage("#section3",{transition:"slide", reverse:true
      
    });
  });  
});

$(document).on("pagecreate","#section4",function(){
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

$(document).one('pagebeforecreate', function () {

  $.mobile.pageContainer.prepend(panel);
  $("#mypanel").panel().listview();
  $("#mypanel").listview();
  //prompts for the drawing section 
  $('#mypanel').append('<div id="zoomwrapper1" class="clone"><div id="zoom1"><img id="house" src="img/house.png" height="100" weight="100"></img></div></div>');
  $('#mypanel').append('<img src="img/cloud.png" height="100" weight="100"></img>');
  $('#mypanel').append('<img src="img/tree.png" height="100" weight="100"></img>');
  $('#mypanel').append('<img src="img/flower.png" height="100" weight="100"></img>');
  $('#mypanel').append('<img src="img/sun.png" height="100" weight="100"></img>');
  $('#section2').append($("#mypanel"))

  var x="100";
  var y="100";
  

$("#zoomwrapper1").on("tap",function(){
 var counter=0;
 $("#drop").show();

 var element=$("#zoomwrapper1").clone();
 $(element).removeAttr('id', '#zoomwrapper1');
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

var hammertime = Hammer(document.getElementById('b1c1'), {
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

     zoomwrapper1.removeEventListener("swipeleft swiperight", false);
    
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

var width= 100;
var height= 100;
var x= lastPosX;
var y = lastPosY;
var TO_RADIANS = Math.PI/180; 
// var angle;


$("#b1c" + counter).on("tap",function(){
  
  if (confirm('draw?')) {

      // do delete item
    var p = $( "#b1c" + counter );
    var position = p.position(); 
    // var r = p.rotate(); 
    var c=document.getElementById("can");
    var ctx=canvas.getContext("2d");
    var img=document.getElementById('house');

    
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
    // $("#drop").css("visibility", "hidden");
    $("#drop").hide();
    
    
   } 
  


});


});

  
   
});



//slider
      function showValue(newValue)
      {
    y=newValue;

    }
    
 
    
////////////////save picture 


function save(dataURL){
  alert("do you want to save?");
  // console.log(dataURL);

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

//button states for emotion section 
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






