function getEventHistory2014() {
    var beforeAjax = "";
    $http.get('../json/2014/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        results.events = data;
        getUrlForEvents(results.events);
    });
    var afterAjax = ";";
}

function getEventHistory2013() {
    $http.get('../json/2013/event-history.json').success(function (data) {
        for (i = 0; i < data.length; i ++) { // append year so menu dropdown can section values
            data[i].year = data[i].eventDate.substring(data[i].eventDate.length - 4, data[i].eventDate.length);
        }
        results.previousEvents = data;
        getUrlForEvents(results.previousEvents);
    });
}