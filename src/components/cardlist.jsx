import "./cardlist.css";
import Card from "./card.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardList = ({ courseList }) => {
  return (
    <div className="course-list">
      {Object.entries(courseList).map(([id, course]) => (
        <Card key={id} course={course} />
      ))}
    </div>
  );
};

export default CardList;
