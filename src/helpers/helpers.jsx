import { eventSchedules } from '../data'



export const findCurrentTimeToShow = (currentTime) => {
    // console.log("eventSchedules====>", eventSchedules)

    let item = eventSchedules.filter((e, i) => currentTime >= e.timeToShow)
    return item[item.length - 1]
    // console.log("~~~~~~~~~~~~~~~~~~~>>>", item[item.length - 1].id)
}