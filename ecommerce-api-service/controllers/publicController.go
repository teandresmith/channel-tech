package controllers

import (
	"context"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*
	Public Routes that doesn't require any type of valid tokens. Below is the list of Routes within this file.

		Product Routes
		GetAllProducts()
		GetProductByID()
		QueryProductByParams() => This is unfinished, but will be implemented in the future to provided server side pagination and filtering.
		CreateReview()

		Order Routes
		CreateOrder() => User can still buy items without being logged in.

		Contact Routes
		SendMessage() => User will be able to send an email to reach out to us.
						In a real project, I'd set up an x-rate-limit system to
						prevent spam, but that would add complexity to this application.


*/

func GetAllProducts() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		lang := c.Query("lang")
		if lang == "" {
			lang = "en"
		}

		results, getErr := productCollection.Find(ctx, bson.M{"language": lang})
		defer cancel()
		if getErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while querying the products collection",
				Error: getErr.Error(),
			})
			return
		}

		var products []bson.M

		iterateErr :=  results.All(ctx, &products);
		defer cancel()
		if iterateErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while iterating through the products query results",
				Error: iterateErr.Error(),
			})
			return
		} 

		c.JSON(http.StatusOK, Response{
			Message: "Products Successfully fetched",
			Result: products,
		})	
	}
}


func GetProductByID() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

		productID := c.Param("productid")
		var product models.Product
		
		findErr := productCollection.FindOne(ctx, bson.M{"productId": productID}).Decode(&product)
		defer cancel()
		if findErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while querying the product collection",
				Error: findErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Product Successfully fetched",
			Result: product,
		})
	}
}

func CreateReview() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var review models.Review

		if bindErr := c.BindJSON(&review); bindErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while binding request body data",
				Error: bindErr.Error(),
			})
			return
		}

		if validateErr := validate.Struct(review); validateErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while validating request body data",
				Error: validateErr.Error(),
			})
			return
		}

		review.ID = primitive.NewObjectID()
		review.ReviewID = review.ID.Hex()
		review.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		review.UpdatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

		productID := c.Param("productid")
		var foundProduct models.Product

		foundProductErr := productCollection.FindOne(ctx, bson.M{"productId": productID}).Decode(&foundProduct)
		defer cancel()
		if foundProductErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while querying the Product Collection",
				Error: foundProductErr.Error(),
			})
			return
		}

		reviewArray := foundProduct.Reviews
		reviewArray = append(reviewArray, review)
		
		var updateProduct bson.D

		updateProduct = append(updateProduct, bson.E{Key: "reviews", Value: reviewArray})

		updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		updateProduct = append(updateProduct, bson.E{Key: "updatedAt", Value: updatedAt})

		filter := bson.M{"productId": productID}
		opts := options.Update().SetUpsert(true)
		update := bson.D{{Key: "$set", Value: updateProduct}}

		updateIn, updateErr := productCollection.UpdateOne(ctx, filter, update, opts)
		defer cancel()
		if updateErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while updating an object in the Product Collection",
				Error: updateErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Update Successful",
			Result: updateIn,
		})
	}
}

func QueryProductsByParams() gin.HandlerFunc{
	return func(c *gin.Context) {

	}
}



// Order Routes

func CreateOrder() gin.HandlerFunc{
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var order models.Order
		if bindErr := c.BindJSON(&order); bindErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while binding the request body data",
				Error: bindErr.Error(),
			})
			return
		}

		if validateErr := validate.Struct(order); validateErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while validating the request body data",
				Error: validateErr.Error(),
			})
			return
		}

		order.ID = primitive.NewObjectID()
		order.OrderID = order.ID.Hex()
		order.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		order.UpdatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

		_, insertErr := orderCollection.InsertOne(ctx, order)
		defer cancel()
		if insertErr != nil {
			c.JSON(http.StatusInternalServerError, Error{
				Message: "There was an error while inserting an object into the Order Collection",
				Error: insertErr.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Insertion Successful",
			Result: order,
		})
	}
}

// Contact Route

type Mail struct {
	Name		string		`bson:"name" json:"name" validate:"required"`
	Email		string		`bson:"email" json:"email" validate:"required"`
	Message		string		`bson:"message" json:"message" validate:"required"`
}

func SendMessage() gin.HandlerFunc{
	return func(c *gin.Context) {
		var mail Mail

		if err := c.BindJSON(&mail); err != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "There was an error while binding request body data",
				Error: err.Error(),
			})
			return
		}

		if validateErr := validate.Struct(mail); validateErr != nil {
			c.JSON(http.StatusBadRequest, Error{
				Message: "THere was an error while validating request body data",
				Error: validateErr.Error(),
			})
			return
		}

		username := os.Getenv("EMAIL_USER_NAME")
		password := os.Getenv("EMAIL_PASSWORD")
		if username == "" || password == "" {
			if err := godotenv.Load(); err != nil {
				log.Panic(err)
			}
			username = os.Getenv("EMAIL_USER_NAME")
			password = os.Getenv("EMAIL_PASSWORD")
		}

		auth := smtp.PlainAuth("", username, password, "smtp.gmail.com")
		
		to := []string{username}
		subject := "Subject: channel tech Contact from " + mail.Name + " - " + mail.Email + "\n"
		mime := "MIME-version: 1.0;\nContent-Type: text/plain; charset=\"UTF-8\";\n\n"
		emailBody := mail.Message
		msg := []byte(subject + mime + "\n" + emailBody)
		
		err := smtp.SendMail("smtp.gmail.com:587", auth, username, to, msg)
		if err != nil {
		c.JSON(http.StatusInternalServerError, Error{
			Message: "There was an error while sending the email",
			Error: err.Error(),
		})
		return
		}

		c.JSON(http.StatusOK, Response{
			Message: "Email was sent!",
		})
	}
}

