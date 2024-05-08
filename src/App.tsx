import { useCallback, useRef, useState } from "react";
import { User } from "./components/User";
import { AddUser } from "./components/AddUser";
import { IUser } from "./types";

import "./App.css";

export const App = () => {
  const [count, setCount] = useState(0);
  const [, setChangedUser] = useState<IUser | null>(null);
  const users = useRef<IUser[]>([
    { name: "user_first", id: 1, count: 0 },
    { name: "user_second", id: 2, count: 0 },
    { name: "user_third", id: 3, count: 0 },
  ]).current;

  const clickHandler = useCallback(
    (id: number) => {
      const user = users.find((item) => item.id === id);
      if (!user) return;
      user.count += 1;
      setChangedUser({ ...user });
    },
    [users]
  );

  const onAddUser = useCallback(
    (name: string) => {
      const lastUser = users[users.length - 1];
      const id = lastUser.id + 1;
      const user: IUser = { id, name, count: 0 };
      users.push(user);
      setChangedUser({ ...user });
    },
    [users]
  );

  console.log("render App", users);

  return (
    <div className="container">
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <ul className="container">
        {users.map(({ id, name, count }) => {
          return <User key={id} {...{ id, name, count, clickHandler }} />;
        })}
      </ul>
      <AddUser {...{ onAddUser }} />
    </div>
  );
};
