import { API } from './API.js';
import { $ } from './DOM.js';
import { addErrorLayout, addTodoContent, clearDesks } from './utils.js';
import {
    createTodoTemplate, progressTodoTemplate, doneTodoTemplate,
    createDesk, progressDesk, doneDesk, deskCreateCount,
    deskProgressCount, deskDoneCount, btnRemoveAll
} from './elements.js';


export class Todo {
    #userID = 1;
    #currentUser = {};
    #todos = {};

    constructor(userID) {
        this.#userID = userID;
    }

    appendTodos(user) {
        clearDesks(createDesk, progressDesk, doneDesk);

        deskCreateCount.text(this.#todos.create?.length);
        deskProgressCount.text(this.#todos.progress?.length);
        deskDoneCount.text(this.#todos.done?.length);

        const todos = user.todos;

        todos.create.forEach((el) => {
            this.createInitialTodo(el, user);
        });

        todos.progress.forEach((el) => {
            this.createProgressTodo(el, user);
        });

        todos.done.forEach((el) => {
            this.createDoneTodo(el, user);
        });
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
            const newProgress = this.#todos.progress.filter(el => el.id !== todo.id);
            const newTodos = {
                ...this.#todos,
                create: [...this.#todos.create, todo],
                progress: newProgress
            };
            const newUserData = { ...this.#currentUser, todos: newTodos };

            this.fetcher(
                () => API.putUser(this.#currentUser.id, newUserData),
                'Error while moving user data'
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
            const newCreate = this.#todos[deskType].filter(el => el.id !== currentTodo.id);
            newTodos = {
                ...this.#todos,
                [deskType]: newCreate,
                progress: [...this.#todos.progress, currentTodo]
            }
        } else if (deskType === 'progress') {
            const newProgress = this.#todos[deskType].filter(el => el.id !== currentTodo.id);
            newTodos = {
                ...this.#todos,
                [deskType]: newProgress,
                done: [...this.#todos.done, currentTodo]
            }
        }

        const newUserData = { ...this.#currentUser, todos: newTodos };

        this.fetcher(
            () => API.putUser(this.#currentUser.id, newUserData),
            'Error while putting user data'
        )
    }

    removeTodo(deskType, currentTodo) {
        const newDesk = this.#todos[deskType].filter(el => el.id !== currentTodo.id);
        const newTodos = {
            ...this.#todos,
            [deskType]: newDesk
        };
        const newUserData = { ...this.#currentUser, todos: newTodos };

        this.fetcher(
            () => API.putUser(this.#currentUser.id, newUserData),
            'Error while removing user data'
        )
    }


    async fetcher(cb, message = 'Error while request: ') {
        try {
            this.#currentUser = await cb();
            this.#todos = this.#currentUser.todos;
            this.appendTodos(this.#currentUser);
        } catch (e) {
            addErrorLayout(`${message}: ${e.message}`);
        }
    }

    initialRender() {
        this.fetcher(() => API.getUser(this.#userID), 'Error while getting todos: ');

        btnRemoveAll.addEvent('click', () => {
            if (this.#todos.done.length) {
                const newTodos = { ...this.#todos, done: [] };
                const newUserData = { ...this.#currentUser, todos: newTodos };
        
                this.fetcher(
                    () => API.putUser(this.#currentUser.id, newUserData),
                    'Error while removing user data'
                )
            }
        });
    }
}