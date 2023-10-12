import "./cardlist.css";
import Card from "./card.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardList = ({ courseList, selected, toggleSelected }) => {
  return (
    <div className="course-list">
      {Object.entries(courseList).map(([id, course]) => (
        <Card
          key={id}
          id={id}
          course={course}
          selected={selected}
          toggleSelected={toggleSelected}
        />
      ))}
    </div>
  );
};

export default CardList;
