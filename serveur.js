const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});
//app.use(require("cors"));//(méthode alternative)

const MongoClient = require('mongodb').MongoClient;
const ObjetID = require('mongodb').Objetid;
const url = "mongodb://localhost:27017";//DSN

MongoClient.connect(url,{useNewUrlParser: true}, (err, client)=> {
	let db = client.db("SUPERVENTES");
/*Liste des produits*/

app.get("/produits", (req,res)=> { 
	console.log("/produits");
	try{
		db.collection("Produits").find().toArray((err,documents)=> { 
			res.end(JSON.stringify(documents));
		})
	}catch (e){
		console.log("Erreur sur/ produits: " + e );
		res.end(JSON.stringify([]));
	   }
	});
	
app.get("/users", (req,res)=> { 
		console.log("/users");
		try{
			db.collection("Users").find().toArray((err,documents)=> { 
				res.end(JSON.stringify(documents));
			})
		}catch (e){
			console.log("Erreur sur/ users: " + e );
			res.end(JSON.stringify([]));
		   }
		});
app.get("/paniers", (req,res)=> { 
			console.log("/paniers");
			try{
				db.collection("Paniers").find().toArray((err,documents)=> { 
					res.end(JSON.stringify(documents));
				})
			}catch (e){
				console.log("Erreur sur/ paniers : " + e );
				res.end(JSON.stringify([]));
			   }
			});
app.get("/Produits/:categorie", (req,res) => { //route
	let categorie = req.params.categorie;
	console.log("/Produits/"+categorie);
	try{
		db.collection("Produits").find({type:categorie}).toArray((err,documents)=> //base
		{
			res.end(JSON.stringify(documents));
		});
		}catch(e) {
			console.log("Erreur sur/ produits/"+categorie+" :"+e);
			res.end(JSON.stringify([]));
		}
	});

app.get("/categories", (req,res) =>{
	console.log("/categories");
	categories = [];
	try{
		db.collection("Produits").find().toArray((err,documents) =>{
			for (let doc of documents){
				if (!categories.includes(doc.type)) categories.push(doc.type);
			}
			console.log("Renvoi de"+JSON.stringify(categories));
			res.end(JSON.stringify(categories));
		});
	}catch(e){
		console.log("Erreur sur /categories:" + e);
		res.end(JSON.stringify([]));
	}
});

/*connexion*/
// app.post("/Users/connexion", (req,res)=> {
// 	console.log("/utilisateurs/connexion avec "+JSON.stringify(req.body));
// 	try{
// 		db.collection("Users").find(req.body).toArray((err,documents)=>{
// 			if (documents.lenght==1)
// 				res.end(JSON.stringify({"resultat":1, "message": "Authentification réussie"}));
// 			else res.end(JSON.stringify({"resultat":0, "message": "Email et/ou mot de passe incorrect"}));
// 		});
//    }catch (e) {
// 	res.end(JSON.stringify({"resultats": 0, "message":e}));
//    }
//   });
});
app.listen(8888);