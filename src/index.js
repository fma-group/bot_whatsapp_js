const venom = require('venom-bot')

const help = require('./commands/help')
const wiki = require('./commands/wiki')

venom.create().then(client => start(client))

function start(client) {
    client.onMessage((message) => {
        let textall = message.body.trim().toLowerCase()
        if (message.isMedia === false) {
            if (textall[0] === '!') {
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
                }
                return
            }
        }
    })
}

async function chelp(c, m) {
    let res0 = help()
    c.reply(m.from, res0, m.id.toString())
    return
}

async function cwiki(c, m, p) {
    let res1 = await wiki(p)
    c.reply(m.from, res1, m.id.toString())
    return
}