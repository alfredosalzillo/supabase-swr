# supabase-swr

A component library to use [supabase-js](https://github.com/supabase/supabase-js) with [swr](https://github.com/vercel/swr)

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
import { useClient, useSelect, useSelectKey } from 'supabase-swr';

const Todos = () => {
  const todosKey = useSelectKey('todos', {
    filter: (query) => query.order('created_at', { ascending: false }),
  }, []);
  const {
    data: {
      data: todos,
    },
    mutate,
  } = useSelect(todosKey, {
    // any swr config
    revalidateOnMount: true,
    suspense: true,
  });
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.name}
        </li>
      ))}
    </ul>
  );
}
```

---

Inspired by [react-supabase](https://github.com/tmm/react-supabase).
