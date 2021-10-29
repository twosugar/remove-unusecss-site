import RemoveUnusecss from 'remove-unusecss'

export default async (req, res) => {
    const params = JSON.parse(req.body) ?? {}
    console.log('params.config', params.config)
    const data = await RemoveUnusecss.start(params.config)
    res.status(200).json({ data: data, success: true })
}