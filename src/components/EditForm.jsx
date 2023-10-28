import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditForm.css";
import { useDbUpdate } from "../utilities/firebase";
import { useFormData } from "../utilities/useFormData";

const validateUserData = (key, val) => {
  switch (key) {
    case "course-title":
      return /(^\w\w)/.test(val) ? "" : "must be least two characters";
    case "course-meets":
      return /^[A-Z]{1,4} \d{2}:\d{2}-\d{2}:\d{2}$/.test(val)
        ? ""
        : 'must be in "MWF 10:00-11:50" format';
    default:
      return "";
  }
};

const InputField = ({ name, text, value, state, change }) => (
  <div className="mb-3">
    <label htmlFor={name} className="form-label">
      {text}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={value}
      onChange={change}
    />
    <div className="invalid-feedback">{state.errors?.[name]}</div>
  </div>
);

const ButtonBar = ({ message, disabled }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex">
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary me-auto"
        disabled={disabled}
      >
        Submit
      </button>
      <span className="p-2">{message}</span>
    </div>
  );
};

const EditForm = ({ user, courses }) => {
  const [update, result] = useDbUpdate(`/users/${user.id}`);
  const [state, change] = useFormData(validateUserData, user);

  const submit = (evt) => {
    evt.preventDefault();
    if (!state.errors) {
      update(state.values);
    }
  };

  const currentURL = window.location.href;
  const editformIndex = currentURL.indexOf("editform/");
  const courseID = currentURL.substring(editformIndex + 9);

  let course = courses[courseID];

  return (
    <form
      onSubmit={submit}
      noValidate
      className={state.errors ? "was-validated" : null}
    >
      <br />
      <h2 className="over">..........................................</h2>
      <h2>
        modify course details for CS {course.number}: {course.title}
      </h2>
      <h2 className="under">'''''''''''''''''''''''''''''''''''''''''</h2>
      <InputField
        name="course-title"
        text="Change Course Title"
        value={course.title}
        state={state}
        change={change}
      />
      <InputField
        name="course-meets"
        text="Change Course Meeting Time"
        value={course.meets}
        state={state}
        change={change}
      />
      <ButtonBar message={result?.message} />
    </form>
  );
};

export default EditForm;
