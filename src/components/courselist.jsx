import React from 'react';

export function Courselist(courses, prm1, prm2, prm3) {

    const courseElems = [];

    for (let course in courses){
        const prmx = course[prm1];
        const prmy = course[prm2];
        const prmz = course[prm3];
        
        const courseElem = (
            <p key={course}> 
                {prmx} CS {prmy}: {prmz}
            </p>
        );
        courseElems.push(courseElem);
    }
    return(
        <section>
            {courseElems}
        </section>
    ); 
}