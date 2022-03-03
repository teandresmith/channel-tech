package helpers

import (
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/joho/godotenv"
)

type SignedTokenDetails struct {
	FirstName string `bson:"first_name" json:"first_name"`
	LastName  string `bson:"last_name" json:"last_name"`
	Email     string `bson:"email" json:"email"`
	UserType  string `bson:"user_type" json:"user_type"`
	UUID      string `bson:"uuid" json:"uuid"`
	*jwt.RegisteredClaims
}

func Init() string  {
	envVariable := os.Getenv("SECRET_KEY")
	if envVariable == "" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal(err)
		}
		envVariable = os.Getenv("SECRET_KEY")
	}
	
	return envVariable
}

var SECRET_KEY = []byte(Init())

func ValidateToken(tokenString string) (*SignedTokenDetails, string) {

	token, err := jwt.ParseWithClaims(tokenString, &SignedTokenDetails{}, func(token *jwt.Token) (interface{}, error){
		return []byte(SECRET_KEY), nil
	})
	
	if err != nil {
		return &SignedTokenDetails{}, err.Error()
	}

	if !token.Valid {
		return &SignedTokenDetails{}, "Token not Valid"
	}


	claims, ok := token.Claims.(*SignedTokenDetails) 
	if !ok {
		return &SignedTokenDetails{}, err.Error()
	}

	
	if !claims.VerifyExpiresAt(time.Now().Local(), true) {
		return &SignedTokenDetails{}, "Token is expired."
	}

	return claims, ""
}


