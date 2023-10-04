import React from 'react';

function courselist(courses, prm1, prm2, prm3) {

    const courseInfo = [];

    for (let course in courses){
        courseInfo.push(<p>{course[prm1]} CS {course[prm2]}: {course[prm3]}\n</p>);
    }
    return(
        <div>
            {courseInfo}
        </div>
    ); 
}