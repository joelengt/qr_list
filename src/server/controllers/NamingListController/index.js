var xml = require('xml');
var request = require('request');
var parseString = require('xml2js').parseString;

class NamingListController {
    list(req, res) {
        console.log('ok');
        var numbers = [1,2,3,4,5];

        var example1 = [ { url: 'http://www.google.com/search?aq=f&sourceid=chrome&ie=UTF-8&q=opower' } ];

        var example2 = [ { url: { _attr: { hostname: 'www.google.com', path: '/search?aq=f&sourceid=chrome&ie=UTF-8&q=opower' }  } } ];

        var example3 = [
            {
                persona: [
                    { name: 'joel' },
                    { lastname: 'gonzales' },
                    { age: '20' }
                ]
            }
        ];

        var example4 = [ { toys: [ { _attr: { decade: '80s', locale: 'US'} }, { toy: 'Transformers' } , { toy: 'GI Joe' }, { toy: 'He-man' } ] } ];

        var example5 = [ { toys: [ { _attr: { decade: '80s', locale: 'US'} }, { toy: 'Transformers' } , { toy: [ { _attr: { knowing: 'half the battle' } }, 'GI Joe'] }, { toy: [ { name: 'He-man' }, { description: { _cdata: '<strong>Master of the Universe!</strong>'} } ] } ] } ];

        var example6 = `<note>
                            <script id="tinyhippos-injected"/>
                            <to>Tove</to>
                            <from>Jani</from>
                            <heading prop="rem" name="reminder">Reminder</heading>
                            <body>Don't forget me this weekend!</body>
                         
                            <script id="second script"/>
                            <to>Tove</to>
                            <from>Jani</from>
                            <heading prop="rem" name="reminder">Reminder</heading>
                            <body>Don't forget me this weekend!</body>
                        </note>`;

        res.set('Content-Type', 'text/xml');

        // response json to xml
        res.send(xml(example5, true));

        // response xml
        // res.send(example6);

        // Reponse json
        // res.status(200).json({
        //     status: 'ok list',
        //     color: numbers
        // })
    }

    getInfo(req, res) {

        request({
            url: 'http://127.0.0.1:5000/info/list',
            method: 'GET',
            headers: {
                'User-Agent': 'request',
                'Accept': 'application/json'
            }
            // json: true,
        }, function (err, response, result) {
            if (err) { 
                console.log(err);

            } else {
                if (response.statusCode != 200) {
                    console.log('No se pudo conectar al servidor.')
                
                } else {
                    
                    // xml to json
                    // var xml = "<root>Nodo xml</root>"; 

                    // var xml = `<note>
                    //             <script id="tinyhippos-injected"/>
                    //             <to>Tove</to>
                    //             <from>Jani</from>
                    //             <heading prop="rem" name="reminder">Reminder</heading>
                    //             <body>Don't forget me this weekend!</body>
                             
                    //             <script id="second script"/>
                    //             <to>Tove</to>
                    //             <from>Jani</from>
                    //             <heading prop="rem" name="reminder">Reminder</heading>
                    //             <body>Don't forget me this weekend!</body>
                    //         </note>`;

                    var json;

                    // Parse xml to json
                    parseString(result, function (err, result_json) 
                    {
                        json = result_json;
                    });

                    console.log(json);
                    console.log(json);

                    // res.status(200).json({
                    //     status: 'ok',
                    //     message: result
                    // })

                    res.send(json);
                }
            }
        });

    }
}

module.exports = NamingListController;