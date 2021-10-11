/*
 * @Description: 
 * @Author: ytang5
 * @Date: 2021-08-19 19:32:27
 * @LastEditors: ytang5
 * @FilePath: /self-resume-nodejs/pages/api/hello.js
 * @LastEditTime: 2021-10-11 17:49:13
 */
import { parse as parseQuery } from 'querystring'
const MongoClient = require('mongodb').MongoClient

//连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017';


export default (req, res) => {
    //使⽤客户端连接数据，并指定完成时的回调⽅法
    console.log('req', req.headers)
    const cookie = parseQuery(req.headers.cookie, ';') || {}
    const GUID = cookie['GUID']
    console.log('req2', JSON.stringify(req.socket.remoteAddress), req.ip)
    MongoClient.connect(DB_CONN_STR, async (err, db) => {
        var dbase = db.db("self-site");
        var myobj = { name: "菜鸟教程", GUID: GUID };
        await dbase.collection("users").find({ GUID: GUID }).toArray(function (err, res) {
            console.log('res2222', res)
            return
            dbase.collection("users").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                db.close();
            });
        })
        // console.log('aaaa', a)
        // return

    });
    res.status(200).json({ text: 'Hello' })
}