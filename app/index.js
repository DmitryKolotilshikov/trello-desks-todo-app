import { Todo } from './Todo.js';

new Todo(1).initialRender();








// import { API } from './API.js';
// import { $ } from './DOM.js';
// import { clearDesks } from './utils.js';

// import {
//     createTodoTemplate, progressTodoTemplate, doneTodoTemplate,
//     createDesk, progressDesk, doneDesk, deskCreateCount,
//     deskProgressCount, deskDoneCount
// } from './elements.js';

// initialRender();

// let $currentUser = {};
// let $todos = {};

// async function initialRender() {
//     fetcher(() => API.getUser(1), 'Error while getting todos: ')
// }

// function appendTodos(user) {
//     clearDesks(createDesk, progressDesk, doneDesk);

//     deskCreateCount.text($todos.create?.length);
//     deskProgressCount.text($todos.inprogress?.length);
//     deskDoneCount.text($todos.done?.length);

//     const todos = user.todos;

//     todos.create.forEach((el) => {
//         createInitialTodo(el, user);
//     });

//     todos.inprogress.forEach((el) => {
//         createProgressTodo(el, user);
//     });

//     todos.done.forEach((el) => {
//         createDoneTodo(el, user);
//     });
// }

// function createInitialTodo(todo, user) {
//     const todoFragment = $(document.importNode(createTodoTemplate.$el.content, true));
//     addTodoContent(todoFragment, todo, user);

//     const btnMove = todoFragment.find('[data-todo-btn-move]');

//     btnMove.addEvent('click', async () => {
//         const newCreate = $todos.create.filter(el => el.id !== todo.id);
//         const newTodos = {
//             ...$todos,
//             create: newCreate,
//             inprogress: [...$todos.inprogress, todo]
//         };
//         const newUserData = {...$currentUser, todos: newTodos};

//         fetcher(
//             () => API.putUser($currentUser.id, newUserData),
//             'Error while putting user data: '
//             )
//     });

//     createDesk.append(todoFragment);
// }

// async function fetcher(cb, message = 'Error while request: ') {
//     try {
//         $currentUser = await cb();
//         $todos = $currentUser.todos;
//         appendTodos($currentUser);
//     } catch (e) {
//         console.error(message, e.message);
//     }
// }

// function createProgressTodo(todo, user) {
//     const todoFragment = $(document.importNode(progressTodoTemplate.$el.content, true));
//     addTodoContent(todoFragment, todo, user);

//     progressDesk.append(todoFragment);
// }

// function createDoneTodo(todo, user) {
//     const todoFragment = $(document.importNode(doneTodoTemplate.$el.content, true));
//     addTodoContent(todoFragment, todo, user);

//     doneDesk.append(todoFragment);
// }


// function addTodoContent(fragment, todo, user) {
//     const todoTitle = fragment.find('[data-todo-title]');
//     todoTitle.text(todo.title);

//     const todoDesc = fragment.find('[data-todo-desc-content]');
//     todoDesc.text(todo.desc);

//     const todoUser = fragment.find('[data-todo-user]');
//     todoUser.text(user.name);
// }





// const newUserData = {
//     ...user,
//     name: "Mr.Anderson",
//     todos: {
//         create: [
//           {
//             id: 3,
//             title: "JS",
//             desc: "Learn JavaScript"
//           },
//         ],
//         inprogress: [
//           {
//             id: 2,
//             title: "TypeScript",
//             desc: "Learn TypeScript"
//           }
//         ],
//         done: [
//           {
//             id: 0,
//             title: "HTML, CSS",
//             desc: "Learn HTML, CSS"
//           }
//         ]
//     }
//   }
// API.putUser(1, newUserData);