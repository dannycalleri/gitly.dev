package issues

import (
	"encoding/json"
	"fmt"

	"github.com/dannycalleri/rank/messages"
	"github.com/dannycalleri/rank/pubsub"
)

func calculate(data messages.IssuesPayload) float64 {
	issuesList := data.Issues
	if len(issuesList) == 0 {
		return 0
	}

	var answeredByTeam int = 0
	for _, issue := range issuesList {
		comments := issue.CommentsList

		answersByTeam := 0
		for _, comment := range comments {
			if comment.AuthorAssociation == "COLLABORATOR" ||
				comment.AuthorAssociation == "CONTRIBUTOR" ||
				comment.AuthorAssociation == "MEMBER" ||
				comment.AuthorAssociation == "OWNER" {
				answersByTeam++
			}
		}

		if answersByTeam > 0 {
			answeredByTeam++
		}
	}

	return float64(answeredByTeam) / float64(len(issuesList))
}

func Init(clientChannel chan string) {
	ch, pub := pubsub.SubscribeTo("issues:raw_data")
	defer pub.Close()

	// Consume messages.
	for msg := range ch {
		fmt.Println(msg.Channel, msg.Payload)

		message := messages.NewIssuesMessageFromJson(msg.Payload)
		if message.Mode != "raw_data" {
			continue
		}

		var rating float64 = calculate(message.Payload)
		fmt.Println(rating)

		m := messages.ResultMessage{Payload: rating, Mode: "complete_data", Id: message.Id}
		if buffer, err := json.Marshal(m); err == nil {
			// Publish a message.
			err = pubsub.PublishTo("issues:complete_data", buffer)
			if err != nil {
				panic(err)
			}
		}

		clientChannel <- "completed issues calculation"
	}
}
