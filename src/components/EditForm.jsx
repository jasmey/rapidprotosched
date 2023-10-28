import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForm.css";

const EditForm = ({ courses }) => {
  const { courseid } = useParams();
  const course = courses[courseid];
  const navigate = useNavigate();

  const [title, setTitle] = useState(course.title);
  const [meets, setMeetingTime] = useState(course.meets);

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const changeMeetingTime = (event) => {
    setMeetingTime(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();
  };

  const cancel = () => {
    navigate("/");
  };

  return (
    <div className="form-container">
      <form onSubmit={submit} className="form-component">
        <h4 className="edit-course-title">edit data for "{title}"</h4>
        <div className="submit-field">
          <label htmlFor="course-title">Course Title: </label>
          <input
            type="text"
            id="course-title"
            value={title}
            onChange={changeTitle}
          />
        </div>

        <div className="submit-field">
          <label htmlFor="course-meets">Course Meets: </label>
          <input
            type="text"
            id="course-meets"
            value={meets}
            onChange={changeMeetingTime}
          />
        </div>
        <button onClick={cancel} className="cancel-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditForm;
