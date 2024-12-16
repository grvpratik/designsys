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
import axios, { AxiosResponse } from 'axios';

// Updated interfaces to match actual Product Hunt GraphQL schema
interface ProjectThumbnail {
    url: string;
}

interface ProjectMaker {
    id: string;
    name: string;
    username: string;
    profileImage?: string;
}

interface ProjectTopic {
    name: string;
}

interface ProductHuntProject {
    id: string;
    name: string;
    tagline: string;
    description: string;
    url: string;
    website?: string;  // Changed from websiteUrl
    votesCount: number;
    createdAt: string;

    thumbnail?: ProjectThumbnail;

    makers: ProjectMaker[];
    topics?: ProjectTopic[];  // Made optional

    commentsCount: number;
}

interface ProductHuntResponse {
    data?: {
        posts?: {
            edges: Array<{
                node: ProductHuntProject;
            }>;
            pageInfo: {
                hasNextPage: boolean;
                endCursor: string;
            };
        };
    };
    errors?: Array<{
        message: string;
        locations?: Array<{ line: number, column: number }>;
        path?: string[];
    }>;
}

class ProductHuntService {
    private readonly apiUrl = 'https://api.producthunt.com/v2/api/graphql';
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
    }

    async fetchProjects(
        options: {
            first?: number;
            after?: string;
            order?: string;
        } = {}
    ): Promise<any> {
        const { first = 10, after, order = 'TRENDING' } = options;

        const query = `
      query GetProjects($first: Int, $after: String) {
        posts(
          first: $first, 
          after: $after,
         
        ) {
          edges {
            node {
              id
              name
              tagline
              description
              url
              website
              votesCount
              createdAt
              
              thumbnail {
                url
              }
              
              makers {
                id
                name
                username
                profileImage
              }
              
             
              
              commentsCount
            }
          }
          
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

        try {
            const response: AxiosResponse<ProductHuntResponse> = await axios.post(
                this.apiUrl,
                {
                    query,
                    variables: {
                        first,
                        after,
                        order
                    }
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Comprehensive error checking
            if (response.data.errors) {
                throw new Error(`GraphQL Errors: ${JSON.stringify(response.data.errors)}`);
            }

            if (!response.data.data) {
                throw new Error('No data returned from Product Hunt API');
            }

            if (!response.data.data.posts) {
                throw new Error('No posts found');
            }
console.log(response.data)
            return response.data.data.posts;
        } catch (error) {
            console.error('Detailed error fetching Product Hunt projects:', error);

            // If it's an axios error, log more details
            if (axios.isAxiosError(error)) {
                console.error('Response data:', error.response?.data);
                console.error('Response status:', error.response?.status);
                console.error('Response headers:', error.response?.headers);
            }

            throw error;
        }
    }

    async getProjects(
        options?: {
            first?: number;
            after?: string;
            order?: string;
        }
    ): Promise<ProductHuntProject[]> {
        try {
            const posts = await this.fetchProjects(options);

            // Additional safety check
            if (!posts.edges || posts.edges.length === 0) {
                console.warn('No projects found');
                return [];
            }

            return posts.edges.map((edge: { node: any; }) => edge.node);
        } catch (error) {
            console.error('Error in getProjects:', error);
            throw error;
        }
    }
}

// Debugging and usage example
async function main() {
    const accessToken = 'KIOx-r3NoWBmCRWWeQzlDXAENKvvWxW3c5zd3kSZxcs';
    const productHuntService = new ProductHuntService(accessToken);

    try {
        console.log('Attempting to fetch projects...');

        // Fetch trending projects
        const projects = await productHuntService.getProjects({
            first: 5,
            order: 'TRENDING'
        });

        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }

        projects.forEach(project => {
            console.log(`Project: ${project.name}`);
            console.log(`Tagline: ${project.tagline}`);
            console.log(`Votes: ${project.votesCount}`);
            console.log('---');
        });
    } catch (error) {
        console.error('Failed to fetch projects', error);
    }
}

// Uncomment to run
 main();

export default ProductHuntService;