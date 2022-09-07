import { Desks } from './Desks.js';
import { $ } from './DOM.js';
import { Modal } from './Modal.js';

const root = $('#root');

const headerTitle = $('[data-header-title]');

const clockLayout = $('[data-header-clock]');
const createDeskTemplate = $('[data-create-todo-template]');
const progressDeskTemplate = $('[data-progress-todo-template]');
const doneDeskTemplate = $('[data-done-todo-template]');

const createDeskCount = $('[data-desk-create-count]');
const progressDeskCount = $('[data-desk-progress-count]');
const doneDeskCount = $('[data-desk-done-count]');

const createContentDesk = $('[data-create-desk-content]');
const progressContentDesk = $('[data-progress-desk-content]');
const doneContentDesk = $('[data-done-desk-content]');

const btnRemoveAll = $('[data-btn-remove-all]');
const btnAddTodo = $('[data-btn-add-todo]');

const headerUserName = $('[data-header-username]');
const headerAvatar = $('[data-header_avatar]');

export {
    root,
    headerTitle,
    clockLayout,
    createDeskTemplate,
    progressDeskTemplate,
    doneDeskTemplate,
    createDeskCount,
    progressDeskCount,
    doneDeskCount,
    createContentDesk,
    progressContentDesk,
    doneContentDesk,
    btnRemoveAll,
    btnAddTodo,
    headerUserName,
    headerAvatar
}