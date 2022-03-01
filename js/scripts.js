const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__button');
const pageList = document.querySelector('.page__list');
const clearAll = document.querySelector('#clear');
let todos = JSON.parse(localStorage.getItem('todo-list'));
let editId;
let isEditedTask = false;
clearAll.addEventListener('click', e => {
	e.preventDefault();
	todos = [];
	pageList.innerHTML = null;
})
function showTodo() {
	let li = '';
	if (todos) {
		todos.forEach((todo, i) => {
			li += `<li class="list__item item" id="${i}">
					<p>${todo.todo}</p>
					<button onclick="editTask('${todo.todo}', ${i})" class="item__button"><i class="bi bi-pencil-fill"></i></button>
					<button onclick="deleteTask(${i})" class="item__button"><i class="bi bi-trash-fill"></i></button>
				</li>`
		})
	}
	pageList.innerHTML = li
};
showTodo();
function editTask(taskTodo, taskId) {
	editId = taskId;
	isEditedTask = true;
	formInput.value = taskTodo;
}
function deleteTask(taskId) {
	todos.splice(taskId, 1);
	localStorage.setItem('todo-list', JSON.stringify(todos));
	showTodo();
}
formButton.addEventListener('click', e => {
	e.preventDefault();
	let task = formInput.value;
	if (task) {
		if (!isEditedTask) {
			if (!todos) {
				todos = [];
			}
			let todo = { todo: task };
			todos.push(todo);
		} else {
			isEditedTask = false;
			todos[editId].todo = task;
		}
		localStorage.setItem('todo-list', JSON.stringify(todos));
		showTodo();
	}
	formInput.value = null;
})
