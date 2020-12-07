
window.onload = () => {
    const maaneder = document.querySelectorAll(".maaneder")
    const contentCotainer = document.querySelectorAll(".contentContainer")
    const display = document.querySelector(".display")
    const weekdays = document.querySelectorAll(".weekdays")
    const ukedager = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const today = new Date()
    const presentDay = today.getDate()
    const presentMonthIndex = today.getMonth()
    const presentYear = today.getFullYear()
    const datePicker = document.querySelector(".date-picker")
    const background = document.querySelector(".background")
    background.style.display = "none"

  

datePicker.onclick = () => {
    background.style.display === "none" ? background.style.display = "grid" : background.style.display = "none"   
}

let monthArray = ["Jan" , "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"]
const yearArray = []
let dayArray1 = []
let dayArray2 = []


let chosenStartDay = sessionStorage.startDay ? sessionStorage.getItem("startDay") : 1
let chosenStartMonthIndex = sessionStorage.startMonth ? sessionStorage.getItem("startMonth") : presentMonthIndex
let chosenStartYear = sessionStorage.startYear ? sessionStorage.getItem("startYear") : presentYear

let chosenEndDay = sessionStorage.endDay ? sessionStorage.getItem("endDay") : presentDay
let chosenEndMonthIndex = sessionStorage.endMonth ? sessionStorage.getItem("endMonth") : presentMonthIndex
let chosenEndYear = sessionStorage.endYear ? sessionStorage.getItem("endYear") : presentYear

console.log(chosenStartYear)


ukedager.forEach(ukedag => {
    for(let i=0; i<weekdays.length; i++){
        weekdays[i].innerHTML += `<div class='brikke white'><strong>${ukedag}</strong></div>`
    }
})


for(let i=1995; i<=presentYear; i++){
    yearArray.push(i)
}

const currentDay = document.querySelectorAll(".currentDay")
const arrowBtn = document.querySelectorAll(".arrowBtn")
const prevBtn = document.querySelector(".prev")
const nextBtn = document.querySelector(".next")
const maxYear = yearArray[yearArray.length-1];
const minYear = yearArray[0]
nextBtn.classList.add("none")


const showDates = (monthStart,monthEnd,yearStart,yearEnd) => {

    dayArray1 = setVariables(yearStart,monthStart,dayArray1,contentCotainer[0],"d1","dayBtn",maaneder[0],"m1","monthBtn")
    dayArray2 = setVariables(yearEnd,monthEnd,dayArray2,contentCotainer[1],"d2","dayBtn2",maaneder[1],"m2","monthBtn2")

    startAll()
} 


setVariables = (year,month,arr,container,id,klasse,maanederContainer,monthId,monthClass) => {
    let val = new Date(year,month)
    let firstDay = val.getDay()
    let lastDay = new Date(val.getFullYear(),val.getMonth()+1,0).getDate()

    arr = []
    container.innerHTML = ""

    for(let i=1; i<=lastDay; i++){
        arr.push({
            'day': i
            
        });

        container.innerHTML += `<div class='brikke dayDiv' id='${id}' style='grid-column:${firstDay+1}/${firstDay+1}; '> <button value=${i} class='${klasse} btn hover white font15'>${i}</button> </div>`
        firstDay++

        firstDay = firstDay >= ukedager.length ? 0 : firstDay
        
    }

    maanederContainer.innerHTML = ""

    monthArray.forEach((month,i) => {
        maanederContainer.innerHTML += `<div class='brikke monthDiv' id='${monthId}'> <button value=${i} class='${monthClass} btn hover2 grey'>${month}</button> </div>`
    })

    return arr
  
} 

const startAll = () => {
    checkIfValid()
    changeDate()
    changeMonth()
    changeYear()
    displayDate()
    activeC()
}
   

const changeDate = () => {
    const dayDiv = document.querySelectorAll(".dayDiv")

    for(let i = 0; i < dayDiv.length; i++){
        let divId = dayDiv[i].id
        let dayBtn = divId === "d1" ? document.querySelectorAll(".dayBtn") : document.querySelectorAll(".dayBtn2")
        let chosenMonth = divId === "d1" ? startMonth : endMonth
        let chosenYear = divId === "d1" ? chosenStartYear : chosenEndYear
        let array = divId === "d1" ? dayArray1 : dayArray2

        for(let i = 0; i < dayBtn.length; i++){
            const cond1 = i >= presentDay && chosenMonth == presentMonthIndex && chosenYear >= presentYear
            const cond2 = chosenMonth > presentMonthIndex && chosenYear >= presentYear
                
            if(cond1 || cond2){
                dayBtn[i].style.color = "gray"  
            }
              
            else{
                dayBtn[i].onclick = () => {
                    let clickedValue = dayBtn[i].value
                    divId === "d1" ? chosenStartDay = clickedValue : chosenEndDay = clickedValue
                    
                    checkIfValid()  
                }
            }
        }     
    }
}


const changeMonth = () => {
    
    const monthDiv = document.querySelectorAll(".monthDiv")
    for(let i = 0; i < monthDiv.length; i++){
        let divId = monthDiv[i].id
        let chosenMonthBtn = divId === "m1" ? document.querySelectorAll(".monthBtn") : document.querySelectorAll(".monthBtn2")
        
        for(let i = 0; i < chosenMonthBtn.length; i++){
            chosenMonthBtn[i].onclick = () => {
                
                let clickedValue = chosenMonthBtn[i].value
                divId === "m1" ? startMonth = clickedValue : endMonth = clickedValue
                let day = divId === "m1" ? chosenStartDay : chosenEndDay
                let chosenYear = divId === "m1" ? chosenStartYear : chosenEndYear
                let chosenMonth = divId === "m1" ? startMonth : endMonth
                
                const cond1 = day > presentDay && chosenMonth == presentMonthIndex && chosenYear >= presentYear
                const cond2 = chosenMonth > presentMonthIndex && chosenYear >= presentYear
                
                if(cond1) divId === "m1" ? chosenStartDay = 1 : chosenEndDay = 1
                if(!cond2) divId === "m1" ? chosenStartMonthIndex = clickedValue : chosenEndMonthIndex = clickedValue
                
               
                checkIfValid()   
                showDates(startMonth, endMonth, chosenStartYear, chosenEndYear)
            }
        }
    }
}

let startMonth = chosenStartMonthIndex
let endMonth = chosenEndMonthIndex

const changeYear = () => {
    
    for(let i = 0; i < arrowBtn.length; i++){
        arrowBtn[i].onclick = () => {
            if(arrowBtn[i].value == "prev"){
                chosenStartYear > minYear ? chosenStartYear -- : ""
                chosenEndYear - chosenStartYear > 1 && (chosenEndYear > minYear) ? chosenEndYear -- : ""
            }
            else{
                chosenEndYear > minYear ? chosenEndYear -- : "" 
                chosenStartYear < maxYear ? chosenStartYear ++ : ""
                chosenEndYear < maxYear ? chosenEndYear ++ : ""
            }
            chosenStartYear > chosenEndYear ? chosenEndYear ++ : ""
            
            if(checkConditions(chosenStartDay,startMonth,chosenStartYear)){
                chosenStartMonthIndex = presentMonthIndex
                startMonth = presentMonthIndex
                chosenStartDay = presentDay
            }
            if(checkConditions(chosenEndDay,endMonth,chosenEndYear)){
                chosenEndMonthIndex = presentMonthIndex
                endMonth = presentMonthIndex
                chosenEndDay = presentDay
            }
            

            checkIfValid()
            showDates(startMonth, endMonth, chosenStartYear, chosenEndYear)

        }
    }
}


const checkIfValid = () => {
    const dateExistsCal1 = dayArray1.find(elem => elem.day == sessionStorage.getItem("startDay"))
    const dateExistsCal2 = dayArray2.find(elem => elem.day == Number(chosenEndDay))

    if(!dateExistsCal1){
        chosenStartDay = 1
    }
    
    if(!dateExistsCal2){
        chosenEndDay = 1
    }

    cond1 = Number(chosenStartMonthIndex) > Number(chosenEndMonthIndex) && Number(chosenStartYear) >= Number(chosenEndYear)
    cond2 = Number(chosenStartMonthIndex) >= Number(chosenEndMonthIndex) && Number(chosenStartDay) > Number(chosenEndDay) && Number(chosenStartYear) >= Number(chosenEndYear)
    
    let dd1 = startMonth
    let dd2 = chosenStartMonthIndex
    let dd3 = chosenStartDay

    if(cond1){
        chosenStartMonthIndex = chosenEndMonthIndex
        chosenEndMonthIndex = dd2  
        startMonth = endMonth
        endMonth = dd1
    }
    
    if(cond2){
        chosenStartDay = chosenEndDay
        chosenEndDay = dd3
    }
 
   
    displayDate()
    displayDatePicked()  
    activeC()
    
    sessionStorage.setItem("startDay",chosenStartDay)
    sessionStorage.setItem("startMonth",chosenStartMonthIndex)
    sessionStorage.setItem("startYear",chosenStartYear)

    sessionStorage.setItem("endDay",chosenEndDay)
    sessionStorage.setItem("endMonth",chosenEndMonthIndex)
    sessionStorage.setItem("endYear",chosenEndYear)
}

const activeC = () => {
    if(!checkConditions(chosenStartDay,startMonth,chosenStartYear)){
        addDayActiveClass(".dayBtn",chosenStartDay,dayArray1)

    }
    if(!checkConditions(chosenEndDay,endMonth,chosenEndYear)){
        addDayActiveClass(".dayBtn2",chosenEndDay,dayArray2)
    }

    addMonthActiveClass(".monthBtn",startMonth)
    addMonthActiveClass(".monthBtn2",endMonth)
}

const addDayActiveClass = (btn,day,array) => {

    const dayBtn = document.querySelectorAll(`${btn}`)
    array[day-1].clicked = true
    const alleAndre = array.filter(item => item.day != day)
    alleAndre.forEach(a => {
        a.clicked = false
    }) 
    array.forEach((elem,i) => {
        elem.clicked ? dayBtn[i].classList.add("day-active") : dayBtn[i].classList.remove("day-active")  
    })
}

const addMonthActiveClass = (btn,month) => {

    const monthBtn = document.querySelectorAll(`${btn}`)
    monthBtn[month].classList.add("active")
}


const displayDate = () => {

    console.log(chosenStartYear)

    currentDay[0].innerHTML = `${monthArray[startMonth] + " " + chosenStartYear}`
    currentDay[1].innerHTML = `${monthArray[endMonth] + " " + chosenEndYear}`

    Number(chosenStartYear) === maxYear ? nextBtn.classList.add("none") : nextBtn.classList.remove("none")
    Number(chosenStartYear) === minYear ? prevBtn.classList.add("none") : prevBtn.classList.remove("none")
}

const displayDatePicked = () => {
   

    let cmdbStartFormat = convertToCmdbFormat(chosenStartYear,chosenStartMonthIndex,chosenStartDay)
    let cmdbEndFormat = convertToCmdbFormat(chosenEndYear,chosenEndMonthIndex,chosenEndDay)

    datePicker.innerHTML = `<form><span style="font-family:FontAwesome">&#xF073;</span> <p name="date">${chosenStartDay + " " + monthArray[chosenStartMonthIndex] + " " + chosenStartYear} - ${chosenEndDay + " " + monthArray[chosenEndMonthIndex] + " " + chosenEndYear}<p></form> `
}


const convertToCmdbFormat = (year,month,day) => {
    let cmdbFormat = year + "-" + addZero(Number(month)+1) + "-" + addZero(Number(day))

    return cmdbFormat
}


const checkConditions = (day,month,year) => {
    const cond1 = day > presentDay && month == presentMonthIndex && year >= presentYear
    const cond2 = month > presentMonthIndex && year >= presentYear

    return cond1 || cond2 ? true : false
}

const addZero = (n) => {
    return (n < 10 ? '0' : '') + n;
}
    showDates(chosenStartMonthIndex,chosenEndMonthIndex,chosenStartYear, chosenEndYear)

}



