import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { ControlPanel, Todo } from './components';
import { createTodo, readTodos, updateTodo, deleteTodo } from './api';
import { addTodoInTodos, findTodo, removeTodoInTodos, setTodoInTodos } from './utils';
import { NEW_TODO_ID } from './constants';
import styles from './app.module.css';

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	const onTodoAdd = useCallback(() => {
		setTodos(addTodoInTodos(todos));
	}, [todos]);

	const onTodoSave = useCallback(
		async (todoId) => {
			const { title, completed } = findTodo(todos, todoId) || {};

			if (todoId === NEW_TODO_ID) {
				const todo = await createTodo({ title, completed });
				let updatedTodos = setTodoInTodos(todos, {
					id: NEW_TODO_ID,
					isEditing: false,
				});
				updatedTodos = removeTodoInTodos(updatedTodos, NEW_TODO_ID);
				updatedTodos = addTodoInTodos(updatedTodos, todo);
				setTodos(updatedTodos);
			} else {
				await updateTodo({ id: todoId, title });
				setTodos(setTodoInTodos(todos, { id: todoId, isEditing: false }));
			}
		},
		[todos],
	);

	const onTodoEdit = useCallback(
		(id) => {
			setTodos(setTodoInTodos(todos, { id, isEditing: true }));
		},
		[todos],
	);

	const onTodoTitleChange = useCallback(
		(id, newTitle) => {
			setTodos(setTodoInTodos(todos, { id, title: newTitle }));
		},
		[todos],
	);

	const onTodoCompletedChange = useCallback(
		async (id, newCompleted) => {
			await updateTodo({ id, completed: newCompleted });
			setTodos(setTodoInTodos(todos, { id, completed: newCompleted }));
		},
		[todos],
	);

	const onTodoRemove = useCallback(
		async (id) => {
			await deleteTodo(id);
			setTodos(removeTodoInTodos(todos, id));
		},
		[todos],
	);

	const value = {
		todos,
		onTodoAdd,
		onTodoSave,
		onTodoEdit,
		onTodoTitleChange,
		onTodoCompletedChange,
		onTodoRemove,
		searchPhrase,
		setSearchPhrase,
		isAlphabetSorting,
		setIsAlphabetSorting,
	};

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
			setTodos(loadedTodos),
		);
	}, [searchPhrase, isAlphabetSorting, setTodos]);

	return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};

export const useTodos = () => useContext(TodosContext);
