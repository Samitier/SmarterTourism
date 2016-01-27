### INSTALACIÓ
Per a instalar aquesta aplicació es requereix nodejs i mongodb a l'equip. També és necessari instalar **browserify**, **uglifyjs** i **watchify**. Es poden instalar via:

```sh
$ npm install -g browserify
$ npm install -g uglifyjs
$ npm install -g watchify
```
Per instal·lar i executar l'aplicació:
```sh
$ npm install
$ npm run
```
Per a fer deploy del front-end
```sh
$ browserify public/js/app.js | uglifyjs -o public/bundle.js   <- versió minificada
$ browserify public/js/app.js -o public/bundle.js              <- versió sense minificar
```
O el mateix amb **watchify** per no haver d'executar l'anterior per cada canvi que es faci als scripts del front-end.

### BRANCHES
Seria òptim fer una branch per cada funcionalitat/cas d'ús nou que es vulgui afegir.
La branch **heroku-deployment** està configurada per publicar directament a heroku els canvis i hauria d'estar tot corrent com a "production" i amb el javascript minificat.

### DOCUMENTS
La especificació de l'aplicació i els mockups bàsics es troben a aquest enllaç: https://drive.google.com/folderview?id=0B8Z_tPXG69gVdEVzeTJhR3Ruc2c&usp=sharing


