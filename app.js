// Funcion para generar una nueva ronda
function generateRound() {

    // A partir de la ronda 10 se augmenta la velocidad del patron
    if (round >= 10) {
        interval_vel = 600;
        timeout_vel = 500;
    }

    // A partir de la ronda 15 se añaden 2 colores nuevos
    if (round >= 15) {
        var grand_red = document.getElementById('grand-red');
        var grand_yellow = document.getElementById('grand-yellow');

        max_number = max_number + 2;
        colors.push('grand-red');
        colors.push('grand-yellow');
        grand_red.classList.add('grand-red', 'active');
        grand_yellow.classList.add('grand-yellow', 'active');

    }

    // A partir de la ronda 20 se añaden 2 colores mas
    if (round >= 20) {

        var grand_green = document.getElementById('grand-green');
        var grand_blue = document.getElementById('grand-blue');

        max_number = max_number + 2;
        colors.push('grand-green');
        colors.push('grand-blue');
        grand_green.classList.add('grand-green', 'active');
        grand_blue.classList.add('grand-blue', 'active');
    }


    // Añade un color nuevo a la secuencia y la reproduce

    let i = 0;
    random = Math.floor(Math.random() * (max_number - 0)) + 0;
    round_colors.push(colors[random]);

    let int = setInterval(function() {

        if (i < round_colors.length) {

            if (round_colors[i].includes('grand')) {
                var id = round_colors[i].split('-');
                var elem2 = document.getElementById(id[1]);
                elem2.classList.add('z4');
                var elem3 = document.getElementById('gb');
                elem3.classList.add('z5');
            }

            var elem = document.getElementById(round_colors[i]);
            elem.classList.add('trans');
            elem.classList.add('z3');

            setTimeout(function() { 
                elem.classList.remove('trans');
                elem.classList.remove('z3');

                if (elem2) {
                    elem2.classList.remove('z4');
                }

                if (elem3) {
                    elem3.classList.remove('z5');
                }

            }, timeout_vel);

            i++;            
        } else {
            cplay = true;
            clearInterval(int);
        }

    }, interval_vel);
    
}

// Funciona para el jugador
function player(id) {
    player_round_colors.push(id);

    if (id.includes('grand')) {
        var id2 = id.split('-');
        var elem2 = document.getElementById(id2[1]);
        elem2.classList.add('z4');
        var elem3 = document.getElementById('gb');
        elem3.classList.add('z5');
    }

    var elem = document.getElementById(id);
    elem.classList.add('trans');
    elem.classList.add('z3');

    setTimeout(function() { 
        elem.classList.remove('trans');
        elem.classList.remove('z3');

        if (elem2) {
            elem2.classList.remove('z4');
        }

        if (elem3) {
            elem3.classList.remove('z5');
        }

    }, timeout_vel);

    checkRound();
}

// Funcion para comprobar si el usuario esta realizando bien la secuencia
function checkRound() {
    let checking_colors = round_colors.slice(0, player_round_colors.length);

    for (let j = 0; j < player_round_colors.length; j++) {
        
        if (player_round_colors[j] != checking_colors[j]) {
            alert('Has perdido');
            advanceRound = false;
            reset.hidden = false;
        } else {
            advanceRound = true;
        }
    }

    // Cuando la secuencia sea la misma a la de la ronda, generara una nueva
    if ((round_colors.length == player_round_colors.length) && advanceRound) {
        cplay = false;
        round++;
        rounds.innerText = round;

        setTimeout(function() {
            generateRound();
        }, 1000);

        player_round_colors = [];
    } 
}

// Funcion para reiniciar la partida una vez has perdido
function resetf() {
    round = 1;
    rounds.innerText = round;
    round_colors = [];
    player_round_colors = [];
    cplay = false;
    reset.hidden = true;
    play.hidden = false;
    document.getElementById('grand-red').classList.remove('grand-red', 'active');
    document.getElementById('grand-yellow').classList.remove('grand-yellow', 'active');
    document.getElementById('grand-green').classList.remove('grand-green', 'active');
    document.getElementById('grand-blue').classList.remove('grand-blue', 'active');
    colors = colors.slice(0, 4);
    max_number = 4;
}

// Delacaracion de todas las variables necesarias para la aplicacion
var play = document.getElementById("play");
var reset = document.getElementById("reset");
var gb = Array.from(document.querySelectorAll(".gb"));
var gb2 = Array.from(document.querySelectorAll(".gb2"));
var rounds = document.getElementById("rounds");
var colors = ["red", "yellow", "green", "blue"];
var round = 0;
var random = 0;
var max_number = 4;
var round_colors = [];
var player_round_colors = [];
var cplay = false;
var interval_vel= 800;
var timeout_vel = 700;

// Evento click para cuando se empiece la partida
play.addEventListener('click', () => {
    generateRound();
    play.hidden = true;
});

// Evento click para reiniciar la partida
reset.addEventListener('click', () => {
    resetf();
})

// Bucle para añadir eventos click para los colores interiores del juego 
gb.forEach(gbs => {
    gbs.addEventListener('click', e => {
        if (cplay) {
            if (e.target.id != 'gb') {
                player(e.target.id);
            }
        }
    })
});

// Bucle para añadir eventos click para los colores exteriores del juego
gb2.forEach(gbs2 => {
    gbs2.addEventListener('click', e => {
        var elem = document.getElementById(e.target.id);
        if (cplay && elem.classList.contains('active')) {
            if (e.target.id != 'gb2') {
                player(e.target.id);
            }
        }
    })
});