var canvasId = 'sugarScape';
var c = document.getElementById(canvasId);
var ctx = c.getContext("2d");
var unit = 8;
var lineWidth = 1;
var halfLineWidth = lineWidth/2;
var halfUnit = unit/2;
var fullRadius = halfUnit-lineWidth;

function setCanvas()
{
    c.width = unit*cntX;
    c.height = unit*cntY;

    ctx.lineWidth= lineWidth;
}

function drawGrid()
{
    for (var i=0; i<=cntY; i++) {
        ctx.moveTo(0,i*unit);
        ctx.lineTo(c.width-halfLineWidth,i*unit);
        ctx.stroke();
    }

    for (var i=0; i<=cntX; i++) {
        ctx.moveTo(i*unit, 0);
        ctx.lineTo(i*unit, c.height-halfLineWidth);
        ctx.stroke();
    }
}

function drawCircle(centerX, centerY, radius, color)
{
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
}

/*
draw the sugar,
using color to indicate abundance of the sugar
*/
function drawSugar(src, max)
{
    for (var idx=0; idx<cntX*cntY; idx++) {
        var i = Math.floor(idx / cntX), j = idx % cntX;
        var cx = j*unit+halfUnit, cy = i*unit+halfUnit;
        ctx.clearRect(j*unit, i*unit, unit, unit);
        var blue = 255-Math.floor(Math.min(max, src[idx])/max*255);
        var color = 'rgb(255, 255, ' + blue + ')';
        drawCircle(cx, cy, fullRadius, color);
    }
}

function drawAgents()
{
    for (var i=0; i<agents.length; i++) {
        var x = agents[i].x,
            y = agents[i].y,
            cx = x*unit+halfUnit,
            cy = y*unit+halfUnit,
            _age = agents[i].age,
            _sugarColor = agents[i].sugar * 10,
            _agentColor = 'rgb(' + _age + ',' + _sugarColor + ', 155)';

        ctx.clearRect(x*unit, y*unit, unit, unit);
        drawCircle(cx, cy, fullRadius, _agentColor);
    }
}

function draw()
{
    drawSugar(sugar, maxSugar);
    drawAgents();
}