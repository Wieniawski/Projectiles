

var objects = [];
let mux, muy, mdx, mdy;

document.body.style.overflow = 'auto';

// var c = document.createElement('div');
// c.id = 'cursor';
// c.style.position = 'absolute';
// c.style.width = c.style.height = 20;
// c.style.border = '20px solid black';
// c.style.boxSizing = 'border-box';
// c.style.transform = 'translate(-50%, -50%)';
// c.style.borderRadius = '50%';
// c.style.pointerEvents = 'none';
// c.style.zIndex = 1000000;
// document.body.appendChild(c);

// document.body.style.cursor = "none";

var x;
var y;
var scrollLeft;
var scrollTop;
// var cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    x = e.x
    y = e.y;
    scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    // cursor.style.left = (x + scrollLeft) + "px";
    // cursor.style.top = (y + scrollTop) + "px";
});

window.addEventListener('scroll', (e) => {
	
    scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    // cursor.style.left = (x + scrollLeft) + "px";
    // cursor.style.top = (y + scrollTop) + "px";
});

// let mouseCounter = 0;
window.addEventListener('mousedown', (e) => {
 

    // var scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    // var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    let wy = window.innerHeight
    let wx = window.innerWidth;
    // objects.push(new Ball((wy/2) + scrollLeft, (wx / 2) + scrollTop, 0, 0))

    for(let i = 0; i < 10; i++) {
        let randAngle = Math.random() * 71 + 10 - 90
        let magnitude = Math.random() * 11 + 15
        objects.push(new Ball(scrollLeft + 20, (wy / 2) + scrollTop, magnitude * Math.cos(randAngle * Math.PI / 180), magnitude * Math.sin(randAngle * Math.PI / 180), 1));

        randAngle = Math.random() * 71 + 10 - 180
        magnitude = Math.random() * 11 + 15
        objects.push(new Ball(wx + scrollLeft - 20, (wy / 2) + scrollTop, magnitude * Math.cos(randAngle * Math.PI / 180), magnitude * Math.sin(randAngle * Math.PI / 180), 1));
    }

    
});

// window.addEventListener('mouseup', (e) => {
    
// });

class Ball{
    constructor(x, y, velX, velY, state) {
        this.state = state;
        this.x = x | 0;
        this.y = y | 0;
        this.velX = velX | 0;
        this.velY = velY | 0;
        this.accX = 0;
        this.accY = 0;
        this.ball = document.createElement('div');
        this.init(this.ball, this.x, this.y);
    }

    applyForce(accX, accY) {
        this.accX += accX;
        this.accY += accY;
    }

    update() {
        this.velX += this.accX;
        this.velY += this.accY;
        this.x += this.velX;
        this.y += this.velY;

    }
    draw() {
        this.ball.style.left = this.x + "px";
        this.ball.style.top = this.y + "px";
    }

    init(c, x, y) {
        c.style.position = 'absolute';
        c.style.width = c.style.height = 20;
        // c.style.border = '2px solid black';
        c.style.boxSizing = 'border-box';
        c.style.transform = 'translate(-50%, -50%)';
        c.style.borderRadius = '50%';
        c.style.pointerEvents = 'none'; 
        c.style.zIndex = 1000000;
        // c.innerHTML = "_____";

        document.body.appendChild(c);
        c.style.left = x + "px";
        c.style.top = y + "px";

        let img = document.createElement('img');
        img.src = 'https://wieniawski.github.io/nickProjectiles/Capture.PNG
        img.style.webkitUserSelect = 'none';
        img.style.userSelect = 'none';
        c.appendChild(img);
        // http://localhost/projectileBookmarklet/app.js

    

    }
}

(function loop(){
    let tempX = scrollLeft;
    let tempY = scrollTop 

    let wy = window.innerHeight;
    let wx = window.innerWidth;

    for(let i = 0; i < objects.length; i++) {
        objects[i].applyForce(0, .02);
        objects[i].update();
        objects[i].draw();

       

        if(objects[i].x < tempX || objects[i].x > tempX + wx || objects[i].y > tempY + wy - 50) {
            if(objects[i].state == 1) {
            //    objects[i].velY *= -2;
               objects[i].state = 0;

               let newVelY;
               let newVelX;
               if(objects[i].velY / 2 < 10) {
                newVelY = -10;
               } else {
                newVelY = -1 * objects[i].velY / 2;
               }

               if(objects[i].velX / 2 < 10) {
                newVelX = 10 * Math.sign(objects[i].velX);
               } else {
                newVelX = objects[i].velX / 2;
               }
               

            //    let randAngle = 270 + Math.random() * 100 - 50;
            //    let magnitude = 20;
            //    objects.push(new Ball(objects[i].x, objects[i].y-20, magnitude * Math.cos(randAngle * Math.PI / 180), magnitude * Math.sin(randAngle * Math.PI / 180), 0));
              objects.push(new Ball(objects[i].x, objects[i].y-20, newVelX, newVelY, 0));


               objects[i].ball.remove();
               objects.splice(i, 1);
               i -= 1;
            } else {
                objects[i].ball.remove();
                objects.splice(i, 1);
                i -= 1;
            }
            
            
        }
        
    }

    requestAnimationFrame(loop);
})();
