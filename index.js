require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

//quando o bot é iniciado
client.on('ready', () => {
    console.log(`Geraldo se apresentando como: ${client.user.tag}!`)
})

//quando um novo membro entra no server
client.on('guildMemberAdd', member => {
    member.send(`LADIES AND GENTLEMANS, gazamos de um novo integrante em nosso Server!`)
})

//quando uma mensagem é enviada em qualquer canal de texto ou DM
client.on("message", async msg => {
    // um simples teste
    if (msg.content === 'salve') {
        msg.reply('Salvado!')
    }

    // previne spam e ignora outros bots
    if (msg.author.bot) return;

    // apenas pega mensagens que começam com o prefixo definido no arquivo
    if (msg.content.indexOf(process.env.PREFIX_COMMAND) !== 0) return;

    // separando o comando e mensagem recebida ex:
    // "g; say hello world":
    // action = say
    // args = ["Hello", "World"]
    const args = msg.content.slice(process.env.PREFIX_COMMAND.length).trim().split(/ +/g);
    const action = args.shift().toLowerCase();
    // Ações do bot
    if (action === 'ping') {
        // retorna o ping entre o envio e retorno da mensagem
        msg.reply(`Pong! Latencia: ${createdTimestamp - msg.createdTimestamp}ms.`);
    }

    if (action === 'diga-me') {
        // retorna uma repetição da mensagem enviada
        const message = args.join(" ");
        msg.channel.send(message);
    }

    // if (action === 'kick') {
    //     //verifica o membro mencionado junto com a mensagem
    //     const member = msg.mentions.members.first()
    //     // se nao veio membro
    //     if (!member) {
    //         return msg.reply(
    //             `Perdão mas você precisa me dizer quem será removido!`
    //         )
    //     }
    //     //se o membro é kickavel
    //     if (!member.kickable) {
    //         return msg.reply(`Perdão mas não posso remover esta pessoa!`)
    //     }
    //     //retorna
    //     return member
    //         .kick()
    //         .then(() => msg.reply(`${member.user.tag} foi removido.`))
    //         .catch(error => msg.reply(`Perdão mas não pude realizar esta ação.`))
    // }
});

client.login(process.env.BOT_TOKEN)