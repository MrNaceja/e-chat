
import initSocketIo from "@/app/socket/index.js"
import { IMessage } from "@/types/chat"
import { TInstanceSocketIo } from "@/types/socket"

/**
 * WebComponent de Chat interligado com Socket.io.
 */
export default class EChat extends HTMLElement {

    #socketIo : TInstanceSocketIo

    constructor () {
        super()
        this.#mount()
    }

    #mount() {
        this.attachShadow({ mode: 'open' })
        this.#configureSocket()
        this.#mountContainer()
        this.#mountMessagesArea()
        this.#mountInputArea()
        this.#mountStyles()
    }

    #configureSocket() {
        this.#socketIo = initSocketIo()
        this.#socketIo.on('serverMessage', message => {
            this.#appendMessage({
                content: message,
                from: 'server'
            })
        })
    }

    #appendMessage(message : IMessage) {
        const container = document.createElement('h3')
        container.classList.add('messages', `${message.from}-messages`)
        container.innerText = message.content

        this.#getMessagesArea().appendChild(container)
    }

    #mountContainer() {
        const container = document.createElement('div')
        container.classList.add('container')
        this.shadowRoot.appendChild(container)
    }

    #mountInputArea() {
        const container = document.createElement('div')
        const input = document.createElement('input')
        const sendBtn = document.createElement('button')

        input.addEventListener('keydown', e => {
            if (e.key == 'Enter') {
                e.preventDefault()
                this.#sendMessage()
            }
        })
        sendBtn.addEventListener('click', () => this.#sendMessage())
        sendBtn.innerText = '→';
        input.placeholder = 'Digite aqui...'
        sendBtn.type = 'button'
        sendBtn.title = 'Enviar'
        container.classList.add('input-area')
        container.append(input, sendBtn)
        this.#getContainer().appendChild(container)
    }

    #mountMessagesArea() {
        const container = document.createElement('div')
        container.classList.add('messages-area')
        this.#getContainer().appendChild(container)
    }

    #mountStyles() {
        const linkEstilos = document.createElement('link')
        linkEstilos.href = '/src/app/e-chat/styles.css'
        linkEstilos.rel = 'stylesheet'
        this.shadowRoot.appendChild(linkEstilos)
    }

    #sendMessage() {
        const input = this.#getInputArea().querySelector('input')
        const message = input.value
        if (message) {
            this.sendClientMessage(message)
            input.value = ''
        }
       
    }

    sendClientMessage(message : string) {
        this.#socketIo.emit('clientMessage', message)
        this.#appendMessage({
            content: message,
            from: 'client'
        })
    }

    #getContainer() : HTMLDivElement {
        return this.shadowRoot.querySelector('.container')
    }

    #getMessagesArea() : HTMLDivElement {
        return this.#getContainer().querySelector('.messages-area')
    }

    #getInputArea() : HTMLDivElement {
        return this.#getContainer().querySelector('.input-area')
    }
}

customElements.define('e-chat', EChat)