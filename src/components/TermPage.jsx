import { useState } from "react";
import CardList from "./cardlist";
import "./TermPage.css";
import Modal from "./Modal";
import Cart from "./Cart";
import { find_conflict } from "../utilities/calcconflicts";
import { useAuthState } from "../utilities/firebase";

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
      data-cy={term}
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
const TermPage = ({ courses, profile }) => {
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

  /////////////////////////
  //state variable for toggling non-conflicting
  const [conflicting, setConflicting] = useState([]);
  const [causeOfConflict, setCauseOfConflict] = useState([]);

  const find_conflicts = (course, courses) => {
    //course is Javascript object and courses is a object of courses;
    const classconflicts = Object.entries(courses).filter(
      ([courseKey, courseValue]) =>
        find_conflict(course.meets, courseValue.meets)
    );
    // console.log("Class conflicts:", classconflicts);
    return classconflicts; //array of class key-value duples
  };

  const toggleConflicts = (item) => {
    // //conflicting is an array of duples
    console.log("2 conflicts:", find_conflicts(courses[item], courses));

    let newConflicting = [...conflicting];
    let newCauseOfConflict = [...causeOfConflict];
    find_conflicts(courses[item], courses).forEach((conflict) => {
      console.log("conflict", conflict);
      const index = newConflicting.indexOf(conflict[0]);
      console.log("includes eval", newCauseOfConflict.includes(item));

      if (newCauseOfConflict.includes(item)) {
        newConflicting.splice(index, 1); //remove from conflicting
      } else {
        if (conflict[0] !== item) {
          newConflicting = [...newConflicting, conflict[0]]; //add to conflicting
        }
      }
      console.log("newC", newConflicting);
      console.log("");
    });

    if (newCauseOfConflict.includes(item)) {
      const index2 = causeOfConflict.indexOf(item);
      newCauseOfConflict.splice(index2, 1); //remove from causeOfConflict
    } else {
      newCauseOfConflict = [...newCauseOfConflict, item]; //add to causeOfConflict
    }

    console.log("newCOC", newCauseOfConflict);

    setConflicting(newConflicting);
    setCauseOfConflict(newCauseOfConflict);
  };

  ///////////////////////
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const convCourses = Object.fromEntries(
    Object.entries(courses).filter(([courseKey, courseValue]) =>
      selected.includes(courseKey)
    )
  );

  const [user] = useAuthState();

  return (
    <div>
      <div className="selectorncart">
        <TermSelector selection={selection} setSelection={setSelection} />
        <button className="cartbtn btn btn-outline-dark" onClick={openModal}>
          <i className="bi bi-cart4"></i>
        </button>
      </div>

      <Modal open={open} close={closeModal}>
        <Cart selected={selected} courses={convCourses} />
      </Modal>
      <CardList
        courseList={filtered_courses}
        selected={selected}
        conflicting={conflicting}
        toggleSelected={toggleSelected}
        toggleConflicts={toggleConflicts}
        user={user}
        profile={profile}
      />
    </div>
  );
};
export default TermPage;
