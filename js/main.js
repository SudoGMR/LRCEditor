/* --- GLOBAL DEFCLARATORS --- */
/** main.js */
const AudioName = document.getElementById('audio-name');
const InputLRCName = document.getElementById('input-lrc-name');
const LRCName = document.getElementById('lrc-name');
const MenuBtn = document.getElementById('menu-btn');
const WindowMenu = document.getElementById('window-menu');
const WMCClose = document.getElementById('wmc-close');

/** GlobalVars.js */
const PlayerAudio = document.getElementById('player-audio');

/** FileManager.js */
const EditorExportBtnLrc = document.getElementById('editor-export-btn-lrc');
const EditorImportBtnAudio = document.getElementById('editor-import-btn-audio');
const EditorImportBtnLrc = document.getElementById('editor-import-btn-lrc');
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
const WMCAudioName = document.getElementById('wmc-audio-name');
const WMCExportBtnLRC = document.getElementById('wmc-export-btn-lrc');
const WMCImportAudio = document.getElementById('wmc-import-audio');
const WMCImportBtnLRC = document.getElementById('wmc-import-btn-lrc');
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
const PlayerCurrentTime = document.getElementById('player-current-time');

const PlayerVolume = document.getElementById('player-volume')
const PlayerVolumeBar = document.getElementById('player-volume-bar');
const PlayerVolumeImg = document.getElementById('player-volume-img');
const PlayerPhoneVolumeImg = document.getElementById('player-phone-volume-img');
const PACPhoneBtn = document.getElementById('pac-phone-btn');
const PlayerAudioControls = document.getElementById('player-audio-controls');

/** ConvertTime.js */
// - none

/** Table.js */
const EditorDelSpecLineBtn = document.getElementById('editor-del-spec-line-btn');
const EditorNewLineAbSelBtn = document.getElementById('editor-new-line-ab-sel-btn');
const DelSpecLineBtn = document.getElementById('del-spec-line-btn');
const NewLineAbSelBtn = document.getElementById('new-line-ab-sel-btn');

/** TimeSetter.js */
const TimeSetterBtn = document.getElementById('player-time-setter');

/* --- Event listeners --- */
MenuBtn.addEventListener('click', () => {
    WindowMenu.setAttribute('class', '');
})

WMCClose.addEventListener('click', () => {
    WindowMenu.setAttribute('class', 'hidden');
})

/* --- Functions --- */

/* --- Code --- */
