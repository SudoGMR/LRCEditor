/* --- Event Listeners --- */
document.addEventListener('keydown', (e) => {
    if (!e.repeat){
        if(e.key == ' '){
            if(!PlayerAudio.paused){
                //SetTimeToTable(e);
                SetTableTime();
            }
        }
        if(e.key == "l"){
            SetTableTime();
        }
        if(e.key == 'j'){
            //console.log(GetTableTime());
        }
    }
})

/* --- Functions -- */
function ConvertTime(Time){
    let decimals = Math.floor(Time * 100 % 100);
    let seconds = Math.floor(Time % 60);
    let minutes = Math.floor(Time / 60);

    if(decimals < 10){
        decimals = "0" + decimals;
    } else
    if(decimals == 0){
        decimals = "00";
    }

    if(seconds < 10){
        seconds = "0" + seconds;
    } else 
    if(seconds == 0){
        seconds = "00";
    }

    if(minutes < 10){
        minutes = "0" + minutes;
    }

    Time = minutes + ":" + seconds + "." + decimals;

    return Time;
}

function ConvertTimeR(Time){
    let seconds = Time.substring(Time.length - 5);
    let minutes = Time.substring(0, Time.length - 6);
    Time = parseInt(minutes * 60) + parseFloat(seconds);

    if(isNaN(Time)){
        return undefined;
    } else {
        return Time;
    }
}

function GetTableTime(){
    let timeList = [];
    for(let i = 0; i < LRCData.length; i++){
        if(LRCData[i].lineTimeEx != undefined && LRCData[i].lineTimeEx != 0){
            timeList.push({
                time: LRCData[i].lineTimeEx,
                line: document.getElementById('t-line-' + i)
            })
        }
    }
    //console.log(timeList);
    return timeList;
}

function SetTableTime(){
        let num = EHData.currentlySelected.getAttribute('id').substring(9);
        let cS = document.getElementById('t-line-' + num);
        let id = (parseInt(num) + parseInt(1));
        let nS = document.getElementById('t-time-p-' + id);
        let currentTime = PlayerAudio.currentTime;

        LRCData[num].lineTimeEx = currentTime;
        LRCData[num].lineTime = ConvertTime(currentTime);
        EHData.currentlySelected.innerHTML = ConvertTime(currentTime);

        if(!nS){
            NewLine();
            nS = document.getElementById('t-time-p-' + id)
        }

        SelectLine(nS);

        console.log(nS);
}

function PlayerPlay(timeList){
    let time = PlayerAudio.currentTime;
    PlayerProgressBar.value = time * 100;
    PlayerCurrentTime.innerHTML = ConvertTime(time);
    for(let i = 0; i < timeList.length; i++){
        if(timeList[i].time > time && timeList[i].time < time + 0.05 && timeList[i].line.getAttribute('class') != 'show'){
            timeList[i].line.setAttribute('class', 'show');
            setTimeout(() => {
                timeList[i].line.setAttribute('class', '');
            }, 500)
            
        }
    }
}