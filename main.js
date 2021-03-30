

var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = 180;
context.canvas.width = 320;

rectangle = {

  height:33,
  jumping:true,
  width:50,
  x:144, 
  x_velocity:0,
  y:0,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:
        controller.left = key_state;
      break;
      case 38:
        controller.up = key_state;
      break;
      case 39:
        controller.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (controller.up && rectangle.jumping == false) {

    rectangle.y_velocity -= 20;
    rectangle.jumping = true;

  }

  if (controller.left) {

    rectangle.x_velocity -= 0.5;

  }

  if (controller.right) {

    rectangle.x_velocity += 0.5;

  }

  rectangle.y_velocity += 1.5;
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.9;
  rectangle.y_velocity *= 0.9;

 
  if (rectangle.y > 180 - 16 - 32) {

    rectangle.jumping = false;
    rectangle.y = 180 - 16 - 32;
    rectangle.y_velocity = 0;

  }

 
  if (rectangle.x < -32) {

    rectangle.x = 320;

  } else if (rectangle.x > 320) {

    rectangle.x = -32;

  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, 320, 180);
  context.fillStyle = "yellow";
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 164);
  context.lineTo(320, 164);
  context.stroke();

 
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);