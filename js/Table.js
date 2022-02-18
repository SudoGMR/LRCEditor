/* --- Event Listeners --- */
document.addEventListener('click', (e) => {
    let lastSelected = EHData.lastSelected;
    let currentlySelected = EHData.currentlySelected;

    if(e.target.getAttribute('id') != null){
        if(lastSelected == undefined){
            if(e.target.getAttribute('id').substring(0, 9) == 't-time-p-' || e.target.getAttribute('id').substring(0, 9) == 't-data-p-'){
                SelectLine(e.target);
            }

            if(e.target == LRCName){
                EHData.lastSelected = EHData.currentlySelected;
                EHData.currentlySelected = e.target;
            }
        }
        if(e.target.getAttribute('id') == 'window-import-choice'){}
    }

    if(lastSelected != undefined){
        if(e.target != currentlySelected){
            if(currentlySelected == LRCName){
                FileData[1].name = LRCName.value;
                EHData.currentlySelected = EHData.lastSelected;
                EHData.lastSelected = undefined;
            } else {
                SaveLineData(currentlySelected, lastSelected);
            }
        }        
    }

    if(e.target == WindowMenu){
        WindowMenu.setAttribute('class', 'hidden');
    }
});

document.addEventListener('dblclick', (e) => {
    let el = e.target.getAttribute('id').substring(0, 9);
    if(el != null){
        if(el == 't-time-p-' || el == 't-data-p-'){
            EditLineData(e.target);
        }
    }
})

document.addEventListener('keydown', (e) => {

    let lastSelected = EHData.lastSelected;
    let currentlySelected = EHData.currentlySelected;

    if(["ArrowUp","ArrowDown"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
    if(currentlySelected.getAttribute('id').substring(6, 13) == '-input-'){
        if(!e.repeat){
            if(e.key == 'Enter' || e.keyCode == 113){
                SaveLineData(currentlySelected, lastSelected);
            }
            if(e.key == 'Escape'){
                CancelLineAction(currentlySelected, lastSelected);
            }
        }
    }
    if(currentlySelected.getAttribute('id').substring(6, 9) == '-p-'){
        if(WICC.getAttribute('class') == 'hidden'){
            if(!e.repeat){
                if(e.key == 'Enter' ){
                    EditLineData(currentlySelected);
                }
                if(e.key == 'k'){
                    console.log(EditorData);
                }
                if(e.key == 'j'){
                    console.log('calling');
                    DelSelectedLine()
                }
            }
            if(e.key == 'ArrowUp'){
                let selectedId = currentlySelected.getAttribute('id').substring(0, 9);
                let nextLineNum = parseInt(currentlySelected.getAttribute('id').substring(9)) - parseInt(1);
                if(nextLineNum != -1){
                    let nextLine = document.getElementById(selectedId + nextLineNum);
                    SelectLine(nextLine);
                    //console.log(isScrolledIntoView(nextLine));
                }
            }
            if(e.key == 'ArrowDown'){
                let selectedId = currentlySelected.getAttribute('id').substring(0, 9);
                let nextLineNum = parseInt(currentlySelected.getAttribute('id').substring(9)) + parseInt(1);
                if(nextLineNum != LRCData.length){
                    let nextLine = document.getElementById(selectedId + nextLineNum);
                    SelectLine(nextLine);
                    //console.log(isScrolledIntoView(nextLine));
                }
            }
            if(PlayerAudio.paused){
                if(e.key == 'ArrowLeft'){
                    SelectLine(document.getElementById('t-time-p-' + currentlySelected.getAttribute('id').substring(9)));
                }
                if(e.key == 'ArrowRight'){
                    SelectLine(document.getElementById('t-data-p-' + currentlySelected.getAttribute('id').substring(9)));
                }
            } else {
                if(e.key == 'ArrowLeft'){
                    PlayerController('rewind');
                }
                if(e.key == 'ArrowRight'){
                    PlayerController('foward');
                }
            }
        }
    }
})

EditorDelSpecLineBtn.onclick = () => {DelSelectedLine()}
EditorNewLineAbSelBtn.onclick = () => {NewLineAbSel()}

DelSpecLineBtn.onclick = () => {DelSelectedLine()};
NewLineAbSelBtn.onclick = () => {NewLineAbSel()};

/* --- Functions --- */
function CancelLineAction(cS, lS){
    lS.blur();
    cS.value = lS.innerHTML;

    cS.setAttribute('class', 'table-input hidden');
    lS.setAttribute('class', 'table-p selected');

    EHData.currentlySelected = EHData.lastSelected;
    EHData.lastSelected = undefined;
}

function DelLine(){
    for(let i = LRCData.length - 1; i > 0; i--){
        if(LRCData[i].isUsed == false && LRCData[i - 1].isUsed == false){
            document.getElementById('t-line-' + i).remove();
            LRCData.pop();
        } else {
            i = 0;
        }
    }
}

function DelSelectedLine(){
    var lineNum = EHData.currentlySelected.getAttribute('id').substring(9);
    if(lineNum != 0){
        for(let i = lineNum; i < LRCData.length - 1; i++){
            console.log('moving line ' + (parseInt(i) + parseInt(1)) + ' to line '+ i);
            var e = (parseInt(i) + parseInt(1));

            document.getElementById('t-time-p-' + i).innerHTML = LRCData[e].lineTime;
            document.getElementById('t-data-p-' + i).innerHTML = LRCData[e].lineData;
            document.getElementById('t-time-input-' + i).value = LRCData[e].lineTime;
            document.getElementById('t-data-input-' + i).value = LRCData[e].lineData;
        }

        LRCData.splice(lineNum, 1);
        LRCData[LRCData.length - 2].isUsed = false;
        DelLine();
    }
    
}

function EditLineData(e){
    if(e.getAttribute('id')){
        if(e.getAttribute('id').substring(0, 9) == 't-time-p-'){
            let input = document.getElementById('t-time-input-' + e.getAttribute('id').substring(9));
            input.value = e.innerHTML;
            e.setAttribute('class', 'table-p hidden');
            input.setAttribute('class', 'table-input');
            input.focus();
            input.select();
            EHData.lastSelected = e;
            EHData.currentlySelected = input;
        }
        if(e.getAttribute('id').substring(0, 9) == 't-data-p-'){
            let input = document.getElementById('t-data-input-' + e.getAttribute('id').substring(9));
            input.value = e.innerHTML;
            e.setAttribute('class', 'table-p hidden');
            input.setAttribute('class', 'table-input');
            input.focus();
            input.select();
            EHData.lastSelected = e;
            EHData.currentlySelected = input;
        }
    }
}

// - not implemented yet
function ScrollIntoView(cS){
    /*
    let rect = e.getBoundingClientRect();
    let eTop = rect.top;
    let eBottom = rect.bottom;

    if(eTop < 0)
        //return 1;
        console.log('Top >= 0');

    if(eBottom > window.innerHeight)
        //return 2
        console.log('Bottom <= 0');

    //return 0;
    */

    let tableRect = LRCTable.getBoundingClientRect();
    let cSRect = cS.getBoundingClientRect();
    console.log(tableRect);

    tableRect.top = tableRect.top + 30;
    tableRect.bottom = tableRect.bottom - 30;

    console.log(tableRect);

    if(tableRect.top > cSRect.top){
        cS.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}); 
    }
    if(tableRect.bottom < cSRect.bottom){
        cS.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
    }
}

