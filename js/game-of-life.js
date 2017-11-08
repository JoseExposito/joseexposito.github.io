$(document).ready(function() {
    var running = false
    var canvas = document.getElementById('game-of-life').getContext('2d')
    var cells = []
    canvas.strokeStyle = 'white'
    canvas.fillStyle   = 'white'

    $('footer').dblclick(function(e) {        
        // Because of the z-index the image is not clickable, workaround
        if (!running 
                && e.pageX > $('#glider').offset().left
                && e.pageX < $('#glider').offset().left + $('#glider').width()
                && e.pageY > $('#glider').offset().top
                && e.pageY < $('#glider').offset().top + $('#glider').height()) {
        
            init()
            $('#footer-text').hide()
            running = true
        }
    })
    
    function init() {
        for (var i=0; i<75; i++) {
            cells[i] = []
            for (var j=0; j<37; j++) {
                cells[i][j] = Math.round(Math.random())    
            }
        }

        update()
    }

    function update() {
        var result = []

        function _countNeighbours(x, y) {
            var amount = 0

            function _isFilled(x, y) {
                return cells[x] && cells[x][y]
            }

            if (_isFilled(x-1, y-1)) amount++
            if (_isFilled(x,   y-1)) amount++
            if (_isFilled(x+1, y-1)) amount++
            if (_isFilled(x-1, y  )) amount++
            if (_isFilled(x+1, y  )) amount++
            if (_isFilled(x-1, y+1)) amount++
            if (_isFilled(x,   y+1)) amount++
            if (_isFilled(x+1, y+1)) amount++

            return amount
        }

        cells.forEach(function(row, x) {
            result[x] = []
            row.forEach(function(cell, y) {
                var alive = 0,
                    count = _countNeighbours(x, y)

                if (cell > 0) {
                    alive = count === 2 || count === 3 ? 1 : 0
                } else {
                    alive = count === 3 ? 1 : 0
                }

                result[x][y] = alive
            })
        })

        cells = result

        draw()
    }

    function draw() {
        canvas.clearRect(0, 0, 500, 250)
        cells.forEach(function(row, x) {
            row.forEach(function(cell, y) {
                canvas.beginPath()
                canvas.rect(x*4, y*4, 4, 4)
                if (cell) {
                    canvas.fill()
                }
            })
        })
        setTimeout(function() {update()}, 70)
    }

})