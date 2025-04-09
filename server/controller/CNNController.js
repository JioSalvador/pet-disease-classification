// this uploads an image to the CNN algorithm
const uploadImage = async (req, res) => {
    const { image } = req.body;
    res.send('This is I, Jio');
}

module.exports = {
    uploadImage,
}