const request = require('superagent')
const requestProxy = require('superagent-proxy')
const userAgents = require('./userAgent')
const ips = require('./dynamicIps')
requestProxy(request)


function doRequest() {
    let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
    let ip = ips[parseInt(Math.random() * ips.length)]
    request.get('https://wushustars.com/wp-admin/admin-ajax.php?' +
        'callback=jQuery3510689373481836651_1607626450742&' +
        'action=ow_save_votes&' +
        'pid=V28vTkjd2EbS9FsHnwynBw991PHAoeB%2FhUZHDgLdicT6v8Hdleg%2BroDWq5dqlrUCWoZ3OgFvGdDRTu8chC4zVA%3D%3D&' +
        'termid=XEOXwBSDRWoa%2FKqOn0%2FeYuV2sOHBTF8gJSogpDx1uFkI2jFb4gbrswiIUH17rKDLqglrr1qom96YN1BwmWsLaw%3D%3D&' +
        'current_time=Thu%2C%2010%20Dec%202020%2018%3A54%3A24%20GMT&' +
        'gmt_offset=-480&' +
        'votes_count=1&' +
        'ow_buy_class=0&' +
        '_=' + new Date().getTime())
        .set(
            {
                'User-Agent': userAgent,
                'cookie': 'PHPSESSID=0fa93ef0b3c834e87564a8ff738e4798; wp_woocommerce_session_941c96b22b2956bcef27c1c31efcc4a4=8687e81ec0c8a783e9e66d7541df8cb3%7C%7C1607784791%7C%7C1607781191%7C%7C5da2178c8a77804bc9096c093e6e543b; _fbp=fb.1.1607611993887.788961286; mailchimp_landing_site=https%3A%2F%2Fwushustars.com%2Fwp-admin%2Fadmin-ajax.php%3Fcallback%3DjQuery35104210935362107804_1607611993477%26action%3Dow_save_votes%26pid%3Dpg4S1tKsTHIHHHGuEf3SBIPQytF4tY9yOWYjnSC3GL7KDOmvGWeRi1U7M74g%252F5exBGBqdIrlEcDpbf%252FKilXkIw%253D%253D%26termid%3DbJxVHh7LdWygpQnFcR%252FlOrmfmpiLhJn3cj%252BtjXgAxLG6FTNCliUVsRJfiG5RHWwRtwPFpcYknZvE6WaudliltQ%253D%253D%26current_time%3DThu%252C%252010%2520Dec%25202020%252014%253A53%253A18%2520GMT%26gmt_offset%3D-480%26votes_count%3D1%26ow_buy_class%3D0%26_%3D1607611993478',
                'referer': 'https://wushustars.com/contestants/ta1-m6-alan-han/',
                'sec-fetch-des': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-requested-with': 'XMLHttpRequest'
            }
        )
        .timeout({response: 60000, deadline: 60000})
        .proxy(ip)
        .end((err) => {
            if (err.statusCode === 200) {
                if (err.rawResponse.includes('"Already Voted')) {
                    console.warn('已经投过票了')
                } else {
                    console.log('投票成功')
                }
            } else {
                console.error('投票失败：' + err.message)
            }
        })
}

//增加阅读量
function doAddView() {
    let url='https://wushustars.com/contestants/ta1-m6-alan-han/'
    let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
    request('get', url)
        .set(
            {
                'User-Agent': userAgent,
                'cookie': 'PHPSESSID=0fa93ef0b3c834e87564a8ff738e4798; wp_woocommerce_session_941c96b22b2956bcef27c1c31efcc4a4=8687e81ec0c8a783e9e66d7541df8cb3%7C%7C1607784791%7C%7C1607781191%7C%7C5da2178c8a77804bc9096c093e6e543b; _fbp=fb.1.1607611993887.788961286; mailchimp_landing_site=https%3A%2F%2Fwushustars.com%2Fwp-admin%2Fadmin-ajax.php%3Fcallback%3DjQuery35104210935362107804_1607611993477%26action%3Dow_save_votes%26pid%3Dpg4S1tKsTHIHHHGuEf3SBIPQytF4tY9yOWYjnSC3GL7KDOmvGWeRi1U7M74g%252F5exBGBqdIrlEcDpbf%252FKilXkIw%253D%253D%26termid%3DbJxVHh7LdWygpQnFcR%252FlOrmfmpiLhJn3cj%252BtjXgAxLG6FTNCliUVsRJfiG5RHWwRtwPFpcYknZvE6WaudliltQ%253D%253D%26current_time%3DThu%252C%252010%2520Dec%25202020%252014%253A53%253A18%2520GMT%26gmt_offset%3D-480%26votes_count%3D1%26ow_buy_class%3D0%26_%3D1607611993478',
                'referer': url,
                'sec-fetch-des': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'x-requested-with': 'XMLHttpRequest'
            }
        )
        .end((err, res) => {
            if (!err)console.log('添加成功')
        })
}


// setInterval(doRequest, 1000)
setInterval(doAddView, 100)
