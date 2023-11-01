import "./card.css";
import { Link } from "react-router-dom";
import { useAuthState } from "../utilities/firebase";

const Card = ({
  id,
  course,
  selected,
  conflicting,
  toggleSelected,
  toggleConflicts,
  user,
  profile,
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
      <div className="top-of-card" data-cy="course">
        <h5 className="card-title">
          {course.term} CS {course.number}
        </h5>
        {profile?.isAdmin && (
          <Link
            to={`/editform/${id}`}
            onClick={(event) => event.stopPropagation()}
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
        )}
      </div>
      <p className="card-text">{course.title}</p>
      {/* divider */}
      <hr className="solid"></hr>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default Card;
