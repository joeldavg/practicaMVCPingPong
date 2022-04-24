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
            var elements = this.bars;
            elements.push(this.ball)
            return elements;
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
        this.board.bars.push(this)
        this.kind = "rectangule";
    }

    self.Bar.prototype = {
        down: function(){},
        up: function(){}
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
        draw: function(){
            for (var i = this.board.elements.length - 1; i >= 0; i--) {
                var elemento = this.board.elements[i]
                draw(this.contexto, elemento)
            }
        }
    }

    function draw(contexto, elemento) {
        console.log(elemento)
        if (elemento !== null && elemento.hasOwnProperty("kind")) {
            switch(elemento.kind) {
                case "rectangule":
                    contexto.fillRect(elemento.x, elemento.y, elemento.width, elemento.height);
                    break;
            }
        }
    }

})();

addEventListener("load", main)

function main() {
    var board = new Board(800, 400);
    var bar = new Bar(20, 100, 40, 100, board);
    var bar = new Bar(735, 100, 40, 100, board);
    var canvas = document.getElementById("canvas");
    var boardView = new BoardView(canvas, board)
    boardView.draw()
}
