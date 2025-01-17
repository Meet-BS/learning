const fs = require('fs');

const TODO_FILE = 'todo.json'

function readList() {
    if (!fs.existsSync(TODO_FILE)) {
        return [];
    }
    try {
        const data = fs.readFileSync(TODO_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading todos:', error);
        return [];
    }
}

function writeList(todo) {
    try {
        fs.writeFileSync(TODO_FILE, JSON.stringify(todo, null, 2));
    } catch (error) {
        console.error('Error writing todos:', error);
    }
}

function addTodo(task) {
    if (!task) {
        console.error('No task to add');
        return;
    }
    const todo = readList(TODO_FILE);
    todo.push(task);
    writeList(todo);
    console.log('Task added successfully');
}

function listTodo() {
    const todo = readList(TODO_FILE);
    if (todo.length < 1) {
        console.error('No pending tasks')
    }
    for (var i = 0; i < todo.length; i++) {
        console.log(`Task ${i + 1}: ${todo[i]}`);
    }
}

function removeTodo(index) {
    if (isNaN(index)) {
        console.error('Not a valid index');
        return;
    }
    const todo = readList(TODO_FILE);
    if (index < 1 || index > todo.length) {
        console.error('Index does not exist');
        return;
    }
    const removedTask = todo.splice(index - 1, 1);
    writeList(todo);
    console.log(`"${removedTask[0]}" task was removed`)
}

const [, , command, ...args] = process.argv;
switch (command) {
    case 'add':
        addTodo(args.join(' '))
        break;
    case 'list':
        listTodo()
        break;
    case 'delete':
        removeTodo(parseInt(args[0], 10))
        break;

    default:
        console.log('Usage:');
        console.log('  node todo_app.js add "Todo text" - Add a new todo');
        console.log('  node todo_app.js list           - List all todos');
        console.log('  node todo_app.js delete <index> - Delete a todo by its index');
}