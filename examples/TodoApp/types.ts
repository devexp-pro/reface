// Типы для TodoApp
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

export interface TodoProps {
  title?: string;
}

export interface TodoRPC {
  addTodo: (args: { text: string }) => Promise<RpcResponse<TodoState>>;
  toggleTodo: (args: { id: string }) => Promise<RpcResponse<TodoState>>;
  removeTodo: (args: { id: string }) => Promise<RpcResponse<TodoState>>;
  setFilter: (
    args: { filter: TodoState["filter"] },
  ) => Promise<RpcResponse<TodoState>>;
}
