const endDate = new Date("October 15, 2022 21:10")
let previousTimeBetweenDates
setInterval(() => {
  const currentDate = new Date()
  const timeBetweenDates = Math.ceil((endDate - currentDate) / 1000)
  if (previousTimeBetweenDates !== timeBetweenDates) {
    flipAllCards(timeBetweenDates)
  }

  previousTimeBetweenDates = timeBetweenDates
}, 250)

/*
The function calculates the hundredths to ones of the input and
display then individually on each card
time: time calculated in seconds
*/
function flipAllCards(time) {
  var audio = new Audio('FinalCountdown.mp3#t=00:01:58');
  // What happens when timer hits 0
  if (time == 0) {
   document.getElementById('a').style.backgroundImage="url('chikapanik.gif')"; // change image
   document.getElementById('b').style.visibility = 'visible'; // show a hidden div saying "click me"
   // play audio on click
   audio.addEventListener("canplaythrough", () => {
   audio.play().catch(e => {
      window.addEventListener('click', () => {
         audio.play()
      }, { once: true })
   })
});
  }
  if (time < 0) return // stop timer from counting to negatives
  const seconds = time % 60
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600) % 24
  let days = Math.floor(time / 86400)
 flip(document.querySelector("[data-days-hundreds]"), Math.floor(days / 100))
 flip(document.querySelector("[data-days-tens]"), Math.floor(days / 10 % 10))
 flip(document.querySelector("[data-days-ones]"), days % 10)
 flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10))
 flip(document.querySelector("[data-hours-ones]"), hours % 10)
 flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10))
 flip(document.querySelector("[data-minutes-ones]"), minutes % 10)
 flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10))
 flip(document.querySelector("[data-seconds-ones]"), seconds % 10)


}


/*
The function is for animating the flipping of cards
*/
function flip(flipCard, newNumber) {
  const tophalf = flipCard.querySelector(".top")
  const startNumber = parseInt(tophalf.textContent)
  if (newNumber === startNumber) return

  const bottomhalf = flipCard.querySelector(".bottom")
  const topFlip = document.createElement("div")
  topFlip.classList.add("top-flip")
  const bottomFlip = document.createElement("div")
  bottomFlip.classList.add("bottom-flip")

  tophalf.textContent = startNumber
  bottomhalf.textContent = startNumber
  topFlip.textContent = startNumber
  bottomFlip.textContent = newNumber


  topFlip.addEventListener("animationstart", e => {
    tophalf.textContent = newNumber
  })
  topFlip.addEventListener("animationend", e => {
    topFlip.remove()
  })
  bottomFlip.addEventListener("animationend", e => {
    bottomhalf.textContent = newNumber
    bottomFlip.remove()
  })
  flipCard.append(topFlip, bottomFlip)
}
