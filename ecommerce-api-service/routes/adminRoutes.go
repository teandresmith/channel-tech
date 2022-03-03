package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/controllers"
)


func AdminRoutes(incomingRoutes *gin.Engine) {

	// Routes are protected and only accessible by ADMINS
	incomingRoutes.GET("/api/admin/users", controllers.GetAllUsers())
	incomingRoutes.GET("/api/admin/users/query", controllers.QueryUsersByParams())
	incomingRoutes.PATCH("/api/admin/users/:userid", controllers.UpdateUserToAdmin())

	incomingRoutes.POST("/api/admin/products", controllers.CreateProduct())
	incomingRoutes.PATCH("/api/admin/products/:productid", controllers.UpdateProduct())
	incomingRoutes.DELETE("/api/admin/products/:productid", controllers.DeleteProduct())

	incomingRoutes.GET("/api/admin/orders", controllers.GetAllOrders())
	incomingRoutes.PATCH("/api/admin/orders/:orderid", controllers.UpdateOrder())
	incomingRoutes.DELETE("/api/admin/orders/:orderid", controllers.DeleteOrder())
	incomingRoutes.GET("/api/admin/orders/:orderid", controllers.GetOrderByID())

	
}