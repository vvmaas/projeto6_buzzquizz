/*JavaScript organizado de acordo com ordem de aparição na página
/*Sendo disposto com 
/* 1° - Variáveis globais
/* 2° - Home page
/* 3° - Tela do quiz
/* 4° - Criação de quiz*/

/*INÍCIO GLOBAIS*/

let quizObjeto = {
	title: "",
	image: "",
	questions: [],//recebe templateQuestion
	levels: []//recebe templateLevel
}

let templateQuestion = {
        title: "",
        color: "#123456",
        answers: []
}

let templateLevel = {
    title: "",
    image: "",
    text: "",
    minValue: 0
}

let DOM_home = document.querySelector(".home").innerHTML
let quizzesArray = []
let RespostasArray= []

/* variáveis de criação */
let criarTitulo 
let criarImagem 
let criarNmrPerguntas 
let criarNmrNiveis 

/*FIM GLOBAIS*/

function refresh() {
    window.location.reload()
}
function comparador() { 
	return Math.random() - 0.5; 
}

/*INÍCIO HOME*/

function toggleHome() {  // função pra fazer aparecer e sumir a Homepage
    if (DOM_home === ""){ // caso esteja vazia
        document.querySelector(".home").innerHTML = "."//aqui entra todo html da home 
        //modifiquei aqui porque a função não estava sumindo o conteúdo
    } else { //caso esteja na tela
        document.querySelector(".home").innerHTML = "" // sai da tela pra abrir espaço
    }
}

//função para obter os quizzes da api
function ObterQuizzes(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    promise.then(ObterQuizzesSucesso)
}
//função para renderizar os quizzes e criar uma array com todos os objetos dos quizzes
//elemento.data[i] === quizzesArray[i]
function ObterQuizzesSucesso(elemento){
    for(let i = 0; i < elemento.data.length; i++){
        quizzesArray.push(elemento.data[i])
        const quizzCardtemplate = `
        <div class="quizzCard" id="${i}" onclick="goToQuizz(this)">
            <img src=${elemento.data[i].image}>
            <span>${elemento.data[i].title}</span>
        </div>`
        document.querySelector('.quizzCards').innerHTML += quizzCardtemplate
    }
    

}
ObterQuizzes()
/*FIM HOME*/




/*INÍCIO QUIZ*/
function goToQuizz(quizz) { // função pra limpar a home e abrir o quiz e renderizar as perguntas, as respostas e o banner no topo do quiz
    //a função também serve para pegar o id do quiz
    // quizz.id === i
    toggleHome()
    //colocando as respostas em uma array e embaralhando a array para a ordem ficar aleatória
    for(let index= 0 ; index< quizzesArray[quizz.id].questions[0].answers.length ; index++){
        RespostasArray.push(quizzesArray[quizz.id].questions[0].answers[index])
    }
    RespostasArray.sort(comparador)
    console.log(quizzesArray)
    document.querySelector('.quiz').innerHTML = `
        <div class="ImgTopoQuiz">
            <img class="ImagemQuizBanner" src="${quizzesArray[quizz.id].image}" alt="">
            <h2 class="TituloQuizBanner">${quizzesArray[quizz.id].title}</h2>
        </div>
        <div class="QeAQuiz">
            <div class="Pergunta">
                <h3>${quizzesArray[quizz.id].questions[0].title}</h3>
            </div>
            <div class="Resposta">
                <div class="RespostaColuna1">
                    <div class="Resposta1" onclick="VerificarResposta(RespostasArray[0], this)">
                        <img class="imgresposta" src="${RespostasArray[0].image}" alt="">
                        <span>${RespostasArray[0].text}</span>
                    </div>
                </div>
                <div class="RespostaColuna2">
                    <div class="Resposta2" onclick="VerificarResposta(RespostasArray[1], this)">
                        <img class="imgresposta" src="${RespostasArray[1].image}" alt="">
                        <span>${RespostasArray[1].text}</span>
                    </div>
                </div>
                
            </div>
        </div>`
        if(RespostasArray[2] !== undefined){
            document.querySelector('.RespostaColuna1').innerHTML +=
                `<div class="Resposta3" onclick="VerificarResposta(RespostasArray[2], this)">
                    <img class="imgresposta" src="${RespostasArray[2].image}" alt="">
                    <span>${RespostasArray[2].text}</span>
                </div>`
        }
        if(RespostasArray[3] !== undefined){
            document.querySelector('.RespostaColuna2').innerHTML +=
            `   <div class="Resposta4" onclick="VerificarResposta(RespostasArray[3], this)">
                    <img class="imgresposta" src="${RespostasArray[3].image}" alt="">
                    <span>${RespostasArray[3].text}</span>
                </div>`
        }
}
//função para selecionar resposta e esbranquiçar as outras
//e para verificar se a resposta ta certa ou errada
function VerificarResposta(RespostaObjeto, elemento){ //verificar jeito melhor de fazer
    if(elemento.classList.contains('esbranquicado') === false){
        document.querySelector('.Resposta1').classList.add('esbranquicado')
        document.querySelector('.Resposta2').classList.add('esbranquicado')
        if(RespostasArray[2] !== undefined){
            document.querySelector('.Resposta3').classList.add('esbranquicado')
        }
        if(RespostasArray[3] !== undefined){
            document.querySelector('.Resposta4').classList.add('esbranquicado')
        }
        elemento.classList.remove('esbranquicado')
    }
    switch(true){
        case RespostasArray[0].isCorrectAnswer:
            document.querySelector('.Resposta1').classList.add('acertou')
            document.querySelector('.Resposta').classList.add('errou')
            break
        case RespostasArray[1].isCorrectAnswer:
            document.querySelector('.Resposta2').classList.add('acertou')
            document.querySelector('.Resposta').classList.add('errou')
            break
        case RespostasArray[2].isCorrectAnswer:
            document.querySelector('.Resposta3').classList.add('acertou')
            document.querySelector('.Resposta').classList.add('errou')
            break
        case RespostasArray[3].isCorrectAnswer:
            document.querySelector('.Resposta4').classList.add('acertou')
            document.querySelector('.Resposta').classList.add('errou')
            break
    }
   
}

