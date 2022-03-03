package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/helpers"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
	Private Routes that require an access token. Below is a list of all Routes in this file.

	User Routes
	GetUser() => Only logged in users can hit this route.
	UpdateUser() => Only logged in users can hit this route.

*/

func GetUser() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		userID := c.Param("userid")
		

		tokenDetailUUID, exists := c.Get("uuid")
		if !exists || userID != tokenDetailUUID {
			c.JSON(http.StatusUnauthorized, Error{
				Message: "User not authorized to access this route.",
			})
			return
		}

		var user models.User

		queryErr := userCollection.FindOne(ctx, bson.M{"userId": userID}).Decode(&user)
		defer cancel()
		if queryErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while querying the user collection",
				Error: queryErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "User Successfully Fetched",
			Result: user,
		})
	}
}

func UpdateUser() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		userID := c.Param("userid")
		tokenDetailUUID, exists := c.Get("uuid")
		if !exists || userID != tokenDetailUUID {
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

		var updatedUser bson.D

		if user.FirstName != nil {
			updatedUser = append(updatedUser, bson.E{Key: "firstName", Value: user.FirstName})
		}

		if user.LastName != nil {
			updatedUser = append(updatedUser, bson.E{Key: "lastName", Value: user.LastName})
		}

		if user.Email != nil {
			updatedUser = append(updatedUser, bson.E{Key: "email", Value: user.Email})
		}

		if user.Password != nil {
			hashPassword, hashErr := helpers.HashPassword(*user.Password)
			if hashErr != nil {
				c.JSON(http.StatusInternalServerError, Error{
					Message: "There was an error while hashing the new password",
					Error: hashErr.Error(),
				})
				return
			}
			updatedUser = append(updatedUser, bson.E{Key: "Password", Value: hashPassword})
		}

		if user.Orders != nil {
			updatedUser = append(updatedUser, bson.E{Key: "orders", Value: user.Orders})
		}

		if user.DefaultAddress != nil {
			updatedUser = append(updatedUser, bson.E{Key: "defaultAddress", Value: user.DefaultAddress})
		}

		updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		updatedUser = append(updatedUser, bson.E{Key: "updatedAt", Value: updatedAt})

		filter := bson.M{"userId": userID}
		opts := options.Update().SetUpsert(true)
		update := bson.D{{Key: "$set", Value: updatedUser}}

		updateResults, updateErr := userCollection.UpdateOne(ctx, filter, update, opts)
		defer cancel()
		if updateErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while updating an object in the User Collection",
				Error: updateErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "User Update Successful",
			Result: updateResults,
		})
	}
}