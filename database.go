package main

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

func connect() (*sql.DB, error) {
	database_url := os.Getenv("DATABASE_URL")
	db, err := sql.Open("postgres", database_url)
	if err != nil {
		log.Println("Database open error")
		return nil, err
	}
	log.Printf("connected via %s", database_url)
	return db, nil
}

type short struct {
	Id          int8   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Url         string `json:"url"`
}

func getAllShorts() ([]short, error) {
	db, err := connect()
	defer db.Close()
	if err != nil {
		log.Fatal(err)
	}
	rows, err := db.Query(`
      select id, title, description, url
      from "Short"`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var shorts []short
	for rows.Next() {
		var s short
		err = rows.Scan(&s.Id, &s.Title, &s.Description, &s.Url)
		if err != nil {
			return nil, err
		}
		shorts = append(shorts, s)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return shorts, nil

}
