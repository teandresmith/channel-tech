package helpers

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/teandresmith/channel-tech/jwt-service/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


type SignedTokenDetails struct{
	FirstName				string		`bson:"first_name" json:"first_name"`
	LastName				string		`bson:"last_name" json:"last_name"`
	Email					string		`bson:"email" json:"email"`
	UserType				string		`bson:"user_type" json:"user_type"`
	UUID					string		`bson:"uuid" json:"uuid"`
	*jwt.RegisteredClaims
}

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "User")

func GenerateJWTTokens(firstName string, lastName string, email string, usertype string, uuid string) (token string, refreshToken string, err error) {
	secret := []byte(os.Getenv("SECRET_KEY"))
	claims := &SignedTokenDetails{
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		UserType: usertype,
		UUID: uuid,
		RegisteredClaims: &jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Local().Add(30*time.Minute)),
			Issuer: "E-Commerce JWT Service",
		},
	}

	refreshClaims := &SignedTokenDetails{
		FirstName: firstName,
		LastName: lastName,
		Email: email,
		UserType: usertype,
		UUID: uuid,
		RegisteredClaims: &jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Local().Add(24*time.Hour)),
			Issuer: "E-Commerce JWT Service",
		},
	}

	token, tokenErr := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString(secret)
	if tokenErr != nil {
		log.Panic(tokenErr)
		return "", "", tokenErr
	}

	refreshToken, refreshTokenErr := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString(secret)
	if refreshTokenErr != nil {
		log.Panic(refreshTokenErr)
		return "", "", refreshTokenErr
	}

	return token, refreshToken, nil
}

func UpdateTokens(token string, refreshToken string, userID string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	var updateUser bson.D

	updateUser = append(updateUser, bson.E{Key: "token", Value: token})
	updateUser = append(updateUser, bson.E{Key: "refreshToken", Value: refreshToken})

	updatedAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	updateUser = append(updateUser, bson.E{Key: "updatedAt", Value: updatedAt})

	filter := bson.M{"userId": userID}
	opt := options.Update().SetUpsert(true)
	update := bson.D{{Key: "$set", Value: updateUser}}

	_, updateErr := userCollection.UpdateOne(ctx, filter, update, opt)
	defer cancel()
	if updateErr != nil {
		return updateErr
	}

	return nil
}

func ValidateAndRefreshExpiredToken(refreshTokenString string) (*SignedTokenDetails, string) {
	secret := []byte(os.Getenv("SECRET_KEY"))

	refreshToken, err := jwt.ParseWithClaims(refreshTokenString, &SignedTokenDetails{}, func(token *jwt.Token) (interface{}, error){
		return []byte(secret), nil
	})

	if err != nil {
		return &SignedTokenDetails{}, err.Error()
	}

	if !refreshToken.Valid {
		return &SignedTokenDetails{}, "Token not Valid"
	}


	claims, ok := refreshToken.Claims.(*SignedTokenDetails) 
	if !ok {
		return &SignedTokenDetails{}, err.Error()
	}

	
	if !claims.VerifyExpiresAt(time.Now().Local(), true) {
		return &SignedTokenDetails{}, "Token is expired."
	}

	newToken, newRefreshToken, generateTokenErr := GenerateJWTTokens(claims.FirstName, claims.LastName, claims.LastName, claims.UserType, claims.UUID)
	if generateTokenErr != nil {
		return &SignedTokenDetails{}, generateTokenErr.Error()
	}

	updateTokenErr := UpdateTokens(newToken, newRefreshToken, claims.UUID)
	if updateTokenErr != nil {
		return &SignedTokenDetails{}, updateTokenErr.Error()
	}


	return claims, ""
}