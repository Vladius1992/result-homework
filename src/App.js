import { TodosProvider } from './TodosContext';
import { ControlPanel, Todo } from './components';
import styles from './app.module.css';
import { useTodos } from './TodosContext';

export const App = () => {
	const { todos } = useTodos();

	return (
		<TodosProvider>
			<div className={styles.app}>
				<ControlPanel />
				<div>
					{todos.map(({ id, title, completed, isEditing = false }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
							isEditing={isEditing}
						/>
					))}
				</div>
			</div>
		</TodosProvider>
	);
};
