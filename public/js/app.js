const weatherData = document.querySelector('form')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')

weatherData.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = document.getElementById('input').value

  fetch(window.location.href + `weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if(data.error) {
        console.log(data)
        messageOne.innerHTML = data.error
        messageTwo.innerHTML = ''
      }else {
        console.log(data)
        messageOne.innerHTML = data.location
        messageTwo.innerHTML = data.forecast
      }
    })
  })
})