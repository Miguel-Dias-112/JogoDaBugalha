import { atualizarTela, brilharRepetido, mostrarResultado, pisca} from "./Tela.js"
import { easterEggKnop } from "./EasterEgg.js"

export function criaJogo(player1, player2) {
    return {
        player: player1,
        bot: player2,
        fimJogo:false,
        start: function () {
            
            this.player.rolarDado()
            this.bot.rolarDado()
            this.fimJogo = false
            easterEggKnop()
            atualizarTela(this.player)
            atualizarTela(this.bot)
        },
        deletaColuna: function (colunaJogada, quemDeletar) {
            const tabuleiro = this.player.tabuleiro
            const tabuleiro2 = this.bot.tabuleiro
            const tamanho = tabuleiro.length
            function pegarNumRepetido() {
                let repetido = 0
                for (let x = 0; x < tamanho; x++) {
                    for (let y = 0; y < tamanho; y++) {
                        const casa1 = tabuleiro[x][colunaJogada];
                        const casa2 = tabuleiro2[y][colunaJogada];
                        if (casa1 == casa2 && casa1 != 0 && casa2 != 0) {
                            repetido = casa1
                        }
                    }
                }
                return repetido
            }
            function apagarRepetidos(repetido) {
                for (let y = 0; y < tamanho; y++) {
                    const casa = quemDeletar.tabuleiro[y][colunaJogada];
                    
                    if (casa == repetido && casa != 0) {
                        pisca(quemDeletar, repetido, colunaJogada)
                        
                        quemDeletar.tabuleiro[y][colunaJogada] = 0
                    }
                }
            }
            let repetido = pegarNumRepetido()
            apagarRepetidos(repetido)
            
            quemDeletar.calcularColunas()
            quemDeletar.calcularPontoTotal()
        },
        checaVitoria: function () {
            const tabPlayer = this.player.tabuleiro
            const tabBot = this.bot.tabuleiro
            
            function checa_tabuleiro(tabuleiro) {
                const tamanho = tabuleiro.length
                let fim_de_jogo = true
                for (let x = 0; x < tamanho; x++) {
                    for (let y = 0; y < tamanho; y++) {
                        if (tabuleiro[x][y] == 0) {
                            fim_de_jogo = false
                        }
                        
                    }
                }
                return fim_de_jogo;
            }
            const resultadoTabuleiros = [checa_tabuleiro(tabPlayer), checa_tabuleiro(tabBot)]
            const acabou = resultadoTabuleiros[0] || resultadoTabuleiros[1]
            if (acabou == true) {
                this.fimJogo = true
                if (player1.pontoTotal > player2.pontoTotal) {
                    player1.status = 'ganhou'
                } else if (player1.pontoTotal < player2.pontoTotal) {
                    player1.status = 'perdeu'
                } else {
                    player1.status = 'empate'
                }
                mostrarResultado(this.player,this.bot)
                
            }
            return acabou;
        },
        cicloJogo: function (x, y) {
            if(this.fimJogo == true){return} 
            this.player.posicionarDado(x, y)
            this.deletaColuna(y, this.bot)
            this.player.rolarDado()

            let botPos = this.bot.fazerJogada()
            this.bot.rolarDado()
            this.deletaColuna(botPos[1], this.player)
            
            atualizarTela(this.player)
            atualizarTela(this.bot) 
            brilharRepetido()
            this.checaVitoria()
        },
        pegarPosicoes: function (e) {
            const tabuleiro = document.querySelector('#tab_player')
            const rows = tabuleiro.children
            const tamanhox = rows.length
            let posx =0
            let posy = -1
            for (let x = 0; x < tamanhox; x++) {
                const collum = rows[x].children
                const tamanhoy = collum.length
                for (let y = 0; y < tamanhoy; y++) {
                    const tipo = collum[y].tagName 
                    const elemento = collum[y];
                    if(tipo =="TD" && posy+1<=3){
                        posy++
                    }
                    if(tipo =="TD" && posy+1>3){
                        posy=0
                        posx++
                    }
                    if (e.target == elemento) {
                        const posição = this.player.tabuleiro[posx][posy]
                        if (posição==0) {
                            this.cicloJogo(posx, posy)
                        }
                    }
                }
            }
        }
    }
}
