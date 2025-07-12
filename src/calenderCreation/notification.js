import React, { Component } from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { Modal } from 'antd';// TimePicker
// import dayjs from 'dayjs';
// import moment from 'moment'

export default class notification extends Component {
  constructor() {
    super()
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.format = 'HH:mm'
    this.state = {
      display: false,
      dateWiseProgramFix: [],
      time: new Date(),
      calender: {
        month: [],
        day: "",
        week: {
          start: "",
          end: ""
        },
        currentMonth: new Date().getMonth(),
        currentMonthName: months[new Date().getMonth()],
        currentYear: new Date().getFullYear(),
      },
      currentDay: '',
      dayWiseEvents: [],
      copyDayWiseEvent: [],
      eventMessage: "",
      startStartTime: "",
      startEndTime: "",
      endStartTime: "",
      endEndTime: "",
      currentDayEventListPosition: "",
      editStartStartTime: "",
      editStartEndTime: "",
      editEndStartTime: "",
      editEndEndTime: "",
      editEventMessage: "",
      dayWiseEventsLoad: []
    }
  }
  demo(data) {
    console.log("data", data.id)
    this.setState({ display: true, dayWiseEvents: [...data.dayEvent], currentDay: data.dayPosition })
  }
  componentDidMount() {
    this.interval = setInterval(this.updateTime, 1000);
    this.getFullYearOfDate()
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  updateTime = () => {
    this.setState({
      time: new Date()
    });
  }
  getFullYearOfDate = () => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let stateObjectCopy = this.state.calender
    stateObjectCopy.month = []
    for (var i = 0; i < 12; i++) {
      let empty = []
      let monthValue = i + 1
      let idCount = 0
      for (var j = 1; j <= new Date(this.state.calender.currentYear, monthValue, 0).getDate(); j++) {
        let dayValue = j
        if (j === 1) {
          if (dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()] === "Sunday") {
            empty.push({})
            empty.push({})
            empty.push({})
            empty.push({})
            empty.push({})
            empty.push({})
            idCount = 6
          } else if (dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()] === "Tuesday") {
            empty.push({})
            idCount = 1
          } else if (dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()] === "Wednesday") {
            empty.push({})
            empty.push({})
            idCount = 2
          } else if (dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()] === "Thursday") {
            empty.push({})
            empty.push({})
            empty.push({})
            idCount = 3
          } else if (dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()] === "Friday") {
            empty.push({})
            empty.push({})
            empty.push({})
            empty.push({})
            idCount = 4
          } else if (dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()] === "Saturday") {
            empty.push({})
            empty.push({})
            empty.push({})
            empty.push({})
            empty.push({})
            idCount = 5
          }
        }
        empty.push({ id: j, dayPosition: j + idCount, dayName: dayNames[new Date(`${this.state.calender.currentYear}-${monthValue > 9 ? monthValue : "0" + monthValue}-${dayValue > 9 ? dayValue : "0" + dayValue}`).getDay()], dayEvent: [] })
      }
      stateObjectCopy.month.push(empty)
    }
    let dayData=stateObjectCopy.month[this.state.calender.currentMonth][new Date().getDate()].dayEvent
    this.setState({ calender: stateObjectCopy,dayWiseEventsLoad:dayData})
  }
  eventsAdd = () => {
    if (this.state.startStartTime && this.state.startEndTime && this.state.endStartTime && this.state.endEndTime && this.state.eventMessage) {
      const eventslist = [...this.state.dayWiseEvents]
      eventslist.push({ startTimeEvent: this.state.startStartTime + ":" + this.state.startEndTime, endTimeEvent: this.state.endStartTime + ":" + this.state.endEndTime, event: this.state.eventMessage })
      const copyEventPosition = [...this.state.copyDayWiseEvent]
      copyEventPosition.push(eventslist.length - 1)
      const copyCalender = { ...this.state.calender }
      copyCalender.month[this.state.calender.currentMonth][this.state.currentDay - 1].dayEvent = eventslist
      this.setState({ dayWiseEvents: eventslist,dayWiseEventsLoad:eventslist,copyDayWiseEvent: copyEventPosition, eventMessage: "", calender: copyCalender, endStartTime: "", endEndTime: "", startEndTime: "", startStartTime: "" })
    }
  }
  stateTimeEndChange = (e, time) => {
    if (time === "startStartTime") {
      this.setState({ startStartTime: e.target.value })
    } else if (time === "startEndTime") {
      this.setState({ startEndTime: e.target.value })
    } else if (time === "endStartTime") {
      this.setState({ endStartTime: e.target.value })
    } else if (time === "endEndTime") {
      this.setState({ endEndTime: e.target.value })
    }
  }
  deleteDayWiseEvent = (position) => {
    const dayEventDelete = this.state.dayWiseEvents.filter((res, k) => {
      return (k !== position)
    })
    let copyDeletePosition = [...this.state.copyDayWiseEvent]
    let index = copyDeletePosition.indexOf(position);
    if (index !== -1) {
      copyDeletePosition.splice(index, 1);
    }
    const copyCalender = { ...this.state.calender }
    copyCalender.month[this.state.calender.currentMonth][this.state.currentDay - 1].dayEvent = dayEventDelete
    this.setState({ dayWiseEvents: dayEventDelete, calender: copyCalender, copyDayWiseEvent: copyDeletePosition,dayWiseEventsLoad:dayEventDelete})
  }
  editDayWiseEvent = (position) => {
    const eventCopy = this.state.dayWiseEvents[position]
    this.setState({ currentDayEventListPosition: position, editStartStartTime: eventCopy.startTimeEvent.split(":")[0], editStartEndTime: eventCopy.startTimeEvent.split(":")[1], editEndStartTime: eventCopy.endTimeEvent.split(":")[0], editEndEndTime: eventCopy.endTimeEvent.split(":")[1], editEventMessage: eventCopy.event })
  }
  updateEventList = (position) => {
    const updateEventCopy = [...this.state.dayWiseEvents]
    updateEventCopy[position].startTimeEvent = this.state.editStartStartTime + ":" + this.state.editStartEndTime
    updateEventCopy[position].endTimeEvent = this.state.editEndStartTime + ":" + this.state.editEndEndTime
    updateEventCopy[position].event = this.state.editEventMessage
    const copyCalender = { ...this.state.calender }
    copyCalender.month[this.state.calender.currentMonth][this.state.currentDay - 1].dayEvent = updateEventCopy
    this.setState({ dayWiseEvents: updateEventCopy,dayWiseEventsLoad:updateEventCopy,currentDayEventListPosition: "", calender: copyCalender})
  }
  cancelUpDate = () => {
    let positionList = this.state.dayWiseEvents.map((eve, i) => {
      return i
    })
    positionList = positionList.filter(item => !this.state.copyDayWiseEvent.includes(item))
    let copyEventList = positionList.map((ev, j) => { return this.state.dayWiseEvents[ev] })
    const copyCalender = { ...this.state.calender }
    copyCalender.month[this.state.calender.currentMonth][this.state.currentDay - 1].dayEvent = copyEventList
    this.setState({ dayWiseEvents: copyEventList,dayWiseEventsLoad:copyEventList,display: false, copyDayWiseEvent: [], calender: copyCalender })
  }
  currentDayEvent = (dayPosition) => {
    console.log("dayPosition.dayEvent", dayPosition.dayEvent)
    this.setState({ dayWiseEventsLoad: [...dayPosition.dayEvent] })
    // console.log(this.state.dayWiseEventsLoad)
  }
  currentMonthChange = (monthChange) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    if (monthChange === "front") {
      const copyCalender = { ...this.state.calender }
      let monthCount = copyCalender.currentMonth + 1
      if (monthCount === 12) {
        let yearCountIncrease = copyCalender.currentYear + 1
        console.log(yearCountIncrease)
        copyCalender.currentYear = yearCountIncrease
        this.setState({ calender: copyCalender })
        setTimeout(() => {
          this.getFullYearOfDate()
        }, 10)
        monthCount = 0
      }
      copyCalender.currentMonth = monthCount
      copyCalender.currentMonthName = months[monthCount]
      this.setState({ calender: copyCalender })
    } else {
      const copyCalender = { ...this.state.calender }
      let monthCount = copyCalender.currentMonth - 1
      if (monthCount === -1) {
        let yearCountIncrease = copyCalender.currentYear - 1
        console.log(yearCountIncrease)
        copyCalender.currentYear = yearCountIncrease
        this.setState({ calender: copyCalender })
        setTimeout(() => {
          this.getFullYearOfDate()
        }, 10)
        monthCount = 11
      }
      copyCalender.currentMonth = monthCount
      copyCalender.currentMonthName = months[monthCount]
      this.setState({ calender: copyCalender })
    }
  }
  render() {
    const { time } = this.state;
    const { currentMonth } = this.state.calender;
    const timeInHour = ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
    const timeInMinute = ["", "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"]
    return (
      <>
        <div className='w-screen h-auto flex  p-14 '>
          <div className='flex flex-wrap flex-row  w-screen h-auto justify-evenly bg-gradient-to-r from-pink-100 to-green-100'>
            <div className='w-[40%] h-auto text-left p-10'>
              <div className='flex flex-warp flex-col items-center gap-5 h-auto'>
                <div className='text-left w-80 p-4' >
                  <h1 className='font-bold text-2xl'><b>Upcoming Events</b></h1>
                  <p className='text-xs'>Don't Miss Scheduled Evevts</p>
                </div>
                {this.state.dayWiseEventsLoad?.map((dayEt, i) => {
                  return (<div key={i} className='text-left shadow-md bg-white w-80 p-4 rounded'>
                    <div>                      <p className='text-end'>...</p>
                      <p className='text-blue-600'>${dayEt.startTimeEvent}-{dayEt.endTimeEvent}</p>
                      <h5><b>{dayEt.event}</b></h5>
                      <p className='text-xs'></p>
                    </div>
                  </div>)
                })
                }
              </div>
            </div>
            <div className='shadow-md bg-white w-[60%] p-3 flex flex-col gap-5'>
              <div className="flex flex-warp justify-between">
                <div className='flex gap-1 bg-green-50 p-4 h-16'>
                  <button className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-50 w-16 p-1 text-center text-blue-900'>Month</button>
                  <button className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-500 w-16 p-1 text-center text-blue-900'>Week</button>
                  <button className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-500 w-16 p-1 text-center text-blue-900'>Day</button>
                </div>
                <div className="p-2 h-16">
                  <h1 className='text-base'><b>{time.toLocaleTimeString()}</b></h1>
                  <p className='text-blue-600 text-xs'>30.2°F San Francisco</p>
                </div>
              </div>
              <div className='flex flex-wrap flex-row justify-between'>
                <div className='text-center'>
                  <h1 className='text-lg font-bold'>{this.state.calender.currentMonthName}  {this.state.calender.currentYear}</h1>
                </div>
                <div className='flex items-center w-20 justify-between'>
                  <div className='flex items-center justify-center border rounded w-8 h-8 '>
                    <IoIosArrowBack size={20} color='blue' onClick={() => { this.currentMonthChange("back") }} />
                  </div>
                  <div className='flex items-center justify-center border rounded w-8 h-8 '>
                    <IoIosArrowForward size={20} color='blue' onClick={() => { this.currentMonthChange("front") }} />
                  </div>
                </div>
              </div>
              <div className='text-blue-600'>
                <Modal title="Basic Modal" open={this.state.display} footer={null} onCancel={() => this.setState({ display: false, copyDayWiseEvent: [] })}>
                  <div className='flex flex-col justify-evenly gap-10'>
                    <div className='flex flex-wrap flex-col gap-6'>
                      <div className="flex gap-3">
                        <div className='flex flex-col flex-wrap'>
                          <div>
                            <label>Start Time</label>
                          </div>
                          <div className='flex'>
                            <select className="p-2 text-center" value={this.state.startStartTime} onChange={(event) => { this.stateTimeEndChange(event, "startStartTime") }}>
                              {timeInHour.map((option, index) => (
                                <option className="text-center" key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <select className="p-2 text-center" value={this.state.startEndTime} onChange={(event) => { this.stateTimeEndChange(event, "startEndTime") }}>
                              {timeInMinute.map((option, index) => (
                                <option className="text-center" key={index} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <div className='flex flex-col flex-wrap'>
                            <div>
                              <label>End Time</label>
                            </div>
                            <div className='flex'>
                              <select className="p-2 text-center" value={this.state.endStartTime} onChange={(event) => { this.stateTimeEndChange(event, "endStartTime") }}>
                                {timeInHour.map((option, index) => (
                                  <option className="text-center" key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                              <select className="p-2 text-center" value={this.state.endEndTime} onChange={(event) => { this.stateTimeEndChange(event, "endEndTime") }}>
                                {timeInMinute.map((option, index) => (
                                  <option className="text-center" key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className='flex pt-5 pr-5 gap-1 flex-row'>
                          <input className="border-2 border-black outline-none" onChange={(event) => { this.setState({ eventMessage: event.target.value }) }} placeholder='Enter Event Details' value={this.state.eventMessage} />
                          <button onClick={() => this.eventsAdd()} className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-50 w-16 p-1 text-center text-blue-900'>Add</button>
                        </div>
                      </div>
                      <div className='flex flex-wrap  gap-2 max-h-60 w-full overflow-scroll'>
                        {
                          this.state.dayWiseEvents.map(
                            (events, j) => {
                              return (
                                (j === this.state.currentDayEventListPosition) ?
                                  <div key={j} className='flex flex-wrap flex-row break-words w-full gap-2'>
                                    <div className='flex flex-col flex-wrap'>
                                      <div>
                                        <label>Start Time</label>
                                      </div>
                                      <div className='flex'>
                                        <select className="p-2 text-center" value={this.state.editStartStartTime} onChange={(event) => { this.setState({ editStartStartTime: event.target.value }) }}>
                                          {timeInHour.map((option, index) => (
                                            <option className="text-center" key={index} value={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                        <select className="p-2 text-center" value={this.state.editStartEndTime} onChange={(event) => { this.setState({ editStartEndTime: event.target.value }) }}>
                                          {timeInMinute.map((option, index) => (
                                            <option className="text-center" key={index} value={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                    <div>
                                      <div className='flex flex-col flex-wrap'>
                                        <div>
                                          <label>End Time</label>
                                        </div>
                                        <div className='flex'>
                                          <select className="p-2 text-center" value={this.state.editEndStartTime} onChange={(event) => { this.setState({ editEndStartTime: event.target.value }) }}>
                                            {timeInHour.map((option, index) => (
                                              <option className="text-center" key={index} value={option}>
                                                {option}
                                              </option>
                                            ))}
                                          </select>
                                          <select className="p-2 text-center" value={this.state.editEndEndTime} onChange={(event) => { this.setState({ editEndEndTime: event.target.value }) }}>
                                            {timeInMinute.map((option, index) => (
                                              <option className="text-center" key={index} value={option}>
                                                {option}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='flex pt-5 gap-1 flex-row'>
                                      <input className="border-2 border-black outline-none" onChange={(event) => { this.setState({ editEventMessage: event.target.value }) }} placeholder='Enter Event Details' value={this.state.editEventMessage} />
                                    </div>
                                    <div className='pt-5 gap-1'>
                                      <button className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-50 w-16 h-10 text-center text-blue-900' onClick={() => { this.updateEventList(this.state.currentDayEventListPosition) }}>UPDATE</button>
                                    </div>
                                  </div>
                                  : <div key={j} className="flex flex-wrap gap-2 justify-center items-center">
                                    <div className='break-words w-72'>
                                      <p>{events.startTimeEvent + events.event}</p>
                                    </div>
                                    <div className='flex flex-wrap justify-center items-center flex-row gap-1 w-36 h-10'>
                                      <button className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-50 w-16 h-10 text-center text-blue-900' onClick={() => this.editDayWiseEvent(j)}>EDIT</button>
                                      <button className='border-2 rounded border-black hover:text-white hover:bg-red-500 hover:border-blue-50 hover:border-2 w-16 h-10 text-center text-blue-900' onClick={() => this.deleteDayWiseEvent(j)}>DELETE</button>
                                    </div>
                                  </div>)
                            }
                          )
                        }
                      </div>
                    </div>
                    <div className='flex justify-end'>
                      <div className='space-x-4'>
                        <button onClick={() => this.cancelUpDate()} className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-50 w-20 p-1 text-center text-blue-900'>CANCEL</button>
                        <button onClick={() => this.setState({ display: false, copyDayWiseEvent: [],})} className='border-2 rounded border-black hover:text-white hover:bg-blue-500 hover:border-blue-50 w-16 p-1 text-center text-blue-900'>OK</button>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div className="flex flex-wrap flex-col w-full">
                  <div className='flex flex-wrap flex-row border-2 bg-[#f0effd]'>
                    <div className='w-[103px]'>Mon</div>
                    <div className='w-[103px]'>Tue</div>
                    <div className='w-[103px]'>Wed</div>
                    <div className='w-[103px]'>Thu</div>
                    <div className='w-[103px]'>Fri</div>
                    <div className='w-[103px]'>Sat</div>
                    <div className='w-[103px]'>Sun</div>
                  </div>
                  <div className='flex flex-wrap'>
                    {this.state.calender.month[currentMonth]?.map((date, i) => {
                      return (
                        <div key={i} className='flex flex-wrap flex-col border-2 h-28 w-[103px] text-right items-end text-black relative' onClick={() => { this.currentDayEvent(date) }} onDoubleClick={() => this.demo(date)}>
                          <div className='text-right h-10 w-full items-end'>
                            <p className='text-right break-words'>{date.id}</p>
                          </div>
                          {date?.dayEvent?.map((dt, j) => {
                            return (<div key={j} className="flex flex-wrap text-xs flex-col items-center justify-center rounded bg-green-300 text-black break-words h-16 w-[103px] max-h-16 overflow-scroll absolute left-2 top-10">
                              <p className="break-words p-0">{dt.startTimeEvent + "-" + dt.endTimeEvent}</p>
                              <p className="break-words p-0">{dt.event}</p>
                            </div>)
                          })}
                        </div>
                      )
                    })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </>
    )
  }
}
