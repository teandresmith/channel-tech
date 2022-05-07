package routes

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/teandresmith/channel-tech/jwt-service/database"
	"github.com/teandresmith/channel-tech/jwt-service/helpers"
	"github.com/teandresmith/channel-tech/jwt-service/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type LoginUser struct {
	Email    string `bson:"email" json:"email"`
	Password string `bson:"Password" json:"Password"`
}

type Error struct {
	Message string `bson:"message" json:"message"`
	Error   string `bson:"error" json:"error"`
}

type Response struct {
	Message string      `bson:"message" json:"message"`
	Result  interface{} `bson:"result" json:"result"`
}

var userCollection *mongo.Collection = database.OpenCollection(database.Client, "User")

func Home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	WriteResponse(w, Response{
		Message: "Welcome to a JWT Authentication Service",
	}, http.StatusOK)
}

func Register(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var body models.User
	validate := validator.New()
	w.Header().Set("Content-Type", "application/json")

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		WriteError(w, Error{
			Message: "There was an error while binding body request data",
			Error:   err.Error(),
		}, http.StatusBadRequest)
		return
	}

	if validateErr := validate.Struct(body); validateErr != nil {
		WriteError(w, Error{
			Message: "There wasn an error while validating body request data",
			Error:   validateErr.Error(),
		}, http.StatusBadRequest)
		return
	}

	userExists := userCollection.FindOne(ctx, bson.M{"email": body.Email}).Err()
	defer cancel()
	if userExists != mongo.ErrNoDocuments {
		WriteError(w, Error{
			Message: "Email is already in use.",
		}, http.StatusBadRequest)
		return
	}

	body.ID = primitive.NewObjectID()
	body.UserID = body.ID.Hex()

	userType := "USER"
	body.UserType = &userType

	hashPassword, hashErr := helpers.HashPassword(*body.Password)
	if hashErr != nil {
		WriteError(w, Error{
			Message: "There was an error while hashing password",
			Error:   hashErr.Error(),
		}, http.StatusInternalServerError)
		return
	}

	body.Password = &hashPassword

	body.CreatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	body.UpdatedAt, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

	token, refreshToken, tokenGenerationErr := helpers.GenerateJWTTokens(*body.FirstName, *body.LastName, *body.Email, *body.UserType, body.UserID)
	if tokenGenerationErr != nil {
		WriteError(w, Error{
			Message: "There was an error while generating tokens",
			Error:   tokenGenerationErr.Error(),
		}, http.StatusInternalServerError)
		return
	}

	body.Token = &token
	body.RefreshToken = &refreshToken

	_, insertErr := userCollection.InsertOne(ctx, body)
	defer cancel()
	if insertErr != nil {
		WriteError(w, Error{
			Message: "There was an error while inserting an object in the User Collection",
			Error:   insertErr.Error(),
		}, http.StatusInternalServerError)
		return
	}

	WriteResponse(w, Response{
		Message: "Registration Successful",
		Result:  body,
	}, http.StatusOK)

}

func Login(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var body LoginUser
	w.Header().Set("Content-Type", "application/json")

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		WriteError(w, Error{
			Message: "There was an error while binding request body data",
			Error:   err.Error(),
		}, http.StatusBadRequest)
		return
	}

	var foundUser models.User

	findErr := userCollection.FindOne(ctx, bson.M{"email": body.Email}).Decode(&foundUser)
	defer cancel()
	if findErr != nil {
		WriteError(w, Error{
			Message: "There was an error while querying the User Collection",
			Error:   findErr.Error(),
		}, http.StatusInternalServerError)
		return
	}

	if validPasswordErr := helpers.ValidateHashPassword(*foundUser.Password, body.Password); validPasswordErr != nil {
		WriteError(w, Error{
			Message: "Something went wrong when trying to validate password",
			Error:   validPasswordErr.Error(),
		}, http.StatusUnauthorized)
		return
	}

	token, refreshToken, tokenErr := helpers.GenerateJWTTokens(*foundUser.FirstName, *foundUser.LastName, *foundUser.Email, *foundUser.UserType, foundUser.UserID)
	if tokenErr != nil {
		WriteError(w, Error{
			Message: "There was an error while generating JWT tokens",
			Error:   tokenErr.Error(),
		}, http.StatusInternalServerError)
		return
	}

	updateErr := helpers.UpdateTokens(token, refreshToken, foundUser.UserID)
	if updateErr != nil {
		WriteError(w, Error{
			Message: "There was an error while updating user token",
			Error:   updateErr.Error(),
		}, http.StatusInternalServerError)
		return
	}

	WriteResponse(w, Response{
		Message: "Login Successful",
		Result:  foundUser,
	}, http.StatusOK)

}

func RefreshToken(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var body struct {
		Token string `bson:"refreshToken" json:"refreshToken"`
	}

	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		WriteError(w, Error{
			Message: "There was an error while decoding request body data",
			Error:   err.Error(),
		}, http.StatusBadRequest)
		return
	}

	claims, refreshErr := helpers.ValidateAndRefreshExpiredToken(body.Token)
	if refreshErr != "" {
		WriteError(w, Error{
			Message: "There was an error while validating and generating new tokens",
			Error:   refreshErr,
		}, http.StatusInternalServerError)
		return
	}

	WriteResponse(w, Response{
		Message: "New Tokens Updated Successfully",
		Result:  claims,
	}, http.StatusOK)
}

func WriteError(w http.ResponseWriter, err Error, statusCode int) {
	json.NewEncoder(w).Encode(&err)
	w.WriteHeader(statusCode)
}

func WriteResponse(w http.ResponseWriter, res Response, statusCode int) {
	json.NewEncoder(w).Encode(&res)
	w.WriteHeader(statusCode)
}
