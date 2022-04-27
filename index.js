async function scraping() {
	const input = document.getElementById("search").value;
	const search = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
	const lang = document.getElementById('lang').value;
	console.log(search); 
	if (search === "") {
		document.getElementById("message").innerHTML = "Champ vide";
		return;
	}
	document.getElementById("message").innerHTML = "Recherche en cours...";
	const responseJSON = await fetch(`http://localhost:3000/api/scraping/${search}/${lang}`);
	const response = await responseJSON.json();
	console.log(response);
	const articles = response.listUrls;
	console.log(articles);
	document.getElementById("subject").innerHTML = "Recherche sur : " + search;
	listDisplay(articles, true);
	// addButton(search);
}

function listDisplay(articles, scraping) {
	document.getElementById("message").innerHTML = "";
	if (articles.length === 0) {
		document.getElementById("message").innerHTML = "0 résultat";
		return;
	}
	let list = document.querySelector("#listUrls");
	list.innerHTML = '';
	let index = 1;
	articles.forEach(article => {
		

		const div = document.createElement("a");
		div.href = article.url;
		div.target = "_blank";
		const number = document.createElement("p");
		number.innerHTML = index;
		number.className = "number";
		const title = document.createElement("p");
		title.innerHTML = `${article.title}`;
		title.className = "title-article"
		
		const date = document.createElement("p");
		const textDate = document.createTextNode(`${article.site} - ${article.date}`);
		date.appendChild(textDate);
		
		
		// const response = document.createElement("span");
		
		// const button = document.createElement("button");
		// if (scraping) {
		// 	button.innerHTML = "Enregistrer";
		// 	button.onclick = () => {
		// 		console.log(article);
		// 		addArticle(article, article.id);
		// 	}
		// } else {
		// 	button.innerHTML = "Supprimer";
		// 	button.className = "del-button"
		// 	button.onclick = () => {
		// 		console.log(article._id);
		// 		delArticle(article._id);
		// 	}
		// }
		// const div = document.createElement("div");
		// div.id = scraping ? ("response" + article.id) : article._id;
		// div.appendChild(button);
		// div.append(response);
		const element = document.createElement("li");
		element.className = "article";
		element.appendChild(number);
		element.appendChild(title);
		element.appendChild(date);
		
		
		div.appendChild(element);
		
		// element.appendChild(div);

		list.appendChild(div);
		index++;
	});

}

function display(nbSkills, idSkill) {
	console.log(nbSkills);
	console.log(idSkill);
	document.getElementById("hidden-block").style.display = "none";
	for (let i=1; i<nbSkills+1; i++) {
		document.getElementById(i).style.display = "none";
		document.querySelector(`#button${i}`).style.backgroundColor = "rgb(104, 177, 211)"
		
	}
	console.log(document.querySelector(`#button${idSkill}`))
	document.querySelector(`#button${idSkill}`).style.backgroundColor = "#4a4a8e"
	document.getElementById(idSkill).style.display = "block";
}

// async function addArticle(article, index) {
// 	const response = await fetch("http://82.165.68.245:3000/api/article/", { 
// 		method: "POST",
// 		headers: {
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		}, 
// 		body: JSON.stringify(article)
// 	});
// 	console.log(response.status);
// 	if (response.status === 200) {
// 		document.querySelector(`#response${index} span`).innerHTML = "Ajouté à la base de données";
// 		document.querySelector(`#response${index} span`).style.color = "#03794d"; 
// 		document.querySelector(`#response${index} button`).disabled = true; 
// 		document.querySelector(`#response${index} button`).className = "success";
// 	} else if (response.status === 201) {
// 		document.querySelector(`#response${index} span`).innerHTML = "Déjà dans la base de données";
// 		document.querySelector(`#response${index} button`).disabled = true;
// 		document.querySelector(`#response${index} button`).className = "done";
// 	}
// }

// async function getArticles() {
// 	const response = await fetch("http://82.165.68.245:3000/api/article");
// 	const articles = await response.json();
// 	console.log(articles);
// 	listDisplay(articles, false);
// }

