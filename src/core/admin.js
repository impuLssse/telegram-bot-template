
const admins = [ 'it_gordon', 'impuLssse666' ]

export const isAdmin = ctx => admins.includes(ctx.from.username) ? true : false
