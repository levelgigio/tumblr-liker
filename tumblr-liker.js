//VARIAVEIS CONFIGURAVEIS
var reblogar = false;
var tempo_entre_funcoes = 3000;

//VARIAVES DE SISTEMA
var curtidas_tumblr_total = 0;
var publicacao_bloco_pos = 0;
var funcao_atual_tumblr = 0;
var controles_validos = [];

verificar();

function verificar() {
    publicacao_bloco_pos = 0;
    controles_validos = [];
    for (var i = 0; i < document.querySelectorAll(".post_controls_inner").length; i++) {
        var publicacao_atual_controls = document.querySelectorAll(".post_controls_inner")[i].children;
        var publicacao_nova = Array.prototype.filter.call(publicacao_atual_controls, function(publicacao_atual_control){ 
            return publicacao_atual_control.matches('.like:not(.liked)');
        });
        if(publicacao_nova.length)
            controles_validos.push(publicacao_atual_controls);
    }
}

function curtir_tumblr() {
    var like_btn = Array.prototype.filter.call(controles_validos[publicacao_bloco_pos], function(controle){ 
        return controle.matches('.like');
    });
    like_btn[0].click();
    like_btn[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.scrollIntoView(true);
    curtidas_tumblr_total++;
    console.log("Curtidas: " + curtidas_tumblr_total);
}

function scroll() {
    if(publicacao_bloco_pos === controles_validos.length) {
        window.scrollTo(0, document.body.scrollHeight);
        verificar();
    }
}

function reblog() {
    var reblog_btn = Array.prototype.filter.call(controles_validos[publicacao_bloco_pos], function(controle){ 
        return controle.matches('.reblog');
    });
    reblog_btn[0].click();
}

function reblog_final() {
    document.getElementsByClassName("create_post_button")[0].click();
}

function switch_functions_tumblr() {
    if(controles_validos.length === 0) 
        scroll();
    else {
        switch(funcao_atual_tumblr) {
            case 0: {
                curtir_tumblr();
                break;
            }
            case 1: {
                reblog();
                publicacao_bloco_pos++;
                break;
            }
            case 2: {
                reblog_final();
                scroll();
                break;
            }
        }
        if(reblogar) {
            funcao_atual_tumblr = (funcao_atual_tumblr + 1)%3;
        }
        else {
            publicacao_bloco_pos++;
            scroll();
        }  
    }
}

setInterval(switch_functions_tumblr, tempo_entre_funcoes);