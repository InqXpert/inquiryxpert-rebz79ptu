migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('municipios')

    // Representative dataset covering all 27 states and their major cities to simulate the full national database.
    // This dataset provides national coverage for proximity logic.
    const rawData = [
      'AC|Rio Branco|-9.97499|-67.8243|Cruzeiro do Sul|-7.63053|-72.6713|Sena Madureira|-9.06596|-68.6571',
      'AL|Maceió|-9.66599|-35.735|Arapiraca|-9.75218|-36.6601|Rio Largo|-9.47952|-35.8453',
      'AP|Macapá|0.034934|-51.0694|Santana|-0.0583|-51.1736|Laranjal do Jari|-0.840615|-52.5154',
      'AM|Manaus|-3.10719|-60.0261|Parintins|-2.62846|-56.7324|Itacoatiara|-2.64332|-58.6432',
      'BA|Salvador|-12.9718|-38.5011|Feira de Santana|-12.2667|-38.9667|Vitória da Conquista|-14.8661|-40.8394|Camaçari|-12.6975|-38.3242|Juazeiro|-9.412|-39.8667|Itabuna|-14.7935|-39.273|Ilhéus|-14.7935|-39.0463',
      'CE|Fortaleza|-3.71839|-38.5434|Caucaia|-3.69735|-38.6521|Juazeiro do Norte|-7.20165|-39.3142|Maracanaú|-3.87679|-38.6253|Sobral|-3.68962|-40.3486',
      'DF|Brasília|-15.7801|-47.9292',
      'ES|Vitória|-20.3155|-40.3128|Vila Velha|-20.3297|-40.2925|Serra|-20.1286|-40.3078|Cariacica|-20.2638|-40.4201',
      'GO|Goiânia|-16.6799|-49.255|Aparecida de Goiânia|-16.822|-49.2435|Anápolis|-15.3301|-48.9535|Rio Verde|-16.2114|-50.9293',
      'MA|São Luís|-2.52972|-44.3028|Imperatriz|-5.52628|-47.4917|São José de Ribamar|-2.56237|-44.0537|Caxias|-4.86438|-43.3571',
      'MT|Cuiabá|-15.5989|-56.0949|Várzea Grande|-15.6469|-56.1326|Rondonópolis|-17.4753|-54.9674|Sinop|-16.4583|-54.6366',
      'MS|Campo Grande|-20.4428|-54.646|Dourados|-21.2227|-54.8028|Três Lagoas|-20.7511|-51.7027|Corumbá|-19.0092|-57.6533',
      'MG|Belo Horizonte|-19.9208|-43.9378|Uberlândia|-18.9186|-48.2772|Contagem|-19.3361|-44.0406|Juiz de Fora|-21.7545|-43.3503|Betim|-19.9679|-44.1983|Montes Claros|-16.735|-43.8616|Uberaba|-19.7472|-47.9392',
      'PA|Belém|-1.45583|-48.5044|Ananindeua|-1.36531|-48.3742|Santarém|-2.44306|-54.7083|Marabá|-5.36879|-49.12|Castanhal|-1.29413|-47.9255',
      'PB|João Pessoa|-7.11532|-34.861|Campina Grande|-7.23072|-35.8811|Santa Rita|-7.11494|-34.9782|Patos|-7.02444|-37.2798',
      'PR|Curitiba|-25.4284|-49.2733|Londrina|-23.3045|-51.1691|Maringá|-23.4205|-51.9333|Ponta Grossa|-25.0916|-50.1668|Cascavel|-24.9578|-53.4595|São José dos Pinhais|-25.5348|-49.2064',
      'PE|Recife|-8.05389|-34.8811|Jaboatão dos Guararapes|-8.11269|-35.0154|Olinda|-8.0089|-34.8553|Caruaru|-8.28333|-35.9761|Petrolina|-9.38333|-40.5',
      'PI|Teresina|-5.08921|-42.8016|Parnaíba|-2.9062|-41.7745|Picos|-7.08182|-41.4669|Piripiri|-4.2732|-41.7769',
      'RJ|Rio de Janeiro|-22.9064|-43.1822|São Gonçalo|-22.8269|-43.0539|Duque de Caxias|-22.7856|-43.3117|Nova Iguaçu|-22.7635|-43.4542|Niterói|-22.8832|-43.1034|Campos dos Goytacazes|-21.7547|-41.3262',
      'RN|Natal|-5.795|-35.2094|Mossoró|-5.18806|-37.3442|Parnamirim|-5.91572|-35.2632|São Gonçalo do Amarante|-5.79357|-35.3283',
      'RS|Porto Alegre|-30.0328|-51.2302|Caxias do Sul|-29.1681|-51.1794|Pelotas|-31.7719|-52.3425|Canoas|-29.9149|-51.1783|Santa Maria|-29.6842|-53.8069|Gravataí|-29.9388|-50.9939',
      'RO|Porto Velho|-8.76116|-63.9004|Ji-Paraná|-10.882|-61.9451|Ariquemes|-9.91333|-63.0408|Vilhena|-12.7408|-60.1458',
      'RR|Boa Vista|-2.81928|-60.6714|Rorainópolis|-0.94723|-60.413|Caracaraí|-1.81556|-61.1278',
      'SC|Florianópolis|-27.5969|-48.5495|Joinville|-26.3045|-48.8487|Blumenau|-26.9189|-49.0661|São José|-27.6136|-48.6256|Chapecó|-27.1004|-52.6154|Itajaí|-26.9078|-48.6669',
      'SP|São Paulo|-23.5475|-46.6361|Guarulhos|-23.4628|-46.5333|Campinas|-22.9099|-47.0626|São Bernardo do Campo|-23.6974|-46.551|Santo André|-23.6666|-46.5322|Osasco|-23.5329|-46.7917|São José dos Campos|-23.1791|-45.8872|Ribeirão Preto|-21.1775|-47.8103|Sorocaba|-23.5017|-47.4581',
      'SE|Aracaju|-10.9111|-37.0717|Nossa Senhora do Socorro|-10.8624|-37.112|Lagarto|-10.9111|-37.6625|Itabaiana|-10.6865|-37.4262',
      'TO|Palmas|-10.1844|-48.3336|Araguaína|-7.1911|-48.2044|Gurupi|-11.7289|-49.0673|Porto Nacional|-10.7081|-48.4172',
    ].join(';')

    app.runInTransaction((txApp) => {
      txApp.truncateCollection(col)

      const states = rawData.split(';')
      for (const st of states) {
        if (!st) continue
        const parts = st.split('|')
        const uf = parts[0]
        for (let i = 1; i < parts.length; i += 3) {
          if (!parts[i] || !parts[i + 1] || !parts[i + 2]) continue
          const nome = parts[i]
          const lat = parseFloat(parts[i + 1])
          const lon = parseFloat(parts[i + 2])

          const rec = new Record(col)
          rec.set('uf', uf)
          rec.set('nome', nome)
          rec.set('latitude', lat)
          rec.set('longitude', lon)
          txApp.save(rec)
        }
      }
    })
  },
  (app) => {
    const col = app.findCollectionByNameOrId('municipios')
    app.truncateCollection(col)
  },
)
