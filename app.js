const request = require("request");
const fs = require('fs')
const j = request.jar()



async function postRequest_login(email, password, cb) {

    var options = {
        method: 'POST',
        url: 'https://www.tekwill.md/api/LoginUser.php',
        proxy: 'http://181.118.167.104:80 ',
        headers: {
            host: 'www.tekwill.md',
            connection: 'keep-alive',
            accept: 'application/json, text/javascript, */*; q=0.01',


        },
        form: { action: 'save', email, password },
        jar: j
    };


    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                // const cookie = response.headers['set-cookie'].toString()
                const cookies = j.getCookies('https://www.tekwill.md').toString();
                console.log(cookies)
                resolve(cookies)
            }
        });
    });
}

async function getRequest(cookie) {

    var options = {
        method: 'GET',
        url: 'https://www.tekwill.md/account/profile',
        proxy: 'http://181.118.167.104:80 ',
        headers: {
            host: 'www.tekwill.md',
            connection: 'keep-alive',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            cookie
        },
        jar: j
    };

    return new Promise((resolve, reject) => {

        request(options, function (error, response, body) {
            if (error) reject(error);
            else {
                resolve(body)

            }

        });
    })
}

async function headRequest(cookie) {

    var options = {
        method: 'HEAD',
        url: 'https://www.tekwill.md/account/profile',
        proxy: 'http://181.118.167.104:80 ',
        headers: {
            host: 'www.tekwill.md',
            connection: 'keep-alive',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            cookie
        },
        jar: j
    };

    return new Promise((resolve, reject) => {

        request(options, function (error, response, body) {
            if (error) reject(error);
            else resolve(response.headers)
            // console.log(response.toJSON().headers)

        });
    })
}

async function optionsRequest(cookie) {

    var options = {
        method: 'OPTIONS',
        url: 'http://elearning.utm.md/', //http://elearning.utm.md
        proxy: 'http://127.0.0.1:8888', // 127.0.0.1:8888
        headers: {
            host: 'www.tekwill.md',
            connection: 'keep-alive',
            accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            cookie
        },
        jar: j
    };

    return new Promise((resolve, reject) => {

        request(options, function (error, response, body) {
            if (error) reject(error);
            else resolve(response.headers)
            // console.log(response.headers)
        });
    })
}



(async () => {

    const cookie = await postRequest_login('....@gmail.com', 'pass');
    const body = await getRequest(cookie);
    const headers = await headRequest(cookie)
    const options = await optionsRequest(cookie)


    // let result = ''
    // let index = body.indexOf('formUserProfile_phone" value="')
    // result = body.substring(index + 30, index + 60)
    // result = result.substring(0, result.indexOf('"'))
    // resolve(result)

    const parsedBody = body.toString().match(/(?<=formUserProfile_phone" value=".*)[0-9]+/)

    fs.writeFileSync('body', body, 'utf-8');
    fs.writeFileSync('parsedBody', parsedBody)
    fs.writeFileSync('options', JSON.stringify(options, null, 2), 'utf-8');
    fs.writeFileSync('headers', JSON.stringify(headers, null, 2), 'utf-8');

})()

console.log('hello')






