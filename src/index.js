let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
.then((resp) => resp.json())
.then((toys) => {
  toys.forEach(toy => renderToy(toy))
})

function renderToy(toys){
  const toyCollection = document.createElement("div")
  toyCollection.className = "card"
  toyCollection.innerHTML = `
    <h2>${toys.name}</h2>
    <img src="${toys.image}" class="toy-avatar"/>
    <p id="p-toy">${toys.likes}</p>
    <button class="like-btn" id="button-${toys.id}">Like ❤️</button>
  `
  toyCollection.querySelector(`#button-${toys.id}`).addEventListener("click", () => {
    toys.likes++
    toyCollection.querySelector("#p-toy").textContent = toys.likes
     patchToy(toys)
  })
  document.querySelector("#toy-collection").appendChild(toyCollection);
}
document.querySelector(".add-toy-form").addEventListener('submit', handleSubmit)
function handleSubmit(e) {
  e.preventDefault()
  const newName = document.querySelector('form input[name="name"]')
  const newImg = document.querySelector('form input[name="image"]')
  let toy = {
    name: newName.value,
    image: newImg.value,
    likes: 0,
  }
  renderToy(toy)
  addNewToy(toy)
  e.target.reset()
}

function addNewToy(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  })
   .then((resp) => resp.json())
   .then((toy) => console.log(toy)) 
}

function patchToy(toys){
  fetch(`http://localhost:3000/toys/${toys.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toys)
  })
   .then((resp) => resp.json())
   .then((toy) => console.log(toy)) 
}