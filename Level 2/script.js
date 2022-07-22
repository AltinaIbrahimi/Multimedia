const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var count = 0;
var countMatch = 0;
var countStreak = 0;
var streakMax = 0;
var z = 0;



function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    checkForMatch();
}


function checkForMatch() {


    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    count++;


    if (isMatch) {
        disableCards();
        countMatch++;
        countStreak++;
        if (countStreak != 0) {
            streakMax = countStreak;
        }

        var audio = new Audio('correct.mp3');
        audio.play();

        if (countMatch == 6) {
            createDiv();
        }



    } else {
        unflipCards();
        var audio = new Audio('wrong.mp3');
        audio.play();
        countStreak = 0;




    }

    document.getElementById("attemps").innerHTML = count;
    document.getElementById("streak").innerHTML = countStreak;
    




    var point = document.getElementById("points").innerHTML;

    z = parseInt(600 / count);
    if (z < 100) {
        document.getElementById("points").innerHTML = z;
    }

}

function createDiv() {
    document.getElementById("levelCopmlete").innerHTML = "Level Complete <br> " + "POINTS :" + z + "<br> Streak : " + streakMax;

    document.getElementById("test").style.width = "100%";
    document.getElementById("test").style.height = "750px";



}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function showHideDiv(ele) {
    var srcElement = document.getElementById(ele);
    if (srcElement != null) {
        if (srcElement.style.display == "block") {
            srcElement.style.display = 'none';
        } else {
            srcElement.style.display = 'block';
            document.getElementById("divMsg").style.marginBottom = "-60px";

        }
        return false;
    }
}
var audio = new Audio('music.mp3');
function onoff(){

    var sound = document.getElementById("red");
    
    if(sound.style.display != "none"){
        
        audio.play();
        document.getElementById("red").style.display = 'none';
    }
    else{
        audio.pause();
        document.getElementById("red").style.display = 'flex';
    }
    

}
var object={
			username:"",
			logIn:true,


		}
var vm = new Vue({
			el:'#login',
			data:object,
			methods:{
				login:function () {
					object.logIn= false;
				},
				logout:function () {
					object.logIn= true;
				}
				

			}

});