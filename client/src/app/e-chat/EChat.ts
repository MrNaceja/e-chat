import initSocketIo from "../socket/index.js"
import { TSocketIo } from "../types/socket-io.js"

export default class EChat extends HTMLElement {

    #Container : HTMLDivElement
    #socketIo : TSocketIo

    constructor () {
        super()
        this.mount()
    }

    mount() {
        this.#socketIo = initSocketIo()
        this.attachShadow({ mode: 'open' })
        this.mountContainer()
        this.mountMessagesArea()
        this.mountInputArea()
        this.mountStyles()
    }

    appendContainer(...childs : Node[]) {
        if (!this.#Container) this.mountContainer()
        this.#Container.classList.add('container')
        this.#Container.append(...childs)
        return this
    }

    mountContainer() {
        if (this.#Container) return
        this.#Container = document.createElement('div')
        this.#Container.classList.add('container')
        this.shadowRoot.appendChild(this.#Container)
    }

    mountInputArea() {
        const container = document.createElement('div')
        const input = document.createElement('input')
        const sendBtn = document.createElement('button')

        input.addEventListener('keydown', e => {
            if (e.key == 'Enter') {
                e.preventDefault()
                this.sendMessage()
            }
        })
        sendBtn.addEventListener('click', () => this.sendMessage())
        sendBtn.innerText = 'Enviar';
        input.placeholder = 'Digite aqui...'
        container.classList.add('input-area')
        container.append(input, sendBtn)
        this.appendContainer(container)
    }

    mountMessagesArea() {
        const container = document.createElement('div')
        const message = document.createElement('span')


        container.classList.add('messages-area')
        container.appendChild(message)
        this.appendContainer(container)
    }

    mountStyles() {
        const linkEstilos = document.createElement('link')
        linkEstilos.href = '/src/app/e-chat/styles.css'
        linkEstilos.rel = 'stylesheet'
        this.shadowRoot.appendChild(linkEstilos)
    }

    sendMessage() {
        const input : HTMLButtonElement = this.#Container.querySelector('.input-area > input')
        const message = input.value

        this.#socketIo.emit('clientMessage', message)

        input.value = ''
    }
}
customElements.define('e-chat', EChat)