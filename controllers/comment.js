const { mysql } = require('../qcloud')
const { makeid } = require('../util/util')

const addComment = async function(ctx) {
  const { bookid, openid, comment, location, phone } = ctx.request.body
  const id = makeid()
  await mysql('comment').insert({ id, bookid, openid, comment, location, phone })
  ctx.body = {
    code: 0,
    msg: '评论发表成功'
  }
}

const getComment = async function(ctx) {
  const { bookid, openid } = ctx.request.query
  const mysqlSelect = mysql('comment')
    .select('comment.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'comment.openid', 'csessioninfo.open_id')

  let comment
  if (bookid) {
    comment = await mysqlSelect.where({ bookid })
  } else if (openid) {
    comment = await mysqlSelect.where({ openid })
  }

  ctx.body = {
    code: 0,
    comment: comment.map(item => {
      const userInfo = JSON.parse(item.user_info)
      return Object.assign({}, item, {
        user_info: { nickName: userInfo.nickName, avatarUrl: userInfo.avatarUrl }
      })
    })
  }
}

module.exports = { addComment, getComment }
