
var dom = document.getElementById("container");
var myChart = echarts.init(dom);

var jsonData = [["Tag", "Datetime", "Data"], 
["test1", 1, 1], 
["test1", 2, 1], 
["test1", 3, 4], 
["test1", 4, 4], 
["test1", 5, 7], 
["test1", 6, 7], 
["test1", 7, 10], 

["test2", 1, 3], 
["test2", 2, 3], 
["test2", 3, 5], 
["test2", 4, 5], 
["test2", 5, 7], 
["test2", 6, 7], 
["test2", 7, 9], 

["test3", 1, 9], 
["test3", 2, 9], 
["test3", 3, 8], 
["test3", 4, 8], 
["test3", 5, 7], 
["test3", 6, 7], 
["test3", 7, 6]
];

var dts = [1, 2, 3, 4, 5, 6, 7];

var updateFrequency = 2000;

var start = 1;

var option = {
    grid: {
        top: 10,
        bottom: 30,
        left: 150,
        right: 80
    },
    xAxis: {
        max: 'dataMax',
        label: {
            formatter: function (n) {
                return Math.round(n);
            }
        }
    },
    dataset: {
        source: jsonData.slice(1).filter(function (d) {
            return d[1] === start;
        })
    },
    yAxis: {
        type: 'category',
        inverse: true,
        max: 2, // 10,
        axisLabel: {
            show: true,
            textStyle: {
                fontSize: 14
            }
//            ,
//            formatter: function (value) {
//                return value;
//            }
        },
        animationDuration: 300,
        animationDurationUpdate: 300
    },
    series: [{
        realtimeSort: true,
        seriesLayoutBy: 'column',
        type: 'bar',
//        itemStyle: {
//            color: function (param) {
//                return param;
//            }
//        },
        encode: {
            x: 2,
            y: 0
        },
        label: {
            show: true,
            precision: 1,
            position: 'right',
            valueAnimation: true,
            fontFamily: 'monospace'
        }
    }],
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
        elements: [{
            type: 'text',
            right: 160,
            bottom: 60,
            style: {
                text: start,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
            },
            z: 100
        }]
    }
};

myChart.setOption(option);

for (var i = start; i < 7; ++i) {
    (function (i) {
        setTimeout(function () {
            update(dts[i]);
        }, (i - start) * updateFrequency);
    })(i);
}

function update(dt) {
    var source = jsonData.slice(1).filter(function (d) {
        return d[1] === dt;
    });
    option.series[0].data = source;
    option.graphic.elements[0].style.text = dt;
    myChart.setOption(option);
}


