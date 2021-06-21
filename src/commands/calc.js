function calc(problema) {
    try {
        let resultado = eval(problema)
        return `${resultado}`
    } catch (error) {
        return 'Ocorreu um erro ao tentar resolver esse cálculo.'
    }
}

module.exports = calc