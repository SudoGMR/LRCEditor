let Timer;
/* --- Event Listeners --- */
PlayerAudio.addEventListener('loadedmetadata', () => {
    PlayerAudioLength.innerHTML = ConvertTime(PlayerAudio.duration);
    PlayerCurrentTime.innerHTML = ConvertTime(0);
    PlayerProgressBar.max = PlayerAudio.duration * 100;
    PlayerAudio.pause();
})
/*
PlayerAudio.addEventListener('timeupdate', () => {
    PlayerProgressBar.value = PlayerAudio.currentTime * 100;
    PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
})*/

PlayerBtnRewind.addEventListener('click', (e) => {
    e.target.blur();
    PlayerController('rewind');
})

PlayerBtnPP.addEventListener('click', (e) => {
    e.target.blur();
    PlayerController('switchplay');
})

PlayerBtnFoward.addEventListener('click', (e) => {
    e.target.blur();
    PlayerController('foward')
})

PlayerBtnTime.addEventListener('click', () => {
    //not implemented yet
})

PlayerProgressBar.addEventListener('input', () => {
    PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
    PlayerController('set', PlayerProgressBar.value);
})

PlayerVolumeBar.addEventListener('input', () => {
    PlayerVolume.innerHTML = PlayerVolumeBar.value;
    PlayerAudio.volume = PlayerVolumeBar.value / 100;
    localStorage.volume = PlayerVolumeBar.value;
})

PACPhoneBtn.onclick = function(){
    if(PlayerAudioControls.getAttribute('class') == 'show-content'){
        PlayerAudioControls.setAttribute('class', '')
    } else {
        PlayerAudioControls.setAttribute('class', 'show-content');
    }
}

/* --- Functions --- */
function PlayerController(action, time){
    //if(FileData[0].){}
    switch(action){
        case 'play':
            //PlayerAudio.play();
            PlayerImgPP.src = '../imgs/pause-icon-outline-128x128.png';
            PlayerImgPP.alt = 'pause';
            break;
        case 'pause':
            //PlayerAudio.pause();
            PlayerImgPP.src = '/imgs/play-icon-outline-128x128.png';
            PlayerImgPP.alt = 'play';
            break;
        case 'switchplay':
            if(PlayerAudio.paused == true){
                PlayerAudio.play();
                PlayerImgPP.src = './imgs/pause-icon-outline-128x128.png';
                PlayerImgPP.alt = 'pause';
                //EditorData[0].playerState = 'playing';
                PlayerProgressBar.value = PlayerAudio.currentTime * 100;
                PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
                let timeList = GetTableTime();
                Timer = setInterval(PlayerPlay, EditorData.h_interval, timeList);
            } else
            if(PlayerAudio.paused == false){
                PlayerAudio.pause();
                PlayerImgPP.src = './imgs/play-icon-outline-128x128.png';
                PlayerImgPP.alt = 'play';
                //EditorData[0].playerState = 'paused';
                clearInterval(Timer);
            }
            break;
        case 'foward':
            PlayerAudio.currentTime = PlayerAudio.currentTime + EditorData.skipTimeBy;
            PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
            break;
        case 'rewind':
            PlayerAudio.currentTime = PlayerAudio.currentTime - EditorData.skipTimeBy;
            PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
            break;
        case 'set':
            PlayerAudio.currentTime = time / 100;
            break;
    }
}

/* --- On Load --- */
PlayerController('pause')
PlayerVolumeBar.value = localStorage.volume;
PlayerVolume.innerHTML = localStorage.volume;
PlayerAudio.volume = localStorage.volume / 100;