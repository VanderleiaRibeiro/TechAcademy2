<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAME SEVEN</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/dist/style.css">
    <link rel="stylesheet" href="stylesheet/style.css">
    <link rel="shortcut icon" href="imagens/game.jpg">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>

    <header class="header">

        <a href="index.html" title="Home" class="header-logo">
            <img src="imagens/game.jpg" alt="aberturalogo" width="7%">
        </a>

        <a href="javascript:mostrarMenu()" title="Menu" class="header-menu">
            <i class="fa-solid fa-bars"></i>
        </a>

        <nav class="header-nav">

            <ul>
                <li>
                    <a href="#home">HOME</a>
                </li>
                <li>
                    <a href="#sobre">Sobre o jogo</a>
                </li>
                <li>
                    <a href="#suporte">Suporte</a>
                </li>
            </ul>
            
        </nav>

    </header>
    <main>
    <?php
    if (isset($_GET["param"])) {
      $param = $_GET["param"];
      $p = explode("/", $param);

    }
    $page = $p[0] ?? "loja";
    $jogo = $p[1] ?? NULL;

    if ($page == "jogo") {
      $pagina = "jogo/{$jogo}.php";

    } else {
      $pagina ="paginas/{$page}.php";

    }
    if (file_exists($pagina))  {
      include $pagina;
    } else {
      include "paginas/erro.php";
    }

    ?>
  </script>
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <footer>
      <h2>Desenvolvido por: Vanderléia Ribeiro</h2>
    </footer>
