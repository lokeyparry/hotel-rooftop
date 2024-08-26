const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).send({ message: 'Access denied! Only admin can perform this action.', success: false })
    }
    next()
}

module.exports = isAdmin;