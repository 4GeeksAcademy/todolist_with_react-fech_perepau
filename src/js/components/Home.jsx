import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	const [data, setData] = useState([])
	const [task, setTask] = useState("")



	useEffect(() => {
		getTodos()

	}, []);

	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/carrasco', {
			method: 'POST'
		})
			.then(resp => {
				if (!resp.ok) throw new Error(`error code: ${resp.status}`)
				return resp.json()
			})
			.then(data => getTodos())
			.catch(err => console.log(err))

	}

	const getTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/carrasco')
			.then(resp => {
				if (!resp.ok) throw new Error(`error code: ${resp.status}`)
				return resp.json()
			})
			.then(data => setData(data))
			.catch(err => createUser())
	}


	const handleSubmit = e => {
		e.preventDefault()
		fetch('https://playground.4geeks.com/todo/todos/carrasco', {
			method: 'POST',
			body: JSON.stringify({
				label: task, is_done: false
			}),
			headers: {
				'content-Type': 'application/json'
			}
		})
			.then(resp => {
				if (!resp.ok) throw new Error(`error code: ${resp.status}`)
				return resp.json()
			})
			.then(data => {
				setTask("")
				getTodos()
			})
			.catch(err => console.log(err))

	}

	const handleDelete = (id) => {
		console.log(id)
		fetch('https://playground.4geeks.com/todo/todos/' + id, {
			method: 'DELETE',
		})
			.then(data => {
				getTodos()
			})

	}

	return (
		<div className="container mt-5">
			<h1 className="text-center mb-4">
				My todo list!!!
			</h1>
				<form className="d-flex mb-3  justify-content-center align-items-center" onSubmit={handleSubmit}>
					<input type="text" className="form-control me-2 text-center" placeholder="Que tarea necesitas hacer?" value={task} onChange={e => setTask(e.target.value)} />
					<button type="submit" className="btn btn-primary">Añadir!</button>
				</form>
				<ul className="list-group">
					{data.todos?.map(el=> (
						<li className="d-flex list-group-item justify-content-between align-items-center" key={el.id}
						>
							{el.label}
							<button className="btn btn-sm btn-outline-danger" onClick={() =>handleDelete (el.id)}>
								&times;
							</button>

						</li>
					))}

				</ul>
		</div>
	)



};

export default Home;