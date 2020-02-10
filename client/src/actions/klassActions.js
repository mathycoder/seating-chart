export function fetchKlasses(){
  return (dispatch) => {
    dispatch({ type: 'FETCH_KLASSES_REQUEST' })
     fetch(`/klasses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then(resp => resp.json())
      .then(klasses => {
        if (klasses.error){

        } else {
          console.log(klasses)
          dispatch({ type: 'FETCH_KLASSES', klasses })
        }
      })
      .catch(console.log)
  }
}
