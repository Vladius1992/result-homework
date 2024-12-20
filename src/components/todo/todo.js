import React from 'react';
import styles from './todo.module.css';
import { useTodos } from '../TodosContext';

export const Todo = ({ id, title, completed, isEditing }) => {
	const {
		onTodoEdit,
		onTodoTitleChange,
		onTodoCompletedChange,
		onTodoRemove,
		onTodoSave,
	} = useTodos();
	return (
		<div className={styles.todo}>
			{isEditing ? (
				<input
					type="text"
					value={title}
					onChange={(event) => onTodoTitleChange(id, event.target.value)}
					onBlur={() => onTodoSave(id)}
				/>
			) : (
				<span onDoubleClick={() => onTodoEdit(id)}>{title}</span>
			)}

			<input
				type="checkbox"
				checked={completed}
				onChange={(event) => onTodoCompletedChange(id, event.target.checked)}
			/>
			<button onClick={() => onTodoRemove(id)}>Удалить</button>
		</div>
	);
};
