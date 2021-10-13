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
---

Inspired by [react-supabase](https://github.com/tmm/react-supabase).
