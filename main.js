var schedulingType = "fcfs";
var processes = [];
var processors = [[1, 'n'], [2, 'n'], [3, 'n'], [4, 'n']];
var timeQuantum = 2;
var result = [];
var totalTimes = 0;
var PowerConsumption = 0;
var AverageResponseTime = 0;
const process_color = ["#B71375", "#FC4F00", "#F79540", "#6C9BCF", "#A5C0DD",
                       "#1F8A70", "#EBB02D", "#D864A9", "#E90064", "#B3005E", 
                       "#E7B10A", "#9BA17B", "#A0D8B3", "#A2A378", "#C27664"];
function ppc(pc) {
    doc = document.getElementById("powerConsumption");
    doc.innerHTML = "<span class='material-icons'>wb_incandescent</span>" + " 전력 : " + (pc / 100).toFixed(1);
    doc.style.color = "#B18904";
}

function pavg(avg) {
    doc = document.getElementById("averageResponseTime");
    doc.innerHTML = "<span class='material-icons'>schedule_send</span>"+ " 평균응답시간 : " + (avg / 100).toFixed(1);
    doc.style.color = "#B40404";
}

function printpa() {
    loading = document.getElementById("loading");
    loading.style.display = "none";
    document.getElementById("powerConsumption").style.display = "";
    document.getElementById("averageResponseTime").style.display = "";
    for (i = 0; i < PowerConsumption * 100; i++) {
        setTimeout(ppc, i, i);
    }
    for (i = 0; i < AverageResponseTime *  100; i++) {
        setTimeout(pavg, i, i);
    }
}


function put_pc_avg(pc, avg) {
    PowerConsumption = pc;
    AverageResponseTime = avg;
}

function prrint(times) {
    table = document.getElementById("timeTable");
    table.style.width = "10px"
    for (i = 0; i < table.rows.length; i++) {
        table.rows[i].childNodes[times].style.display = "";
    }
}

function printTimes() {
    table = document.getElementById("timeTable");
    for (i = 0; i < table.rows.length; i++) {
        for (j = totalTimes - 1; j > 0; j--) {
            table.rows[i].childNodes[j].style.display = "none";
        }
    }
    k = 0;
    for (i = 0; i < totalTimes; i++) {
        setTimeout(prrint, k, i);
        k += 500;
    }
}

function getColor(i) {
    return process_color[i];
}

function make_start_table() {
    console.log(processors);
    table = document.getElementById("timeTable");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (var i = 0; i < processors.length; i++) {
        if (processors[i][1] == 'n') {
            continue;
        }
        var newRow = table.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = processors[i][0] + "(" + processors[i][1].toUpperCase() + ")";
        newCell.style.border = "0px";
        newCell.style.fontSize = "15pt";
        
    }
    console.log("make_start_table() : " + totalTimes);

    //loading
    loading = document.getElementById("loading");
    loading.style.display = "";
}

function make_end_table(times) {
    table = document.getElementById("timeTable");
    var newRow = table.insertRow();
    for (var i = 0; i < times; i++) {
        var newCell = newRow.insertCell();
        newCell.innerText = i;
        newCell.id = "timeElement"
        newCell.style.textAlign = "right";
        newCell.style.paddingRight = "0px";
        newCell.style.border = "0px";
    }
    totalTimes = times;
    console.log("make_end_table() : " + totalTimes);
    document.getElementById("powerConsumption").style.display = "none";
    document.getElementById("averageResponseTime").style.display = "none";
    setTimeout(printpa, times * 500);
    printTimes();
}

function put_result(x) {
    result_table = document.getElementById("result_table");
    while (document.getElementById("process")) {
        result_table.deleteRow(-1);
    }
    for (var i = 0; i < x.length; i++) {
        var newRow = result_table.insertRow();
        newRow.id = "process";
        newRow.style.color = process_color[i]
        for (var j = 0; j < x[i].length; j++) {
            var newCell = newRow.insertCell();
            newCell.innerText = x[i][j];
        }
    }
}

function get_processes() {
    return processes;
}

function get_processors() {
    tmp = [];
    for (var i = 0; i < 4; i++) {
        if (processors[i][1] != "n")
            tmp.push(processors[i]);
    }
    return tmp;
}

function get_schedulingType() {
    return schedulingType;
}

function get_tq() {
    var timeQuantum = parseInt(document.getElementById("tq").value);
    if (!timeQuantum) {
        timeQuantum = 2;
    }
    console.log(timeQuantum);
    return timeQuantum;
}

function changeProcessorType() {
    tmp = [];
    var c1 = document.getElementById("c1");
    tmp[0] = [1, c1.options[c1.selectedIndex].value];
    var c2 = document.getElementById("c2");
    tmp[1] = [2, c2.options[c2.selectedIndex].value];
    var c3 = document.getElementById("c3");
    tmp[2] = [3, c3.options[c3.selectedIndex].value];
    var c4 = document.getElementById("c4");
    tmp[3] = [4, c4.options[c4.selectedIndex].value];
    console.log(tmp)
    processors = tmp;
}

function changeStype() {
    var st = document.getElementById("schedulingType");
    var tqDisplay = document.getElementById("timeQuantum");
    schedulingType = st.options[st.selectedIndex].value;
    document.getElementById('scheduling_method').innerText = " - " + schedulingType;
    if (st.value == "rr") {
        tqDisplay.style.display = "block";
    } else tqDisplay.style.display = "none";
}

function addProcess() {
    if(processes.length == 15){
        alert("프로세스는 최대 15개까지 추가할 수 있습니다!")
        return;
    }
    var pid = processes.length + 1;
    var at = parseInt(document.getElementById("at").value);
    var bt = parseInt(document.getElementById("bt").value);
    if(at == 0){
        
    }
    else if(!at || at < 0){
        alert("도착 시간을 확인해주세요!");
        return;
    }
    if(!bt || bt <= 0){
        alert("실행 시간을 확인해주세요!")
        return;
    }

    const table = document.getElementById("processTable");
    const newRow = table.insertRow();
    newRow.style.background = process_color[pid-1];
    newRow.style.color = "white";
    newRow.insertCell().innerText = pid;
    newRow.insertCell().innerText = at;
    newRow.insertCell().innerText = bt;
    processes.push([pid, parseInt(at), parseInt(bt)]);
    document.getElementById("at").value = "";
    document.getElementById("bt").value = "";
}

function deleteProcess() {
    const table = document.getElementById("processTable");
    var cnt = table.rows.length;
    if (cnt > 1) {
        table.deleteRow(-1);
        processes.pop();
        console.log(processes);
    }
}

function resetProcess() {
    const table = document.getElementById("processTable");
    var cnt = table.rows.length;
    for (var i = 0; i < cnt - 1; i++) {
        table.deleteRow(-1);
    }
    processes = [];
    console.log(processes);
}

function getObject() {
    return {
        "processes": processes,
        "processors": processors,
        "schedulingType": schedulingType
    }
}