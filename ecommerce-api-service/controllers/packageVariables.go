package controllers

import (
	"github.com/go-playground/validator/v10"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/database"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "User")
var productCollection *mongo.Collection = database.OpenCollection(database.Client, "Product")
// var productJPCollection *mongo.Collection = database.OpenCollection(database.Client, "ProductJP")
var orderCollection *mongo.Collection = database.OpenCollection(database.Client, "Order")

var validate = validator.New()

type Error struct{
	Message			string			`bson:"message" json:"message"`
	Error			string			`bson:"error" json:"error"`
}

type Response struct {
	Message			string			`bson:"message" json:"message"`
	Result			interface{}		`bson:"result" json:"result"`
}