"use strict";

const https = require('https');
const fs = require('fs');

const url = require('url')
const querystring = require('querystring');

const options = {
    key: fs.readFileSync('./SSL/key.pem'),
    cert: fs.readFileSync('./SSL/cert.pem')
};

let port = process.argv[2];

if (!port) {
    port = 1234
}

try {
    fs.accessSync(
        './download/',
        fs.R_OK | fs.W_OK,
    )
} catch (err_) {
    console.log(`Not exist folder 'download', auto create it.`);
    fs.mkdirSync('download');
}


let server = https.createServer(options, function (request_, response_) {
    let parsedUrl = url.parse(request_.url, true);
    let path = request_.url;
    let query = '';
    if (path.indexOf('?') >= 0) {
        query = path.substring(path.indexOf('?'))
    };
    let pathNoQuery = parsedUrl.pathname;
    let queryObject = parsedUrl.query;
    let method = request_.method;
    /******** 从这里开始看，上面不要看 ************/
    response_.setHeader('Access-Control-Allow-Origin', '*');
    response_.setHeader('Content-Type', 'text/html;charset=utf-8');
    let postData = '';
    request_.addListener(
        'data',
        function (chunk_) {
            postData += chunk_;
        }
    ).addListener(
        'end',
        function () {
            postData = querystring.parse(postData);
            if (!postData.fileName || !postData.content) {
                response_.statusCode = 404;
                response_.write('Invalid parameter.');
                response_.end();
                return;
            }
            fs.writeFile(
                `./download/${postData.fileName}`,
                postData.content,
                (err_) => {
                    if (err_) {
                        console.log(err_);
                    }
                },
            );
            response_.write(`${postData.fileName} success.`);
            response_.end();
            return;
        }
    );
    /******** 代码结束，下面不要看 ************/
});

server
server.listen(port);
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port);