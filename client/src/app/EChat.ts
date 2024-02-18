export default class EChat extends HTMLElement {

    constructor () {
        super()
        this.inicia()
    }

    connectedCallback() {

    }

    inicia() {
        this.attachShadow({ mode: 'closed' })
        this.criaEntradaChat()
        this.criaAreaMensagens()
        this.criaEstilos()
    }

    criaEntradaChat() {
        const input = document.createElement('input')
    }

    criaAreaMensagens() {

    }

    criaEstilos() {

    }
}
customElements.define('e-chat', EChat)