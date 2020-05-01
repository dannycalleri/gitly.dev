package pubsub

import (
	"fmt"
	"sync"

	"github.com/go-redis/redis"
)

var lock = &sync.Mutex{}
var rdb *redis.Client

func Init(host string) {
	lock.Lock()
	defer lock.Unlock()

	if rdb != nil {
		return
	}

	rdb = redis.NewClient(&redis.Options{
		Addr:     host + ":6379", // use default Addr
		Password: "",             // no password set
		DB:       0,              // use default DB
	})

	pong, err := rdb.Ping().Result()
	fmt.Println(pong, err)
}

func SubscribeTo(topic string) (<-chan *redis.Message, *redis.PubSub) {
	pubsub := rdb.Subscribe(topic)

	// Wait for confirmation that subscription is created before publishing anything.
	_, pubsubErr := pubsub.Receive()
	if pubsubErr != nil {
		panic(pubsubErr)
	}

	return pubsub.Channel(), pubsub
}

func PublishTo(topic string, buffer []byte) error {
	err := rdb.Publish(topic, buffer).Err()
	return err
}
