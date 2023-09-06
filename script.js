const taskForm = document.querySelector('#formTask');
const taskTextArea = document.querySelector('#formTextarea');
const taskList = document.querySelector('.list__task')
const taskMark = document.querySelector('.task__mark')
const buttonMarked = document.querySelector('.task__marked')
const buttonUnmarked = document.querySelector('.task__unmarked')
const listStatus = document.querySelector('.list__status')
const listStatusItem = document.querySelector('.list__item')
const searchForm = document.querySelector('.header__search')
const searchInput = document.querySelector('.search__input')
const searchButton = document.querySelector('.search__button')

searchForm.addEventListener('submit', searchTask)
listStatus.addEventListener('click', filterStatus)
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask)
taskList.addEventListener('click', doneTask)
taskList.addEventListener('click', toggleMark)
taskList.addEventListener('mouseover', showMark)
taskList.addEventListener('mouseout', hideMark)

function searchTask(event) {
   if (!event.target.closest('.header__search')) return;
   event.preventDefault();
   const searchText = searchInput.value;
   /*
   const foundTask = taskList.forEach(task => { if (searchText === taskText) taskText.classList.add('found__task') });
   taskList.innerHTML = "";
   taskList.insertAdjacentHTML('beforeend', foundTask);
   */
   searchInput.value = "";
   searchInput.focus();
}
function filterStatus(event) {
   if (!event.target.closest('.list__item')) return;
   const listStatusItemAll = listStatus.querySelectorAll('.list__item');
   const parentNode = event.target.closest('.list__item');
   listStatusItemAll.forEach(item => item.classList.remove('active__link'));
   parentNode.classList.add('active__link');
}
function addTask(event) {
   event.preventDefault();
   let taskText = taskTextArea.value;

   // const newTask = {
   //    id: Date.now(),
   //    text: textTask,
   //    status: false,
   // }

   let taskHTML = `<li class="task__item">
                     <img class="task__marked-icon hidden" src="./img/icons/star.svg" alt="mark-star icon">
                     <span class="task__text">${taskText}</span>
                     <button class="task__unmarked hidden none" data-action="unmarked" href="#">Not important</button>
                     <button class="task__marked hidden" data-action="marked" href="#">Mark important</button>
                     <button class="task__delete" data-action="delete" href="#"><img src="./img/icons/delete.svg" alt="Delete icon"></button>
                  </li>`;
   taskList.insertAdjacentHTML('beforeend', taskHTML);
   taskTextArea.value = "";
   taskTextArea.focus();
}
function deleteTask(event) {
   if (event.target.dataset.action !== 'delete') return;
   const parentNode = event.target.closest('.task__item');
   parentNode.remove();
}
function doneTask(event) {
   if (!event.target.matches('.task__item')) return;
   const parentNode = event.target.closest('.task__item');
   const textTask = parentNode.querySelector('.task__text');
   textTask.classList.toggle('task__text--done');
   parentNode.querySelector('.task__marked-icon').classList.toggle('task__text--done');
}
function toggleMark(event) {
   if (event.target.dataset.action !== 'marked' && event.target.dataset.action !== 'unmarked') return;
   const parentNode = event.target.closest('.task__item');
   buttonMarked.classList.toggle('none');
   buttonUnmarked.classList.toggle('none');
   parentNode.querySelector('.task__marked-icon').classList.toggle('hidden')
}
function showMark(event) {
   if (!event.target.closest('.task__item')) return;
   // const parentNode = event.target.closest('.task__item');
   // const buttonMMarked = parentNode.querySelector('.task__marked');
   // const buttonUUnmarked = parentNode.querySelector('.task__unmarked');
   buttonMarked.classList.toggle('hidden');
   buttonUnmarked.classList.toggle('hidden');
}
function hideMark(event) {
   if (!event.target.closest('.task__item')) return;
   // const parentNode = event.target.closest('.task__item');
   // const buttonMMarked = parentNode.querySelector('.task__marked')
   // const buttonUUnmarked = parentNode.querySelector('.task__unmarked')
   buttonMarked.classList.toggle('hidden');
   buttonUnmarked.classList.toggle('hidden');
}