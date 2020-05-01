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

// pull requests
type PullRequestsData struct {
	OpenCount   int
	ClosedCount int
}

type PRMessage struct {
	Payload PullRequestsData
	Mode    string
	Id      string
}

// stars
type StarsPayload struct {
	Stars float64
}

type StarMessage struct {
	Payload StarsPayload
	Mode    string
	Id      string
}

// issues
type Comment struct {
	Id                uint
	AuthorAssociation string
}

type Issue struct {
	Id           uint
	Number       uint
	Title        string
	Comments     uint
	CommentsList []Comment
}

type IssuesPayload struct {
	Issues []Issue
}

type IssuesMessage struct {
	Payload IssuesPayload
	Mode    string
	Id      string
}

func NewPRMessageFromJson(payload string) PRMessage {
	var message PRMessage
	b := []byte(payload)
	err := json.Unmarshal(b, &message)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	return message
}

func NewStarMessageFromJson(payload string) StarMessage {
	var starMessage StarMessage
	b := []byte(payload)
	err := json.Unmarshal(b, &starMessage)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	return starMessage
}

func NewIssuesMessageFromJson(payload string) IssuesMessage {
	var message IssuesMessage
	b := []byte(payload)
	err := json.Unmarshal(b, &message)
	if err != nil {
		fmt.Println(err)
		panic(err)
	}

	return message
}
