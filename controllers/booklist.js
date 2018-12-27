const { mysql } = require('../qcloud')

module.exports = async function(ctx) {
  const { page } = ctx.request.query
  const size = 7
  const book = await mysql('books')
    .join('csessioninfo', 'books.openid', '=', 'csessioninfo.open_id')
    .select('books.*', 'csessioninfo.user_info')
    .limit(size)
    .offset(Number(page) * size)
    .orderBy('books.date', 'desc')

  ctx.body = {
    code: 0,
    booklist: book.map(item => {
      const userInfo = JSON.parse(item.user_info)
      return Object.assign({}, item, { user_info: { nickName: userInfo.nickName } })
    })
  }
}
