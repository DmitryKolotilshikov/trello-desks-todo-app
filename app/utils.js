import { root } from "./elements.js";

export const addLoadingLayout = () => {
    removeErrorLayout();
    root.insertHTML('afterend', `
        <div class="loader toggle" data-loader>
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
        </div>
    `);
};

export const removeLoadingLayout = () => {
    const loader = root.getSibling('next');
    if (loader && loader.$el.tagName !== 'TEMPLATE') {
        loader.$el.remove();
    }
};

export const addErrorLayout = (message) => {
    removeLoadingLayout();
    root.insertHTML('afterend', `
        <div class="error toggle" data-error>
            <p>${message}</p>
        </div>
    `);
    setTimeout(removeErrorLayout, 3000);
}

export const removeErrorLayout = () => {
    const error = root.getSibling('next');
    if (error && error.$el.tagName !== 'TEMPLATE') {
        error.$el.remove();
    }
};

export const addTodoContent = (fragment, todo, user) => {
    const todoTitle = fragment.find('[data-todo-title]');
    todoTitle.text(todo.title);

    const todoDesc = fragment.find('[data-todo-desc-content]');
    todoDesc.text(todo.desc);

    const todoUser = fragment.find('[data-todo-user]');
    todoUser.text(user.name);
};

export const clearDesks = (...desks) => {
    desks.forEach(desk => {
        desk.clear();
    })
};
