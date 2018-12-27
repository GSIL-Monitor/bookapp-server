const axios = require('axios')
const { mysql } = require('../qcloud')
const util = require('../util/util')

module.exports = async function(ctx) {
  const { openid, isbn } = ctx.request.body
  const findBook = await mysql('books')
    .where({ isbn })
    .select('isbn')
  console.log('查询结果', findBook)
  if (findBook.length > 0) {
    ctx.body = {
      code: -1,
      msg: '图书已存在'
    }
    return
  }
  if (openid && isbn) {
    const result = await axios.get(`https://api.douban.com/v2/book/isbn/${isbn}`)
    if (result.status === 200) {
      const id = util.makeid()
      const rate = result.data.rating.average
      const { title, image, alt, publisher, summary, price } = result.data
      const tags = result.data.tags
        .map(item => {
          return `${item.title} ${item.count}`
        })
        .join(',')
      const author = result.data.author.join(',')
      const date = Date.now().toString()
      try {
        await mysql('books').insert({
          id,
          isbn,
          openid,
          title,
          image,
          alt,
          publisher,
          summary,
          price,
          rate,
          tags,
          author,
          date
        })
        ctx.body = {
          code: 0,
          msg: title
        }
      } catch (error) {
        ctx.body = {
          code: -1,
          msg: '新增失败' + error.sqlMessage
        }
      }
    } else {
      console.log(result)
    }
  } else {
    ctx.body = {
      msg: '参数错误'
    }
  }
}
