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
