const endDate = new Date("December 8, 2022 UTC-6")
let previousTimeBetweenDates
setInterval(() => {
  const currentDate = new Date()
  const timeBetweenDates = Math.ceil((endDate - currentDate) / 1000)
  if (previousTimeBetweenDates !== timeBetweenDates) {
    flipAllCards(timeBetweenDates)
  }

  previousTimeBetweenDates = timeBetweenDates
}, 250)

function flipAllCards(time) {
  var audio = new Audio('FinalCountdown.mp3#t=00:01:58');
  if (time == 0) {
   audio.addEventListener("canplaythrough", () => {
   audio.play().catch(e => {
      window.addEventListener('click', () => {
         audio.play()
      }, { once: true })
   })
});
  }
  if (time < 0) return
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
