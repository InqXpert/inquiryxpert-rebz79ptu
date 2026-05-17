migrate(
  (app) => {
    const clientes = [
      { codigo: '01', razao_social: 'ZURICH MINAS BRASIL SEGUROS S.A.' },
      { codigo: '02', razao_social: 'MAPFRE SEGUROS GERAIS S/A.' },
      { codigo: '03', razao_social: 'SUHAI SEGURADORA S.A.' },
      { codigo: '04', razao_social: 'BRADESCO AUTO/RE COMPANHIA DE SEGUROS' },
      { codigo: '05', razao_social: 'NEO SEGURADORA S/A' },
      { codigo: '06', razao_social: 'SPLIT RISK SEGURADORA S.A.' },
      {
        codigo: '07',
        razao_social: 'COOPERLINK SINAPPE BENEFICIOS E PROTECAO PATRIMONIAL MUTUALISTA',
      },
      { codigo: '08', razao_social: 'KOVR SEGURADORA S.A.' },
      { codigo: '09', razao_social: 'GRUPO MMB - SOMA ASSISTÊNCIA E MONITORAMENTO LTDA' },
      { codigo: '10', razao_social: 'AUTOINSP VISTORIA VEICULAR E PERÍCIA JUDICIAL LTDA' },
      {
        codigo: '11',
        razao_social:
          'SEVEN SEGUROS - SEVEN 7 SERVIÇOS DIGITAIS INSTITUIÇÃO DE PAGAMENTO E INTERMEDIAÇÕES LTDA',
      },
      { codigo: '12', razao_social: 'CARDIF DO BRASIL VIDA E PREVIDÊNCIA S.A.' },
      { codigo: '13', razao_social: 'TOO SEGUROS S.A.' },
      { codigo: '14', razao_social: 'CHUBB SEGUROS BRASIL S.A.' },
    ]

    const col = app.findCollectionByNameOrId('clientes_contratos')

    for (const c of clientes) {
      let record
      try {
        record = app.findFirstRecordByData('clientes_contratos', 'razao_social', c.razao_social)
      } catch (_) {
        record = new Record(col)
        record.set('razao_social', c.razao_social)
        record.set('cnpj', $security.randomString(14)) // CNPJ is required
      }
      record.set('codigo', c.codigo)
      app.save(record)
    }
  },
  (app) => {
    // Can be left empty as we don't strictly need to revert data seeding
  },
)
