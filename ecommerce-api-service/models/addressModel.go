package models

type Address struct {
	StreetAddress   *string `bson:"streetAddress" json:"streetAddress" validate:"required"`
	City            *string `bson:"city" json:"city" validate:"required"`
	StatePrefecture *string `bson:"statePrefecture" json:"statePrefecture" validate:"required"`
	Country         *string `bson:"country" json:"country" validate:"required"`
	PostalCode      *string `bson:"postalCode" json:"postalCode" validate:"required"`
}