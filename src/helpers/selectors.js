export function getAppointmentsForDay(state, day) {
  const filterDays= state.days.find((item)=> item.name === day)
  if(!filterDays){
    return []
  }
  const appointments = filterDays.appointments.map((item) => state.appointments[item])
  return appointments; 



}
  export  function getInterview(state, interview){
    if(!interview){
      return null
    }
    const student= interview.student
    const interviewer= state.interviewers[interview.interviewer]
    const selectInterview = {student,interviewer}
    return selectInterview
    }

  



  // {state.appointments.id.interview.student,
  // state.appointments.id.interview.interviewer
  // {  
  //   "student": "Lydia Miller-Jones",
  //   "interviewer": {  
  //     "id": 1,
  //     "name": "Sylvia Palmer",
  //     "avatar": "https://i.imgur.com/LpaY82x.png"
  //   }
  // }