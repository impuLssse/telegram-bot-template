import { InputFile } from "@grammyjs/conversations/out/deps.node.js"
import { Menu } from "@grammyjs/menu"
import { Scene } from "../../core/index.js"

const target = 'admin'


async function scene (conv, ctx) {
    ctx.reply(`Админ: ${ctx.from.username}`, { reply_markup: menu })
}


const menu = new Menu(target)
    .text('Управление', async ctx => await ctx.conversation.enter('control')).row()
    .text('Назад', async ctx => await ctx.conversation.enter('start'))


Scene.create(target, scene, menu)