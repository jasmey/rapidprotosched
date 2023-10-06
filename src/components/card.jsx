import "./card.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Card = ({ course }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <h5 className="card-title">
        {course.term} CS {course.number}
      </h5>
      <p className="card-text">{course.title}</p>
      {/* divider */}
      <hr class="solid"></hr>
      <p className="card-text">{course.meets}</p>
    </div>
  </div>
);

export default Card;
