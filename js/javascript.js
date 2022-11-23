let alumnos = [];


const pintarAlumnos = (nombre, materia, calificacion1, calificacion2, calificacion3, calificacion4) => {
	let cal1 = Number(calificacion1);
	let cal2 = Number(calificacion2);
	let cal3 = Number(calificacion3);
	let cal4 = Number(calificacion4);
	let promedio =  Number (cal1 + cal2 + cal3 + cal4) / 4;
	let aprobado = false;
	
	//Esta es la funcion que nos dice si paso con mas de 6 o no
	promedio >= 6 ? aprobado = true : aprobado = false;

	//Esta es la seccion que hace visible los datos ingresados y nos muestra si esta aprobado o no
	document.querySelector('#lista').innerHTML += `
		<tr>
			<td class="tabla__td">${nombre}</td>
			<td class="tabla__td">${materia}</td>
			<td class="tabla__td">${promedio}</td>
			<td class="tabla__td ${aprobado ? 'aprobado' : 'reprobado'}">${aprobado ? 'aprobado' : 'reprobado'}</td>
		</tr>
	`
}

alumnos.map(({nombre, materia, calificacion1, calificacion2, calificacion3, calificacion4}) => {
	pintarAlumnos(nombre, materia, calificacion1, calificacion2, calificacion3, calificacion4)
});

//En esta seccion con el evento que nos permite tomar la informacion suministrada por el usuario 
document.querySelector('#formulario').addEventListener('submit', e => {
	e.preventDefault();

	const inputNombre = document.querySelector('#nombre');
	const inputMateria = document.querySelector('#materia');
	const inputCalificacion1 = document.querySelector('#calificacion1');
	const inputCalificacion2 = document.querySelector('#calificacion2');
	const inputCalificacion3 = document.querySelector('#calificacion3');
	const inputCalificacion4 = document.querySelector('#calificacion4');

	let nombre = inputNombre.value;
	let materia = inputMateria.value;
	let calificacion1 = Number(inputCalificacion1.value);
	let calificacion2 = Number(inputCalificacion2.value);
	let calificacion3 = Number(inputCalificacion3.value);
	let calificacion4 = Number(inputCalificacion4.value);

	inputNombre.value = "";
	inputMateria.value = "";
	inputCalificacion1.value = "";
	inputCalificacion2.value = "";
	inputCalificacion3.value = "";
	inputCalificacion4.value = "";

	pintarAlumnos(nombre, materia, calificacion1, calificacion2, calificacion3, calificacion4);
})

//Esta funcion es agreda desde la libreria solamente para decirnos que se a agregado un alumno
let btn_tostify = document.querySelector('#formulario').addEventListener('submit', e => {
	e.preventDefault();

	Toastify({ 
		text: "Alumno agregado",
		duration: 2000,
		style:{
			fontsize:"80px",
			fontFamily:"Verdana",
			color:"silver",
			background:"blue"
		}

		}).showToast(); 


})

//Esta seccion nos permite llamar desde el json 2 grupos de alumnos guardados
const datos = async (grupo) => {
	const respuesta = await fetch ('js/lista.json');
	const data = await respuesta.json();

	document.querySelector('#lista').innerHTML="";

	data[grupo].map(({nombre, materia, calificacion1, calificacion2, calificacion3, calificacion4}) => {
		pintarAlumnos(nombre, materia, calificacion1, calificacion2, calificacion3, calificacion4)
	});
}