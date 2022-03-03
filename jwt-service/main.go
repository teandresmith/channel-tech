package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/teandresmith/channel-tech/jwt-service/routes"
)

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc( func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
        w.Header().Set("Access-Control-Allow-Credentials", "true")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
        w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET")

        if r.Method == "OPTIONS" {
            routes.WriteError(w, routes.Error{
				Message: "Something went wrong within the middleware",
			}, http.StatusBadRequest)
            return
        }

		next.ServeHTTP(w,r)
	})
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Panic(err)
	}

	home := http.HandlerFunc(routes.Home)
	register := http.HandlerFunc(routes.Register)
	login := http.HandlerFunc(routes.Login)



	http.Handle("/", CorsMiddleware(home))
	http.Handle("/register", CorsMiddleware(register))
	http.Handle("/login", CorsMiddleware(login))

	fmt.Println("Running JWT Web Server at Port: 5000")

	log.Fatal(http.ListenAndServe(":5000", nil))
}