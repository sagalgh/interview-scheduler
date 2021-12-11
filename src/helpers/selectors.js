export default function getAppointmentsForDay(state, day) {
  const filterDays= state.days.find((item)=> item.name === day)
  if(!filterDays){
    return []
  }
  const appointments = filterDays.appointments.map((item) => state.appointments[item])
  return appointments; 
}


