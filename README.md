# supabase-swr

A React library to use [supabase-js](https://github.com/supabase/supabase-js) with [swr](https://github.com/vercel/swr).

## Install

Using npm.

```shell
npm install supabase-swr supabase-js swr
```

Using yarn.

```shell
yarn add supabase-swr supabase-js swr
```

## Usage

Crate a supabase client and pass it to the `SwrSupabaseContext.Provider`.

```typescript jsx
import { createClient } from 'supabase-js';
import { SwrSupabaseContext } from 'supabase-swr';

const client = createClient('https://xyzcompany.supabase.co', 'public-anon-key');

function App() {
  return (
    <SwrSupabaseContext.Provider value={client}>
      <Routes />
    </SwrSupabaseContext.Provider>  
  )
}
```

Now you can use in any component the api of supabase-swr.

```typescript jsx
import React from 'react';
import { useClient, useSelect, useQuery } from 'supabase-swr';

type Todo = {
  id: string,
  name: string,
  created_at: string,
};

const Todos = () => {
  const todosQuery = useQuery<Todo>('todos', {
    filter: (query) => query.order('created_at', { ascending: false }),
  }, []);
  const {
    data: {
      data: todos,
    },
    mutate,
  } = useSelect(todosQuery, {
    // any swr config
    revalidateOnMount: true,
    suspense: true,
  });
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          {todo.name}
        </li>
      ))}
    </ul>
  );
}
```

## References

- [supabase-js](https://github.com/supabase/supabase-js)
- [swr](https://github.com/vercel/swr)

## API

### hooks

#### useClient

Retrieve the supabase-js client instance provided to `SwrSupabaseContext.Provider`.

```typescript jsx
export default function (props) {
  const client = useClient();
  // ...
  return (<>...</>)
}
```

#### useQuery

Create a `Query` to use with `useSelect` and other hooks.
The created query is also a [swr](https://github.com/vercel/swr) key and can be used with [mutate](https://swr.vercel.app/docs/mutation).

```typescript jsx
type Todo = {}

export default function (props) {
  const query = useQuery<Todo>('todos', {
    // the filter ro apply to the query
    filter: (q) => q.order('created_at', { ascending: false }),
    head: false,
    count: 'exact',
  });
  const {
    data
  } = useSelect(selectKey, {
    // swr config here
  });
  // ...
  return (<></>)
}
```

#### useSelect

Retrieve the `table` data requested. 
Return and SwrResponse.

```typescript jsx
type Todo = {}

export default function (props) {
  const query = useQuery<Todo>('todos', {
    // the filter ro apply to the query
    filter: (q) => q.order('created_at', { ascending: false }),
    head: false,
    count: 'exact',
  });
  const {
    data
  } = useSelect(query, {
    // swr config here
  });
  // ...
  return (<></>)
}
```

### useSession

Subscribe to `authStateChange` event and always return the current session.
Useful to use inside component that need to change when the user sign-in or sign-out.

```typescript jsx
export default function (props) {
  const session = useSession();
  if (!session) return <>Need to sign-in to access this feature</>
  return (<>...</>)
}
```
## createQuery

Create a global `Query` to use with `useSelect` and other hooks.
The created query is also a [swr](https://github.com/vercel/swr) key and can be used with [mutate](https://swr.vercel.app/docs/mutation).

```typescript jsx
import { useSWRConfig } from 'swr';
import { useState } from 'react';
import { createClient } from 'supabase-js';
import { SwrSupabaseContext, useSelect, createQuery } from 'supabase-swr';

const client = createClient('https://xyzcompany.supabase.co', 'public-anon-key');

type Todo = {
  id: string,
  name: string,
  created_at: string,
}

const todosQuery = createQuery<Todo>('todos', {
  columns: '*',
  // the filter ro apply to the query
  filter: (q) => q.order('created_at', { ascending: false }),
})

function AddTodoForm() {
  const { mutate } = useSWRConfig()
  const client = useClient()
  const [todoName, setTodoName] = useState('')
  const addTodo = () => {
    client.from<Todo>('todos').insert({
      name: todoName,
    }).then(() => {
      // update the todosQuery inside the TodosList
      mutate(todosQuery)
      setTodoName('')
    })
  }
  return (
    <form name="add-todo">
      <input name="todo-name" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
      <button onClick={addTodo}>
        Add Todo
      </button>  
    </form>
  )
}

function TodosList() {
  const {
    data: {
      data: todos,
    },
  } = useSelect(todosQuery, {
    // swr config here
  });
  // ...
  return (
    <ul>
      {todos.map((todo: Todo) => (
        <li key={todo.id}>
          {todo.name}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <SwrSupabaseContext.Provider value={client}>
      <TodosList />
      <AddTodoForm />
    </SwrSupabaseContext.Provider>
  )
}
```

---

Inspired by [react-supabase](https://github.com/tmm/react-supabase).
