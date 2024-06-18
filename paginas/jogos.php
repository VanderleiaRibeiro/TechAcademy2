<div class="catalago-jogos">
    <h1>Bem vindo ao nosso catalago de jogos!</h1>
</div>

<?php 

    $dadosApi = file_get_contents("http://localhost/projeto2/api/jogo.php");
    $dadosApi = json_decode($dadosApi);

    foreach ($dadosApi as $dados) {
        ?>
        <div class="grid">
            <div class="card" data-aos="fade-up" data-aos-duration="400">
                <img src="<?php echo $dados-> banner?>" class="card-img-top" alt="dino">
            <div class="card-body">
            <h5 class="card-title"><?php echo $dados-> nome ?></h5>
            <p class="card-text"><?php echo $dados-> descricao?></p>
            <a href="<?php echo $dados-> jogar ?>" class="btn btn-primary">JOGAR</a>
        </div>
        </div>
        </div>
        <?php   
    }
    ;
?>