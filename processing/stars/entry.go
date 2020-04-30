package stars

import (
	"encoding/json"
	"fmt"

	"github.com/go-redis/redis"
)

type StarsPayload struct {
	Stars float64
}

type StarMessage struct {
	Payload StarsPayload
	Mode    string
	Id      string
}

func Init(rdb *redis.Client, clientChannel chan string) {
	pubsub := rdb.Subscribe("stars:raw_data")
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

		fmt.Println("proviamo a vedere se ci sta")

		var starMessage StarMessage
		b := []byte(msg.Payload)
		json.Unmarshal(b, &starMessage)
		// if err != nil {
		fmt.Println(starMessage)
		// }

		if starMessage.Mode != "raw_data" {
			continue
		}

		starsBenchmark := float64(5000)
		starsRate := starMessage.Payload.Stars / starsBenchmark
		var rating float64
		if starsRate > 1 {
			rating = 1
		} else {
			rating = starsRate
		}

		fmt.Println(rating)

		m := StarMessage{StarsPayload{rating}, "complete_data", starMessage.Id}
		if buffer, err := json.Marshal(m); err == nil {
			// Publish a message.
			err = rdb.Publish("stars:complete_data", buffer).Err()
			if err != nil {
				panic(err)
			}
		}

		clientChannel <- "completed stars calculation"
	}
}
