package stars

import (
	"encoding/json"
	"fmt"

	"github.com/dannycalleri/rank/messages"
	"github.com/dannycalleri/rank/pubsub"
)

func Calculate(stars float64) float64 {
	starsBenchmark := float64(5000)
	starsRate := stars / starsBenchmark
	var rating float64
	if starsRate > 1 {
		rating = 1
	} else {
		rating = starsRate
	}
	return rating
}

func Init(clientChannel chan string) {
	ch, pub := pubsub.SubscribeTo("stars:raw_data")
	defer pub.Close()

	// Consume messages.
	for msg := range ch {
		fmt.Println(msg.Channel, msg.Payload)

		starMessage := messages.NewStarMessageFromJson(msg.Payload)
		if starMessage.Mode != "raw_data" {
			continue
		}

		rating := Calculate(starMessage.Payload.Stars)
		fmt.Println(rating)

		m := messages.StarMessage{messages.StarsPayload{rating}, "complete_data", starMessage.Id}
		if buffer, err := json.Marshal(m); err == nil {
			err := pubsub.PublishTo("stars:complete_data", buffer)
			if err != nil {
				panic(err)
			}
		}

		clientChannel <- "completed stars calculation"
	}
}
