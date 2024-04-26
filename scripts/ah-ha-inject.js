// add the ah-ha teaser and chat iframe
function initAhHaBot(config) {
  // the main div that holds the teaser-div and chatIcon open/close div
  // const mainDiv = document.createElement('div')
  // mainDiv.setAttribute('id', 'main-div')
  // document.body.append(mainDiv)
  let isChatIframeLoaded = false

  // botpressIframeDiv
  const botpressIframeDiv = document.createElement('div')
  botpressIframeDiv.style.display = 'none'
  botpressIframeDiv.setAttribute('id', 'iframe-div')
  document.body.append(botpressIframeDiv)

  // iframe
  const iframe = document.createElement('iframe')
  iframe.setAttribute('id', 'ah-ha-chat-iframe')
  iframe.setAttribute('frameBorder', 0)
  iframe.src = config.botpressIframeSrc
  botpressIframeDiv.append(iframe)

  // the teaserdiv
  const startChatTeaserDiv = document.createElement('div')
  startChatTeaserDiv.style.display = 'none'
  startChatTeaserDiv.setAttribute('id', 'teaser-div')
  document.body.append(startChatTeaserDiv)

  // chatIconOpenDiv
  const chatIconOpenDiv = document.createElement('div')
  chatIconOpenDiv.style.display = 'block'
  chatIconOpenDiv.setAttribute('id', 'chat-icon-open-div')
  document.body.append(chatIconOpenDiv)

  // chatIconOpenImg
  const chatIconOpenImg = document.createElement('img')
  chatIconOpenImg.src = config.chatIconPath
  chatIconOpenImg.style.height = '80px'
  chatIconOpenImg.style.width = '80px'
  chatIconOpenImg.style.display = 'none'
  chatIconOpenImg.addEventListener('click', onChatIconClick)
  chatIconOpenDiv.append(chatIconOpenImg)

  // chatIconCloseDiv
  const chatIconCloseDiv = document.createElement('div')
  chatIconCloseDiv.style.display = 'none'
  chatIconCloseDiv.setAttribute('id', 'chat-icon-close-div')
  document.body.append(chatIconCloseDiv)

  // chatIconCloseImg
  const chatIconCloseImg = document.createElement('img')
  chatIconCloseImg.src = config.closeIconPath
  chatIconCloseImg.style.height = '70px'
  chatIconCloseImg.style.width = '70px'
  chatIconCloseImg.addEventListener('click', onChatCloseIconClick)
  chatIconCloseDiv.append(chatIconCloseImg)

  //  to display teaser by default
  if (config.openTeaser) {
    openTeaser()
  }
  function openTeaser() {
    var teaser = document.getElementById('teaser-div')
    if (teaser.style.display === 'none' && chatIconOpenDiv.style.display === 'block') {
      teaser.style.display = 'block'
      chatIconOpenDiv.style.display = 'none'
      chatIconCloseDiv.style.display = 'block'
    }
  }

  // when user clicks on start chat
  function onChatIconClick() {
    var teaser = document.getElementById('teaser-div')
    var iframe = document.getElementById('iframe-div')
    var chatIcon = document.getElementById('chat-icon-open-div')
    var closeIcon = document.getElementById('chat-icon-close-div')
    if (teaser.style.display === 'none') {
      if (isChatIframeLoaded) iframe.style.display = 'block'
      else teaser.style.display = 'block'
    } else teaser.style.display = 'none'

    if (chatIcon.style.display === 'block') {
      chatIcon.style.display = 'none'
      closeIcon.style.display = 'block'
    }
    const chatWindow = document.querySelector('#iframe-div')
    const chatIframe = document.querySelector('#ah-ha-chat-iframe')
    chatWindow.style.width = '30vw'
    chatWindow.style.height = '60%'
    chatIframe.style.width = '30vw'
  }

  // when user clicks on close chat
  function onChatCloseIconClick() {
    var teaser = document.getElementById('teaser-div')
    var iframe = document.getElementById('iframe-div')
    var chatIcon = document.getElementById('chat-icon-open-div')
    var closeIcon = document.getElementById('chat-icon-close-div')

    if (closeIcon.style.display == 'block') closeIcon.style.display = 'none'
    chatIcon.style.display = 'block'

    if (iframe.style.display == 'block') {
      iframe.style.display = 'none'
    }

    if (teaser.style.display == 'block') {
      teaser.style.display = 'none'
    }
  }

  // header-rectangle
  const headerRectangleDiv = document.createElement('div')
  headerRectangleDiv.setAttribute('id', 'header-rectangle')
  startChatTeaserDiv.append(headerRectangleDiv)

  // logoDiv
  const logoDiv = document.createElement('div')
  logoDiv.setAttribute('id', 'logo-div')
  startChatTeaserDiv.append(logoDiv)

  // img-logoIcon
  const imgLogo = document.createElement('img')
  imgLogo.src = config.logoPath

  imgLogo.setAttribute('id', 'logo-icon')
  logoDiv.append(imgLogo)

  // teaserBody-div
  const teaserBodyDiv = document.createElement('div')
  teaserBodyDiv.setAttribute('id', 'teaser-body')
  startChatTeaserDiv.append(teaserBodyDiv)

  // introText-div
  const introTextDiv = document.createElement('div')
  introTextDiv.innerHTML = config.introText
  introTextDiv.setAttribute('id', 'intro-text')
  teaserBodyDiv.append(introTextDiv)

  // startChatButton-div
  const startButtonDiv = document.createElement('div')
  startButtonDiv.setAttribute('id', 'button-div')
  teaserBodyDiv.append(startButtonDiv)

  const startChatButton = document.createElement('button')
  startChatButton.innerHTML = config.startButtonText
  startChatButton.setAttribute('id', 'button-tag')
  startChatButton.addEventListener('click', () => onStartChat('START_CHAT'))
  startButtonDiv.append(startChatButton)
  // I'll comback later button
  const ComebackLaterButton = document.createElement('button')
  ComebackLaterButton.innerHTML = config.comebackButtonText
  ComebackLaterButton.setAttribute('id', 'comeback-button-tag')
  ComebackLaterButton.addEventListener('click', () => onStartChat('COME_BACK_LATER'))
  startButtonDiv.append(ComebackLaterButton)

  function onStartChat(payload) {
    //console.log(payload)
    isChatIframeLoaded = true
    var teaser = document.getElementById('teaser-div')
    var iframe = document.getElementById('iframe-div')
    var chat = document.getElementById('ah-ha-chat-iframe')
    chat.contentWindow.postMessage({ action: 'event', payload: { type: 'proactive-trigger', channel: 'web', payload: { text: payload } } }, '*')
    if (iframe.style.display === 'none') {
      iframe.style.display = 'block'
    }
    if (teaser.style.display === 'block') {
      teaser.style.display = 'none'
    }
  }

  window.addEventListener('message', message => {
    // make the bot auto start the conversation when the webchat is ready
    if (message.data.name && message.data.name.includes('webchatReady')) {
      setTimeout(() => {
        chatIconOpenImg.style.display = 'block'
      }, 300)
      // var iframe = document.getElementById('ah-ha-chat-iframe')
      // iframe.contentWindow.postMessage({ action: 'event', payload: { type: 'proactive-trigger', channel: 'web', payload: {} } }, '*')
    }

    // on clicking restart button, we need to reload the iframe
    if (message.data.message_type === 'session_reset') {
      var iframe = document.getElementById('ah-ha-chat-iframe')
      iframe.src = iframe.src
    }

    // close the iframe and teaser on click of close button in the chat iframe
    if (message.data?.payload?.payload === 'END_CHAT_CLOSE_WINDOW') {
      chatIconOpenImg.style.display = 'none'
      isChatIframeLoaded = false
      onChatCloseIconClick()
      var iframe = document.getElementById('ah-ha-chat-iframe')
      iframe.src = iframe.src
    }
    if (message.data.task) {
      if (message.data.task === 'endchatendbutton') {
        chatIconOpenImg.style.display = 'none'
        isChatIframeLoaded = false
        onChatCloseIconClick()
        var iframe = document.getElementById('ah-ha-chat-iframe')
        iframe.src = iframe.src
      }
    }
  })
}

