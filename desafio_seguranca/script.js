
const formLogin = document.getElementById("formLogin");

// Verifica se o usuário está autenticado
async function verificarAcesso() {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error || !data.session) {
        window.location.replace("index.html");
        return false;
    }

    return true;
}

// Página de votação
if (document.body.classList.contains("voto-page")) {
    verificarAcesso();
}

// Página de login
if (formLogin) {

    // Se já estiver autenticado, vai para votação
    verificarAcesso().then((autorizado) => {
        if (autorizado) {
            window.location.replace("voto.html");
        }
    });

    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value;
        const mensagemErro = document.getElementById("mensagemErro");

        mensagemErro.textContent = "Verificando acesso...";

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: usuario,
            password: senha
        });

        if (error) {
            mensagemErro.textContent =
                "E-mail ou senha incorretos. Tente novamente.";
            return;
        }

        window.location.replace("voto.html");
    });
}

// Botão de sair
const botaoSair = document.querySelector(".botao-sair");

if (botaoSair) {
    botaoSair.addEventListener("click", async function() {
        await supabaseClient.auth.signOut();
        window.location.replace("index.html");
    });
}
