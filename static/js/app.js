const apiKey = '403452aaf2cc481286179303f4837ac7'

const ul = document.getElementById('recipe-list');
const stepList = document.getElementById('recipe-step-list');
const loginForm = document.getElementById('login-form')
const titleImage = document.getElementById('title-image')
const mainContainer = document.getElementById('main-container')
let urlParams = new URLSearchParams(window.location.search);

//helper function to create element
function createNode(element) {
    return document.createElement(element);
}

//helper function to tie parent to child element
function append(parent, el) {
    return parent.appendChild(el);
}

//removes all list items when submit button is clicked
let listItems = document.getElementById("recipe-list");
removeElement = () => {
	if ( listItems != null) {
		var ul = document.getElementById("recipe-list");
		while(ul.firstChild) ul.removeChild(ul.firstChild);
	}
}

//displays hidden elements when user gets to the ?id= page
displayElements = () => {
	let h2Ingredients = document.querySelector("#list-container h2");
	h2Ingredients.style.display='block';
	let backBtn = document.getElementById('back-btn');
	backBtn.style.display='block';
}

//sets a back button location dynamically based on previous search results
backBtnLocation = () => {
		const queryValue = urlParams.get('query');
		return location.href = `/?query=${queryValue}`;
}

//Calls the API to get a list of recipes based on query results
getListofRecipes = (query) => {
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
					a.href = `/?id=${item.id}&query=${query}`
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
}

//main search page submit event listener
loginForm.addEventListener('submit', evt => {
	evt.preventDefault();
	removeElement();
	const query = loginForm.querySelector('input[type="text"]').value;
	location.href = `/?query=${query}`
	getListofRecipes(query);
		});

//when user hits back button main page search results
if (urlParams.has('query') == true && urlParams.has('id') == false) {
	const query = urlParams.get('query');
	getListofRecipes(query);
}

//gets the title and image and adds it to the DOM
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

//gets a list of ingredients and adds them to the DOM
if (urlParams.has('id')) {
	document.getElementById("login-form").style.display = "none";
	document.getElementById("main-container").style.margin= 0;
	const itemId = urlParams.get('id');
	displayElements();
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

//gets a list steps and adds them to the DOM
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


