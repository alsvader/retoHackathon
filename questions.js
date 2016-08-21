var formulario = document.getElementById('formQuestion');
var btn = document.getElementById('addQuestion');
var btnSubmit = document.getElementById('btnSubmit');
var cadenaPreguntas = [" ¿En cuánto tiempo estimas alcanzar el punto de equilibrio?", " Para comercializar, ¿cuál será el canal de ventas principal?", "¿Existen sustitutos (competidores indirectos) a tu producto o servicio?", " ¿En cuánto tiempo estarías vendiendo con una inversión de un millón de dólares?"];
var preguntas = [];

generateQuestions();

btn.addEventListener("click", function (event) {
	
	var descr = document.getElementById('descr').value;

	if (descr !== "")
	{		
		pregunta = new Pregunta(descr);
		generateNode(pregunta);
		console.log(preguntas);
	}
	else 
	{
		alert("Debe escribir una descripción de la pregunta");
	}
	event.preventDefault();
});

btnSubmit.addEventListener("click", function (event) 
{
	
	for(var i = 0; i < preguntas.length; i++)
	{	
		preguntas[i].respuesta = document.getElementById(preguntas[i].id).value;
	}

	console.log(preguntas);
	alert("Guardado");

	event.preventDefault();
});

function generateQuestions()
{
	for(var i = 0; i < cadenaPreguntas.length; i++) {
		pregunta = new Pregunta(cadenaPreguntas[i]);
		generateNode(pregunta);
	}
}

function generateNode(pregunta)
{	
	var label = document.createElement("label");
	var input = document.createElement("textarea");
	input.className = 'form-control';
	var link 	=	document.createElement("a");

	link.href = "#!";
	link.innerHTML = "x";
	link.className = "delete";
	link.className += " btn";
	link.className += " btn-danger";
	link.addEventListener("click", deleteQuestion);

	var aux = parseInt(preguntas.length) + 1;
	input.id  = "p" + aux;
	input.name = "p" + aux;
	label.id = "label" + input.name;
	label.innerHTML = pregunta.pregunta + ":";
	link.dataset.id = input.id;	
	link.id = "link" + input.id;

	pregunta.id = input.id;

	formulario.appendChild(link);
	formulario.appendChild(label);
	formulario.appendChild(input);
	
	preguntas.push(pregunta);
	console.log(preguntas);
}

function deleteQuestion()
{	
	var input = document.getElementById(this.dataset.id);
	var label = document.getElementById("label" + this.dataset.id);
	var link 	=	document.getElementById("link" + input.id);
	formulario.removeChild(input);
	formulario.removeChild(label);
	formulario.removeChild(link);
	
	console.log(preguntas);
	var key = findById(input.id);
	console.log('key: ' + key);
	preguntas.splice(key, key + 1);
	console.log(preguntas);

	this.preventDefault;
}

function Pregunta(pregunta)
{
	this.id,
	this.pregunta = pregunta,
	this.respuesta
}

function findById(id)
{
	for(var i = 0; i < preguntas.length; i++)
	{
		if (preguntas[i].id === id)
		{
			return i;
		}
	}
	throw "Couldn't find object with id: " + id;
};