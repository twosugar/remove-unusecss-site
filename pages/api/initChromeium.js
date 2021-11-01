export default async (req, res) => {
    try {
        // await RemoveUnusecss.init()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ errorMessage: '初始化失败', success: false })
    }
}