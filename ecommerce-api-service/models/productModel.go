package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Product struct{
	ID					primitive.ObjectID		`bson:"_id" json:"_id"`
	Name				*string					`bson:"name" json:"name" validate:"required"`
	Price				*float64				`bson:"price" json:"price" validate:"required"`
	Image				*string					`bson:"image" json:"image" validate:"required"`
	Description			*string					`bson:"description" json:"description" validate:"required"`
	QuantityInStock		*int					`bson:"quantityInStock" json:"quantityInStock" validate:"required"`
	Category			*string					`bson:"category" json:"category" validate:"required"`
	Language			*string					`bson:"language" json:"language" validate:"required"`
	Subcategory			*string					`bson:"subcategory" json:"subcategory" validate:"required"`
	Brand				*string					`bson:"brand" json:"brand" validate:"required"`
	Tag					*string					`bson:"tag" json:"tag"`
	Reviews				[]Review				`bson:"reviews" json:"reviews"`
	ProductID			string					`bson:"productId" json:"productId"`
	CreatedAt			time.Time				`bson:"createdAt" json:"createdAt"`
	UpdatedAt			time.Time				`bson:"updatedAt" json:"updatedAt"`

}

type Review struct{
	ID				primitive.ObjectID		`bson:"_id" json:"_id"`
	Name			*string					`bson:"name" json:"name" validate:"required"`
	Rating			*float64				`bson:"rating" json:"rating" validate:"required"`
	Comment			*string					`bson:"comment" json:"comment" validate:"required"`
	ReviewID		string					`bson:"reviewId" json:"reviewId"`
	CreatedAt		time.Time				`bson:"createdAt" json:"createdAt"`
	UpdatedAt		time.Time				`bson:"updatedAt" json:"updatedAt"`
}

