var queryURL = "https://api.covidtracking.com/v2/us/daily.json"
// make sure to use v.2. The above gets data for California. Will need to convert state into 2-letter state code
dataList = [];
dateList = [];
colorList = [];
fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (i=(data.data.length-55); i>=0; i--) {
            newDataList = dataList.push(data.data[i].cases.total.calculated.seven_day_change_percent);
            newDateList = dateList.push(data.data[i].date)
        }
        for (i=0; i<366; i++) {
            newColorList = colorList.push('rgba(54, 162, 235, 0.2)');
        }

        console.log(dateList);
        console.log((colorList));
        logList = logConvert(dataList);

        colorData = colorDate('2020-12-08', dateList, colorList);
        console.log((colorData));


        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateList,
                datasets: [{
                    label: 'Dates',
                    data: logList,
                    backgroundColor: colorData,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });


//convert to log-base-2
function logConvert(dataList) {
    logList = [];
    for (i=0; i<dataList.length; i++) {
        logList.push(Math.log(dataList[i]))
    }
    return logList;
}

function colorDate(date, dateList, colorList) {
    for (i=0; i<dateList.length; i++) {
        if (date === dateList[i]) {
            console.log("hi!");
            colorList.splice(i,0,'rgba(255, 10, 32, 3.8)')
            colorList.splice(i+1,1);
        }
    }
    return colorList;
}

// function dayToDayPercentChange(dataList) {
//     newList = [];
//     for (i=0; i<dataList.length; i++) {
//         newList.push(dataList[i]/dataList[i-1])
//     }
//     return newList;
// }


//For dynamically resizing charts once they are nested in page
//https://www.chartjs.org/docs/3.2.1/configuration/responsive.html


// var newQueryURL = "http://www.omdbapi.com/?y=2020&apikey=c3d2c14c"

// fetch(newQueryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })