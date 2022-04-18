package main

import (
	"container/list"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("./dist", true)))

	r.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	r.GET("/api/shorts", func(c *gin.Context) {
		// TODO: get shorts from Postgres
		shorts := list.New()
		c.JSON(http.StatusOK, gin.H{
			"shorts": shorts,
		})
	})

	// TODO: upload short (when admin)
	// TODO: check authorizer for if authenticated

	r.NoRoute(func(c *gin.Context) {
		method := c.Request.Method
		if method == "GET" {
			c.File("./dist/index.html")
		}
	})

	return r
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	r := setupRouter()
	if err := r.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatal(err)
	}

}
