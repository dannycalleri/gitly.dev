package pullrequests

import (
	"encoding/json"
	"fmt"

	"github.com/go-redis/redis"
)

type PullRequestsData struct {
	OpenCount   int
	ClosedCount int
}

type PRMessage struct {
	Payload PullRequestsData
	Mode    string
	Id      string
}

type ResultMessage struct {
	Payload float64
	Mode    string
	Id      string
}

func Init(rdb *redis.Client, clientChannel chan string) {
	pubsub := rdb.Subscribe("pull_requests:raw_data")
	defer pubsub.Close()

	// Wait for confirmation that subscription is created before publishing anything.
	_, pubsubErr := pubsub.Receive()
	if pubsubErr != nil {
		panic(pubsubErr)
	}

	ch := pubsub.Channel()

	// Consume messages.
	for msg := range ch {
		fmt.Println(msg.Channel, msg.Payload)

		var message PRMessage
		b := []byte(msg.Payload)
		json.Unmarshal(b, &message)
		// if err != nil {
		fmt.Println(message)
		// }

		if message.Mode != "raw_data" {
			continue
		}

		var rating float64
		open := message.Payload.OpenCount
		closed := message.Payload.ClosedCount
		total := open + closed
		if total == 0 {
			rating = 0
		} else {
			rating = float64(closed) / float64(total)
		}

		fmt.Println(rating)

		m := ResultMessage{rating, "complete_data", message.Id}
		if buffer, err := json.Marshal(m); err == nil {
			// Publish a message.
			err = rdb.Publish("pull_requests:complete_data", buffer).Err()
			if err != nil {
				panic(err)
			}
		}

		clientChannel <- "completed pull requests calculation"
	}
}
