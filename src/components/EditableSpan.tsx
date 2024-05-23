import { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
  oldTitle: string;
  updateItem: (newTitle: string) => void;
};

export const EditableSpan = ({ oldTitle, updateItem }: PropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(oldTitle);

  const activateEditModeHandler = () => {
    setEditMode(!editMode);
    if (editMode) {
      updateItem(newTitle);
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return editMode ? (
    // <input
    //   value={newTitle}
    //   onChange={changeTitleHandler}
    //   onBlur={activateEditModeHandler}
    //   autoFocus
    // />
    <TextField
      variant="outlined"
      value={newTitle}
      onChange={changeTitleHandler}
      onBlur={activateEditModeHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditModeHandler}>{oldTitle}</span>
  );
};
