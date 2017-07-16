import v4 from 'uuid/v4';

const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'hello',
            completed: true,
        },
        {
            id: v4(),
            text: 'aloha',
            completed: true,
        },
        {
            id: v4(),
            text: 'konichiwa',
            completed: false,
        },
    ]
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter => {
    return delay(500).then(() => {
        switch(filter) {
            case 'all':
                return fakeDatabase.todos;
            case 'active':
                return fakeDatabase.todos.filter(todo => !todo.completed);
            case 'completed':
                return fakeDatabase.todos.filter(todo => todo.completed);
        }
    });
}
