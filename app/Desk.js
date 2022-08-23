import { User } from './User.js';
import { API } from './API.js';
import { TodoLogic } from './TodoLogic.js';
import { getError } from './constants.js';
import { clearDesks } from './utils/common.utils.js';
import {
    createDesk, progressDesk, doneDesk, btnRemoveAll,
    deskCreateCount, deskDoneCount, deskProgressCount,
    btnAddTodo
} from './elements.js';


export class Desk extends User {
    constructor(userId) {
        super(userId);
    }

    todoLogic() {
        return new TodoLogic(
            this.currentUser,
            this.fetcher.bind(this),
            this.appendTodos.bind(this)
        )
    }

    appendTodos(user) {
        const $logic = this.todoLogic();

        clearDesks(createDesk, progressDesk, doneDesk);

        deskCreateCount.text(this.todos.create?.length);
        deskProgressCount.text(this.todos.progress?.length);
        deskDoneCount.text(this.todos.done?.length);

        const todos = user.todos;

        todos.create.forEach((el) => {
            $logic.createInitialTodo(el, user);
        });

        todos.progress.forEach((el) => {
            $logic.createProgressTodo(el, user);
        });

        todos.done.forEach((el) => {
            $logic.createDoneTodo(el, user);
        });
    }

    onChangeCallback() {
        console.log(
            '[onChange]\n',
            'CurrentUser: ', this.currentUser,
            'Todos: ', this.todos
        )
    }

    initialRender() {
        this.fetcher(
            () => API.getUser(this.userID),
            getError,
            this.appendTodos.bind(this),
            this.onChangeCallback.bind(this)
        );

        btnRemoveAll.addEvent('click', () => {
            this.todoLogic().removeAll();
        });

        btnAddTodo.addEvent('click', () => {
            this.todoLogic().addTodo();
        })
    }
}