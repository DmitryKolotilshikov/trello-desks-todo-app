import { $, DOM } from "./DOM.js";
import { root } from "./elements.js";

export class Modal {
    static #loaderLayout;
    static #errorLayout;
    static #addTodoLayout;
    static #warningLayout;

    static addLoading() {
        Modal.removeError();

        const modalLoading = DOM.create('div', 'modal', 'modal--toggle');
        modalLoading.$el.dataset.loader = '';

        modalLoading.insertHTML('afterbegin', `
            <div class="lds-spinner">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
        `);

        Modal.#loaderLayout = modalLoading;
        root.insertElement('afterend', modalLoading);
    }

    static removeLoading() {
        if (Modal.#loaderLayout) {
            Modal.#loaderLayout.remove();
            Modal.#loaderLayout = '';
        }
    }

    static addError(message) {
        Modal.removeLoading();

        const modalError = DOM.create('div', 'modal', 'error', 'modal--toggle');
        modalError.$el.dataset.error = '';
        modalError.insertHTML('afterbegin', `<p>${message}</p>`);
        root.insertElement('afterend', modalError);

        Modal.#errorLayout = modalError;

        modalError.addEvent('click', (e) => {
            if (e.target.classList.contains('modal--toggle')) {
                Modal.removeError();
            }
        });
    }

    static removeError() {
        if (Modal.#errorLayout) {
            Modal.#errorLayout.remove();
            Modal.#errorLayout = '';
        }
    }

    static addTodoLayout(callback, type = 'add', todo = null) {
        const modalNewTodo = DOM.create('div', 'modal', 'modal--toggle');
        const formNewTodo = DOM.create('form', 'modal__new-todo');

        formNewTodo.insertHTML('afterbegin', `
            <h3 class="new-todo__header">${type === 'add' ? 'New Todo' : 'Edit Todo'}</h3>
            <input 
                required
                type="text" 
                placeholder="title"
                class="new-todo__title"
                value="${todo ? todo.title : ''}"
            >
            <textarea 
                required
                rows="3" 
                minlength="3"
                maxlength="42" 
                placeholder="todo description"
                class="new-todo__description"
            >${todo ? todo.desc : ''}</textarea>
            <div class="new-todo__buttons">
                <button 
                    type="button" 
                    class="new-todo__cancel" 
                    data-btn-cancel-new-todo
                >Cancel</button>
                <button 
                    type="submit" 
                    class="new-todo__add" 
                    data-btn-add-new-todo
                >${type === 'add' ? 'Add Todo' : 'Edit Todo'}</button>
            </div>
        `);

        modalNewTodo.insertElement('afterbegin', formNewTodo);
        root.insertElement('afterend', modalNewTodo);

        Modal.#addTodoLayout = modalNewTodo;

        const closeModal = () => {
            if (Modal.#addTodoLayout) {
                Modal.#addTodoLayout.remove();
                Modal.#addTodoLayout = '';
            }
        }

        modalNewTodo.addEvent('click', (e) => {
            if ('btnCancelNewTodo' in e.target.dataset) {
                closeModal();
            }
        })

        formNewTodo.addEvent('submit', (e) => {
            e.preventDefault();
            const id = todo ? todo.id : Date.now();

            callback(e.target[0].value, e.target[1].value, id);
            closeModal();
        })
    }


    static addWarningLayout(text = '', type = 'info', callback) {
        const modalWarning = DOM.create('div', 'modal', 'modal--toggle');
        modalWarning.insertHTML('afterbegin', `
            <div class="modal__warning">
                <h3>${text ? text : 'Warning'}</h3>
                <div class="modal__warning-buttons">
                    ${
                        type !== 'info' 
                            ? `<button 
                                    type="button" 
                                    data-btn-warning-cancel
                                    class="warning-buttons__cancel"
                                >Cancel</button>`
                            : ''
                    }
                    <button 
                        type="button" 
                        data-btn-warning-confirm
                        class="warning-buttons__confirm"
                    >Confirm</button>
                </div>
            </div>
        `);

        root.insertElement('afterend', modalWarning);

        Modal.#warningLayout = modalWarning;

        const removeWarning = () => {
            if (Modal.#warningLayout) {
                Modal.#warningLayout.remove();
                Modal.#warningLayout = '';
            }
        }

        modalWarning.addEvent('click', (e) => {
            if ('btnWarningCancel' in e.target.dataset) {
                removeWarning();
                return;
            }
            if ('btnWarningConfirm' in e.target.dataset) {
                removeWarning();
                if (callback) callback();
            }
        })
    };
}