const config = {
  introText: `Hi. I’m Penelope. <br/>You can call me Penny.`,
  greetingText: `Hi, I'm Penny!`,
  logoPath: './assets/penny.gif',
  closeIconPath: './assets/chat.png',
  chatIconPath: './assets/chat.png',
  botpressIframeSrc: 'https://app.ah-ha.io/lite/ah-ha-website-bot-new/?m=channel-web&v=Fullscreen&options=%7B%22hideWidget%22%3Atrue%2C%22config%22%3A%7B%22enableReset%22%3Atrue%2C%22enableTranscriptDownload%22%3Atrue%7D%7D',
  //botpressIframeSrc: 'http://localhost:3000/lite/demo/?m=channel-web&v=Fullscreen&options=%7B%22hideWidget%22%3Atrue%2C%22config%22%3A%7B%22enableReset%22%3Atrue%2C%22enableTranscriptDownload%22%3Atrue%7D%7D',
  openTeaser: false,
  startButtonText: `START NOW`,
  comebackButtonText: `I'LL COME BACK LATER`,
}
initAhHaBot(config)
