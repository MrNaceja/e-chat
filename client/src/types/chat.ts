export interface IMessage {
    content: string,
    from: 'server'|'client',
    moment: Date 
}