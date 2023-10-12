import { useState } from "react";
import CardList from "./cardlist";
import "./TermPage.css";

const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ term, selection, setSelection }) => (
  <div className="btn_style">
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label
      className={`btn_style ${
        term === selection ? "btn-selected" : "btn-unselected"
      } btn btn-success mb-1 p-2`}
      htmlFor={term}
    >
      {term}
    </label>
  </div>
);
const TermSelector = ({ selection, setSelection }) => (
  <div className="btn-group">
    {terms.map((t) => (
      <TermButton
        key={t}
        term={t}
        selection={selection}
        setSelection={setSelection}
      />
    ))}
  </div>
);

const TermPage = ({ courses }) => {
  const [selection, setSelection] = useState("Fall");
  const filtered_courses = Object.fromEntries(
    Object.entries(courses).filter(
      ([courseKey, courseValue]) => courseValue.term === selection
    )
  );
  return (
    <div>
      <TermSelector selection={selection} setSelection={setSelection} />
      <CardList courseList={filtered_courses} />
    </div>
  );
};
export default TermPage;
