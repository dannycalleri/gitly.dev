package messages

import (
	"encoding/json"
	"fmt"
)

type ResultMessage struct {
	Payload float64
	Mode    string
	Id      string
}

type PullRequestsData struct {
	OpenCount   int
	ClosedCount int
}

type PRMessage struct {
	Payload PullRequestsData
	Mode    string
	Id      string
}

func NewPRMessageFromJson(payload string) PRMessage {
	var message PRMessage
	b := []byte(payload)
	err := json.Unmarshal(b, &message)
	if err == nil {
		fmt.Println(message)
		panic(message)
	}

	return message
}
