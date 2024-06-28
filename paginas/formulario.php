<!-- formulario.php -->
<div class="content">
    <h1>Formulário</h1>
    <form id="form">
        <div>
            <input type="text" placeholder="Digite seu nome" class="inputs required" oninput="nameValidate()">
            <span class="span-required">Nome deve ter no mínimo 3 caracteres</span>
        </div>
        <div>
            <input type="email" placeholder="Digite seu melhor email" class="inputs required" oninput="emailValidate()">
            <span class="span-required">Digite um email válido</span>
        </div>
        <div>
            <input type="password" placeholder="Senha" class="inputs required" oninput="mainPasswordValidate()">
            <span class="span-required">Digite uma senha com no mínimo 8 caracteres</span>
        </div>
        <div>
            <input type="password" placeholder="Repita a sua senha" class="inputs required" oninput="comparePassword()">
            <span class="span-required">Senhas devem ser compatíveis</span>
        </div>

        <button type="submit">Enviar</button>
    </form>
</div>