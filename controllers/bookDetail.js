const { mysql } = require('../qcloud')

module.exports = async function(ctx) {
  const { bookid } = ctx.request.query

  let detail = await mysql('books')
    .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .where('id', bookid)
    .first()

  await mysql('books')
    .where('id', bookid)
    .increment('count', 1)

  const userInfo = JSON.parse(detail.user_info)
  detail = Object.assign({}, detail, { user_info: { nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl } })

  ctx.body = {
    code: 0,
    detail
  }
}
