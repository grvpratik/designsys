// import React from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// // Define the Todo type
// interface Todo {
//     id: number;
//     title: string;
//     completed: boolean;
// }

// // API functions
// const fetchTodos = async (): Promise<Todo[]> => {
//     const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
//     return data;
// };

// const addTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
//     const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
//     return data;
// };

// const updateTodo = async (todo: Todo): Promise<Todo> => {
//     const { data } = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
//     return data;
// };

// const deleteTodo = async (id: number): Promise<void> => {
//     await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
// };

// // Component
// const TodoList: React.FC = () => {
//     const queryClient = useQueryClient();

//     // Query
//     const { data: todos, isLoading, isError } = useQuery<Todo[], Error>('todos', fetchTodos);

//     // Mutations
//     const addMutation = useMutation(addTodo, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('todos');
//             toast.success('Todo added successfully!');
//         },
//         onError: () => {
//             toast.error('Failed to add todo');
//         },
//     });

//     const updateMutation = useMutation(updateTodo, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('todos');
//             toast.success('Todo updated successfully!');
//         },
//         onError: () => {
//             toast.error('Failed to update todo');
//         },
//     });

//     const deleteMutation = useMutation(deleteTodo, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('todos');
//             toast.success('Todo deleted successfully!');
//         },
//         onError: () => {
//             toast.error('Failed to delete todo');
//         },
//     });

//     if (isLoading) return <div>Loading...</div>;
//     if (isError) return <div>Error fetching todos </div>;

//     return (
//         <div>
//         <h1>Todo List </h1>
//             <ul>
//     {
//         todos?.map((todo) => (
//             <li key= { todo.id } >
//             { todo.title }
//             < button onClick = {() => updateMutation.mutate({ ...todo, completed: !todo.completed })}>
//                 Toggle Complete
//                     </button>
//                     < button onClick = {() => deleteMutation.mutate(todo.id)}> Delete </button>
//                         </li>
//         ))}
// </ul>
//     < form
// onSubmit = {(e) => {
//     e.preventDefault();
//     const title = (e.target as HTMLFormElement).title.value;
//     addMutation.mutate({ title, completed: false });
//     (e.target as HTMLFormElement).reset();
// }}
//       >
//     <input name="title" placeholder = "New todo title" required />
//         <button type="submit" > Add Todo </button>
//             </form>
//             </div>
//   );
// };

// export default TodoList;