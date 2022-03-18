(function(win, doc){
	'use strict';

	// Palavra a ser advinhada
	var palavra = '';

	// Palavra Limpa
	var palavraLimpa = '';

	// Array da palavra (Dividida por caracter)
	var palavraLimpaArray = [];

	// Quantidades de letras da palavra
	var quantidadeLetras = 0;

	// Array de letras já jogadas
	var letrasJogadas = [];

	// Array de letras da palavra (Limpa)
	var arrayLetras = [];

	// Número de tentativas
	var tentativas = 5;

	// Tempo limite (segundos)
	var timerLimit = 60;

	// Timer do tempo limite
	var timer = timerLimit

	// Container do Timer
	var timerDOM = doc.querySelector('#timer');
	timerDOM.innerHTML = timer;

	// Timer timeout
	var timerTimeout;

	// Container de tentativas
	var tentativasContainer = doc.querySelector('.row-container');

	// Contador de tentativas
	var tentativasContador = doc.querySelector('#tentativas');
	tentativasContador.innerHTML = tentativas;

	// Número de acertos
	var acertos = 0;

	// Container onde serão carregadas as posições de cada letra da palavra
	var palavraContainer = doc.querySelector('#palavra-container');

	// Teclado
	var teclado = doc.querySelector('#teclado');
    
    // dica
	var dica = doc.querySelector('#dica');

	// Botões teclado
	var botoesTeclado = doc.querySelectorAll('.teclado-button');

	// Container Game Over
	var gameOver = doc.querySelector('.game-over-container');

	// Container Vencedor
	var winner = doc.querySelector('.winner-container');
	
	// Container botão 'Jogar Novamente'
	var btnJogarNovamenteContainer = doc.querySelector('.jogar-novamente-container');

	// Botão 'Jogar Novamente'
	var btnJogarNovamente = doc.querySelector('#btn-jogar-novamente');

	//Caixa Botao Voltar
	var voltarContainer = doc.querySelector('.voltar-container');
	// Caixa de escolha da palavra
	var escolhePalavraContainer = doc.querySelector('.escolha-palavra-container');
	var escolhePalavraContainer2 = doc.querySelector('.escolha-palavra-container2');
	var escolhePalavraContainer3 = doc.querySelector('.escolha-palavra-container3');
	
	//Botao Voltar
	var btnVoltar = doc.querySelector('#voltar');
	
	// Botão começar jogo
	var btnComecarJogo = doc.querySelector('#btn-jogar');
	var btnComecarTema2 = doc.querySelector('#btn-jogar2');
	var btnComecarTema3 = doc.querySelector('#btn-jogar3');

	// Container stickman
	var stickmanContainer = doc.querySelector('.stickman');
    
    // Container dica
	var dicaContainer = doc.querySelector('.dica');

	// Imagem stickman
	var imgStickman = doc.querySelector('#stickman');
    
    // Imagem Dica
	var imgDica = doc.querySelector('#dicaimg');
	var telainicial=true;
	// Inicia o timer
	function iniciaTimer() {
		//
		telainicial=false;
		timerTimeout = setTimeout(function() {
			timer--;	
			console.log(timer);
			if (timer >= 0) {
				timer <= 10 ? timerDOM.style.color = '#D86666' : timerDOM.style.color = '#333';
				timer <= 10 ? timerDOM.parentElement.style.color = '#D86666' : timerDOM.parentElement.style.color = '#333';
				timerDOM.innerHTML = timer;
				iniciaTimer();
			} else {
				GameOver();
			}
		},1000);
	}

	// Reinicia o timer
	function reiniciaTimer() {
		timerDOM.style.color = '#333';
		timerDOM.parentElement.style.color = '#333';
		pararTimer();
		timer = timerLimit;
		timerDOM.innerHTML = timer;
		iniciaTimer();
	}

	// Para o timeout
	function pararTimer() {
		clearTimeout(timerTimeout);
	}

	// Exibe stickman
	function exibeStickman() {
		stickmanContainer.style.display = 'block';
	}

	// Oculta stickman
	function ocultaStickman() {
		stickmanContainer.style.display = 'none';
	}

	// Atualiza o stickman
	function updateStickman() {
		imgStickman.setAttribute('src', 'imagens/forca' + tentativas + '.png');
	}
    
	function exibirBotaoVoltar(){
		voltarContainer.style.display = 'block';
	}
	function ocultarBotaoVoltar(){
		//voltarContainer.style.display = 'none';
	}
	// Evento de click do botão começar jogo
	btnVoltar.addEventListener('click', function(e) {
		//window.location.reload(true) 
		pararTimer();
		resetGame(); 
		console.log('Voltar');
		if(telainicial){
			window.location.href = "index.html";
		}else{
			telainicial=true;
		}
	}, false);
	
	btnComecarJogo.addEventListener('click', function(e) {

			ocultaEscolhaPalavra();
			iniciarJogo('1');

	}, false);
	
	btnComecarTema2.addEventListener('click', function(e) {

			ocultaEscolhaPalavra();
			iniciarJogo('2');

	}, false);
	btnComecarTema3.addEventListener('click', function(e) {

			ocultaEscolhaPalavra();
			iniciarJogo('3');

	}, false);
	// Evento de click do botão começar jogo


	// Valida a palavra digitada


	function resetGame() {
		palavra = '';
		palavraLimpaArray = [];
		quantidadeLetras = 0;
		letrasJogadas = [];
		arrayLetras = [];
		tentativas = 5;
		tentativasContador.innerHTML = tentativas;
		acertos = 0;
		resetTeclado();
		//campoPalavraInput.value = '';
		updateStickman();
		ocultarBotaoVoltar();
		ocultaTentativas();
		ocultaTeclado();      
		ocultaGameOver();
		ocultaWinner();
		ocultaBtnJogarNovamente();
		ocultaStickman();
        ocultaDica();
		ocultaPalavraPosicoes();
		exibeEscolhaPalavra();
	}

	// Evento de click no botão 'Jogar Novamente'
	btnJogarNovamente.addEventListener('click', function(e) {
		//window.location.reload(true) 
		resetGame(); 
	}, false);

	// Oculta botão 'Jogar Novamente'
	function ocultaBtnJogarNovamente() {
		btnJogarNovamenteContainer.style.display = 'none';
	}

	// Exibe Game Over
	function exibeGameOver() {
		gameOver.style.display = 'block';
	}

	// Oculta Game Over
	function ocultaGameOver() {
		gameOver.style.display = 'none';
	}

	// Exibe Winner
	function exibeWinner() {
		winner.style.display = 'block';
	}

	// Oculta Winner
	function ocultaWinner() {
		winner.style.display = 'none';
	}

	// Exibe botão 'Jogar Novamente'
	function exibeBtnJogarNovamente() {
		btnJogarNovamenteContainer.style.display = 'block';
	}

	// Oculta Caixa de escolha da palavra
	function ocultaEscolhaPalavra() {
		escolhePalavraContainer.style.display = 'none';
		escolhePalavraContainer2.style.display = 'none';
		escolhePalavraContainer3.style.display = 'none';
	}

	// Exibe Caixa de escolha da palavra
	function exibeEscolhaPalavra() {
		escolhePalavraContainer.style.display = 'block';
		escolhePalavraContainer2.style.display = 'block';
		escolhePalavraContainer3.style.display = 'block';
	}
	
	// Oculta o container da palavra
	function ocultaPalavraPosicoes() {
		palavraContainer.style.display = 'none';
	}

	// Exibe o container da palavra
	function exibePalavraPosicoes() {
		palavraContainer.style.display = 'block';
	}

	// Oculta as tentativas
	function ocultaTentativas() {
		tentativasContainer.style.display = 'none';
	}

	// Exibe as tentativas
	function exibeTentativas() {
		tentativasContainer.style.display = 'block';
	}

	// Oculta o teclado
	function ocultaTeclado() {
		teclado.style.display = 'none';
	}

	// Exibe o teclado
	function exibeTeclado() {
		teclado.style.display = 'block';
	}
    
    // Oculta dica
	function ocultaDica() {
		dica.style.display = 'none';
	}
    
    // Exibe dica
	function exibeDica() {
		dica.style.display = 'block';
	}

	// Desabilita uma tecla do teclado quando a jogada for errada
	function desabilitaTeclaErro(tecla) {
		var teclaDesativada = doc.querySelector('button[data-button-value="' + tecla + '"]');
		teclaDesativada.setAttribute('class', 'teclado-button teclado-button-inative');
		teclaDesativada.setAttribute('disabled', true);
	}

	// Desabilita uma tecla do teclado quando a jogada for correta
	function desabilitaTeclaAcerto(tecla) {
		var teclaDesativada = doc.querySelector('button[data-button-value="' + tecla + '"]');
		teclaDesativada.setAttribute('class', 'teclado-button teclado-button-valid');
		teclaDesativada.setAttribute('disabled', true);
	}

	// Evento de click nos botões do teclado
	function clickBotaoTeclado() {
		efetuaJogada(this.dataset.buttonValue);
	}
	botoesTeclado.forEach(function(botao) {
		botao.addEventListener('click', clickBotaoTeclado, false);
	}); 

	// Reseta o teclado
	function resetTeclado() {
		botoesTeclado.forEach(function(botao) {
			botao.setAttribute('class', 'teclado-button');
			botao.removeAttribute('disabled');
		});
	}

	// Replace do PHP (Arrays)
	function str_replace(find, replace, string) {
		var novaString = [];
		string.split('').forEach(function(letraString) {
			if (find.indexOf(letraString) !== -1) {
				novaString.push(replace[find.indexOf(letraString)]);
			} else {
				novaString.push(letraString);
			}
		});
		return novaString.join('');
	}

	// Limpa uma palavra removendo caracteres inválidos
	function limpaPalavra(palavra) {
		var palavra = String(palavra);
		palavra = palavra.toUpperCase();
		var find = ['Á', 'À', 'Ã', 'Â', 'É', 'Ê', 'Í', 'Ó', 'Ô', 'Õ', 'Ú', 'Ü', '&'];
		var replace = ['A', 'A', 'A', 'A', 'E', 'E', 'I', 'O', 'O', 'O', 'U', 'U', 'E'];	
		palavra = str_replace(find, replace, palavra);	
		palavra = palavra.trim();
		palavra = palavra.replace(/\s|_+/g,' ');
		palavra = palavra.replace(/\-+/g,'-');
		palavra = palavra.replace(/\d+/ig,'');		
		palavra = palavra.replace(/[^\w|\s|\-|Ç]+/ig,'');
		return palavra;
	}

	// Limpa uma palavra removendo caracteres inválidos (Ignorando os acentos)
	function limpaPalavraAcentos(palavra) {
		var palavra = String(palavra);
		palavra = palavra.toUpperCase();
		palavra = palavra.trim();
		palavra = palavra.replace(/\s|_+/g,' ');
		palavra = palavra.replace(/\-+/g,'-');
		palavra = palavra.replace(/\d+/ig,'');
		palavra = palavra.replace(/[^A-Za-zÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ|\s|\-]+/ig,'');				
		return palavra;
	}

	// Cria um array com as letras de uma palavra sem repetir as mesmas
	function getArrayLetras(palavra) {
		var arrayLetras2 = [];
		palavra.replace(/[-|_|\s]+/ig,'').
			split('').
				forEach(function(letra, index) {	
					!arrayLetras2.some(function(letraGravada) {
						return letraGravada === letra;
					}) ? arrayLetras2.push(letra) : '';
					return arrayLetras2;
				});
		return arrayLetras2;
	}

	// Verifica se a letra é válida
	function verificaValor(letra) {
		return typeof letra === 'string' && letra !== ' ' && letra.length > 0;
	}

	// Verifica se a letra já foi usada
	function verificaLetraJogada(letra) {
		return letrasJogadas.some(function(letraJogada) { return letraJogada == letra; });
	}

	// Atualiza as tentativas
	function atualizaTentativas() {
		tentativas--;
		updateStickman();
		if (tentativas <= 0) {
			GameOver();
		} else {
			tentativasContador.innerHTML = tentativas;
		}		
	}

	// Game over
	function GameOver() {
		tentativas = 0;
		updateStickman();
		exibeGameOver();
		ocultarBotaoVoltar();
		ocultaTeclado();
		exibePalavra();
		exibeBtnJogarNovamente();
		pararTimer();
		ocultaTentativas();
        ocultaDica();
	}

	// Efetua uma jogada
	function efetuaJogada(letra) {
		if (verificaValor(letra)) {
			if (!verificaLetraJogada(letra)) {
				addLetraJogada(letra);
				if (verificaJogada(letra)) {
					desabilitaTeclaAcerto(letra);
					exibeLetra(letra);
					if (todasLetrasCorretas()) {
						pararTimer();
						ocultaTeclado();
                    	exibeWinner();
						exibeBtnJogarNovamente();	
						ocultaTentativas();		
					}
				} else {
					desabilitaTeclaErro(letra);
					atualizaTentativas();
				}	
			} 				
		}
	}

	// Verifica se uma letra está correta
	function verificaJogada(letraJogada) {
		var posicoesLetra = doc.querySelectorAll('.posicao-letra');
		var posicoesLetraArray = [];
		posicoesLetra.forEach(function(pos) {
			posicoesLetraArray.push(limpaPalavra(pos.dataset.letraValue));
		});
		return posicoesLetraArray.some(function(letra) {
			return letraJogada == letra;
		});
	}

	// Exibe uma letra na tela
	function exibeLetra(letra) {
		var posicoesLetra = doc.querySelectorAll('.posicao-letra');
		posicoesLetra.forEach(function(pos) {
			if (limpaPalavra(pos.dataset.letraValue) == letra) {
				pos.setAttribute('data-correta',true);
				pos.value = pos.dataset.letraValue;
			}
		});
	}

	// Verifica se todas as letras estão corretas
	function todasLetrasCorretas() {
		var letrasCorretas = doc.querySelectorAll('input[data-correta="true"]');
		return letrasCorretas.length >= quantidadeLetras;
	}

	// Exibe a palavra inteira
	function exibePalavra() {
		var posicoesPalavra = doc.querySelectorAll('.posicao-letra');
		posicoesPalavra.forEach(function(pos) {
			pos.value = pos.dataset.letraValue;
		});
	}
	
	// Adiciona uma letra jogada no array
	function addLetraJogada(letra) {
		letrasJogadas.push(letra);
	}

	// Inicia um novo jogo
	function iniciarJogo(numeroDoJogo) {
		var palavra;
		switch(numeroDoJogo){
		case '1':
		palavra= readTextFile("./palavras.txt",'1');
		break;
		case '2': 
		palavra= readTextFile("./palavras2.txt",'2');
		break;
		case '3':
		palavra= readTextFile("./palavras3.txt",'3');
		break;
		}
		palavraLimpa = limpaPalavra(palavra);
		palavraLimpaArray = palavraLimpa.split('');
		arrayLetras = getArrayLetras(palavraLimpa);
		exibeTeclado(); 
		exibeTentativas();
		exibePalavraPosicoes();  
		populaPosicoes(limpaPalavraAcentos(palavra).split(''));
		exibeStickman();
        exibeDica();
		exibirBotaoVoltar();
		updateStickman();
		reiniciaTimer();   
	}

	// Popula as posições das letras da palavra
	function populaPosicoes(palavraLimpaArray) {
		palavraContainer.innerHTML = '';
		palavraLimpaArray.forEach(function(letra, index) {
			if (letra === ' ') {
				var palavraEspaco = doc.createElement('span');
				palavraEspaco.setAttribute('class','posicao-espaco');
				palavraEspaco.innerHTML = '&nbsp;';
				palavraContainer.appendChild(palavraEspaco);
			} else if (letra === '-') {
				var palavraHifen = doc.createElement('span');
				palavraHifen.setAttribute('class','posicao-hifen');
				palavraHifen.innerHTML = '-';
				palavraContainer.appendChild(palavraHifen);
			} else {
				quantidadeLetras ++;
				var letraInput = doc.createElement('input');
				letraInput.setAttribute('type','text');
				letraInput.setAttribute('data-letra-value', letra);
				letraInput.setAttribute('maxlength','1');
				letraInput.setAttribute('disabled','disabled');
				letraInput.setAttribute('class','posicao-letra');
				palavraContainer.appendChild(letraInput);
			}
		});
	}
	function readTextFile(file,numeroDoJogo)
{
	var allText,retorno;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
				retorno=splitString(allText, "\n",numeroDoJogo);
            }
        }
    }
	
    rawFile.send(null);
	return retorno;
}

