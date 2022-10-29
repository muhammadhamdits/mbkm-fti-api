const Notification = require('../models').Notification

const index = async (req, res) => {
  user = req.decoded
  
  notifications = await Notification.findAll({
    where: { userId: user.id, userRole: user.role }
  })

  return res.status(200).json({ notifications })
}

const update = async (req, res) => {
  id = req.params.id

  notification = await Notification.findByPk(id)
  if(!notification) return res.status(404).json({ error: 'No notification found with id provided' })
  console.log(notification)

  notification = await notification.update({ isRead: true })

  return res.status(200).json({ notification })
}

module.exports = {
  index,
  update
}