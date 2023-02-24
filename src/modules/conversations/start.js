import { Menu } from "@grammyjs/menu"
import { Bot, Scene } from "../../core/index.js";

const target = 'stats'

async function scene (conv, ctx) {
    await ctx.reply(`your name?`, { reply_markup: menu })

    const { message } = await conv.wait();
    await ctx.reply(`hello ${message.text}`)
}


const login = new Menu('login')
    .text("напасть", ctx => {
        ctx.reply(`приветики ${ctx.chat.username}. уже ${ctx.session.counter}`)
        ctx.session.counter++
    }).row()
    .back("назад")


const menu = new Menu(target)
    .submenu("ввести ключ", "login")
    .webApp('сайт', 'https://master-market.shop/')


menu.register(login)

Bot.reg(menu)
Scene.create(scene, target)
Bot.cmd(target)