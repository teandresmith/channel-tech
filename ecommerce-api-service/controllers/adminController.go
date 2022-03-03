package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
	Admin Routes - These routes can only be accessed with a token + token details that show you are of "ADMIN" usertype.

	Below is a list of all routes in this file.

		Product Routes
		CreateProduct()
		UpdateProduct()
		DeleteProduct()

		User Routes
		UpdateUserToAdmin()
		GetAllUsers()
		QueryUserByParams() => Function still needs to be implemented

		Order Routes
		GetAllOrders() => Function still needs to be implemented
		GetOrderByID() => Function still needs to be implemented
		UpdateOrder() => Function still needs to be implemented
		DeleteOrder() => Function still needs to be implemented
		QueryOrdersByParams() => Function still needs to be implemented

*/

// Product Related Routes

func CreateProduct() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var product models.Product

		// userType, exists := c.Get("userType")
		// if !exists || userType != "ADMIN" {
		// 	c.JSON(http.StatusUnauthorized, Error{
		// 		Message: "User not authorized to access this route.",
		// 	})
		// 	return
		// }

		if err := c.BindJSON(&product); err != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while binding request body data",
				Error: err.Error(),
			})
			return
		}

		if validateErr := validate.Struct(product); validateErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while validating request body data",
				Error: validateErr.Error(),
			})
			return
		}

		product.ID = primitive.NewObjectID()
		product.ProductID = product.ID.Hex()
		product.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		product.UpdatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

		
		insertResult, insertErr := productCollection.InsertOne(ctx, product)
		defer cancel()
		if insertErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while inserting an object into the Product Collection",
				Error: insertErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Insertion Successful",
			Result: insertResult,
		})
		
	}
}

func UpdateProduct() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var productFromBody models.Product

		userType, exists := c.Get("userType")
		if !exists || userType != "ADMIN" {
			c.JSON(http.StatusUnauthorized, Error{
				Message: "User not authorized to access this route.",
			})
			return
		}

		if bindErr := c.BindJSON(&productFromBody); bindErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while binding request body data",
				Error: bindErr.Error(),
			})
			return
		}

		var updatedProduct bson.D

		if productFromBody.Name != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "name", Value: productFromBody.Name})
		}

		if productFromBody.Price != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "price", Value: productFromBody.Price})
		}

		if productFromBody.Image != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "image", Value: productFromBody.Image})
		}

		if productFromBody.Description != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "description", Value: productFromBody.Description})
		}

		if productFromBody.QuantityInStock != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "quantityInStock", Value: productFromBody.QuantityInStock})
		}

		if productFromBody.Category != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "category", Value: productFromBody.Category})
		}

		if productFromBody.Subcategory != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "subcategory", Value: productFromBody.Subcategory})
		}

		if productFromBody.Brand != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "brand", Value: productFromBody.Brand})
		}

		if productFromBody.Language != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "language", Value: productFromBody.Language})
		}

		if productFromBody.Tag != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "tag", Value: productFromBody.Tag})
		}

		if productFromBody.Reviews != nil {
			updatedProduct = append(updatedProduct, bson.E{Key: "reviews", Value: productFromBody.Reviews})
		}

		updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		updatedProduct = append(updatedProduct, bson.E{Key: "updatedAt", Value: updatedAt})

		productID := c.Param("productid")
		filter := bson.M{"productId": productID}
		opts := options.Update().SetUpsert(true)
		update := bson.D{{Key: "$set", Value: updatedProduct}}

		updateResult, updateErr := productCollection.UpdateOne(ctx, filter, update, opts)
		defer cancel()
		if updateErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while updating an object in the Product Collection",
				Error: updateErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Product Update Successful",
			Result: updateResult,
		})
	}
}

func DeleteProduct() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		productID := c.Param("productid")

		userType, exists := c.Get("userType")
		if !exists || userType != "ADMIN" {
			c.JSON(http.StatusUnauthorized, Error{
				Message: "User not authorized to access this route.",
			})
			return
		}

		deleteResult, deleteErr := productCollection.DeleteOne(ctx, bson.M{"productId": productID})
		defer cancel()
		if deleteErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while deleting an object in the Product Collection",
				Error: deleteErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Product Deletion Successful",
			Result: deleteResult,
		})
	}
}

// User Related Routes

func UpdateUserToAdmin() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		userType, exists := c.Get("userType")
		if !exists || userType != "ADMIN" {
			c.JSON(http.StatusUnauthorized, Error{
				Message: "User not authorized to access this route.",
			})
			return
		}

		var user models.User

		if bindErr := c.BindJSON(&user); bindErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while binding the request body data",
				Error: bindErr.Error(),
			})
			return
		}

		var userUpdate bson.D
		userID := c.Param("userid")

		if user.UserType != nil {
			userUpdate = append(userUpdate, bson.E{Key: "userType", Value: user.UserType})
		}

		updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		userUpdate = append(userUpdate, bson.E{Key: "updatedAt", Value: updatedAt})

		
		filter := bson.M{"userId": userID}
		opts := options.Update().SetUpsert(true)
		update := bson.D{{Key: "$set", Value: userUpdate}}

		updateResult, updateErr := userCollection.UpdateOne(ctx, filter, update, opts)
		defer cancel()
		if updateErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while updating an object in the User Collection",
				Error: updateErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "User's User-Type Successfully Updated",
			Result: updateResult,
		})

		
	}
}

func GetAllUsers() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		userType, exists := c.Get("userType")
		if !exists || userType != "ADMIN" {
			c.JSON(http.StatusUnauthorized, Error{
				Message: "User not authorized to access this route.",
			})
			return
		}

		results, getErr := userCollection.Find(ctx, bson.M{})
		defer cancel()
		if getErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while querying the User Collection",
				Error: getErr.Error(),
			})
			return
		}

		var users []bson.M

		iterateErr := results.All(ctx, &users); 
		defer cancel()
		if iterateErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while iterating through the user query results",
				Error: iterateErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Users Successfully Fetched",
			Result: users,
		})
	}
}

func QueryUsersByParams() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}


// Order Routes

func GetAllOrders() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}

func GetOrderByID() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}

func UpdateOrder() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}

func DeleteOrder() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}


func QueryOrdersByParams() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}