const axios = require('axios')

async function wiki(p) {
    if (p == "-h" || p == "-help" || p == "--help" || p == "" || p == " ") {
        return "Para usar o comando *!wiki* você precisa colocar como parâmetro o que quer que o bot pesquise.\n\nEx:\n\n!wiki cachorro" 
    }
    try {
        let url_default = 'https://pt.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='
        let url = url_default+p
        let obj = await axios.get(url)
        return obj.data.query.pages[Object.keys(obj.data.query.pages)[0]].extract.toString() + "\nresultado em pt."
    } catch (error) {
        try {
            let url_default = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='
            let url = url_default+p
            let obj = await axios.get(url)
            return obj.data.query.pages[Object.keys(obj.data.query.pages)[0]].extract.toString() + "\nnada encontrado em pt, resultado em en."
        } catch (error) {
            return 'Nada encontrado.'
        }
    }
}

module.exports = wiki