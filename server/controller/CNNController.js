const uploadImage = async (req, res) => {
    const { image } = req.body;
    
    res.send('Image sent successfully!');
}

module.exports = {
    uploadImage,
}