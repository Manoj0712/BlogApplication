import React, { useState, useEffect } from 'react';
const DateWiselogic = () => {
    const [timeLoad, setTimeLoad] = useState([]);
    const [startTimeCount, setStartTimeCount] = useState('')
    const [endTimeCount, setEndTimeCount] = useState('')
    const [splitHourMintue, setSplitHourMintue] = useState(30)
    const [maxHourChoose, setMaxHourChoose] = useState(30)
    const [startToEndTime, setStartToEndTime] = useState([])
    const [selectedDate, setSelectedDate] = useState(getFormattedDate());
    function getFormattedDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function handleDateChange(event) {
        setSelectedDate(event.target.value);
    }
    useEffect(() => {
        let dataTime = []
        for (var i = 1; i <= 10; i++) {
            dataTime.push(i * 30)
        }
        setTimeLoad(dataTime);
    }, []);
    useEffect(() => {
        var endTimeSplit = endTimeCount.split(":")
        var startTimeSplit = startTimeCount.split(":")
        if ((Number(endTimeSplit[0]) <= Number(startTimeSplit[0]) && endTimeCount.length === 5)) {
            if (Number(endTimeSplit[0]) === Number(startTimeSplit[0])) {
                if (Number(endTimeSplit[1]) <= Number(startTimeSplit[1])) {
                    setEndTimeCount(startTimeCount)
                }
            } else {
                setEndTimeCount(startTimeCount)
            }
        }
        if ((startTimeCount.length >= 5) && (endTimeCount.length >= 5)) {
            for (var i = Number(startTimeSplit[0]); i <= Number(endTimeSplit[0]); i++) {
                console.log("aaaaaaaaaaaaaa", i)
                var secondsCal = Number(startTimeSplit[1]) + Number(splitHourMintue)
                console.log(secondsCal)
                console.log(selectedDate)
                if (new Date().getDate() <Number(selectedDate.split("-")[2])) {

                } else {
                    if (secondsCal % 60 === 0) {
                        console.log("aaaaaaaaaa", secondsCal % 60)
                        
                    } else {

                    }

                }
            }
            // if (splitHourMintue >= 60) {
            //     var splitStartHour = startTimeCount.split(":")
            //     var splitEndTime = endTimeCount.split(":")
            //     let emptyHourList = []
            //     let startTimeAdd = startTimeCount
            //     let startMillSeconds = splitStartHour[1]
            //     for (var i = splitStartHour[0]; i <= splitEndTime[0]; i++) {
            //         let mintueCount = Number(splitHourMintue) + Number(startMillSeconds)
            //         var timeCal
            //         if (mintueCount % 60 === 0) {
            //             timeCal = Number(i) + (mintueCount / 60)
            //             if (Number(splitEndTime[0]) >= timeCal) {
            //                 emptyHourList.push({ displayName: startTimeAdd + "-" + timeCal + ":00", displayColor: false, displlayNextChoose: false, displayHide: false })
            //                 startTimeAdd = timeCal + ":00"
            //                 startMillSeconds = 0
            //                 i = timeCal - 1
            //             } else {
            //                 emptyHourList.push({ displayName: startTimeAdd + "-" + endTimeCount, displayColor: false, displlayNextChoose: false, displayHide: false })
            //                 break;
            //             }
            //         } else {
            //             console.log("mintueCount", mintueCount)
            //             let timeCalCulate = Math.floor(mintueCount / 60)
            //             let timeConvert = mintueCount - (timeCalCulate * 60)
            //             if (Number(i) === Number(splitEndTime[0])) {
            //                 if (mintueCount >= Number(splitEndTime[1]) && Number(i) <= 23) {
            //                     emptyHourList.push({ displayName: startTimeAdd + "-" + endTimeCount, displayColor: false, displlayNextChoose: false, displayHide: false })
            //                     break;
            //                 } else {
            //                     timeCal = startTimeAdd + "-" + (Number(i)) + ":" + (timeConvert < 10 ? "0" + timeConvert : timeConvert)
            //                     startMillSeconds = (timeConvert < 10 ? "0" + timeConvert : timeConvert)
            //                     emptyHourList.push({ displayName: timeCal, displayColor: false, displlayNextChoose: false, displayHide: false })
            //                     startTimeAdd = (Number(i) + timeCalCulate) + ":" + (timeConvert < 10 ? "0" + timeConvert : timeConvert)
            //                     i = (Number(i) + timeCalCulate) - 1
            //                 }
            //             } else {
            //                 console.log(Number(splitEndTime[0]), "splitEndTime")
            //                 console.log(((Number(i) + timeCalCulate) - 1), "aaaaaaaaaaaaaaaaaa")
            //                 if (Number(splitEndTime[0]) > (Number(i) + timeCalCulate) - 1) {
            //                     timeCal = startTimeAdd + "-" + (Number(i) + timeCalCulate) + ":" + (timeConvert < 10 ? "0" + timeConvert : timeConvert)
            //                     startMillSeconds = (timeConvert < 10 ? "0" + timeConvert : timeConvert)
            //                     emptyHourList.push({ displayName: timeCal, displayColor: false, displlayNextChoose: false, displayHide: false })
            //                     startTimeAdd = (Number(i) + timeCalCulate) + ":" + (timeConvert < 10 ? "0" + timeConvert : timeConvert)
            //                     console.log(startTimeAdd, "startTimeAdd")
            //                     i = (Number(i) + timeCalCulate) - 1
            //                 } else {
            //                     emptyHourList.push({ displayName: startTimeAdd + "-" + endTimeCount, displayColor: false, displlayNextChoose: false, displayHide: false })
            //                     break;
            //                 }
            //             }
            //         }
            //         if (splitEndTime[0] === Number(i)) {

            //         }
            //     }
            //     setStartToEndTime(emptyHourList)
        }
    }, [splitHourMintue, startTimeCount, endTimeCount, maxHourChoose])

    let timeBasedCalculation = (event, type) => {
        var getHourInDate = new Date().getHours()
        var getMinutesInDate = new Date().getMinutes()
        if (type === "startTime" || type === "endTime") {
            if (event.target.value.length <= 4) {
                if (type === "startTime") {
                    setStartTimeCount(event.target.value)
                } else {
                    setEndTimeCount(event.target.value)
                }
            } else if (event.target.value.length === 5) {
                var patterns = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
                if (patterns.test(event.target.value)) {
                    if (type === "startTime") {
                        setStartTimeCount(event.target.value)
                    } else {
                        setEndTimeCount(event.target.value)
                    }
                    var splitHouAndMintute = event.target.value.split(":")
                    var joinSplitHours
                    if (Number(splitHouAndMintute[0]) >= getHourInDate && Number(splitHouAndMintute[0]) <= 23) {
                        joinSplitHours = splitHouAndMintute[0]
                        if (Number(splitHouAndMintute[1]) < 60) {
                            if (getHourInDate === Number(splitHouAndMintute[0])) {
                                if (getMinutesInDate <= Number(splitHouAndMintute[1])) {
                                    joinSplitHours += ":" + splitHouAndMintute[1]
                                } else {
                                    joinSplitHours += ":" + (getMinutesInDate < 10 ? "0" + getMinutesInDate : getMinutesInDate)
                                }
                            } else {


                                joinSplitHours += ":" + splitHouAndMintute[1]
                            }
                        } else {
                            joinSplitHours += ":" + (getMinutesInDate < 10 ? "0" + getMinutesInDate : getMinutesInDate)
                        }
                    } else {
                        joinSplitHours = (getHourInDate < 10 ? "0" + getHourInDate : getHourInDate) + ":" + (getMinutesInDate < 10 ? "0" + getMinutesInDate : getMinutesInDate)
                    }
                    if (type === "startTime") {
                        setStartTimeCount(joinSplitHours)
                    } else {
                        setEndTimeCount(joinSplitHours)
                    }
                } else {
                    if (type === "startTime") {
                        setStartTimeCount((getHourInDate < 10 ? "0" + getHourInDate : getHourInDate) + ":" + (getMinutesInDate < 10 ? "0" + getMinutesInDate : getMinutesInDate))
                    } else {
                        setEndTimeCount((getHourInDate < 10 ? "0" + getHourInDate : getHourInDate) + ":" + (getMinutesInDate < 10 ? "0" + getMinutesInDate : getMinutesInDate))
                    }
                }
            }
        } else if (type === "splitHour") {
            setSplitHourMintue(event.target.value)

        } else if (type === "maxHourChoose") {
            setMaxHourChoose(event.target.value)
        }

    }
    let timeSelection = (id) => {
        var selectCount
        if (maxHourChoose % splitHourMintue === 0) {
            selectCount = maxHourChoose / splitHourMintue
        } else {
            selectCount = Math.round(maxHourChoose / splitHourMintue)
        }
        let startToEndTimeCopy = [...startToEndTime]
        let trueCount = startToEndTimeCopy.filter(function (ot, j) {
            return ot.displayColor === true
        })
        if (trueCount.length < selectCount || startToEndTimeCopy[id].displayColor === true) {
            if (startToEndTimeCopy[id].displayColor === true) {
                var selectBetweenCount = true
                if (((id - 1) > 0) && ((id + 1) < startToEndTimeCopy.length)) {
                    if ((startToEndTimeCopy[id - 1].displayColor === true) && (startToEndTimeCopy[id + 1].displayColor === true)) {
                        selectBetweenCount = false
                    }
                }
                if (selectBetweenCount) {
                    startToEndTimeCopy[id].displayColor = false
                    if (selectCount > 1) {
                        if (id - 1 >= 0) {
                            startToEndTimeCopy[id - 1].displlayNextChoose = false
                        }
                        if ((id + 1) < startToEndTimeCopy.length) {
                            startToEndTimeCopy[id + 1].displlayNextChoose = false
                        }
                        let trueValue = startToEndTimeCopy.filter(function (ot, j) {
                            return ot.displayColor === true
                        })
                        for (var a = 0; a < startToEndTimeCopy.length; a++) {
                            if (startToEndTimeCopy[a].displayColor === true) {
                                if (a - 1 >= 0) {
                                    startToEndTimeCopy[a - 1].displlayNextChoose = true
                                    startToEndTimeCopy[a - 1].displayHide = false
                                }
                                if ((a + 1) < startToEndTimeCopy.length) {
                                    startToEndTimeCopy[a + 1].displlayNextChoose = true
                                    startToEndTimeCopy[a + 1].displayHide = false
                                }
                            }
                            if (startToEndTimeCopy[a].displlayNextChoose === true || startToEndTimeCopy[a].displayColor === true) {
                                startToEndTimeCopy[a].displayHide = false
                            } else if (trueValue.length === 0) {
                                startToEndTimeCopy[a].displayHide = false
                            } else {
                                startToEndTimeCopy[a].displayHide = true
                            }
                        }
                        if (trueValue.length === selectCount) {
                            for (var z = 0; z < startToEndTimeCopy.length; z++) {
                                startToEndTimeCopy[z].displlayNextChoose = false
                                startToEndTimeCopy[z].displayHide = false
                            }
                        }
                    }
                }
            } else {
                startToEndTimeCopy[id].displayColor = true
                if (selectCount > 1) {
                    if ((id - 1) >= 0) {
                        startToEndTimeCopy[id - 1].displlayNextChoose = true
                    }
                    if ((id + 1) < startToEndTimeCopy.length) {
                        startToEndTimeCopy[id + 1].displlayNextChoose = true
                    }
                    for (var e = 0; e < startToEndTimeCopy.length; e++) {
                        if ((id + 1 !== e) && (id !== e) && (id - 1 !== e) && (startToEndTimeCopy[e].displlayNextChoose === false)) {
                            startToEndTimeCopy[e].displayHide = true
                        } else if (startToEndTimeCopy[e].displlayNextChoose === true) {
                            startToEndTimeCopy[e].displayHide = false
                        }
                    }
                    let trueValue = startToEndTimeCopy.filter(function (ot, j) {
                        return ot.displayColor === true
                    })
                    if (trueValue.length === selectCount) {
                        for (var s = 0; s < startToEndTimeCopy.length; s++) {
                            startToEndTimeCopy[s].displlayNextChoose = false
                            startToEndTimeCopy[s].displayHide = false
                        }
                    }
                }
            }
            setStartToEndTime(startToEndTimeCopy)
        }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedCurrentDate = `${year}-${month}-${day}`;

    return (
        <div className='flex p-12 h-auto w-full gap-5 flex-col'>
            <div className='flex p-5 flex-wrap gap-5'>
                <div className='flex flex-warp flex-col'>
                    <label>DATE</label>
                    <input type="date" className='border-2 p-1 border-black' min={formattedCurrentDate} onChange={handleDateChange} defaultValue={selectedDate} />
                </div>
                <div className='flex flex-warp flex-col'>
                    <label>SPLIT HOUR</label>
                    <select className="p-2 text-center" value={splitHourMintue} onChange={(event) => { timeBasedCalculation(event, "splitHour") }}>
                        {timeLoad.map((option, index) => (
                            <option className="text-center" key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-warp flex-col'>
                    <label>SOLT CHOOSE</label>
                    <select className="p-2 text-center" value={maxHourChoose} onChange={(event) => { timeBasedCalculation(event, "maxHourChoose") }}>
                        {timeLoad.map((option, index) => (
                            <option className="text-center" key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex gap-5'>
                    <div className='flex flex-col'>
                        <label>START TIME</label>
                        <input type="text" className='border-2 p-1 border-black' onChange={(event) => timeBasedCalculation(event, 'startTime')} value={startTimeCount} placeholder='00:00' />
                    </div>
                    <div className='flex flex-col'>
                        <label>END TIME</label>
                        <input type="text" className='border-2 p-1 border-black' value={endTimeCount} onChange={(event) => timeBasedCalculation(event, 'endTime')} placeholder='00:00' />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap  gap-5">
                {startToEndTime?.map((time, i) => {
                    return (
                        <div key={i * 10} className={`border border-5 p-5 rounded border-black ${time.displayColor ? "bg-red-600 text-blue-500" : ""} ${time.displlayNextChoose ? "bg-gray-600" : ""} ${time.displayHide ? "pointer-events-none" : ""}`} onClick={() => { timeSelection(i) }}>
                            <p>{time.displayName}</p>
                        </div>)
                })
                }
            </div>
        </div>
    )
}
export default DateWiselogic