// async function delArticle(id) {
// 	const response = await fetch(`http://82.165.68.245:3000/api/article/${id}`, { 
// 		method: "DELETE",
// 		headers: {
// 			'Content-Type':'application/json',
// 		}
// 	});
// 	console.log(response);
// 	if (response.status === 200) {
// 		const block = document.getElementById(id).parentElement;
// 		block.parentElement.removeChild(block) 
// 	}
// }

// async function addButton(search) {
// 	const response = await fetch(`http://82.165.68.245:3000/api/subject/${search}`);
	
// 	if (document.getElementById("button-subject") !== null) {
// 		document.getElementById("button-subject").parentElement.removeChild(document.getElementById("button-subject"));
// 	}
// 	const input = document.createElement("input");
// 	input.type = 'button';
// 	input.id = "button-subject"
// 	console.log(response.status);
// 	if (response.status === 200) {
// 		input.value = `Créer un bouton raccourci "${search}"`;
// 		input.onclick = async () => {
// 			const response = await fetch("http://82.165.68.245:3000/api/subject/", { 
// 				method: "POST",
// 				headers: {
// 					'Accept': 'application/json',
// 					'Content-Type': 'application/json'
// 				}, 
// 				body: JSON.stringify({ subject: search })
// 			});
// 			if (response.status === 200) {
// 				document.getElementById("button-subject").disabled = true;
// 				document.getElementById("message").innerHTML = "Bouton ajouté !";
				
// 				const button = document.createElement("button");
// 				button.id = `button-${search}-subject`
// 				button.innerHTML = `${search}`;
// 				button.onclick = () => {
// 					scrapingOneSubject(search);
// 				}
// 				document.getElementById("tag").appendChild(button);

// 			} else if (response.status === 201) {
// 				document.getElementById("button-subject").disabled = true;
// 				document.getElementById("message").innerHTML = "Bouton déjà présent !";
// 			}
// 		}	
// 	} else if (response.status === 201) {
// 		input.value = `Supprimer le bouton raccourci "${search}"`;
// 		input.style.backgroundColor = '#e83232';
// 		input.onclick = async () => {
// 			const response = await fetch(`http://82.165.68.245:3000/api/subject/${search}`, { 
// 				method: "DELETE",
// 				headers: {
// 					'Content-Type':'application/json',
// 				}
// 			});
// 			console.log(response);
// 			if (response.status === 200) {
// 				console.log(search);
// 				const block = document.getElementById(`button-${search}-subject`);
// 				block.parentElement.removeChild(block);
// 				document.getElementById("button-subject").disabled = true;
// 			}
// 		}
// 	}
// 	const block = document.querySelector(".content form");
// 	block.appendChild(input);
// }

// async function getSubjects() {
// 	const response = await fetch('http://82.165.68.245:3000/api/subject');
// 	const subjects = await response.json();
// 	subjects.forEach(subject => {
// 		console.log(subject)
// 		const button = document.createElement("button");
// 		button.innerHTML = `${subject.name}`;
// 		button.id = `button-${subject.name}-subject`;
// 		button.onclick = () => {
// 			scrapingOneSubject(subject.name);
// 		};
// 		document.getElementById("tag").appendChild(button);
// 	})
// }

// async function scrapingOneSubject(subject) {
// 	document.getElementById("message").innerHTML = "Recherche en cours...";
// 	const lang = document.getElementById('lang').value;
// 	const responseJSON = await fetch(`http://82.165.68.245:3000/api/scraping/${subject}/${lang}`);
// 	const response = await responseJSON.json();
// 	console.log(response);
// 	const articles = response.listUrls;
// 	console.log(articles);
// 	document.getElementById("subject").innerHTML = subject;
// 	listDisplay(articles, true);
// 	addButton(subject);
// }

function displayVeille(id) {
	document.getElementById('1Veille').style.display = "none";
	document.getElementById('2Veille').style.display = "none";

	document.getElementById('button1Veille').style.backgroundColor = "rgb(122, 166, 187)";
	document.getElementById('button2Veille').style.backgroundColor = "rgb(122, 166, 187)";
	
	document.getElementById(id).style.display = "block";
	document.getElementById('button'+id).style.backgroundColor = "rgb(74, 74, 142)";
}

// window.onload = getSubjects;


function displayStage(id) {
	let block = document.getElementById(id);
	console.log(block.style.display)
	block.style.display = block.style.display === 'none' ? '' : 'none';
}