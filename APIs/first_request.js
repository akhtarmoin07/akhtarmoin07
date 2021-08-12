var request = require('request')
request('http://www.bing.com',function(error ,response, body){
    if(error){
        console.log("SOMETHING WENT WRONG!")
        console.log(error)
    }else {
        if(response.statusCode == 200){
            //THINGS WORKED!
            console.log(body)
        }
    }
})