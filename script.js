const taskForm = document.querySelector('#formTask');
const taskTextArea = document.querySelector('#formTextarea');
const taskList = document.querySelector('.list__task');
const taskMark = document.querySelector('.task__mark');
const listStatus = document.querySelector('.list__status');
const listStatusItem = document.querySelector('.list__item');
const searchInput = document.querySelector('.header__input');

let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach(task => renderTask(task));
   checkEmptyList();
}

searchInput.addEventListener('input', searchTask);
listStatus.addEventListener('click', filterStatus);
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);
taskList.addEventListener('click', toggleMarked);

//TODO: Сделай удаление задач, а не classList.add('none')!
function searchTask(event) {
   if (!event.target.closest('.header__input')) return;
   const searchText = event.target.value.toLowerCase();
   const taskItems = taskList.querySelectorAll('li');
   taskItems.forEach(item => {
      const taskText = item.querySelector('span').textContent.toLowerCase();
      taskText.includes(searchText) ? item.classList.remove('none') : item.classList.add('none');
   });
}
//TODO: Что лучше: switch или if?
function filterStatus(event) {
   if (!event.target.closest('.list__item')) return;
   const listStatusItemAll = listStatus.querySelectorAll('.list__item');
   const parentNode = event.target.closest('.list__item');
   listStatusItemAll.forEach(item => item.classList.remove('list__item_active'));
   parentNode.classList.add('list__item_active');
   switch (event.target.dataset.filter) {
      case 'all':
         taskList.innerHTML = "";
         renderAllTasks();
         break;
      case 'active':
         taskList.innerHTML = "";
         renderActiveTasks();
         break;
      case 'done':
         taskList.innerHTML = "";
         renderDoneTasks();
         break;
   }
}
//TODO: Сделай рефакторинг renderAllTasks(), renderActiveTasks(), и renderDoneTasks() 
//TODO: Сделай удаление задач, а не classList.add('none')! 
function renderAllTasks() {
   if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      taskList.innerHTML = "";
      taskForm.classList.remove('none');
      tasks.forEach(task => renderTask(task));
   }
   checkEmptyList();
}
function renderActiveTasks() {
   if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      taskList.innerHTML = "";
      taskForm.classList.remove('none');
      tasks.filter(item => !item.done).forEach(task => renderTask(task));
   }
   checkEmptyList();
}
function renderDoneTasks() {
   if (localStorage.getItem('tasks')) {
      tasks = JSON.parse(localStorage.getItem('tasks'));
      taskList.innerHTML = "";
      taskForm.classList.add('none');
      tasks.filter(item => item.done).forEach(task => renderTask(task));
   }
   checkEmptyList();
}
function addTask(event) {
   event.preventDefault();
   let taskText = taskTextArea.value;

   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
      important: false,
   };
   tasks.push(newTask);
   checkEmptyList();
   saveToLocalStorage();
   renderTask(newTask);

   taskTextArea.value = "";
   taskTextArea.focus();
}
function deleteTask(event) {
   if (event.target.dataset.action !== 'delete') return;
   const parentNode = event.target.closest('.task__item');
   const idParentNode = Number(parentNode.id);
   tasks = tasks.filter(task => task.id !== idParentNode);
   checkEmptyList();
   saveToLocalStorage();
   parentNode.remove();
}
function doneTask(event) {
   if (!event.target.matches('.task__item')) return;
   const parentNode = event.target.closest('.task__item');
   const textTask = parentNode.querySelector('.task__text');
   const idParentNode = Number(parentNode.id);
   const taskStatus = tasks.find(task => task.id === idParentNode);
   taskStatus.done = !taskStatus.done;
   saveToLocalStorage();
   textTask.classList.toggle('task__text--done');
   parentNode.querySelector('.task__marked-icon').classList.toggle('task__text--done');
}
function toggleMarked(event) {
   if (event.target.dataset.action !== 'marked' && event.target.dataset.action !== 'unmarked') return;
   const parentNode = event.target.closest('.task__item');
   const idParentNode = Number(parentNode.id);
   const taskStatus = tasks.find(task => task.id === idParentNode);
   taskStatus.important = !taskStatus.important;
   saveToLocalStorage();
   const buttonMarked = parentNode.querySelector('.task__marked');
   const buttonUnmarked = parentNode.querySelector('.task__unmarked');
   buttonMarked.classList.toggle('none');
   buttonUnmarked.classList.toggle('none');
   parentNode.querySelector('.task__marked-icon').classList.toggle('hidden');
}
function saveToLocalStorage() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
//TODO: Сделать рефакторинг $cssClassVisibilityMarked и $cssClassVisibilityUnmarked
function renderTask(task) {
   const cssClassDoneStatus = task.done ? "task__text task__text--done" : "task__text";
   const cssClassDoneStatusImg = task.done ? "task__text--done" : "";
   const cssClassImportant = task.important ? "task__marked-icon" : "task__marked-icon hidden";
   const cssClassVisibilityMarked = task.important ? "task__marked none" : "task__marked";
   const cssClassVisibilityUnmarked = task.important ? "task__unmarked" : "task__unmarked none";
   let taskHTML = `<li id="${task.id}" class="task__item">
                     <img class="${cssClassImportant} ${cssClassDoneStatusImg}" src="./img/icons/star.svg" alt="mark-star icon">
                     <span class="${cssClassDoneStatus}">${task.text}</span>
                     <button class="${cssClassVisibilityUnmarked}" data-action="unmarked" href="#">Not important</button>
                     <button class="${cssClassVisibilityMarked}" data-action="marked" href="#">Mark important</button>
                     <button class="task__delete" data-action="delete" href="#"><img src="./img/icons/delete.svg" alt="Delete icon"></button>
                  </li>`;
   taskList.insertAdjacentHTML('beforeend', taskHTML);
}
function checkEmptyList() {
   const emptyListHTML = `<div class="empty-list__item"><span>Список задач пуст!</span></div>`;
   if (tasks.length === 0) {
      taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
   }
   if (tasks.length > 0) {
      const emptyElement = document.querySelector('.empty-list__item');
      emptyElement ? emptyElement.remove() : null;
   }
}