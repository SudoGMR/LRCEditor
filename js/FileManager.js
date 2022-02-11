/* --- Event Listeners --- */
EditorImportBtnAudio.onclick = () => {
    ImportHiddenAudio.click();
}
ExportBtnLRC.onclick = function(){
    FileExporter('lrc');
}

ImportBtnAudio.onclick = function(){
    ImportHiddenAudio.click();
}

ImportBtnLRC.onclick = function(){
    WICC.setAttribute('class', '');
}

ImportHiddenAudio.onchange = function(){
    FileImporter('audio', this.files[0]);
    
}

ImportHiddenLRC.onchange = function(){
    FileImporter('lrc', this.files[0]);
}

WICCCancel.onclick = function(){
    WICC.setAttribute('class', 'hidden');
}

WICCImportFile.onclick = function(){
    ImportHiddenLRC.click();
}

WICCContinue.onclick = function(){
    TableSetter(WICCTextArea.value);
    WICCCancel.click();
    WMCClose.click();
}

WMCImportAudio.onclick = function(){
    ImportBtnAudio.click();
}

WMCExportBtnLRC.onclick = function(){
    FileExporter('lrc');
}

WMCImportBtnLRC.onclick = function(){
    WICC.setAttribute('class', '');
}

/* --- Functions --- */
function FileExporter(type){
    if(type == 'lrc'){
        let Data = '';

        for(let i = 0; i < LRCData.length; i++){
            if(LRCData[i].lineTime != ""){
                Data += '[' + LRCData[i].lineTime + ']';
                
            }
            Data += LRCData[i].lineData + '\n';
        }

        let file = new Blob([Data], {type: FileData[1].type});

        let a = document.createElement('a');
        let url = URL.createObjectURL(file);

        a.href = url;
        a.download = FileData[1].name + '.' + FileData[1].ext;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
}

function FileImporter(type, file){
    if(type == 'audio'){
        SetArrayData(FileData, file);
        AudioName.innerHTML = FileData[0].name;
        WMCAudioName.innerHTML = FileData[0].name;
        InputLRCName.value = FileData[0].name;
        InputLRCName.disabled = true;
        FileData[1].name = FileData[0].name;
        PlayerAudio.src = URL.createObjectURL(file);

        /*
        jsmediatags.read(file, {
            onSuccess: function(tag){
                document.getElementsById('title').textContent = tag.tags.title;
            },
            onError: function(error){
                console.log(error);
            }
        })
        */ // - not working rn
    }
    if(type == 'lrc'){
        SetArrayData(FileData, file);
        if(FileData[0] != undefined){
            InputLRCName.value = FileData[1].name;
        }

        let Reader = new FileReader();
        Reader.readAsText(file);
        Reader.addEventListener('load', (e) => {
            /*
            let ArrayLength = LRCData.length;
            for(let i = 0; i < ArrayLength - 1; i++){
                document.getElementById('t-time-p-' + i).innerHTML = '';
                document.getElementById('t-time-p-' + i).innerHTML = '';
                LRCData[i].lineTime = '';
                LRCData[i].lineTimeEx = 0;
                LRCData[i].lineData = '';
                LRCData[i].isUsed = false;
            }
            DelLine();
            let a = e.target.result;

            TableSetter(a);
            */
            WICCTextArea.value = e.target.result;
        });
    }

    //LoadData(type);
}

function TableSetter(e){
    a = e.split(/\r\n|\n/)
    for(let i = 0; i < a.length; i++){
        let line = a[i];
        let loc = false;
        for(let j = 0; j < line.length; j++){
            if(line[j] == ']'){
                
                LRCData[i].lineTime = line.substring(1, j);
                LRCData[i].lineData = line.substring(j + 1);
                
                if(ConvertTimeR(LRCData[i].lineTime) != undefined){
                    LRCData[i].lineTimeEx = ConvertTimeR(LRCData[i].lineTime);

                    document.getElementById('t-time-p-'+i).innerHTML = LRCData[i].lineTime;
                    document.getElementById('t-data-p-'+i).innerHTML = LRCData[i].lineData;
                } else {
                    LRCData[i].lineData = '[' + LRCData[i].lineTime + ']';
                    LRCData[i].lineTime = '';
                    LRCData[i].lineTimeEx = undefined;
                                                document.getElementById('t-time-p-'+i).innerHTML = LRCData[i].lineTime;
                    document.getElementById('t-data-p-'+i).innerHTML = LRCData[i].lineData;
                }

                loc = true;
                j = line.length;
            }
        }
        if(line == ''){
            LRCData[i].isUsed = false;
        } else {
            LRCData[i].isUsed = true;
        }

        if(loc == false){
            LRCData[i].lineData = line;
            document.getElementById('t-data-p-' + i).innerHTML = LRCData[i].lineData;
        }
        NewLine();
    }
    DelLine();
}