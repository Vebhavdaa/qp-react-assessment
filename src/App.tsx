import React, { useEffect, useState } from "react";
import "./App.css";
import CreateArea from "./Components/CreateArea";
import Header from "./Components/Header";
import NotesList from "./Components/NotesList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Note {
  id: number;
  status: boolean;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const initialList: Note[] = JSON.parse(localStorage.getItem("list") || "[]");

  const [list, setList] = useState<Note[]>(initialList);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      notifyWarning("Please fill all the fields");
      return;
    }
    if (editMode) {
      handleEditNote();
    } else {
      addNewNote();
    }
  };

  const notifySuccess = (message: string) => {
    toast.success(message, { autoClose: 2000 });
  };

  const notifyWarning = (message: string) => {
    toast.warning(message, { autoClose: 2000 });
  };

  const addNewNote = () => {
    const newNote: Note = {
      id: new Date().getTime(),
      status: false,
      title: title,
      content: content,
    };
    setList([...list, newNote]);
    clearInputs();
    notifySuccess("Added Successfully");
  };

  const handleEditNote = () => {
    const updatedList = list.map((el) =>
      el.id === editId ? { ...el, title: title, content: content } : el
    );
    setList(updatedList);
    clearInputs();
    setEditMode(false);
    setEditId(null);
    notifySuccess("Edited Successfully");
  };

  const handleDelete = (id: number) => {
    const updatedList = list.filter((note) => note.id !== id);
    setList(updatedList);
    notifySuccess("Deleted Successfully");
  };

  const handleEdit = (id: number) => {
    const editNote = list.find((note) => note.id === id);
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
      setEditId(id);
      setEditMode(true);
    }
  };

  const handleStatus = (id: number) => {
    const updatedList = list.map((note) =>
      note.id === id ? { ...note, status: !note.status } : note
    );
    setList(updatedList);
    const statusMessage = updatedList.find((note) => note.id === id)?.status
      ? "complete"
      : "incomplete";
    const confirmation = window.confirm(
      `Are you sure you want to mark this ${statusMessage}?`
    );
    if (!confirmation) {
      setList(list);
    }
  };

  const clearInputs = () => {
    setTitle("");
    setContent("");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <CreateArea
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSubmit={handleSubmit}
      />
      <NotesList
        list={list}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleStatus={handleStatus}
      />

    </div>
  );
};

export default App;
