const getUsers = (req, res) => {
    const data = ['hola','mundo']
    res.json({data});
}

module.exports = { getUsers }