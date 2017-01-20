/*
var synonym = require('./library/synonyms.js')
var prompt = require('prompt')
var colors = require('colors')
var Table = require('cli-table')

var synonymAPI = new synonym("38130fce28bb59d9555bb186639a983b")


prompt.start()

prompt.get({
    properties: {
        word: {
            description: colors.magenta("What is your word?")
        }
    }
}, function(err, result) {
    err ? console.log(err) :
        console.log("You said your word is: " + result.word);

    synonymAPI.getSynonyms(result.word, function(err, res) {
        if (err) console.log(err)
        else {

            var adverbs = res.adverb ? res.adverb.syn : []
            var nouns = res.noun ? res.noun.syn : []
            var adjectives = res.adjective ? res.adjective.syn : []
            var verbs = res.verb ? res.verb.syn : []
            var ant = res.noun.ant ? res.noun.ant : []

              console.log(adverbs)
                console.log(nouns)
                console.log(adjectives)
                console.log(verbs)
        
             var table = new Table({ 
                 head: [  " ","SYNONYMS"," TOP","7 ","RETURN ", "RESULTS "] 
             })
 
        // table is an Array, so you can `push`, `unshift`, `splice` and friends 
            table.push(
                { 'Adverbs': adverbs.slice(0, 7) },
                { 'Nouns': nouns.slice(0, 7) },
                { 'Adjectives': adjectives.slice(0, 7) },
                { 'Verbs': verbs.slice(0, 7) },
                { 'Antonyms': ant.slice(0,7)}
            );
 
            console.log(table.toString());

            }
        })
    })

*/


/*
=======================================
        SYNONYMS WITH PROMISES
=======================================
*/

// var synonym = require('./library/synonyms.js')
var prompt = require('prompt-promise')
var request = require('request-promise')
var colors = require('colors')
var Table = require('cli-table')
var res = [];

//  var synonymAPI = new synonym("38130fce28bb59d9555bb186639a983b")
// "http://words.bighugelabs.com/api/2/38130fce28bb59d9555bb186639a983b/" + word + "/json"
//var urlSyn = "http://words.bighugelabs.com/api/2/38130fce28bb59d9555bb186639a983b/" + word + "/json"

prompt('word: ')
    .then(function word(val) {
        res.push(val);
        console.log("You said your word is: " + res[0]);
        return request("http://words.bighugelabs.com/api/2/38130fce28bb59d9555bb186639a983b/" + val +"/json");
    })
    .then(function(bigHugeRes) {
        
        try {
            var parsedResponse = JSON.parse(bigHugeRes)
        } catch (e) {
            console.error(e)
            
        }
        
        var adverbs = parsedResponse.adverb ? parsedResponse.adverb.syn : []
        var nouns = parsedResponse.noun ? parsedResponse.noun.syn : []
        var adjectives = parsedResponse.adjective ? parsedResponse.adjective.syn : []
        var verbs = parsedResponse.verb ? parsedResponse.verb.syn : []
        var ant = parsedResponse.noun.ant ? parsedResponse.noun.ant : []
        
        /*    console.log(adverbs)
                        console.log(nouns)
                        console.log(adjectives)
                        console.log(verbs)
         */
        var table = new Table({
            head: [" ", "SYNONYMS", " TOP", "7 ", "RETURN ", "RESULTS "]
        })

        // table is an Array, so you can `push`, `unshift`, `splice` and friends 
        table.push({
            'Adverbs': adverbs.slice(0, 7)
        }, {
            'Nouns': nouns.slice(0, 7)
        }, {
            'Adjectives': adjectives.slice(0, 7)
        }, {
            'Verbs': verbs.slice(0, 7)
        }, {
            'Antonyms': ant.slice(0, 7)
        });

        console.log(table.toString());
    })
