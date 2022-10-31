manterConectado();
start();

const mensagem = { from: "", to: "", text: "", type: "", time: "" };
const principal = document.getElementById("principal");


function start() {

    let mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    mensagens.then(printar);

    function printar(promessa) {

        for (let i = 0; i < promessa.data.length; i++) {
            if (promessa.data[i].type == "message") {
                principal.innerHTML += `<div class="mensagem-normal">
        <p><span>  (${promessa.data[i].time})  <h1>  ${promessa.data[i].from}  </h1></span>${promessa.data[i].text}</p>
    </div>`
            }
            if (promessa.data[i].type == "status") {
                principal.innerHTML += `<div class="mensagem-status">
        <p><span>  (${promessa.data[i].time})  <h1>  ${promessa.data[i].from}  </h1></span>${promessa.data[i].text}</p>
    </div>`
            }
            if (promessa.data[i].type == "private_message") {
                principal.innerHTML += `<div class="mensagem-reservada">
        <p><span>  (${promessa.data[i].time})  <h1>  ${promessa.data[i].from}  </h1></span> reservadamente para <h1>  ${promessa.data[i].to}  </h1>${promessa.data[i].text}</p>
    </div>`
            }
        }
        setTimeout(() => {
            start();
        }, 3000);
    }
}

function manterConectado() {
    let passar = {
         name: prompt("Qual o seu nome?")
     }
     axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", passar)
     .then(tratarSucesso)
     .catch(tratarErro);
 
 
    function tratarSucesso() {
        axios.post("https://mock-api.driven.com.br/api/v6/uol/status", passar);
        setTimeout(() => {
            tratarSucesso();
        }, 5000);
        console.log("sucesso!");
    }

    function tratarErro(erro) {
        if (erro.response.status == 400) {
            alert("Esse nome já foi escolhido, por favor insira um novo");
            setTimeout(() => {
                manterConectado();
            }, 500);
        }
        else {
            tratarSucesso();
        }
    }


}







