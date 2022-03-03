package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/controllers"
)


func PrivateRoutes(incomingRoutes *gin.Engine) {
	// User
	incomingRoutes.GET("/api/users/:userid", controllers.GetUser())
	incomingRoutes.PATCH("/api/users/:userid", controllers.UpdateUser())
}