<?php
header("Access-Controla-Allow-Origin: *");
header("Content-tipe: application/json; charset=utf8");



$game[1] = array(
    "id" => 1,
    "banner" => "http://bugfromhell1o.x10.mx/imagens/dino1.1.png",
    "alt" => "Bug From Hell",

    "banner2" => "hthttp://bugfromhell1o.x10.mx/imagens/dino1.1.jpg",
    "nome" => "Bug From Hell 1.0",
    "descricao" => "Ajude o Dino a chegar até o fim dessa jornada, mas lembre-se, no caminho há obstacúlos.",
    "jogar" => "http://bugfromhell1o.x10.mx/gamedino/index.html",
);
$game[2] = array(
    "id" => 2,
    "banner" => "http://bugfromhell1o.x10.mx/imagens/jogoJack.1.jpeg",
    "alt" => "Help Sauro",

    "banner2" => "http://bugfromhell1o.x10.mx/imagens/jogoJack.1.jpeg",
    "nome" => "Help Sauro",
    "descricao" => "jogadores são transportados para uma época onde gigantes colossais governavam a terra, e a sobrevivência era uma batalha constante.",
    "jogar" => "http://bugfromhell1o.x10.mx/helpsauro/index.html",
);
$game[3] = array(
    "id" => 3,
    "banner" => "http://bugfromhell1o.x10.mx/imagens/jogoVinicius.jpeg",
    "alt" => "The Last Words",

    "banner2" => "http://bugfromhell1o.x10.mx/imagens/jogoVinicius.jpeg",
    "nome" => "The Last Words",
    "descricao" => "Embarque em uma jornada assustadora através de um mundo 2D repleto de perigos e mistérios.",
    "jogar" => "http://bugfromhell1o.x10.mx/theLast/index.html",
);
$game[4] = array(
    "id" => 4,
    "banner" => "http://bugfromhell1o.x10.mx/imagens/walka.1.jpeg",
    "alt" => "Walka",

    "banner2" => "http://bugfromhell1o.x10.mx/imagens/walka.1.jpeg",
    "nome" => "Projeto Walka",
    "descricao" => "os jogadores tem a oportunidade de enfrentar o inimigo e derrotá-lo com sua arma, o inimigo pode proporcionar ao jogadores uma sensação de realização",
    "jogar" => "http://bugfromhell1o.x10.mx/projetowalka/index.html",
);
$game[5] = array(
    "id" => 5,
    "banner" => "http://bugfromhell1o.x10.mx/imagens/ninja.jpeg",
    "alt" => "Ninja",

    "banner2" => "http://bugfromhell1o.x10.mx/imagens/ninja.jpeg",
    "nome" => "Ninja frog",
    "descricao" => "Embarque nesta incrivel jornada de aventura e ação, desvendando mistérios sombrios e se torne um ninja",
    "jogar" => "http://bugfromhell1o.x10.mx/projetowalka/index.html",
);

$game[6] = array(
    "id" => 6,
    "banner" => "http://bugfromhell1o.x10.mx/imagens/forest.jpeg",
    "alt" => "warstar",

    "banner2" => "http://bugfromhell1o.x10.mx/imagens/forest.jpeg",
    "nome" => "warstars",
    "descricao" => "Imagine um jogo espacial frenético onde você controla uma nave espacial avançando por cenários cheios de asteroides, naves inimigas e obstáculos.",
    "jogar" => "http://bugfromhell1o.x10.mx/gameforest/index.html",
);
echo json_encode($game);
