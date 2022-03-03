package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct{
	ID					primitive.ObjectID		`bson:"_id" json:"_id"`
	FirstName			*string					`bson:"firstName" json:"firstName" validate:"required"`
	LastName			*string					`bson:"lastName" json:"lastName" validate:"required"`
	PaymentMethod		*string					`bson:"paymentMethod" json:"paymentMethod" validate:"required"`
	ShippingAddress		Address					`bson:"shippingAddress" json:"shippingAddress" validate:"required"`
	OrderItems			[]OrderItems			`bson:"orderItems" json:"orderItems" validate:"required"`
	TotalPrice			*float64				`bson:"totalPrice" json:"totalPrice" validate:"required"`
	IsPaid				*string					`bson:"isPaid" json:"isPaid" validate:"required,eq=PAID|eq=PENDING"`
	OrderID				string					`bson:"orderId" json:"orderId"`
	CreatedAt			time.Time				`bson:"createdAt" json:"createdAt"`
	UpdatedAt			time.Time				`bson:"updatedAt" json:"updatedAt"`
}

type OrderItems struct{
	Quantity	*int						`bson:"quantity" json:"quantity"`
	Products	map[string]interface{}		`bson:"product" json:"product"`
}