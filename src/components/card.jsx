import "./card.css";

const Card = ({
  id,
  course,
  selected,
  conflicting,
  toggleSelected,
  toggleConflicts,
}) => (
  <div
    className="card m-1 p-2"
    onClick={() => {
      if (!conflicting.includes(id)) {
        //if card is not a conflicting class
        toggleSelected(id);
        toggleConflicts(id);
      }
    }}
  >
    <div
      className={`card-body ${selected.includes(id) ? "selected" : ""} ${
        conflicting.includes(id) ? "conflicting" : "notconflicting"
      }`}
    >
      <h5 className="card-title">
        {course.term} CS {course.number}
      </h5>
      <p className="card-text">{course.title}</p>
      {/* divider */}
      <hr className="solid"></hr>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default Card;