function criarVideo(endereco){
	//removerVideo();
	//criar elemento source
	var source = document.getElementById('source');
	//setar atributo src no source
	imgDica.pause();
	source.setAttribute('src', endereco);
	source.setAttribute('type','video/mp4');
	source.setAttribute('id','source');
	imgDica.load();
}
function removerVideo(){
var source = document.getElementById('source');
imgDica.removeChild(source);
}

function splitString(stringToSplit, separator, numeroDoJogo) {
  var arrayOfStrings = stringToSplit.split(separator);

  console.log('A string original é: "' + stringToSplit + '"');
  console.log('O separador é: "' + separator + '"');
  console.log('O array tem ' + arrayOfStrings.length + ' elementos: ' + arrayOfStrings.join(' / '));
  var min=0; 
  var max=arrayOfStrings.length;  
  console.log(max);
  var random = Math.floor(Math.random() * (+max - +min)) + +min;
  //var dica = arraysOfStrings.split('@');
  //document.getElementById("dicaimg").src = "imagens/2.jpg";
   switch(numeroDoJogo){
	case '1':
	//imagens A1,A2,...,An
	criarVideo('imagens/A'+(random+1)+'.mp4');
	break;
	case '2':
	criarVideo('imagens/C'+(random+1)+'.mp4');
	break;
	case '3':
	criarVideo('imagens/F'+(random+1)+'.mp4');
	break;
  }
  return arrayOfStrings[random];
}
	exibeEscolhaPalavra();
}(window, document));
