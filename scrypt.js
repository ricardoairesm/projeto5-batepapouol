let principal = document.getElementById("principal");
let passar = {};
manterConectado();
start();





function start() {

    principal.innerHTML = "";

    let mensagens = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    mensagens.then(printar);

    function printar(promessa) {

        for (let i = 0; i < promessa.data.length; i++) {
            if (promessa.data[i].type == "message") {
                principal.innerHTML += `<div class="mensagem-normal mensagem">
              
                <div class = "time">  (${promessa.data[i].time})  </div> <p> <span>${promessa.data[i].from}</span> para <span>${promessa.data[i].to}</span>${promessa.data[i].text}<p>
                 </div>`
                
            }
            if (promessa.data[i].type == "status") {
                principal.innerHTML += `<div class="mensagem-status mensagem">
                <div class = "time">  (${promessa.data[i].time})  </div> <p> <span>${promessa.data[i].from}</span> ${promessa.data[i].text}</p>
                </div>`
                
            }
            if (promessa.data[i].type == "private_message") {
                principal.innerHTML += `<div class="mensagem-reservada mensagem">
                <div class = "time">  (${promessa.data[i].time})  </div> <p> <span>${promessa.data[i].from}</span> reservadamente para <span>${promessa.data[i].to}</span>${promessa.data[i].text}<p>
                </div>`
                
            }
        }



        setTimeout(() => {
            start();
        }, 3000);

        Refresh();


    }
   
    return principal;
   


}

function manterConectado() {
    passar = {
        name: prompt("Qual o seu nome?")
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", passar)
        .then(tratarSucesso)
        .catch(tratarErro);


    function tratarSucesso() {
        check();
        start();
    }

    function check() {
        axios.post("https://mock-api.driven.com.br/api/v6/uol/status", passar);
        setTimeout(() => {
            check();
        }, 5000);
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
    return passar;
}

function Refresh() {
    let pointer = document.getElementById("principal");
    pointer.lastChild.scrollIntoView();
}

function mandarMensagem() {
    console.log(passar.name);
    let texto = document.getElementById("texto");
    texto = texto.value;
    let objeto = {
        from: passar.name,
        to: "Todos",
        text: texto,
        type: "message"
    }
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objeto)
        .then(Refresh());
}