function NewLine(){
    let line;

    if(LRCData.length == 0)
        line = 0;
    else
        line = LRCData.length;

    let TLine = 't-line-' + line;
    let TTime = 't-time-p-' + line;
    let TData = 't-data-p-' + line;
    let TTimeInput = 't-time-input-' + line;
    let TDataInput = 't-data-input-' + line;

    LRCData.push({isUsed: false, lineTimeEx: 0, lineTime: '', lineData: ''});

    document.getElementById('lrc-table').appendChild(document.createElement('li')).setAttribute('id', TLine);
    document.getElementById(TLine).appendChild(document.createElement('p')).setAttribute('id', TTime);
    document.getElementById(TLine).appendChild(document.createElement('input')).setAttribute('id', TTimeInput);
    document.getElementById(TLine).appendChild(document.createElement('p')).setAttribute('id', TData);
    document.getElementById(TLine).appendChild(document.createElement('input')).setAttribute('id', TDataInput);

    document.getElementById(TTimeInput).setAttribute('type', 'text');
    document.getElementById(TDataInput).setAttribute('type', 'text');

    document.getElementById(TTime).setAttribute('class', 'table-p');
    document.getElementById(TData).setAttribute('class', 'table-p')
    document.getElementById(TTimeInput).setAttribute('class', 'table-input hidden');
    document.getElementById(TDataInput).setAttribute('class', 'table-input hidden');

    document.getElementById(TTime).innerHTML = '';
    document.getElementById(TData).innerHTML = '';
}

function NewLineAbSel(){    
    NewLine();
    let lineNum = EHData.currentlySelected.getAttribute('id').substring(9);
    LRCData.pop();
    LRCData.splice(lineNum, 0, {isUsed: false, lineTime: '', lineTimeEx: 0, lineData: ''});

    for(let i = LRCData.length - 2; i > parseInt(lineNum) - parseInt(1); i--){
        document.getElementById('t-time-p-' + i).innerHTML = LRCData[i].lineTime;
        document.getElementById('t-data-p-' + i).innerHTML = LRCData[i].lineData;
    }  
    
}

function SaveLineData(cS, lS){
    lS.innerHTML = cS.value;
    let line = lS.getAttribute('id').substring(9);

    cS.setAttribute('class', 'table-input hidden');
    lS.setAttribute('class', 'table-p selected');
    EHData.currentlySelected = EHData.lastSelected;
    EHData.lastSelected = undefined;

    if(cS.getAttribute('id').substring(2, 6) == 'time'){
        LRCData[line].lineTime = lS.innerHTML;
        LRCData[line].lineTimeEx = ConvertTimeR(LRCData[line].lineTime);
    }
    if(cS.getAttribute('id').substring(2, 6) == 'data'){
        LRCData[line].lineData = lS.innerHTML;
    }

    TableController(line);
}

function SelectLine(cS){
    let attrs = document.getElementsByClassName('selected');
    if(attrs.length != 0){
        for(let i = 0; i < attrs.length; i++){
            attrs[i].setAttribute('class', 'table-p');
        }
    }
    ScrollIntoView(cS);
    /*
    if(cS.getAttribute('id').substring(9) > LRCData.length - 1){
        console.log('aaaaaa');
        cS = document.getElementById('t-' + cS.getAttribute('id').substring(2, 5) + '-p-' + LRCData.length-1);    
    }
    */
    cS.setAttribute('class', 'table-p selected');
    EHData.currentlySelected = cS;
}

function TableController(line){
    if(LRCData[line].isUsed == false){
        if(LRCData[line].lineTime != '' || LRCData[line].lineData != ''){
            LRCData[line].isUsed = true;
            if(line == LRCData.length - 1)
                NewLine();
        }
    } else {
        if(LRCData[line].lineTime == '' && LRCData[line].lineData == ''){
            LRCData[line].isUsed = false;
            if(line == LRCData.length - 2)
                DelLine();
        }
    }
    DelLine();
}

/* --- / --- */

NewLine();
EHData.currentlySelected = document.getElementById('t-time-p-0')