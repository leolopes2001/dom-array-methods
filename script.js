const add_user = document.getElementById('add-user')
const main = document.getElementById('main')
const double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const wealthCalc = document.getElementById('calculate-wealth')

let users = []

function updateScreen(){

  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`

  users.forEach(user =>{
    const div = document.createElement('div')

    div.innerHTML = `<strong>${user.name}</strong>${formartNumber(user.money)}`
    div.classList.add('person')

    main.appendChild(div)
  })
}

function addUserInArray(obj){
  users.push(obj)

  updateScreen()
}

async function addUser() {
  await fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => {

     const newUser = {
        name: data.results[0].name.first,
        money: +(Math.random() * (10000 - 1000) + 1000).toFixed(2)
      }
    
      addUserInArray(newUser)
    })

    


}

function doubleMoney(){

  const newArray = users.map(user =>{
    const newUser= {
      name: user.name,
      money: user.money * 2
    }

    return newUser
  })

  users = [...newArray]
  updateScreen()
  
}

function showOnlyMili(){
  const newArray = users.filter(user => user.money > 100000)

  users = [...newArray]

  updateScreen()
}

function order_of_wealth(){
  users.sort((a,b) =>{
    if( a.money > b.money){
      return -1
    } else {
      return 1
    }

  })

  updateScreen()
}

function entire_wealth(){
  const total = users.reduce((acc, {money}) => acc + money,0)
  

  const h3 = document.createElement('h3')

  h3.innerHTML = `<strong>Total Wealth</strong>${formartNumber(total)}`

  main.appendChild(h3)

}

function formartNumber(number){
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


add_user.addEventListener('click', addUser)
double.addEventListener('click', doubleMoney)
showMillionaires.addEventListener('click', showOnlyMili)
sort.addEventListener('click', order_of_wealth)
wealthCalc.addEventListener('click', entire_wealth)


