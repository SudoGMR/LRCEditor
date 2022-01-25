/* --- Event Listeners --- */
document.addEventListener('click', (e) => {
    let lastSelected = EHData.lastSelected;
    let currentlySelected = EHData.currentlySelected;

    if(e.target.getAttribute('id') != null){
        if(e.target.getAttribute('id').substring(0, 9) == 't-time-p-' || e.target.getAttribute('id').substring(0, 9) == 't-data-p-'){
            SelectLine(e.target);
        }
        if(e.target.getAttribute('id') == 'window-import-choice'){}
    }

    if(lastSelected != undefined){
        
        //let currentlySelected = document.getElementById('t-' + lastSelected.getAttribute('id').substring(2, 6) + '-input-' + lastSelected.getAttribute('id').substring(9));
        if(e.target != currentlySelected){
            SaveLineData(currentlySelected, lastSelected);
        }
    }

    if(e.target == WindowMenu){
        WindowMenu.setAttribute('class', 'hidden');
    }
});

document.addEventListener('dblclick', (e) => {
    EditLineData(e.target);
})

document.addEventListener('keydown', (e) => {
    if(WICC.getAttribute('class') == 'hidden'){
        let lastSelected = EHData.lastSelected;
        let currentlySelected = EHData.currentlySelected;

        if(!e.repeat){
            if(e.key == 'Enter'){
               // if()
                if(currentlySelected.getAttribute('id').substring(7, 8) != 'p'){
                    SaveLineData(currentlySelected, lastSelected);
                } else {
                    EditLineData(currentlySelected);
                }
            }
            if(e.key == 'k'){
                console.log(EditorData);
            }
        }
    }
    
})

/* --- Functions --- */
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

function EditLineData(e){
    if(e.getAttribute('id')){
        if(e.getAttribute('id').substring(0, 9) == 't-time-p-'){
            let input = document.getElementById('t-time-input-' + e.getAttribute('id').substring(9));
            e.setAttribute('class', 'table-p hidden');
            input.setAttribute('class', 'table-input');
            input.focus();
            input.select();
            EHData.lastSelected = e;
            EHData.currentlySelected = input;
        }
        if(e.getAttribute('id').substring(0, 9) == 't-data-p-'){
            let input = document.getElementById('t-data-input-' + e.getAttribute('id').substring(9));
            e.setAttribute('class', 'table-p hidden');
            input.setAttribute('class', 'table-input');
            input.focus();
            input.select();
            EHData.lastSelected = e;
            EHData.currentlySelected = input;
        }
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

function SaveLineData(cS, lS){
    lS.innerHTML = cS.value;
    let line = lS.getAttribute('id').substring(9);

    cS.setAttribute('class', 'table-input hidden');
    lS.setAttribute('class', 'table-p selected');
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
}

/* --- / --- */

NewLine();