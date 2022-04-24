(function() {
    self.Board = function(width, height) {
        this.width = width;
        this.height = height;
        this.playing = false;
        this.gameOver = false;
        this.bars = [];
        this.ball = null;
    }

    self.Board.prototype = {
        get elements() {
            var elements = this.bars.map( function(bar) {
                return bar;
            });
            elements.push(this.ball);
            return elements;
        }
    }
})();

(function(){
    self.Ball = function(x, y, radius, board){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = 1;
        this.speedY = 0;
        this.board = board;
        this.dirrection = 1;

        board.ball = this;
        this.kind = "circle";
    }
    
    self.Ball.prototype = {
        move: function(){
            this.x += (this.speedX * this.dirrection);
            this.y += (this.speedY * this.dirrection);
        }
    }
})();

(function(){
    self.Bar = function(x, y, width, height, board){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this);
        this.kind = "rectangule";
        this.speed = 10;
    }

    self.Bar.prototype = {
        down: function(){
            this.y += this.speed;
        },
        up: function(){
            this.y -= this.speed;
        },
        toString: function(){
            return "x: " + this.x + ", y: " + this.y;
        }
    }

})();


//
(function(){
    self.BoardView = function(canvas, board){
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.contexto = canvas.getContext("2d");
    }

    self.BoardView.prototype = {
        clean: function() {
            this.contexto.clearRect(0, 0, this.board.width, this.board.height);
        },

        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var elemento = this.board.elements[i];
                draw(this.contexto, elemento);
            }
        },

        play: function(){
            if(this.board.playing) {
                this.clean();
                this.draw();
                this.board.ball.move();
            }
        }
    }

    function draw(contexto, elemento) {
        // if(elemento !== null && elemento.hasOwnProperty("kind")) {
            switch(elemento.kind) {
                case "rectangule":
                    contexto.fillRect(elemento.x, elemento.y, elemento.width, elemento.height);
                    break;
                case "circle":
                    contexto.beginPath();
                    contexto.arc(elemento.x, elemento.y, elemento.radius, 0, 7);
                    contexto.fill();
                    contexto.closePath();
                    break;
            }
        // }
    }

})();

var board = new Board(800, 400);
var leftBar = new Bar(20, 100, 40, 100, board);
var rightBar = new Bar(735, 100, 40, 100, board);
var canvas = document.getElementById("canvas");
var boardView = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board);


document.addEventListener("keydown", function(ev){
    if (ev.keyCode == 38){
        ev.preventDefault();
        rightBar.up();
    } else if (ev.keyCode == 40 ) {
        ev.preventDefault();
        rightBar.down();
    } else if (ev.keyCode == 87 ) {
        //W
        ev.preventDefault();
        leftBar.up();
    } else if (ev.keyCode == 83 ) {
        //S        
        ev.preventDefault();    
        leftBar.down();
    } else if (ev.keyCode === 32 ) {
        ev.preventDefault();
        board.playing = !board.playing;
    }
})


boardView.draw();

window.requestAnimationFrame(controller);


function controller() {
    boardView.play();
    window.requestAnimationFrame(controller);

}
