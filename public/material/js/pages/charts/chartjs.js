$(function () {
    new Chart(document.getElementById("line_chart").getContext("2d"), getChartJs('line'));
    new Chart(document.getElementById("line_chart1").getContext("2d"), getChartJs('line1'))
    new Chart(document.getElementById("bar_chart").getContext("2d"), getChartJs('bar'));
    //new Chart(document.getElementById("radar_chart").getContext("2d"), getChartJs('radar'));
    new Chart(document.getElementById("pie_chart").getContext("2d"), getChartJs('pie'));
});

function getChartJs(type) {
    var config = null;

    if (type === 'line') {
        config = {
            type: 'line',
            data: {
            	labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th","8th","9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th"],
                datasets: [{
                    label: "My First dataset",
                    data: [15, 18, 10, 14, 16, 25, 10, 6, 12, 8, 5, 20, 0, 10, 15, 19, 20, 11, 16, 15, 10],
                    borderColor: 'rgba(0, 188, 212, 0.75)',
                    backgroundColor: 'rgba(0, 188, 212, 0.3)',
                    pointBorderColor: 'rgba(0, 188, 212, 0)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                    pointBorderWidth: 10
                }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    else if (type === 'line1') {
        config = {
                type: 'line',
                data: {
                	labels: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th","8th","9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th"],
                    datasets: [{
                        label: "My First dataset",
                        data: [10000, 11000, 10000, 10000, 10000, 10000, 20000, 25000, 30000, 31000, 32000, 31000, 30000, 31000, 32000, 31000,30000],
                        borderColor: 'rgba(0, 188, 212, 0.75)',
                        backgroundColor: 'rgba(0, 188, 212, 0.3)',
                        pointBorderColor: 'rgba(0, 188, 212, 0)',
                        pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                        pointBorderWidth: 10
                    }]
                },
                options: {
                    responsive: true,
                    legend: false
                }
            }
    }
    else if (type === 'bar') {
        config = {
            type: 'bar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    backgroundColor: 'rgba(0, 188, 212, 0.8)'
                }, {
                        label: "My Second dataset",
                        data: [28, 48, 40, 19, 86, 27, 90],
                        backgroundColor: 'rgba(233, 30, 99, 0.8)'
                    }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    else if (type === 'radar') {
        config = {
            type: 'radar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    data: [65, 25, 90, 81, 56, 55, 40],
                    borderColor: 'rgba(0, 188, 212, 0.8)',
                    backgroundColor: 'rgba(0, 188, 212, 0.5)',
                    pointBorderColor: 'rgba(0, 188, 212, 0)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 0.8)',
                    pointBorderWidth: 1
                }, {
                        label: "My Second dataset",
                        data: [72, 48, 40, 19, 96, 27, 100],
                        borderColor: 'rgba(233, 30, 99, 0.8)',
                        backgroundColor: 'rgba(233, 30, 99, 0.5)',
                        pointBorderColor: 'rgba(233, 30, 99, 0)',
                        pointBackgroundColor: 'rgba(233, 30, 99, 0.8)',
                        pointBorderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    else if (type === 'pie') {
        config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [225, 50, 100, 40],
                    backgroundColor: [
                        "rgb(233, 30, 99)",
                        "rgb(255, 193, 7)",
                        "rgb(0, 188, 212)",
                        "rgb(139, 195, 74)"
                    ],
                }],
                labels: [
                    "Pink",
                    "Amber",
                    "Cyan",
                    "Light Green"
                ]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }
    return config;
}