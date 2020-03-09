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
          dispatch({ type: 'FETCH_STUDENTS', students })
        }
      })
      .catch(console.log)
  }
}

export function addStudent(klass, studentData){
  return (dispatch) => {
    dispatch({ type: 'ADD_STUDENT_REQUEST' })
     fetch(`/klasses/${klass.id}/students`, {
      method: "POST",
      body: JSON.stringify(studentData),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){

        } else {
          dispatch({ type: 'ADD_STUDENT', student })
        }
      })
      .catch(console.log)
  }
}

export function swapSeats(klass, student1, student2){
  return (dispatch) => {
    dispatch({ type: 'SWAP_STUDENTS_REQUEST2' })
    const params = {studentId1: student1.id, studentId2: student2.id}
     fetch(`/klasses/${klass.id}/students/swap`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(students => {
        if (students.error){

        } else {
          dispatch({ type: 'SWAP_STUDENTS2', students })
        }
      })
      .catch(console.log)
  }
}

export function newSeat(klass, student, seat){
  return dispatch => {
    dispatch({ type: 'NEW_SEAT_REQUEST', student, seat })
    const params = {seat: seat}
     fetch(`/klasses/${klass.id}/students/${student.id}`, {
      method: "PATCH",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){

        } else {
          dispatch({ type: 'NEW_SEAT', student })
        }
      })
      .catch(console.log)
  }
}

export function deleteStudent(klass, student){
  return (dispatch) => {
    dispatch({ type: 'DELETE_STUDENT_REQUEST' })
     fetch(`/klasses/${klass.id}/students/${student.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(student => {
        if (student.error){

        } else {
          dispatch({ type: 'DELETE_STUDENT', student })
        }
      })
      .catch(console.log)
  }
}
