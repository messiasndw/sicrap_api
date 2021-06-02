
const User =  {

    me: (req, res) => {
        res.json(req.params)
    }
}

export default User

