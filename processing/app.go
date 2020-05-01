package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/dannycalleri/rank/issues"
	"github.com/dannycalleri/rank/pubsub"
	"github.com/dannycalleri/rank/pullrequests"
	"github.com/dannycalleri/rank/stars"
)

func buildEnvMap() map[string]string {
	environmentMap := make(map[string]string)
	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		environmentMap[pair[0]] = pair[1]
	}

	return environmentMap
}

func main() {
	env := buildEnvMap()
	appEnv := env["APP_ENV"]
	var redisHost string = "localhost"
	if appEnv == "prod" {
		redisHost = "redis"
	}

	pubsub.Init(redisHost)

	ch := make(chan string)
	go stars.Init(ch)
	go pullrequests.Init(ch)
	go issues.Init(ch)

	for msg := range ch {
		fmt.Println(msg)
	}
}
