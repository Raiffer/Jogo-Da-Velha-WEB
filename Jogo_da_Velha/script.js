let matriz = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

let vez = true;
let count = 0;

let inicio = null;
let fim = null;

let bloqueado = false; // Variável de controle

function bloquear() {
    let quadrados = document.querySelectorAll(".clickable-square");

    if (bloqueado) {
        quadrados.forEach(q => q.classList.remove("disabled"));
        bloqueado = false;
    } else {
        quadrados.forEach(q => q.classList.add("disabled"));
        bloqueado = true;
    }
}

function Posicao(temp, i, j, prox) {
    this.temp = temp;
    this.i = i;
    this.j = j;
    this.prox = prox;
}

function criar(x) {
    let novoNo = new Posicao(x, null, null, null);
    
    if (inicio === null) {
        inicio = novoNo;
        fim = novoNo;
        novoNo.prox = novoNo;
    } else {
        fim.prox = novoNo;  
        novoNo.prox = inicio;  
        fim = novoNo; 
    }
}

function esvaziarFila(){
    aux = fim;
    do {
        aux.i = null;
        aux.j = null;
        aux = aux.prox;
    } while (aux.prox != inicio);
}

function mostrar(){
    let aux = inicio;
    for (let i = 0; i <=5; i++){
        console.log(`Posição ${aux.temp} cordenada ${aux.i}, ${aux.j}.`);
        aux = aux.prox;
    }
    console.log(matriz);
}

function girar(aux) {
    if (aux.prox !== inicio) {
        girar(aux.prox);

        aux.prox.i = aux.i;
        aux.prox.j = aux.j;
    } else {
        remover(aux.i,aux.j);
    }
}

function remover(i,j){
    if(count >= 6){
        matriz[i][j] = 0;
        document.getElementById(`${i}${j}`).src = "imagens/Hollow.png";
    }
}

function trocar(i,j){
    if (matriz[i][j]==0){
       if(vez){
        document.getElementById(`${i}${j}`).src = "imagens/X.png";
        vez = false;
        matriz[i][j] = 1;
        girar(inicio);
        inicio.i = i;
        inicio.j = j;
        count++;
       } else{
        document.getElementById(`${i}${j}`).src = "imagens/O.png";
        vez = true;
        matriz[i][j] = 2;
        girar(inicio);
        inicio.i = i;
        inicio.j = j;
        count++;
       }
     
    }
    if (verificar()){
        bloquear();
        setTimeout(terminar, 2000);
        resultado();
    }
    piscar();
    mostrar();
}

function comecar(){
    document.getElementById("menu").style.display = "none"; 
    document.getElementById("jogo").style.display = "grid"; 
}

function terminar(){
    document.getElementById("jogo").style.display = "none"; 
    document.getElementById("fim").style.display = "block"; 
}

function recomecar(){
    vez = true;
    matriz = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    let imagens = document.querySelectorAll(".option");
    imagens.forEach(q => q.src = "imagens/Hollow.png");
    esvaziarFila();
    bloquear();
    count = 0;
    document.getElementById("fim").style.display = "none"; 
    document.getElementById("jogo").style.display = "grid"; 
    mostrar();
}


function verificar(){
    if (matriz[0][0] == matriz[1][1] && matriz[0][0] == matriz[2][2] && matriz[0][0]!=0){
        return true;
    }
    if(matriz[0][2] == matriz[1][1] && matriz[0][2] == matriz[2][0] && matriz[0][2]!=0){
        return true;
    }
    for(let i = 0; i <= 2; i++){
        if (matriz[i][0] == matriz[i][1] && matriz[i][0] == matriz[i][2]&& matriz[i][0]!=0){
            return true;
        } else if(matriz[0][i] == matriz[1][i] && matriz[0][i] == matriz[2][i] && matriz[0][i]!=0){
            return true;
        }
    }
    return false;
}

function piscar() {
    let anterior = document.querySelectorAll(".option-piscando");
    
    anterior.forEach(q => q.classList.remove("option-piscando"));

    if (count >= 6) {
        let atual = document.getElementById(`${fim.i}${fim.j}`);
        
        if (atual) {
            atual.classList.add("option-piscando");
        }
    }
}

function resultado(){
    if(vez){
        document.getElementById("vencedor").src = "imagens/O.png"
    }else{
        document.getElementById("vencedor").src = "imagens/X.png"
    }
}
for (let i = 0; i <= 5; i++){
    criar(i);
    console.log(`Posição ${i} criada`);
}