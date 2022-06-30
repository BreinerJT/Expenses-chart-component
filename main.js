const day = new Date().getDay() - 1

async function getData(url){
    let fetchData = fetch(url)
    let response = await fetchData
    let data = await response.json()
    return data;
}

async function getCharts(){
    const charts = document.querySelectorAll(".js-chart")
    const labels = document.querySelectorAll(".js-label")
    const data = await getData('data.json')
    const amounts = data.map(e => e.amount)
    let maxValue = Math.max(...amounts)
    let heights = amounts.map(e => e / maxValue * 100)
    charts.forEach((value, index) => {
        value.style.height = `${heights[index]}%`
    })
    charts[day].classList.add("current-day")
    labels.forEach((value, index) => {
        value.textContent = `$${amounts[index]}`
    })
}

getCharts()