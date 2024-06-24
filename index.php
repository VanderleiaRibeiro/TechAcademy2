<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GAME SEVEN</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
  <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
  <base href="http://localhost/projeto2/">
  <link rel="stylesheet" href="css/dist/style.css">
  <link rel="stylesheet" href="stylesheet/style.css">
  <link rel="shortcut icon" href="imagens/logo.gameseven.jpg">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cardo:ital,wght@0,400;0,700;1,400&family=DM+Serif+Display:ital@0;1&family=Jaro:opsz@6..72&family=Merienda:wght@300..900&family=Permanent+Marker&family=Teko:wght@300..700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css" />

  <!--nomes-Merienda, Cardo, Jaro, Permanent Marker, DM Serif Display, Teko, Bebas Neue -->
</head>

<body>

  <header class="header">

    <a href="index.php" title="Home" class="header-logo" data-aos="fade-right">
      <img src="imagens/logo.gameseven.jpg" alt="aberturalogo">
    </a>

    <a href="javascript:showMenu()" title="mostrar Menu" class="header-menu" data-aos="fade-left">
      <img src="imagens/iconmenu.jpg" alt="menu">
    </a>

    <nav class="header-nav" data-aos="fase-left">

      <ul>
        <li>
          <a href="sobre">Sobre</a>
        </li>

        <li>
          <a href="jogos">Jogos</a>
        </li>
        <li>

          <button type="button" class="botaoSuporte btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Suporte</button>
        </li>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Entre em contato conosco!</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="mb-3">
                    <label for="recipient-name" class="col-form-label">E-mail:</label>
                    <input type="text" class="form-control" id="recipient-name">
                  </div>
                  <div class="mb-3">
                    <label for="message-text" class="col-form-label">Mensagem:</label>
                    <textarea class="form-control" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">calcelar</button>
                <button type="button" class="btn btn-primary">Enviar</button>
              </div>
            </div>
          </div>
        </div>
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
      $pagina = "paginas/{$page}.php";
    }
    if (file_exists($pagina)) {
      include $pagina;
    } else {
      include "paginas/erro.php";
    }

    ?>

  </main>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


  <footer>
    <div id="footer_content">
      <div id="footer_contacts">
        <h1>Game Seven</h1>
        <p>Seu site de jogos.</p>

        <div id="footer_social_media">
          <a href="#" class="footer-link" id="instagram">
            <i class="bi bi-instagram"></i>
          </a>

          <a href="#" class="footer-link" id="facebook">
            <i class="bi bi-facebook""></i>
                    </a>

                    <a href=" #" class="footer-link" id="whatsapp">
              <i class="bi bi-whatsapp"></i>
          </a>
        </div>
      </div>

      <ul class="footer-list">
        <li>
          <h3>Blog</h3>
        </li>
        <li>
          <a href="#" class="footer-link">Tech</a>
        </li>
        <li>
          <a href="#" class="footer-link">Adventures</a>
        </li>
        <li>
          <a href="#" class="footer-link">Music</a>
        </li>
      </ul>

      <ul class="footer-list">
        <li>
          <h3>Products</h3>
        </li>
        <li>
          <a href="#" class="footer-link">App</a>
        </li>
        <li>
          <a href="#" class="footer-link">Desktop</a>
        </li>
        <li>
          <a href="#" class="footer-link">Cloud</a>
        </li>
      </ul>

      <div id="footer_subscribe">
        <h3>Subscribe</h3>

        <p>
          Entre em contato com nosso suporte para dúvidas.
        </p>
        <!-- 
                <div id="input_group">
                    <input type="email" id="email">
                    <button>
                        <i class="fa-regular fa-envelope"></i>
                    </button>
                </div> -->
      </div>
    </div>

    <div id="footer_copyright">
      &#169
      2024, Todos os direitos reservados
      <br>Desenvolvido por: Vanderléia Ribeiro
    </div>
  </footer>

  <!--scripts-->

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

  <script>
    AOS.init();
  </script>

  <script src="js/fslightbox.js"></script>

  <script>
    function showMenu() {
      var menu = document.querySelector(".header-nav");
      menu.classList.toggle("show");
    }
  </script>

  <script src="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js"></script>

  <!-- Initialize Swiper -->
  <script>
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  </script>

</body>

</html>