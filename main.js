
var pacman = {
    tile : undefined,
    scores: undefined,
    rotate : 'rotate(0deg)', 
    lives: 3,
    dollars: 0,
    x: 5,
    y: 5
}

var world = {
    indexes : { /* <id> : <element> */},
    width : 20,
    height : 20,
    map :[
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0,
        0,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0,
        0,1,0,1,1,2,2,2,2,1,1,1,0,1,1,1,2,2,2,0,
        0,1,0,1,1,1,1,1,1,0,0,1,0,1,3,1,1,1,1,0,
        0,1,0,0,1,0,1,1,1,1,1,1,0,0,1,0,0,1,1,0,
        0,1,1,1,1,1,1,0,0,2,0,0,1,1,1,1,1,1,1,0,
        0,0,1,0,1,0,1,1,3,3,3,0,1,1,1,1,0,1,1,0,
        0,0,1,0,1,0,1,0,3,3,3,2,1,2,1,1,0,1,1,0,
        0,1,1,1,1,1,1,0,0,2,0,0,1,1,3,1,1,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,1,1,1,1,3,1,1,1,0,0,1,1,1,1,1,1,1,1,0,
        0,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1,1,1,1,0,
        0,1,0,1,1,1,2,2,2,0,0,1,0,1,1,1,2,2,2,0,
        0,1,0,1,1,3,1,1,3,1,1,1,0,1,3,1,1,1,1,0,
        0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,1,0,
        0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
};

// create the html to render pacman in the html

function world_tile(type, index) {
    return ("<div " + ("class='" + type + "' " +
                       "id='" + index + "'" +
                       "style=" + ("'top:" + Math.floor(index/20) * 32 + "px;" +
                                   "left:" + (index%20) * 32 + "px'")) + ">" +
            "</div>");  
}

function init_world() {
    init_world_innerHtml();
    init_world_indexElements();
}

function init_world_innerHtml(){

    var brick = 0, coin = 1, cherry = 3, blank = 2;
    var world_tiles ="";
    var i = 0;
    for (i = 0; i < world.map.length; i++) {
        if (world.map[i] === brick) {
            world_tiles += world_tile('brick', i);
        } else if(world.map[i] === coin){
            world_tiles += world_tile('coin', i);
        } else if(world.map[i] === blank){
            world_tiles += world_tile('blank', i);
        } else if(world.map[i] === cherry){
            world_tiles += world_tile('cherry', i);
        }
    }

    var world_map = document.getElementById('world');
    world_map.innerHTML = world_tiles;
}

function init_world_indexElements() {
    var id = 0;
    var i = 0;
    
    var blanks = document.getElementsByClassName('blank');
    for (i = 0; i < blanks.length; i++) {
        var blank = blanks[i].id;
        world.indexes[blank] = blanks[i];
    }

    var bricks = document.getElementsByClassName('brick');
    for (i = 0; i < bricks.length; i++) {
        var brick = bricks[i].id;
        world.indexes[brick] = bricks[i];
    }

    var coins = document.getElementsByClassName('coin');
    for (i = 0; i < coins.length; i++) {
        var coin = coins[i].id;
        world.indexes[coin] = coins[i];
    }

    var cherries = document.getElementsByClassName('cherry');
    for (i = 0; i < cherries.length; i++) {
        var cherry = cherries[i].id;
        world.indexes[cherry] = cherries[i];
    }
    return;
}

function draw_pacman(){
    if (pacman.scores === undefined) {
        pacman.scores = document.getElementById('scores');
    }
    pacman.scores.innerHTML = pacman.dollars;

    if (pacman.tile === undefined) {
        pacman.tile = document.getElementById("pacman");        
    }
    pacman.tile.style.top = pacman.y * 32 + "px";
    pacman.tile.style.left = pacman.x * 32 + "px";
    pacman.tile.style.transform = pacman.rotate;
    
}

function pacman_world_index(x, y) {
    var i = x + y * world.width
    return i;
}

function pacman_get_tile(x, y) {
    var i = pacman_world_index(x, y);
    var tile = world.map[i];
    return tile;
}

function pacman_can_go(x, y) {
    var i = pacman_world_index(x, y);
    var brick = 0;
    if (world.map[i] === brick) {
        return false;
    }
    return true;
}

function pacman_eat_goodies(x, y) {
    var i = pacman_world_index(x, y);
    var coin = 1, blank = 2; cherry = 3;
    if (world.map[i] === coin) {
        pacman.dollars += 10;
    }
    if (world.map[i] === cherry) {
        pacman.dollars += 50;
    }
    pacman.scores.innerHTML = pacman.dollars;
    
    world.map[i] = blank;
    world.indexes[i].className = "blank";
}

function pacman_move(e) {
    var left = 37, up = 38, right = 39, down = 40; // const, key code
    var brick = 0, coin = 1, blank = 2; cherry = 3; // const, world map
    var east = 'rotate(0deg)',
        west = 'rotate(180deg)',
        north = 'rotate(270deg)',
        south = 'rotate(90deg)'; // const, transform (angle)
    var x = pacman.x, y = pacman.y, r = pacman.rotate;
    var key = e.keyCode;

    var x2 = x, y2 = y, r2 = east;
    if (key == left) {
        x2 = x - 1;
        r2 = west;
    } else if (key == up) {
        y2 = y - 1;
        r2 = north;
    } else if (key == right) {
        x2 = x + 1;
        r2 = east;
    } else if (key == down) {
        y2 = y + 1;
        r2 = south;
    }

    var tile = pacman_get_tile(x2, y2);
    if (tile === brick) {
        return;
    }
    if ((tile === coin) || (tile === cherry)) {
        pacman_eat_goodies(x2, y2);
    }

    pacman.x = x2;
    pacman.y = y2;
    pacman.rotate = r2;

    draw_pacman();
    e.stopPropagation();
}

function init_pacman() {
    document.onkeydown = pacman_move;
}

init_world();
init_pacman();

draw_pacman();
