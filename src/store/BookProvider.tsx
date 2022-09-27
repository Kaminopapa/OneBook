import React, { createContext, useState } from "react";

export const BookCtx = createContext({
  id: "",
  name: "",
  contentId: "",
  onSetId: (id: string) => {},
  onSetName: (name: string) => {},
  onSetContentId: (id: string) => {},
});
interface providerProps {
  children: React.ReactNode;
}
const BookProvider = (props: providerProps) => {
  const [id, setId] = useState("");
  const [name, setBookName] = useState("");
  const [contentId, setContentId] = useState("");
  const idHandler = (id: string) => {
    setId(id);
  };
  const handleName = (InputName: string) => {
    setBookName(InputName);
  };
  const contentIdHandler = (ctId: string) => {
    setContentId(ctId);
  };
  return (
    <BookCtx.Provider
      value={{
        id,
        name,
        contentId,
        onSetContentId: contentIdHandler,
        onSetId: idHandler,
        onSetName: handleName,
      }}
    >
      {props.children}
    </BookCtx.Provider>
  );
};

export default BookProvider;
