import React, { useEffect, useState } from "react";
import "./styles/Search.css";
interface searchProps {
  onHandleInput: (input: string) => void;
}
function Search(props: searchProps) {
  const [result, setResult] = useState("");

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!result) {
      alert("It must be an accident, insert a value");
      return;
    }
    props.onHandleInput(result);
    setResult("");
  };

  return (
    <div className="section search__section" id="search">
      <div className="form__background"></div>
      <form onSubmit={submitForm} id="search">
        <input
          value={result}
          type="text"
          onChange={(e) => setResult(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Search;
