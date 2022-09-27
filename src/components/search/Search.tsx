import React, { useState, useContext, useEffect } from "react";
import { BookCtx } from "../../store/BookProvider";
import { BsSearch } from "react-icons/bs";
import "./styles/Search.css";

function Search() {
  const [result, setResult] = useState("");
  const inputCtx = useContext(BookCtx);

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (result === "") {
      alert("Cannot enter empty value");
      return;
    }
    inputCtx.onSetName(result);
    setResult("");
    window.scrollTo({ top: 3000, behavior: "smooth" });
  };

  return (
    <div className="section search__section" id="search">
      <div className="form__background"></div>
      <form onSubmit={submitForm} id="search">
        <input
          value={result}
          type="text"
          alt="Search Bar"
          onChange={(e) => setResult(e.target.value)}
        />

        <button>
          <BsSearch color="white" size={"2em"} />
        </button>
      </form>
    </div>
  );
}

export default Search;
