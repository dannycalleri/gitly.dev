package main

import (
	"fmt"

	"github.com/dannycalleri/rank/pubsub"
	"github.com/dannycalleri/rank/pullrequests"
	"github.com/dannycalleri/rank/stars"
)

func main() {
	pubsub.Init()

	ch := make(chan string)
	go stars.Init(ch)
	go pullrequests.Init(ch)

	for msg := range ch {
		fmt.Println(msg)
	}
}
