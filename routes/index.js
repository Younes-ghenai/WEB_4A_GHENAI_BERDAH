var express = require('express')
var router = express.Router()

const items = [
  {
      name:'Emirates',
      description:'Cette version orientale de l\'Airbus A380 vous fera voyager physiquement dans le monde comme il se doit, mais aussi visuellement grâce à son design tout droit inspiré du Moyen-Orient.',
      prix: 450,
      id: 0,
      src: 'images/emirates_a380.jpg',
      stock:10,
      nombre:0
  },{
      name:'Air France',
      description:'Un air patriotique se dégageant de cette version Air France, vos vols nationaux ne seront que plaisir et confort, et vos internationaux se feront dans une ambiance digne de la ville lumière.',
      prix: 412,
      id: 1,
      src: 'images/airfrance_a380.jpg',
      stock:25,
      nombre:0
  },{
      name: 'Thaï',
      description: 'A l\'image des restaurants asiatiques, vous trouverez à bord de cette version Thaï une sérénité et un calme digne des plus grands hommes de cette région',
      prix: 433,
      id: 2,
      src: 'images/thai_a380.jpg',
      stock: 7,
      nombre:0

  },{
      name:'Boeing 787 Etihad',
      description:'Joli.',
      prix: 375,
      id: 3,
      src: 'images/etihad787.jpg',
      stock:19,
      nombre:0
  },{
      name:'Boeing 787 Continental',
      description:'Joli',
      prix: 315,
      id: 4,
      src: 'images/787.jpg',
      stock:21,
      nombre:0
  },{
      name: 'Rafale M',
      description: 'Joli',
      prix: 160,
      id: 5,
      src: 'images/rafale3.jpg',
      stock: 11,
      nombre:0
  }

]

const panier = [
  {
      name: 'Emirates',
      src: 'images/emirates.png',
      prix: 450,
      id:0,
      quantity: 0,
      soustotal : 0
  },{
      name: 'Air France',
      src: 'images/airfrance.png',
      prix: 412,
      id:1,
      quantity: 0,
      soustotal : 0
  },{
      name: 'Thaï',
      src: 'images/thai.png',
      prix: 433,
      id:2,
      quantity: 0,
      soustotal : 0
  },{
      name: 'Boeing 787 Etihad',
      src: 'images/etihad.png',
      prix: 375,
      id:3,
      quantity: 0,
      soustotal : 0
  },{
      name: 'Boeing 787 Dreamline',
      src: 'images/continental.png',
      prix: 315,
      id:4,
      quantity: 0,
      soustotal : 0
  },{
      name: 'Rafale M',
      src: 'images/rafale.png',
      prix: 160,
      id:5,
      quantity: 0,
      soustotal : 0
  },{
      total: 0
  }
]

router.get('/items', (req, res) => {
  res.json(items)
})

router.get('/panier', (req, res) => {
  res.json(panier)
})

router.post('/panier', (req, res) => {
  var id = req.body.id
  if(items[id].stock >= 1){
    panier[id].quantity += 1;
    items[id].stock -= 1;
    items[id].nombre += 1
    panier[id].soustotal = items[id].prix * panier[id].quantity
    panier.total = panier[0].soustotal + panier[1].soustotal + panier[2].soustotal + panier[3].soustotal + panier[4].soustotal + panier[5].soustotal
    res.status(200).send("OK");
  } else {
    res.send("Stock épuisé");
  }
})


router.post('/items', (req, res) => {
    var id = req.body.id
    if(panier[id].quantity >= 1){
      panier[id].quantity -= 1;
      items[id].stock += 1;
      items[id].nombre -= 1;
      panier[id].soustotal = items[id].prix * panier[id].quantity
      panier.total = panier[0].soustotal + panier[1].soustotal + panier[2].soustotal + panier[3].soustotal + panier[4].soustotal + panier[5].soustotal
      res.status(200).send("OK");
    } else {
      res.send("Ce produit n'est pas dans votre panier");
    }
  })




/*
router.post('/connect', (req, res) => {
  const usernom = req.body.usernom
  const password = req.body.password
  if (usernom === 'louis' && password === 'secret') {
    // l'utilisateur est connecté
  } else {
    res.status(400).send('Bouuuh mauvais mdp')
  }
})
*/
module.exports = router
