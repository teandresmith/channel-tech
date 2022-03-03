package helpers

import "golang.org/x/crypto/bcrypt"


func HashPassword(password string) (string, error) {
	cost := 15
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		return "", err
	}

	return string(hashPassword), nil

}

func ValidateHashPassword(hashPassword string, providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashPassword), []byte(providedPassword))
	if err != nil {
		return err
	}

	return nil
}