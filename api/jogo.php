<?php
header("Access-Controla-Allow-Origin: *");
header("Content-tipe: application/json; charset=utf8");

$path = "http://localhost/projeto2/";

$game[1] = array(
    "id" => 1,
    "banner" => "http://localhost/projeto2/imagens/dino1.jpg",
    "alt" => "Bug From Hell",

    "banner2" => "http://localhost/projeto2/imagens/dino1.jpg",
    "nome" => "Bug From Hell 1.0",
    "descricao" => "Ajude o Dino a chegar até o fim dessa jornada, mas lembre-se, no caminho há obstacúlos.",
    "jogar" => "http://localhost/projeto2/gamedino/index.html",
);
$game[2] = array(
    "id" => 2,
    "banner" => "http://localhost/projeto2/imagens/jogoJack.jpeg",
    "alt" => "Help Sauro",

    "banner2" => "http://localhost/projeto2/imagens/jogoJack.jpeg",
    "nome" => "Help Sauro",
    "descricao" => "jogadores são transportados para uma época onde gigantes colossais governavam a terra, e a sobrevivência era uma batalha constante.",
    "jogar" => "http://localhost/projeto2/helpsauro/index.html",
);
$game[3] = array(
    "id" => 3,
    "banner" => "http://localhost/projeto2/imagens/jogoVinicius.jpeg",
    "alt" => "The Last Words",

    "banner2" => "http://localhost/projeto2/imagens/jogoVinicius.jpeg",
    "nome" => "The Last Words",
    "descricao" => "Embarque em uma jornada assustadora através de um mundo 2D repleto de perigos e mistérios.",
    "jogar" => "http://localhost/projeto2/theLast/index.html",
);
$game[4] = array(
    "id" => 4,
    "banner" => "http://localhost/projeto2/imagens/walka.jpeg",
    "alt" => "Walka",

    "banner2" => "http://localhost/projeto2/imagens/walka.jpeg",
    "nome" => "Projeto Walka",
    "descricao" => "os jogadores tem a oportunidade de enfrentar o inimigo e derrotá-lo com sua arma, o inimigo pode proporcionar ao jogadores uma sensação de realização",
    "jogar" => "http://localhost/projeto2/projetowalka/index.html",
);
$game[5] = array(
    "id" => 5,
    "banner" => "http://localhost/projeto2/imagens/ninja.jpeg",
    "alt" => "Ninja",

    "banner2" => "http://localhost/projeto2/imagens/ninja.jpeg",
    "nome" => "Ninja frog",
    "descricao" => ".",
    "jogar" => "http://localhost/projeto2/./index.html",
);

$game[6] = array(
    "id" => 6,
    "banner" => "http://localhost/projeto2/imagens/forest.jpeg",
    "alt" => "forest",

    "banner2" => "http://localhost/projeto2/imagens/forest.jpeg",
    "nome" => "Ninja frog",
    "descricao" => ".",
    "jogar" => "http://localhost/projeto2/gameforest/index.html",
);
echo json_encode($game);
