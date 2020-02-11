export function fetchStudents(klass){
  return (dispatch) => {
    dispatch({ type: 'FETCH_STUDENTS_REQUEST' })
     fetch(`/klasses/${klass.id}/students`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          console.log(students)
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}
