import { Island } from "@reface";
import type { Todo, TodoProps, TodoRPC, TodoState } from "./types.ts";
import { Container, Counter, FilterContainer, Form, List } from "./ui.tsx";

export const TodoApp: Island<TodoState, TodoProps, TodoRPC> = {
  name: "todo-app",

  initialState: {
    todos: [],
    filter: "all",
  },

  template: ({ props, state, rpc }) => {
    const { todos, filter } = state;
    const { title = "Todo App" } = props;

    const filteredTodos = todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    });

    return (
      <Container>
        <h1>{title}</h1>

        {/* Add Todo Form */}
        <Form
          onsubmit="event.preventDefault()"
          {...rpc.addTodo()}
        >
          <input
            type="text"
            name="text"
            placeholder="What needs to be done?"
            required
          />
          <button type="submit">Add</button>
        </Form>

        {/* Filters */}
        <FilterContainer>
          <button
            class={filter === "all" ? "active" : ""}
            {...rpc.setFilter({ filter: "all" })}
          >
            All
          </button>
          <button
            class={filter === "active" ? "active" : ""}
            {...rpc.setFilter({ filter: "active" })}
          >
            Active
          </button>
          <button
            class={filter === "completed" ? "active" : ""}
            {...rpc.setFilter({ filter: "completed" })}
          >
            Completed
          </button>
        </FilterContainer>

        {/* Todo List */}
        <List>
          {filteredTodos.map((todo) => (
            <li key={todo.id} class={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                {...rpc.toggleTodo({ id: todo.id })}
              />
              <span>{todo.text}</span>
              <button {...rpc.removeTodo({ id: todo.id })}>×</button>
            </li>
          ))}
        </List>

        {/* Counter */}
        <Counter>
          {todos.filter((t) => !t.completed).length} items left
        </Counter>
      </Container>
    );
  },

  rpc: {
    async addTodo({ state, args }) {
      const { text } = args as { text: string };
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text,
        completed: false,
      };

      return {
        state: {
          todos: [...state.todos, newTodo],
        },
      };
    },

    async toggleTodo({ state, args }) {
      const { id } = args as { id: string };

      return {
        state: {
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        },
      };
    },

    async removeTodo({ state, args }) {
      const { id } = args as { id: string };

      return {
        state: {
          todos: state.todos.filter((todo) => todo.id !== id),
        },
      };
    },

    async setFilter({ state, args }) {
      const { filter } = args as { filter: TodoState["filter"] };

      return {
        state: { filter },
      };
    },
  },
};
