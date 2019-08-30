const apiKey = '403452aaf2cc481286179303f4837ac7'

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

//removes all list items when submit button is clicked
let listItems = document.getElementById("recipe-list");
function removeElement() {
	if ( listItems != null) {
		var ul = document.getElementById("recipe-list");
		while(ul.firstChild) ul.removeChild(ul.firstChild);
	}
}

const ul = document.getElementById('recipe-list');
const stepList = document.getElementById('recipe-step-list');
const loginForm = document.getElementById('login-form')
const titleImage = document.getElementById('title-image')

loginForm.addEventListener('submit', evt => {
	evt.preventDefault();
	removeElement();
	const query = loginForm.querySelector('input[type="text"]').value;

    fetch(`https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${query}`)
        .then(response => response.json())
        .then(data => {
			console.log(data)
			let recipesItems = data.results;
				return recipesItems.forEach(function(item) {
					let li = createNode('li'),
						h2Title = createNode('h2');
						pReadyIn = createNode('p');
						pServings = createNode('p');
						img = createNode('img'),
						a = createNode('a'),
					img.src = `https://spoonacular.com/recipeImages/${item.image}`;
					a.href = `/?id=${item.id}`
					h2Title.innerHTML = item.title;
					pReadyIn.innerHTML = `Ready in Minutes: ${item.readyInMinutes}`
					pServings.innerHTML = `Number of Servings: ${item.servings}`
					append(li, h2Title);
					append(li, pReadyIn);
					append(li, pServings);
					append(a , img)
					append(li, a);
					append(ul, li);
				})
			});
		loginForm.querySelector('input[type="text"]').value = '';
		});


//checking query string for parameters then using them in next API call
let urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('id')) {
	document.getElementById("login-form").style.display = "none";
	document.getElementById("main-container").style.margin= 0;
	let h2Ingredients = document.querySelector("#list-container h2")
	h2Ingredients.style.display='block'
	const itemId = urlParams.get('id');
	fetch(`https://api.spoonacular.com/recipes/${itemId}/ingredientWidget.json?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
			console.log(data)
			let ingredientsList = data.ingredients;

			return ingredientsList.forEach(function(item) {
				let li = createNode('li'),
					h4Name = createNode('h3'),
					spanAmount = createNode('span');
				h4Name.innerHTML = `${item.name}`;
				spanAmount.innerHTML = `: ${item.amount.us.value} ${item.amount.us.unit}`;
				append(li, h4Name);
				append(h4Name, spanAmount);
				append(ul, li);
			})
		})
	}
if (urlParams.has('id')) {
	const itemId = urlParams.get('id');
	fetch(`https://api.spoonacular.com/recipes/${itemId}/analyzedInstructions?apiKey=${apiKey}`)
		.then(response => response.json())
		.then(data => {
			console.log(data)
			let stepData = data[0].steps;

			return stepData.forEach(function(item) {
				let li = createNode('li'),
					h2StepNumber = createNode('h2'),
					pStepInstructions = createNode('p');
				h2StepNumber.innerHTML = `Step: ${item.number}`;
				pStepInstructions.innerHTML = `${item.step}`;
				append(li, h2StepNumber);
				append(li, pStepInstructions);
				append(stepList, li);
			})
		})
	}
if (urlParams.has('id')) {
	const itemId = urlParams.get('id');
	fetch(`https://api.spoonacular.com/recipes/${itemId}/information?apiKey=${apiKey}`)
		.then(response => response.json())
		.then(data => {
			console.log(data.image)
				let li = createNode('li'),
					h1Title = createNode('h1'),
					img = createNode('img');
				h1Title.innerHTML = `${data.title}`;
				img.src = `${data.image}`;
				append(li, h1Title);
				append(li, img);
				append(titleImage, li);
			})
		}