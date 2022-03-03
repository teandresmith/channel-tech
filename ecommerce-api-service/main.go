package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/middleware"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/routes"
)

func MainMenu() gin.HandlerFunc{
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"Welcome": "To Channel Tech",
		})
	}
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Panic(err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	router := gin.New()

	router.Use(gin.Logger())
	router.Use(middleware.CorsMiddleware())

	router.GET("/", MainMenu())
	routes.PublicRoutes(router)

	router.Use(middleware.Authentication())
	routes.PrivateRoutes(router)
	routes.AdminRoutes(router)
	

	
	log.Fatal(router.Run(":" + port))
}