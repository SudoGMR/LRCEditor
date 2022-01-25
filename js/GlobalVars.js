/**
 * FileData[0] - audio data:
    nameFull: string,
    lastModified: int,              - unused
    webkitRelativePath: string,     - unused
    size: int,
    type: string,
    name: string,
    ext: string,
    duration: float,
    durConv: string

 * FileData[1] - lrc file data:
    nameFull: string,
    lastModified: int,              - unused
    webkitRelativePath: string,     - unused
    size: int,
    type: string,
    name: string,
    ext: string
 */

var FileData = [{
    nameFull: undefined,
    type: undefined,
    name: undefined,
    ext: undefined,
    duration: '',
    durConv: 0
}, {
    nameFull: 'untitled.lrc',
    type: 'application/x-subtitle-lrc',
    name: 'untitled',
    ext: 'lrc'
}];
var EditorData = {};
var EHData = {
    lastSelected: undefined,
    currentlySelected: undefined,
}
var LRCData = [];

/* --- Event Listeners --- */
PlayerAudio.addEventListener('loadedmetadata', () => {
    FileData[0].duration = PlayerAudio.duration;
    FileData[0].durConv = ConvertTime(PlayerAudio.duration);
})

/* --- Functions --- */
function SetArrayData(Array, file){
    let temp;
    for(let i = file.name.length - 1;i > 0; i--){
        if(file.name[i-1] == '.'){
            temp = {
                nameFull: file.name,
                size: file.size,
                type: file.type,
                name: file.name.substring(0, i - 1),
                ext: file.name.substring(i)
            }
            i = 0;
        }
    }

    if(temp.ext == 'mp3' || temp.ext == 'ogg'){
        //* .duration and .durConv is set in Event Listener
        Array[0] = temp;
    }
    if(temp.ext == 'lrc'){
        if(temp.type == ''){
            temp.type = 'application/x-subtitle-lrc';
        }
        Array[1] = temp;
    }
}

/* --- Run on Load --- */
if(typeof(Storage) !== 'undefined'){
    if(!localStorage.userSettings){
        localStorage.setItem('userSettings', JSON.stringify({
            colorScheme: 'default',
            skipTimeBy: 5,
            h_interval: 10
        }))
    }
    EditorData = JSON.parse(localStorage.userSettings);

    if(!localStorage.volume){
        localStorage.setItem('volume', 50);
    }
}