export function getAppointmentsForDay(state, day) {
  const filterDay= state.days.find((item)=> item.name === day)
  if(!filterDay){
    return []
  }
  const appointments = filterDay.appointments.map((item) => state.appointments[item])
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

  export function getInterviewersForDay(state, day){
      const filterDay= state.days.find((item)=> item.name === day)
      if(!filterDay){
        return []
      }
      const interviewers = filterDay.interviewers.map((interviewerId) => state.interviewers[interviewerId])
      return interviewers; 
    }

