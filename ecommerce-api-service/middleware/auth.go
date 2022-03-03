package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/controllers"
	"github.com/teandresmith/channel-tech/ecommerce-api-service/helpers"
)

func Authentication() gin.HandlerFunc{
	return func(c *gin.Context) {
		
		token, _ := c.Request.Cookie("Token")
		refreshToken, _ := c.Request.Cookie("RefreshToken")
		var tokenString string

		if token == nil {
			if refreshToken == nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"message": "No Tokens Provided",
				})
				return
			}
			tokenString = refreshToken.Value
		} else {
			tokenString = token.Value
		}

		

		claims, err := helpers.ValidateToken(tokenString)
		if err != "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, controllers.Error{
				Message: "Unauthorized User",
				Error: err,
			})
			return
		}

		c.Set("uuid", claims.UUID)
		c.Set("user_type", claims.UserType)

		c.Next()
	}
}

