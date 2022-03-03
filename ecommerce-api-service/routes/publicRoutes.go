package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/controllers"
)

func PublicRoutes(incomingRoutes *gin.Engine) {
	// Necessary for Checkout. User doesn't need to be logined to buy from website
	incomingRoutes.POST("/api/order/new", controllers.CreateOrder())

	// All Product Routes are readable by the User with no need of providing an access token
	incomingRoutes.GET("/api/products", controllers.GetAllProducts())
	incomingRoutes.GET("/api/products/:productid", controllers.GetProductByID())
	incomingRoutes.GET("/api/products/query", controllers.QueryProductsByParams())
	incomingRoutes.PATCH("/api/products/:productid/review", controllers.CreateReview())

	// Contact Route
	incomingRoutes.POST("/api/contact", controllers.SendMessage())
}