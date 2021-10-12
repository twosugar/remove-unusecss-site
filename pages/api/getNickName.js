import RandomNickname from '@sugarfish/random-nickname'
const nickname = new RandomNickname()

export default (req, res) => {
    const name = nickname?.getRandomName?.()
    res.status(200).json({ text: name })
}