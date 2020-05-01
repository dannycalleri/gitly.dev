package pullrequests

import (
	"encoding/json"
	"fmt"

	"github.com/dannycalleri/rank/messages"
	"github.com/dannycalleri/rank/pubsub"
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

func Init(clientChannel chan string) {
	ch, pub := pubsub.SubscribeTo("pull_requests:raw_data")
	defer pub.Close()

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
			err = pubsub.PublishTo("pull_requests:complete_data", buffer)
			if err != nil {
				panic(err)
			}
		}

		clientChannel <- "completed pull requests calculation"
	}
}
