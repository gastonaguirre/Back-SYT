const getUsers = (req, res) => {
    const data = ['hola','mundo']
    console.log(data)
    res.json({data});
}

module.exports = { getUsers }