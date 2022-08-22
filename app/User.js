import { Modal } from "./Modal.js";
import { requestError } from "./constants.js";

export class User {
    #userID = 1;
    #currentUser = {};
    #todos = {};
    
    constructor(userID) {
        this.#userID = userID;
    }

    get userID() {
        return this.#userID;
    }

    get currentUser() {
        return this.#currentUser;
    }
    set currentUser(user) {
        this.#currentUser = user;
    }

    get todos() {
        return this.#todos;
    }
    set todos(newTodos) {
        this.#todos = newTodos;
    }

    onChange(callback) {
        if (callback) callback();
    }

    async fetcher(
        cb, 
        message = requestError, 
        appendTodos, 
        onChangeCallback
        ) {
        try {
            this.currentUser = await cb();
            this.todos = this.currentUser.todos;
            appendTodos(this.currentUser);
            if (onChangeCallback) {
                this.onChange(onChangeCallback);
            }
        } catch (e) {
            Modal.addError(`${message}: ${e.message}`);
        }
    }
}