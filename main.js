const day = new Date().getDay() - 1

async function getData(url){
    let fetchData = fetch(url)
    let response = await fetchData
    if(!response.ok) return
    let data = await response.json()
    return data;
}

async function getCharts(){
    const charts = document.querySelector(".charts");
    const data = await getData('data.json');

    const amounts = data.map(e => e.amount)
    let maxValue = Math.max(...amounts)
    let html = null;
    data.forEach(e => {
        html =  `
            <div class="chart-container">
                <p class="day" data-id="${e.day}">${e.day}</p>
                <div class="js-chart chart" id="${e.day}" style="height: ${(e.amount) / maxValue * 100}%"></div>
                <label class="js-label" for="${e.day}">${e.amount}</label>
            </div>
            `
    charts.insertAdjacentHTML("afterbegin", html);
});
    const chart = document.querySelectorAll(".js-chart")
    chart[day].classList.add("current-day")
}
getCharts()