// initial canvas setup
var canvas = document.getElementById('rain');
var c = canvas.getContext('2d');

canvas.weight = 640;
canvas.height = 480;

c.fillStyle = '#efefef';
c.fillRect(0,0,640,480);


var drops = [];

function Drop()
{
    // vars
    this.x = 0;
    this.y = 0;
    this.area = 0;
    this.width = 0;
    this.height = 0;
    this.speed = 0;

    // base settings
    this.base_width = 2;
    this.base_height = 35;
    this.base_speed = 8;
    this.base_area = 5 * 35;

    // multiplier
    this.min = 0.75;
    this.max = 1.4;
    this.mult = Math.random() * (this.max-this.min) + this.min;


    // functions
    this.init = function() {
        //console.log('drop init');
        this.width = this.base_width*this.mult;
        this.height = this.base_height*this.mult;
        this.x = Math.random() * canvas.width-this.width;
        this.y = 0-this.height-(Math.random() * 480);
        this.area = this.width*this.height;
        this.speed = (this.area / this.base_area) * this.base_speed + (Math.random() + 1)
    }
    this.draw = function(c) {
        //console.log('drop draw');
        var drop_gradient = c.createLinearGradient(this.x,this.y,this.x,this.y+this.height);
        drop_gradient.addColorStop(0,'#FFF');
        drop_gradient.addColorStop(1,'#1E90FF');
        c.fillStyle = drop_gradient;
        c.fillRect(this.x,this.y,this.width,this.height);
    }
    this.update = function() {
        // check if next update place drop outside of canvas if so respan drop
        // in new place

        if(this.y+this.speed >= canvas.height+this.height)
        {
            this.init();
        }
        else
        {
            this.y+=this.speed;
        }
        //console.log('drop update');
    }

    this.init();
}

function init()
{
    for(var i=0;i<500;i++)
    {
        drops[i] = new Drop();
    }

    var FPS = 60;
    var a = new Drop();

    setInterval(function() {
        update();
        for(var i=0;i<drops.length;i++)
        {
            drops[i].update();
        }
        //a.update();
        draw(c);
        for(var i=0;i<drops.length;i++)
        {
            drops[i].draw(c);
        }
        //a.draw(c);
    }, 1000 / FPS);
}

function update()
{
}

function draw(c)
{
    c.fillStyle = '#efefef';
    c.fillRect(0,0,640,480);
}

init();
