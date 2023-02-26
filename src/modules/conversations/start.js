import { Menu } from "@grammyjs/menu"
import { Bot, Scene } from "../../core/index.js"
import bot from "../../core/runners.js"
import { isAdmin } from '../../core/admin.js'

const target = 'start'

async function scene (conv, ctx) {
    const { from, text } = ctx.message
    
    const msg = await ctx.api.sendPhoto(from.id, 'https://master-market.shop/upload/iblock/206/2rz1cqw3qgfxatlevlo63gcgdlnuzgth.png', {
        caption: 'Добро пожаловать в магазин <code>master-market</code>\nБешеные весенние скидки до <b><i>75%</i></b>, стройматериалы по доступной цене!',
        reply_markup: isAdmin(ctx) ? menuIfAdmin : menu,
    })
}



const menu = new Menu(target)
    .webApp("Cделать заказ", "https://master-market.shop/")


const menuIfAdmin = new Menu('menuIfAdmin')
    .webApp("Cделать заказ", "https://master-market.shop/").row()
    .text('Админ-панель', async ctx => await ctx.conversation.enter('admin'))


Scene.create(target, scene, menu)
Bot.reg(menuIfAdmin)