const venom = require('venom-bot')

const help = require('./commands/help')
const wiki = require('./commands/wiki')
const calc = require('./commands/calc')

venom.create().then(client => start(client))

function start(client) {
    client.onMessage(message => {
        let textall = message.body.trim().toLowerCase()
        if (message.isMedia === false && textall[0] === '!') {
            function checkCommand(text) {
                let textc = text.replace("!", "")
                let checking = ''
                for (let i = 0; i < textc.length; i++) {
                    if (textc[i] === ' ') {
                        break
                    }
                    checking += textc[i]
                }
                return checking
            }
            function checkParameter(text) {
                return textall.replace(`!${text}`, '').trim()
            }
            let command = checkCommand(textall)
            let parameter = checkParameter(command)

            switch (command) {
                case 'help':
                    chelp(client, message)
                    return
                case 'wiki':
                    cwiki(client, message, parameter)
                    return
                case 'calc':
                    ccalc(client, message, parameter)
            }
            return

        }
    })
}

async function chelp(c, m) {
    let res0 = help()
    c.reply(m.from, res0, m.id.toString())
    return
}

async function cwiki(c, m, p) {
    if (p == "-h" || p == "-help" || p == "--help" || p == "" || p == " ") {
        let h = "Para usar o comando *!wiki* você precisa colocar como parâmetro o que quer que o bot pesquise.\n\nEx:\n\n!wiki cachorro"
        c.reply(m.from, h, m.id.toString())
        return  
    }
    let res1 = await wiki(p)
    c.reply(m.from, res1, m.id.toString())
    return
}

async function ccalc(c, m, p) {
    if (p == "-h" || p == "-help" || p == "--help" || p == "" || p == " ") {
        let h = "Para usar o comando *!calc* você precisa colocar como parâmetro algum cálculo.\n\nEx:\n\n!calc 5+3"
        c.reply(m.from, h, m.id.toString())
        return  
    }
    let res2 = calc(p)
    c.reply(m.from, res2, m.id.toString())
    return
}