import { FC, memo, useCallback, useMemo, useState } from "react";

import style from "./AddUser.module.css";

interface AddUserProps {
  onAddUser: (name: string) => void;
}

export const AddUser: FC<AddUserProps> = memo(({ onAddUser }) => {
  const [inputsNumber, setInputsNumber] = useState<number>(1);

  const inputs: JSX.Element[] = useMemo(() => {
    console.log("inputs changed");
    const inputs: JSX.Element[] = [];
    for (let i = 1; i <= inputsNumber; i++) {
      inputs.push(<input key={i} type="text" name={`new_user${i}`} />);
    }
    return inputs;
  }, [inputsNumber]);

  const submitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      console.log("submitHandler created");
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form));
      Object.values(data).forEach((item) => {
        if (!item || typeof item !== "string") return;
        onAddUser(item);
      });
      form.reset();
    },
    [onAddUser]
  );

  const changeHandler = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      console.log("changeHandler created");
      const input = event.currentTarget;
      const value = Number(input.value);
      if (!value || value < 1) {
        input.value = "1";
        setInputsNumber(1);
        return;
      }
      if (value > 99) {
        input.value = "99";
        setInputsNumber(99);
        return;
      }
      setInputsNumber(value);
    },
    []
  );

  console.log("render AddUser");

  return (
    <div className={style.add_user}>
      <label className={style.numberLabel}>
        <span>Enter number of inputs</span>
        <input type="number" defaultValue={1} onBlur={changeHandler} />
      </label>
      <form className="container" {...{ onSubmit: submitHandler }}>
        {inputs}
        <button>add users</button>
      </form>
    </div>
  );
});
