import Card from "./card.jsx";
import "./cardlist.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardList = ({ courseList }) => (
  <div className="course-list">
    {courseList.map((course) => (
      <Card key={course.number} course={course} />
    ))}
  </div>
);

export default CardList;
