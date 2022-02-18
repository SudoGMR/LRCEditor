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

PlayerProgressBar.addEventListener('input', () => {
    PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
    PlayerController('set', PlayerProgressBar.value);
})

PlayerVolumeBar.addEventListener('input', (e) => {
    SetVolume(e.target.value)
});

PACPhoneBtn.onclick = function(){
    if(PlayerAudioControls.getAttribute('class') == 'show-content'){
        PlayerAudioControls.setAttribute('class', '')
    } else {
        PlayerAudioControls.setAttribute('class', 'show-content');
    }
}

/* --- Functions --- */
function PlayerController(action, time){
    if(FileData[0].nameFull != undefined){
        switch(action){
            case 'play':
                //PlayerAudio.play();
                PlayerImgPP.src = './imgs/pause-outline.svg';
                PlayerImgPP.alt = 'pause';
                break;
            case 'pause':
                //PlayerAudio.pause();
                PlayerImgPP.src = './imgs/play-outline.svg';
                PlayerImgPP.alt = 'play';
                break;
            case 'switchplay':
                if(PlayerAudio.paused == true){
                    PlayerAudio.play();
                    PlayerImgPP.src = './imgs/pause-outline.svg';
                    PlayerImgPP.alt = 'pause';
                    //EditorData[0].playerState = 'playing';
                    PlayerProgressBar.value = PlayerAudio.currentTime * 100;
                    PlayerCurrentTime.innerHTML = ConvertTime(PlayerAudio.currentTime);
                    let timeList = GetTableTime();
                    Timer = setInterval(PlayerPlay, EditorData.h_interval, timeList);
                } else
                if(PlayerAudio.paused == false){
                    PlayerAudio.pause();
                    PlayerImgPP.src = './imgs/play-outline.svg';
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
    
}

function SetVolume(volume){
    PlayerVolume.innerHTML = volume;
    PlayerAudio.volume = volume / 100;
    localStorage.volume = volume;
    if(PlayerAudio.volume == 0){
        PlayerVolumeImg.src = './imgs/volume-mute-outline.svg';
        PlayerPhoneVolumeImg.src = './imgs/volume-mute-outline.svg';
    }
    if(PlayerAudio.volume > 0 && PlayerAudio.volume <= 0.33){
        PlayerVolumeImg.src = './imgs/volume-low-outline.svg';
        PlayerPhoneVolumeImg.src = './imgs/volume-low-outline.svg';
    }
    if(PlayerAudio.volume > 0.33 && PlayerAudio.volume <= 0.66){
        PlayerVolumeImg.src = './imgs/volume-medium-outline.svg';
        PlayerPhoneVolumeImg.src = './imgs/volume-medium-outline.svg';
    }
    if(PlayerAudio.volume > 0.66){
        PlayerVolumeImg.src = './imgs/volume-high-outline.svg';
        PlayerPhoneVolumeImg.src = './imgs/volume-high-outline.svg';
    }
}

/* --- On Load --- */
PlayerController('pause');
PlayerImgPP.src = './imgs/play-outline.svg';
SetVolume(localStorage.volume);
/*
PlayerVolumeBar.value = localStorage.volume;
PlayerVolume.innerHTML = localStorage.volume;
PlayerAudio.volume = localStorage.volume / 100;
*/