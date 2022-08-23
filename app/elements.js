import { $ } from './DOM.js';

const root = $('#root');
const createTodoTemplate = $('[data-create-todo-template]');
const progressTodoTemplate = $('[data-progress-todo-template]');
const doneTodoTemplate = $('[data-done-todo-template]');
const createDesk = $('[data-create-desk-content]');
const progressDesk = $('[data-progress-desk-content]');
const doneDesk = $('[data-done-desk-content]');
const deskCreateCount = $('[data-desk-create-count]');
const deskProgressCount = $('[data-desk-progress-count]');
const deskDoneCount = $('[data-desk-done-count]');
const btnRemoveAll = $('[data-btn-remove-all]');
const btnAddTodo = $('[data-btn-add-todo]');

export {
    root,
    createTodoTemplate,
    progressTodoTemplate,
    doneTodoTemplate,
    createDesk,
    progressDesk,
    doneDesk,
    deskCreateCount,
    deskProgressCount,
    deskDoneCount,
    btnRemoveAll,
    btnAddTodo
}