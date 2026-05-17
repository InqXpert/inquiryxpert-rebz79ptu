migrate(
  (app) => {
    const naturezas = [
      { nome: 'COLISAO COM TERCEIRO', codigo: '10' },
      { nome: 'COLISAO SEM TERCEIRO', codigo: '16' },
      { nome: 'INCENDIO', codigo: '20' },
      { nome: 'ROUBO', codigo: '30' },
      { nome: 'FURTO', codigo: '31' },
      { nome: 'ENCHENTE', codigo: '50' },
      { nome: 'PROPERTY', codigo: '03' },
      { nome: 'I.E', codigo: '00' },
    ]
    const natCol = app.findCollectionByNameOrId('naturezas_sinistro')
    for (const nat of naturezas) {
      try {
        const record = app.findFirstRecordByData('naturezas_sinistro', 'nome', nat.nome)
        record.set('codigo', nat.codigo)
        app.save(record)
      } catch (_) {
        const newRecord = new Record(natCol)
        newRecord.set('nome', nat.nome)
        newRecord.set('codigo', nat.codigo)
        newRecord.set('ativo', true)
        app.save(newRecord)
      }
    }

    const clientes = [
      { nome: 'ZURICH MINAS BRASIL SEGUROS S.A.', codigo: '01', razao: 'ZURICH' },
      { nome: 'MAPFRE SEGUROS GERAIS S/A.', codigo: '02', razao: 'MAPFRE' },
      { nome: 'SUHAI SEGURADORA S.A.', codigo: '03', razao: 'SUHAI' },
      { nome: 'BRADESCO AUTO/RE COMPANHIA DE SEGUROS', codigo: '04', razao: 'BRADESCO' },
      { nome: 'NEO SEGURADORA S/A', codigo: '05', razao: 'NEO' },
      { nome: 'SPLIT RISK SEGURADORA S.A.', codigo: '06', razao: 'SPLIT RISK' },
      {
        nome: 'COOPERLINK SINAPPE BENEFICIOS E PROTECAO PATRIMONIAL MUTUALISTA',
        codigo: '07',
        razao: 'COOPERLINK',
      },
      { nome: 'KOVR SEGURADORA S.A.', codigo: '08', razao: 'KVOR' },
      {
        nome: 'GRUPO MMB - SOMA ASSISTÊNCIA E MONITORAMENTO LTDA',
        codigo: '09',
        razao: 'MAIS BRASIL',
      },
      {
        nome: 'AUTOINSP VISTORIA VEICULAR E PERÍCIA JUDICIAL LTDA',
        codigo: '10',
        razao: 'AUTOINSP',
      },
      {
        nome: 'SEVEN SEGUROS - SEVEN 7 SERVIÇOS DIGITAIS INSTITUIÇÃO DE PAGAMENTO E INTERMEDIAÇÕES LTDA',
        codigo: '11',
        razao: 'SEVEN',
      },
      { nome: 'CARDIF DO BRASIL VIDA E PREVIDÊNCIA S.A.', codigo: '12', razao: 'CARDIF' },
      { nome: 'TOO SEGUROS S.A.', codigo: '13', razao: 'TOO SEGUROS' },
      { nome: 'CHUBB SEGUROS BRASIL S.A.', codigo: '14', razao: 'CHUBB' },
    ]
    const cliCol = app.findCollectionByNameOrId('clientes_contratos')
    for (const cli of clientes) {
      try {
        const records = app.findRecordsByFilter(
          'clientes_contratos',
          `razao_social = '${cli.nome}' || razao_social = '${cli.razao}'`,
          '',
          1,
          0,
        )
        if (records.length > 0) {
          records[0].set('codigo', cli.codigo)
          records[0].set('razao_social', cli.razao)
          app.save(records[0])
        } else {
          const newRecord = new Record(cliCol)
          newRecord.set('razao_social', cli.razao)
          newRecord.set('cnpj', '00000000000' + cli.codigo)
          newRecord.set('codigo', cli.codigo)
          newRecord.set('status', 'ativo')
          app.save(newRecord)
        }
      } catch (e) {
        // Ignore
      }
    }
  },
  (app) => {},
)
