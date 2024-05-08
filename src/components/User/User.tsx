import { FC, memo } from "react";

import styles from "./User.module.css";
import { IUser } from "../../types";

interface UserProps extends IUser {
  clickHandler: (id: number) => void;
}

export const User: FC<UserProps> = memo(({ id, name, count, clickHandler }) => {
  console.log("render User", name);
  return (
    <li className={styles.user}>
      <span>{name}</span>
      <button
        onClick={() => {
          clickHandler(id);
        }}
      >
        +
      </button>
      <span>{count}</span>
    </li>
  );
});
