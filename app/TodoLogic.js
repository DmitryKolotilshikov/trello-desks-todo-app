import { API } from './API.js';
import { $ } from './DOM.js';
import { addTodoContent } from './utils/common.utils.js';
import { moveError, putError, removeError } from './constants.js';
import {
    createTodoTemplate, progressTodoTemplate, doneTodoTemplate,
    createDesk, progressDesk, doneDesk
} from './elements.js';

export class TodoLogic {
    // static #instance = null;

    constructor(user, fetcher, appendTodos) {
        // if (TodoLogic.#instance) {
        //     return TodoLogic.#instance;
        // }
        this.currentUser = user;
        this.todos = user.todos;
        this.fetcher = fetcher;
        this.appendTodos = appendTodos;

        // TodoLogic.#instance = this;
    }

    createInitialTodo(todo, user) {
        const todoFragment = $(document.importNode(createTodoTemplate.$el.content, true));
        addTodoContent(todoFragment, todo, user);

        const btnMove = todoFragment.find('[data-todo-btn-move]');

        btnMove.addEvent('click', () => {
            this.moveTodo('create', todo);
        });

        const btnRemove = todoFragment.find('[data-todo-btn-remove]');
        btnRemove.addEvent('click', () => {
            this.removeTodo('create', todo);
        });

        createDesk.append(todoFragment);
    }

    createProgressTodo(todo, user) {
        const todoFragment = $(document.importNode(progressTodoTemplate.$el.content, true));
        addTodoContent(todoFragment, todo, user);

        const btnBack = todoFragment.find('[data-todo-btn-back]');
        btnBack.addEvent('click', () => {
            const newProgress = this.todos.progress.filter(el => el.id !== todo.id);
            const newTodos = {
                ...this.todos,
                create: [...this.todos.create, todo],
                progress: newProgress
            };
            const newUserData = { ...this.currentUser, todos: newTodos };

            this.fetcher(
                () => API.putUser(this.currentUser.id, newUserData),
                moveError,
                this.appendTodos.bind(this)
            )
        });

        const btnMove = todoFragment.find('[data-todo-btn-move]');

        btnMove.addEvent('click', () => {
            this.moveTodo('progress', todo);
        });

        const btnRemove = todoFragment.find('[data-todo-btn-remove]');
        btnRemove.addEvent('click', () => {
            this.removeTodo('progress', todo);
        });

        progressDesk.append(todoFragment);
    }

    createDoneTodo(todo, user) {
        const todoFragment = $(document.importNode(doneTodoTemplate.$el.content, true));
        addTodoContent(todoFragment, todo, user);

        const btnRemove = todoFragment.find('[data-todo-btn-remove]');
        btnRemove.addEvent('click', () => {
            this.removeTodo('done', todo);
        });

        doneDesk.append(todoFragment);
    }

    moveTodo(deskType, currentTodo) {
        let newTodos = {};

        if (deskType === 'create') {
            const newCreate = this.todos[deskType]
                .filter(el => el.id !== currentTodo.id);

            newTodos = {
                ...this.todos,
                [deskType]: newCreate,
                progress: [...this.todos.progress, currentTodo]
            }
        } else if (deskType === 'progress') {
            const newProgress = this.todos[deskType]
                .filter(el => el.id !== currentTodo.id);

            newTodos = {
                ...this.todos,
                [deskType]: newProgress,
                done: [...this.todos.done, currentTodo]
            }
        }

        const newUserData = { ...this.currentUser, todos: newTodos };

        this.fetcher(
            () => API.putUser(this.currentUser.id, newUserData),
            putError,
            this.appendTodos.bind(this)
        )
    }

    removeTodo(deskType, currentTodo) {
        const newDesk = this.todos[deskType]
            .filter(el => el.id !== currentTodo.id);

        const newTodos = {
            ...this.todos,
            [deskType]: newDesk
        };
        const newUserData = { ...this.currentUser, todos: newTodos };

        this.fetcher(
            () => API.putUser(this.currentUser.id, newUserData),
            removeError,
            this.appendTodos.bind(this)
        )
    }

    removeAll() {
        if (this.todos.done.length) {
            const newTodos = { ...this.todos, done: [] };
            const newUserData = { ...this.currentUser, todos: newTodos };

            this.fetcher(
                () => API.putUser(this.currentUser.id, newUserData),
                removeError,
                this.appendTodos.bind(this),
            )
        }
    }
}
