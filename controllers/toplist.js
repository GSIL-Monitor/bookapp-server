const { mysql } = require('../qcloud')

module.exports = async function(ctx) {
  const toplist = await mysql('books')
    .select('id', 'title', 'image', 'count')
    .limit(9)
    .orderBy('count', 'desc')

  ctx.body = {
    code: 0,
    toplist
  }
}
