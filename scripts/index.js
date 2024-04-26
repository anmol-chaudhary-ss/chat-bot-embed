const FULLSCREEN = 'fullscreen'
const EXIT_FULLSCREEN = 'exitfullscreen'
const END_CHAT = 'endchatendbutton'
const END_SESSION = 'END_CHAT_CLOSE_WINDOW'
const CONTACT_US = 'CONTACT_US'
const DELIVERABLES = 'DELIVERABLES'
const SPEAKER_TOGGLE = 'SPEAKER_TOGGLE'
const SESSION_RESET = 'webchatReady'

const chatWindow = document.querySelector('#iframe-div')
const chatIframe = document.querySelector('#ah-ha-chat-iframe')

const eventIds = []
let queue = []
var isMute = true
let isPlaying = false

Howler.autoUnlock = false
Howler.html5PoolSize = 100
let sound

window.addEventListener('message', message => {
  if (message.data.task === FULLSCREEN) handleToggleFullScreen(true)
  if (message.data.task === EXIT_FULLSCREEN) handleToggleFullScreen()
})

const handleToggleFullScreen = isFullScreen => {
  chatWindow.style.width = isFullScreen ? '55vw' : '30vw'
  chatWindow.style.height = isFullScreen ? '80%' : '60%'
  chatIframe.style.width = isFullScreen ? '55vw' : '30vw'
}

const endSession = () => {
  isMute = true
  chatIframe.contentWindow.postMessage({ action: 'event', payload: { type: 'end-trigger', channel: 'web', payload: { text: END_SESSION } } }, '*')
}
