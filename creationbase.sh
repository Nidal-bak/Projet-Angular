
mongoimport --db SUPERVENTES --collection Users --file Users.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection Produits --file Produits.json --jsonArray --drop
mongoimport --db SUPERVENTES --collection Paniers --file Paniers.json --jsonArray --drop

