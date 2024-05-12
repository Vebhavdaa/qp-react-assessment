import React from "react";
import AddIcon from "@mui/icons-material/Add";

interface CreateAreaProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const CreateArea: React.FC<CreateAreaProps> = ({
  title,
  setTitle,
  content,
  setContent,
  handleSubmit,
}) => {
  return (
    <div>
      <form data-testid="create-area-form" className="create-note" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value.trimStart())}
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          placeholder="Take a note..."
          value={content}
          onChange={(e) => setContent(e.target.value.trimStart())}
        />
        <button type="submit" aria-label="Add Note">
          <AddIcon />
        </button>
      </form>
    </div>
  );
};

export default CreateArea;
