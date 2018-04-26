/***********************************************************
	
	script para gerar o gráfico.
	desenha o plano cartesiano e contém funções para desenhar o gráfico
	
	este script contém as funções:
	
	criaAgulha() - Posiciona a agulha no ponto (x0 ; y0)
	moveAgulha() - Move a agulha, riscando o gráfico até novo ponto (xn; yn)
	
******************************************************************/


var canvas = document.getElementById("myCanvas"); //variavel que armazena o elemento canvas
var ctx = canvas.getContext("2d"); //variável para facilitar a manipulação do desenho
var px = 100;//ponto x0 no gráfico
var py = 100;//ponto y0 no gráfico

//desenha linha do eixo x
ctx.beginPath();
ctx.moveTo(px - 100,py);
ctx.lineTo(200,py);
ctx.stroke();

//desenha linha do eixo y
ctx.beginPath();
ctx.moveTo(px,py-100);
ctx.lineTo(px,200);
ctx.stroke();

//texto do gráfico
ctx.font = "20px arial";
ctx.fillText("^y",px,py -80);
ctx.font = "20px arial";
ctx.fillText("x>",px +80,py);


//função que coloca o ponteiro na posição x0,y0 de acordo com a função inserida pelo usuário
function criaAgulha(xagulha,yagulha){
	console.log("criando agulha");//mensagem para debug
	xagulha= xagulha * 20;//multiplico por 20 para que o passo mínimo seja de 0,02 no gráfico
	yagulha= yagulha * 20;
	ctx.beginPath();
	ctx.strokeStyle="blue";//cor da agulha
	ctx.moveTo(px+xagulha,py-yagulha);
}


//função que move a agulha, desenhando o gráfico
function moveAgulha(xagulha,yagulha){
	console.log("movendo agulha para:");
	console.log(xagulha);
	console.log(yagulha);
	xagulha= xagulha * 20; //novamente, multiplico o valor de entrada por 20 para melhorar a escala no gráfico
	yagulha= yagulha * 20;
	ctx.lineTo(px+xagulha,py-yagulha);//risca o gráfico do ponto anterior até novo ponto
	ctx.stroke();
}

