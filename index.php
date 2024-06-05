<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAME SEVEN</title>
  <base href="http://localhost/projeto2/">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/dist/style.css">
    <link rel="stylesheet" href="stylesheet/style.css">
    <link rel="shortcut icon" href="imagens/logo.gameseven.jpg">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>

    <header class="header">

        <a href="index.php" title="Home" class="header-logo">
            <img src="imagens/logo.gameseven.jpg" alt="aberturalogo" >
        </a>

        <nav class="header-nav">

            <ul>
                <li>
                    <a href="sobre">Sobre</a>
                </li>
                <li>
                    <a href="contato">Suporte</a>
                </li>
                <li>
                  <a href="jogos">jogos</a>
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
    $page = $p[0] ?? "home";
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

  </main>

   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <footer>
      <h2>
        <p>Desenvolvido por: Vanderléia Ribeiro</p>
      </h2>
    </footer>

</body>

</html>