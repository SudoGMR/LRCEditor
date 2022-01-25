/* --- GLOBAL DEFCLARATORS --- */
/** main.js */
const InputAudioName = document.getElementById('input-audio-name');
const InputLRCName = document.getElementById('input-lrc-name');
const MenuBtn = document.getElementById('menu-btn');
const WindowMenu = document.getElementById('window-menu');
const WMCClose = document.getElementById('wmc-close');

/** GlobalVars.js */
const PlayerAudio = document.getElementById('player-audio');

/** FileManager.js */
const ExportBtnLRC = document.getElementById('export-btn-lrc');
const ImportBtnAudio = document.getElementById('import-btn-audio');
const ImportBtnLRC = document.getElementById('import-btn-lrc');
const ImportHiddenAudio = document.getElementById('import-hidden-audio');
const ImportHiddenLRC = document.getElementById('import-hidden-lrc');
const ImportBtnChoice = document.getElementById('import-btn-choice');
const WICCImportFile = document.getElementById('wicc-import-file');
const WICCTextArea = document.getElementById('wicc-textarea');
const WICCContinue = document.getElementById('wicc-continue');
const WICCCancel = document.getElementById('wicc-cancel');
const WICC = document.getElementById('window-import-choice');
const WMCImportAudio = document.getElementById('wmc-import-audio');
const WMCAudioName = document.getElementById('wmc-audio-name');
//const jsmediatags = window.jsmediatags;

/** Player.js */
//const PlayerAudio = document.getElementById('player-audio'); // - already defined
const PlayerBtnFoward = document.getElementById('player-btn-foward');
const PlayerBtnPP = document.getElementById('player-btn-play-pause');
const PlayerBtnRewind = document.getElementById('player-btn-rewind');
const PlayerProgressBar = document.getElementById('player-progress-bar');

const PlayerImgFoward = document.getElementById('player-img-foward');
const PlayerImgPP = document.getElementById('player-img-pp');
const PlayerImgRewind = document.getElementById('player-img-rewind');

const PlayerAudioLength = document.getElementById('player-audio-length');
const PlayerBtnTime = document.getElementById('player-btn-time');
const PlayerCurrentTime = document.getElementById('player-current-time');

const PlayerVolume = document.getElementById('player-volume')
const PlayerVolumeBar = document.getElementById('player-volume-bar');
const PACPhoneBtn = document.getElementById('pac-phone-btn');
const PlayerAudioControls = document.getElementById('player-audio-controls');

/** ConvertTime.js */
// - none

/** Table.js */
// - none

/** TimeSetter.js */
// - none

/* --- Event listeners --- */
MenuBtn.addEventListener('click', () => {
    WindowMenu.setAttribute('class', '');
})

WMCClose.addEventListener('click', () => {
    WindowMenu.setAttribute('class', 'hidden');
})

/* --- Functions --- */

/* --- Code --- */