/*FIM QUIZ*/




/*INÍCIO CRIAÇÃO*/

function goToCriar() {
    toggleHome()
    document.querySelector('.criacao').innerHTML = 
    `<div class="infoCriar">
        <span>Comece pelo começo</span>
        <div class="caixaInput">
            <input class="titulo" type="text" placeholder="  Escolha o titulo do seu quizz">
            <input class='imageURL' type="text" placeholder="  Insira a URL da imagem do seu quizz">
            <input class='nmrPerguntas' type="text" placeholder="  Quantas perguntas terá seu quizz?">
            <input class='nmrNiveis' type="text" placeholder="  Quantos níveis terá seu quizz?">
        </div>
        <button class="goToPerguntas" onclick="goToCriarPerguntas()">Prosseguir para criar perguntas</button>
    </div>`
    criarTitulo = document.querySelector(".titulo")
    criarImagem = document.querySelector(".imageURL")
    criarNmrPerguntas = document.querySelector(".nmrPerguntas")
    criarNmrNiveis = document.querySelector(".nmrNiveis")

}

function goToCriarPerguntas() { //verifica 1- se os campos foram preenchidos 2- se foram preenchidos corretamente.
    if (criarImagem.value === null || criarTitulo.value === null || criarNmrNiveis.value === null || criarNmrPerguntas.value === null){
        alert("Preencha os dados.")
    } else {
        if (criarTitulo.length > 65 || criarTitulo.lenght < 20 || Number(criarNmrNiveis.value) < 2 || Number(criarNmrPerguntas.value) < 3) {
            alert("Os dados estão incorretos. Preencha-os corretamente.\nMínimo de níveis: 2\nMínimo de perguntas: 3\nTítulo: entre 20 e 65 caracteres")
        } else {
            document.querySelector('.criacao').innerHTML = "" // Aqui entra a tela de perguntas (3.2)

            quizObjeto.title = criarTitulo.value       //daqui pra baixo está preparando o objeto do quiz
            quizObjeto.image = criarImagem.value      // com título e imagem prontos e quantidade de níveis e perguntas definidos.
            for (let i = 0; i < Number(criarNmrPerguntas.value); i++){
                quizObjeto.questions.push(templateQuestion)
            }
            for (let i = 0; i < Number(criarNmrNiveis.value); i++){
                quizObjeto.levels.push(templateLevel)
            }
        }
    }
}

/*FIM CRIAÇÃO*/
