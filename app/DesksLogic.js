import { API } from "./API.js";
import { Modal } from "./Modal.js";
import { ERROR_WHILE_CREATING, ERROR_WHILE_EDITING, ERROR_WHILE_MOVING, ERROR_WHILE_REMOVING } from "./constants.js";
import { $ } from "./DOM.js";
import {
    createContentDesk,
    createDeskCount,
    createDeskTemplate,
    doneContentDesk,
    doneDeskCount,
    doneDeskTemplate,
    progressContentDesk,
    progressDeskCount,
    progressDeskTemplate
} from "./elements.js";

export class DesksLogic {
    constructor(user, fetcher, appendDesks) {
        this.user = user;
        this.desks = user.desks;
        this.ID = user.id;
        this.fetcher = fetcher;
        this.appendDesks = appendDesks;
    }

    applyContent(el, template) {
        const title = template.find('[data-todo-title]');
        title.text(el.title);

        const desc = template.find('[data-todo-desc-content]');
        desc.text(el.desc);

        const userName = template.find('[data-todo-user]');
        userName.text(this.user.name);

        const todoDate = template.find('[data-todo-date]');
        todoDate.text(el.date);
    }

    putFetcher(desks, errorMessage = '', isLoader = false) {
        this.fetcher(
            () => API.putUser(this.ID, { desks }, isLoader),
            this.appendDesks,
            errorMessage
        )
    }

    appendCreateTodos() {
        const { create } = this.desks;

        createDeskCount.text(create?.length);

        if (create?.length) {
            create.forEach(el => {
                const createTemplate = $(document.importNode(createDeskTemplate.$el.content, true));
                this.applyContent(el, createTemplate);

                const btnMove = createTemplate.find('[data-todo-btn-move]');
                btnMove.addEvent('click', () => {
                    const limit = 4;
                    if (this.desks.progress.length >= limit) {
                        Modal.addWarningLimitLayout(limit);
                        return;
                    }

                    const create = this.desks.create
                        .filter(todo => todo.id !== el.id);
                    const progress = [...this.desks.progress, el];

                    const newDesks = { ...this.desks, create, progress };

                    this.putFetcher(newDesks, ERROR_WHILE_MOVING);
                });

                const btnRemove = createTemplate.find('[data-todo-btn-remove]');
                btnRemove.addEvent('click', () => this.removeTodo('create', el));

                const btnEdit = createTemplate.find('[data-todo-btn-edit]');
                btnEdit.addEvent('click', () => {
                    const editTodo = (newEl) => {
                        const create = [...this.desks.create]
                            .map(todo => {
                                if (todo.id === el.id) {
                                    return newEl
                                }
                                return todo;
                            });

                        const newDesks = { ...this.desks, create }
                        this.putFetcher(newDesks, ERROR_WHILE_EDITING, true);
                    }
                    Modal.addEditTodoLayout(el, editTodo);
                })

                createContentDesk.append(createTemplate);
            })
        } else {
            createContentDesk.insertHTML('afterbegin', `<p>No todos yet ...</p>`)
        }
    }

    appendProgressTodos() {
        const { progress } = this.desks;

        progressDeskCount.text(progress?.length);

        if (progress?.length) {
            progress.forEach(el => {
                const progressTemplate = $(document.importNode(progressDeskTemplate.$el.content, true));
                this.applyContent(el, progressTemplate);

                const btnMove = progressTemplate.find('[data-todo-btn-move]');
                btnMove.addEvent('click', () => {
                    const progress = this.desks.progress
                        .filter(todo => todo.id !== el.id);
                    const done = [...this.desks.done, el];

                    const newDesks = { ...this.desks, progress, done };

                    this.putFetcher(newDesks, ERROR_WHILE_MOVING);
                });

                const btnBack = progressTemplate.find('[data-todo-btn-back]');
                btnBack.addEvent('click', () => {
                    const progress = this.desks.progress
                        .filter(todo => todo.id !== el.id);
                    const create = [...this.desks.create, el];
                    const newDesks = { ...this.desks, create, progress };

                    this.putFetcher(newDesks, ERROR_WHILE_MOVING);
                });

                const btnRemove = progressTemplate.find('[ data-todo-btn-remove]');
                btnRemove.addEvent('click', () => this.removeTodo('progress', el));

                progressContentDesk.append(progressTemplate);
            })
        } else {
            progressContentDesk.insertHTML('afterbegin', `<p>No todos yet ...</p>`)
        }
    }

    appendDoneTodos() {
        const { done } = this.desks;

        doneDeskCount.text(done?.length);

        if (done?.length) {
            done.forEach(el => {
                const doneTemplate = $(document.importNode(doneDeskTemplate.$el.content, true));
                this.applyContent(el, doneTemplate);

                const btnRemove = doneTemplate.find('[ data-todo-btn-remove]');
                btnRemove.addEvent('click', () => this.removeTodo('done', el));

                doneContentDesk.append(doneTemplate);
            })
        } else {
            doneContentDesk.insertHTML('afterbegin', `<p>No todos yet ...</p>`)
        }
    }

    removeTodo(deskType, el) {
        const newTodo = this.desks[deskType]
            .filter(todo => todo.id !== el.id);
        const newDesks = { ...this.desks, [deskType]: newTodo };
        this.putFetcher(newDesks, ERROR_WHILE_REMOVING);
    }

    removeAll() {
        const remove = () => {
            const newDesks = { ...this.desks, done: [] };
            this.putFetcher(newDesks, ERROR_WHILE_REMOVING);
        }
        Modal.addWarningRemoveLayout(remove);
    }

    addNewTodo() {
        const limit = 10;
        if (this.desks.create.length >= limit) {
            Modal.addWarningLimitLayout(limit);
            return;
        }

        const createTodo = (newTodo) => {
            const create = [...this.desks.create, newTodo];
            const newDesks = { ...this.desks, create };
            this.putFetcher(newDesks, ERROR_WHILE_CREATING, true);
        }
        Modal.addNewTodoLayout(createTodo);
    }
}
