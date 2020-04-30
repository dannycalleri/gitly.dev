package main

import (
	"fmt"

	"github.com/dannycalleri/rank/stars"
	"github.com/go-redis/redis"
)

func main() {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // use default Addr
		Password: "",               // no password set
		DB:       0,                // use default DB
	})

	pong, err := rdb.Ping().Result()
	fmt.Println(pong, err)

	ch := make(chan string)
	go stars.Init(rdb, ch)

	for msg := range ch {
		fmt.Println(msg)
	}
}
