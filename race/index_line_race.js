
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

var tagArr = ["test1", "test2", "test3"];
var datasetWithFilters = [];
var seriesList = [];

echarts.util.each(tagArr, function (tag) {
    var datasetId = 'dataset_' + tag;
    datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: 'dataset_raw',
        transform: {
            type: 'filter',
            config: {
                and: [
                    { dimension: 'Datetime', gte: 1 },
                    { dimension: 'Tag', '=': tag }
                ]
            }
        }
    });
    seriesList.push({
        type: 'line',
        datasetId: datasetId,
        showSymbol: false,
        name: tag,
        endLabel: {
            show: true,
            formatter: function (params) {
                return params.value[0] + ': ' + params.value[1];
            }
        },
        labelLayout: {
            moveOverlap: 'shiftY'
        },
        emphasis: {
            focus: 'series'
        },
        encode: {
            x: 'Datetime',
            y: 'Data',
            label: ['Tag', 'Data'],
            itemName: 'Datetime',
            tooltip: ['Data'],
        }
    });
});

console.log(jsonData);
console.log(tagArr);
console.log(datasetWithFilters);
console.log(seriesList);

var option = {
    animationDuration: 10000,
    dataset: [{
        id: 'dataset_raw',
        source: jsonData
    }].concat(datasetWithFilters),
    title: {
        text: 'test data'
    },
    tooltip: {
        order: 'valueDesc',
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        nameLocation: 'middle'
    },
    yAxis: {
        name: 'Data'
    },
    grid: {
        right: 140
    },
    series: seriesList
};

myChart.setOption(option);

