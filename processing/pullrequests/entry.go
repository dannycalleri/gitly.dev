package pullrequests

import (
	"encoding/json"
	"fmt"

	"github.com/dannycalleri/rank/messages"
	"github.com/go-redis/redis"
)

func calculate(data messages.PullRequestsData) float64 {
	var rating float64
	open := data.OpenCount
	closed := data.ClosedCount
	total := open + closed
	if total == 0 {
		rating = 0
	} else {
		rating = float64(closed) / float64(total)
	}

	return rating
}

func Init(rdb *redis.Client, clientChannel chan string) {
	pubsub := rdb.Subscribe("pull_requests:raw_data")
	defer pubsub.Close()

	_, pubsubErr := pubsub.Receive()
	if pubsubErr != nil {
		panic(pubsubErr)
	}

	ch := pubsub.Channel()

	// Consume messages.
	for msg := range ch {
		fmt.Println(msg.Channel, msg.Payload)

		message := messages.NewPRMessageFromJson(msg.Payload)
		if message.Mode != "raw_data" {
			continue
		}

		var rating float64 = calculate(message.Payload)
		fmt.Println(rating)

		m := messages.ResultMessage{rating, "complete_data", message.Id}
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
