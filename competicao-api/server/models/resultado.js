'use strict';

module.exports = function(Resultado) {
  const pontuacao = {
    primeiro: 14,
    segundo: 9,
    terceiro: 7,
    quarto: 6,
    quinto: 5,
    sexto: 4,
    setimo: 3,
    oitavo: 2,
  }

  Resultado.resultadoGeral = async () => {
    const {Categoria, Atleta, Escola} = Resultado.app.models

    const categorias = await Categoria.find({
      where: {concluido: true},
      include: 'resultado'
    })

    const promises = categorias.map(async categoriaQuery => {
      const categoria = categoriaQuery.toJSON()
      if (!categoria.resultado) return
      const {resultado} = categoria
      const promises = Object.keys(resultado)
        .filter(key => key !== 'categoriaId' && resultado[key])
        .map(async (key) => {
          const atletas = (await Atleta.find({
            where: {
              id: resultado[key]
            },
            include: 'escola'
          }))

          const atleta = atletas[0].toJSON()
          return {
            categoria: categoria.nome,
            escola: atleta.escola,
            pontos: pontuacao[key]
          }
        })
      return Promise.all(promises)
    })
    const pontuacaoEscolas = await Promise.all(promises)

    const totais = pontuacaoEscolas
      .filter(x => !!x)
      .reduce((acc, pontuacaoEscola) => {
        console.log(pontuacaoEscola)
        const escolaId = pontuacaoEscola.escola ? pontuacaoEscola.escola.id : undefined
        return {
          ...acc,
          [escolaId]: {
            total: (pontuacaoEscola.pontos || 0) + (acc[escolaId] ? acc[escolaId].total : 0)
          }
        }
      }, {})

    return {
      categoriasConcluidas: categorias.map(c => c.nome),
      totais,
    }
  }

};
