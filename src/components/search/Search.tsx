import React, { useRef } from "react";
import { useAddDispatch } from "../../store";
import { getName } from "../../store/books";
import { BsSearch } from "react-icons/bs";
import "./styles/Search.css";

function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAddDispatch();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    dispatch(getName(value));
    inputRef.current.value = "";

    window.scrollTo({ top: 3000, behavior: "smooth" });
  };

  return (
    <div className="section search__section" id="search">
      <div className="form__background"></div>
      <form onSubmit={submitForm} id="search">
        <input
          ref={inputRef}
          type="text"
          alt="Search Bar"
          placeholder="按主题搜索"
        />

        <button>
          <BsSearch color="white" size={"2em"} />
        </button>
      </form>
    </div>
  );
}

export default Search;
