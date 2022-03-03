package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct{
	ID				primitive.ObjectID	`bson:"_id" json:"_id"`
	FirstName		*string				`bson:"firstName" json:"firstName" validate:"required"`
	LastName		*string				`bson:"lastName" json:"lastName" validate:"required"`
	Email			*string				`bson:"email" json:"email" validate:"required,email"`
	Password		*string				`bson:"Password" json:"Password" validate:"required"`
	UserType		*string				`bson:"userType" json:"userType"`
	UserID			string				`bson:"userId" json:"userId"`
	Token			*string				`bson:"token" json:"token"`
	RefreshToken	*string				`bson:"refreshToken" json:"refreshToken"`
	CreatedAt		time.Time			`bson:"createdAt" json:"createdAt"`
	UpdatedAt		time.Time			`bson:"updatedAt" json:"updatedAt"`
}


