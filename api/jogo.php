<?php
header("Access-Controla-Allow-Origin: *");
header("Content-tipe: application/json; charset=utf8");

$game[1] = array (
    "id" =>1, 
    "banner" => "http://localhost/projeto2/imagens/dino1.jpg",
    "alt" => "Bug From Hell",

    "banner2" => "http://localhost/projeto2/imagens/dino1.jpg",
    "nome" => "Bug From Hell 1.0",
    "descricao" => "Ajude o Dino a chegar até o fim dessa jornada, mas lembre-se, no caminho há obstacúlos.",
    "jogar" => "http://localhost/projeto2/game/index.html",
);
$game[2] = array (
    "id" =>2, 
    "banner" => "http://localhost/projeto2/imagens/dino1.jpg",
    "alt" => "Bug From Hell",

    "banner2" => "http://localhost/projeto2/imagens/dino1.jpg",
    "nome" => "Bug From Hell 1.0",
    "descricao" => "Ajude o Dino a chegar até o fim dessa jornada, mas lembre-se, no caminho há obstacúlos.",
    "jogar" => "http://localhost/projeto2/game/index.html",
);
$game [3] = array (
    "id" =>3, 
    "banner" => "http://localhost/projeto2/imagens/dino1.jpg",
    "alt" => "Bug From Hell",

    "banner2" => "http://localhost/projeto2/imagens/dino1.jpg",
    "nome" => "Bug From Hell 1.0",
    "descricao" => "Ajude o Dino a chegar até o fim dessa jornada, mas lembre-se, no caminho há obstacúlos.",
    "jogar" => "http://localhost/projeto2/game/index.html",
);
$game [4] = array (
    "id" =>4, 
    "banner" => "http://localhost/projeto2/imagens/dino1.jpg",
    "alt" => "Bug From Hell",

    "banner2" => "http://localhost/projeto2/imagens/dino1.jpg",
    "nome" => "Bug From Hell 1.0",
    "descricao" => "Ajude o Dino a chegar até o fim dessa jornada, mas lembre-se, no caminho há obstacúlos.",
    "jogar" => "http://localhost/projeto2/game/index.html",
);

echo json_encode($game);