import { useState } from "react";
import CardList from "./cardlist";
import "./TermPage.css";
import Modal from "./Modal";
import Cart from "./Cart";

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

// state variable for term buttons
const TermPage = ({ courses }) => {
  const [selection, setSelection] = useState("Fall");
  const filtered_courses = Object.fromEntries(
    Object.entries(courses).filter(
      ([courseKey, courseValue]) => courseValue.term === selection
    )
  );

  //state variable for toggling selected
  const [selected, setSelected] = useState([]);

  const toggleSelected = (item) =>
    setSelected(
      selected.includes(item)
        ? selected.filter((x) => x !== item)
        : [...selected, item]
    );

  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const convCourses = Object.fromEntries(
    Object.entries(courses).filter(([courseKey, courseValue]) =>
      selected.includes(courseKey)
    )
  );

  if (Array.isArray(selected)) {
    console.log("is array");
  } else {
    console.log("is not array");
  }

  return (
    <div>
      <div>
        <TermSelector selection={selection} setSelection={setSelection} />
        <button className="btn btn-outline-dark" onClick={openModal}>
          <i className="bi bi-cart4"></i>
        </button>
      </div>

      <Modal open={open} close={closeModal}>
        <Cart selected={selected} courses={convCourses} />
      </Modal>
      <CardList
        courseList={filtered_courses}
        selected={selected}
        toggleSelected={toggleSelected}
      />
    </div>
  );
};
export default TermPage;
