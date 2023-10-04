import React from "react";

function Courselist({ courses, prm1, prm2, prm3 }) {
  const courseElems = [];

  for (let ckey in courses) {
    //loop through different string keys
    const course = courses[ckey];
    const prmx = course[prm1];
    const prmy = course[prm2];
    const prmz = course[prm3];

    const courseElem = (
      <p key={ckey}>
        {prmx} CS {prmy}: {prmz}
      </p>
    );
    courseElems.push(courseElem);
  }
  return <section>{courseElems}</section>;
}
export default Courselist;
