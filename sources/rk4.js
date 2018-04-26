/*******************************************
	este script contém as funções:
	
	main() - função principal
	k2() - calcula k2
	K3() - calcula k3
	k4() - calcula k4
	criarTabela() - função para gerar a tabela a partir do resultado
*/

// declaraçã de variáveis
var n=0;
var xn=0;
var yn=0;
var k1n=0;
var k2n=0;
var k3n=0;
var k4n=0;
	
//capturar valores (aqui são variáveis globais)
var x = eval(document.getElementById("a").value);//x0 = a
var y = eval(document.getElementById("y0").value);
var b = eval(document.getElementById("b").value);
var passo = eval(document.getElementById("h").value);
var dy = document.getElementById("dy").value;

// função para limpar a página.
// mesma função do botão F5 do teclado.
function limpar(){
	location.reload();
}

// Função principal. Realiza o cálculo a partir dos valores inseridos pelo usuário
// gera um gráfico e uma tabela com os resultados.
function main(){
	
	// captura valores
	x = eval(document.getElementById("a").value);//x0 = a
	y = eval(document.getElementById("y0").value);
	b = eval(document.getElementById("b").value);
	passo = eval(document.getElementById("h").value);
	dy = document.getElementById("dy").value;

 	var tabResposta = []; //array da tabela resposta
 	// adiciona cabeçalho da tabela
 	tabResposta[0] = ["n", "X", "Y", "K1", "K2", "K3", "K4"]; 

	// calcula quantas iterações são necessárias 
	var iTotal = (b-x)/passo;
	
	//iteração 0 - primeira iteração difere das outras por não precisar calcular xn e yn
	n = 0;
	xn = x;
	
	yn = y;
	k1n = eval(dy); //função eval, retorna a resposta da função após substituri os valores de x e y
	k2n = k2(xn,yn,dy,k1n); 
	k3n = k3(xn,yn,dy,k2n);
	k4n = k4(xn,yn,dy,k3n);
	
	criaAgulha(xn,yn); // posiciona a agulha no ponto (x0 ; y0)
	
	tabResposta.push([n, x, y, k1n, k2n, k3n, k4n]); // adiciona primeira iteração no array da tabela

	// iteração 1 até n
	//
	// calculei anteriormente quantas iterações serão necessárias.
	// posso implementar futuramente uma condição para interromper
	// o calculo caso o numero de iterações seja "muito alto".
	for (i=1; i <= iTotal; i++){
	
		x = x + passo; // calcula x para proxima iteração
		y = y + ((passo/6)*(k1n+(2*k2n)+(2*k3n)+k4n)); // calcula y para próxima iteração

		n = i;
		xn = x;
		yn = y;
		k1n = eval(dy);
		k2n = k2(xn,yn,dy,k1n);
		k3n = k3(xn,yn,dy,k2n);
		k4n = k4(xn,yn,dy,k3n);
		
		moveAgulha(xn,yn); // desenha uma linha do ponto anterior até o novo ponto (xn ; yn)
		tabResposta.push([n, x, y, k1n, k2n, k3n, k4n]); // adiciona iteração no array da tabela
	}
	
	//cria a tabela a partir do array criado no laço "for" anterior
    document.getElementById("tabela").appendChild(criarTabela(tabResposta));
}

// função que calcula o valor de k2
function k2(x, y, func, k1) {
	x=x+(passo/2);
	y=y+(passo/2)*k1;
	return eval(func);
}

// função que calcula o valor de k3
function k3(x, y, func, k2) {
	x = x + (passo/2);
	y = y + (passo/2)*k2;
	return eval(func);
}

// função que calcula o valor de k4
function k4(x, y, func, k3) {
	x = x + passo;
	y = y + passo*k3;
	return eval(func);
}

// função que recebe um array e cria uma tabela para apresentar os resultados
//
// Créditos no link:
// http://pt.stackoverflow.com/questions/49581/criar-tabela-din%C3%A2mica-em-js-para-utilizar-em-html

function criarTabela(conteudo) {
  var tabela = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody=document.createElement("tbody");
  var thd=function(i){return (i==0)?"th":"td";};
  for (var i=0;i<conteudo.length;i++) {
    var tr = document.createElement("tr");
    for(var o=0;o<conteudo[i].length;o++){
      var t = document.createElement(thd(i));
      var texto=document.createTextNode(conteudo[i][o]);
      t.appendChild(texto);
      tr.appendChild(t);
    }
    (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
  }
  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  return tabela;
}
