const flipCard = document.querySelector(".timer")
flip(flipCard)

function flip(flipCard) {
  const tophalf = flipCard.querySelector(".top")
  const bottomhalf = flipCard.querySelector(".bottom")
  const topFlip = document.createElement("div")
  topFlip.classList.add("top-flip")
  const bottomFlip = document.createElement("div")
  bottomFlip.classList.add("bottom-flip")
  const startNumber = parseInt(tophalf.textContent)

  tophalf.textContent = startNumber
  bottomhalf.textContent = startNumber
  topFlip.textContent = startNumber
  bottomFlip.textContent = startNumber - 1


  topFlip.addEventListener("animationstart", e => {
    tophalf.textContent = startNumber - 1
  })
  topFlip.addEventListener("animationend", e => {
    topFlip.remove()
  })
  bottomFlip.addEventListener("animationend", e => {
    bottomhalf.textContent = startNumber - 1
    bottomFlip.remove()
    flip(flipCard)
  })
  flipCard.append(topFlip, bottomFlip)
}
