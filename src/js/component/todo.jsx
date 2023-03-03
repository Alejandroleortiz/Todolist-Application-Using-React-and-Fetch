import React, { useEffect, useState } from "react";
import { TiDelete } from 'react-icons/ti';


const Todo = () => {



	useEffect(() => {
		getTodo();
	}, [])


	const getTodo = () => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/alejandroleortiz";
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			//body: JSON.stringify(data),
		}
		fetch(url, options)
			.then(respuesta => {
				if (respuesta.status >= 200 && respuesta.status < 300) {
					console.log("La peticion se hizo correctamente");
					return respuesta.json();
				} else {
					console.log(`hubo un error en ${respuesta.status}`);
				};
			})
			.then(data => {
				console.log("Este es el body del request", data);
				setTodos(data); // guardar en el estado
			})
			.catch((error) => {
				console.log(error);
			});
	}




	const [text, setText] = useState("") // Definir el useState para el imput
	const [todos, setTodos] = useState([])           // Definir el Usestate para generar los li

	const generateTodo = (e) => { //evento para generar los todo
		e.preventDefault();       //Funcion para prevenir que se recargue la pagina
		// setTodos([...todos, text]); // Desplegamos o concatenamos otra forma seria setTodos(todos.concat([text]))
		// setText(""); // Se genera el nuevo string dentro del array
		let todo = { label: text, done: false }
		if (text !== '') addTodo([...todos, todo]);
	}

	const addTodo = async (newList) => {
		const url = "https://assets.breatheco.de/apis/fake/todos/user/alejandroleortiz";
		const options = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newList),
		}

		try {
			const reponse = await fetch(url, options)
			const data = await reponse.json();
			console.log("newList guardado");
			console.log(data);

			if (data.result) {
				// setTodos((prevState)=>[...prevState, newList])
				setTodos(newList);
				setText('')
			}


		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<div className="container col-5">
				<h1 className="text-center">todos</h1>
				<ul className="p-0 mb-0">
					<li className="border">
						<form onSubmit={generateTodo}>
							<input
								value={text}
								onChange={(event) => setText(event.target.value)}
								type="text"
								placeholder="What do you need to do?"
							/>
						</form>
					</li>
					{todos.map((t, i) =>
					(<li className="border" key={i}>

						<div className="d-flex justify-content-between">
							<span>{t.label}</span>
							<TiDelete className="iconColor" onClick={() => {
								addTodo(todos.filter((t, currentIndex) => i !== currentIndex))
								setTodos(todos.filter((t, currentIndex) => i !== currentIndex))
							}} />
						</div>
					</li>)
					)}
				</ul>
				<div>{todos.length} item{todos.length === 1 ? '' : 's'} left</div>
				<button type="button" className="btn btn-success my-3" onClick={() => {
								addTodo([])
								setTodos([])
							}}>Clear All</button>
			</div>
		</>
	);
};

export default Todo;

// <div>{todos.length} item{todos.length === 1 ? '' : 's'} left</div> agregamos una "s" en la palabra item cuando tengamos mas de un todo