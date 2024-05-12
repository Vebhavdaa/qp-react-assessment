import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

interface Note {
  id: number;
  status: boolean;
  title: string;
  content: string;
}

interface NotesListProps {
  list: Note[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  handleStatus: (id: number) => void;
}

const NotesList: React.FC<NotesListProps> = ({ list, handleDelete, handleEdit, handleStatus }) => {
  return (
    <>
      {list.map((el) => {
        return (
          <div className="note" key={el.id}>
            <h1>{el.title}</h1>
            <p>{el.content}</p>
            <button onClick={() => handleEdit(el.id)} className="edit-button" aria-label={`Edit ${el.title}`}><EditIcon/></button>
            <button onClick={() => handleDelete(el.id)} className="delete-button" aria-label={`Delete ${el.title}`}><DeleteIcon/></button>
            <Checkbox checked={el.status} onChange={() => handleStatus(el.id)} aria-label={`Checkbox for ${el.title}`} />
          </div>
        );
      })}
    </>
  );
};

export default NotesList;
