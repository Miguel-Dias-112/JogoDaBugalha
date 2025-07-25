export function easterEggKnop () {
    const igorAparecer = (Math.floor(Math.random() * 10) + 1)
    // if(igorAparecer>1){
    //     return;
    // }
    const resultadoCtn = document.querySelector('.resultados')
    let resultado = document.querySelector('.resultado')
    setTimeout(() => {
        resultadoCtn.style.visibility="visible"
        resultadoCtn.style.backgroundColor="black"
        resultado.textContent = "Igor Knop Voador quer te reprovar \n Derrote-o!"

        var audio = new Audio('audio.mp3');
        audio.src= './assets/igorSong.mp3'
        audio.volume = 0.2;
        audio.play(); 
        
    },500)
    setTimeout(() => {
        resultadoCtn.style.visibility="hidden"
        resultado.textContent = ""
        
    },2000)
    setTimeout(() => {
        let igorVoador = document.createElement('img')
        igorVoador.src = "./assets/Igor_Knop_com_asa.webp"
        igorVoador.className= 'igorVoador'
        document.querySelector('#body').appendChild(igorVoador) 
        setInterval(()=>{
            let soltar_laser=  (Math.floor(Math.random() * 10) + 1) 
            if (soltar_laser==5){
                igorVoador.src="./assets/Igor_laser.webp"
                var audio = new Audio('audio.mp3');
                audio.src= './assets/igorBlast.mp3'
                audio.volume = 0.5;
                audio.play(); 
                setTimeout(()=>{igorVoador.src = "./assets/Igor_Knop_com_asa.webp"},500)
            }
        },500)
    },2500)
}