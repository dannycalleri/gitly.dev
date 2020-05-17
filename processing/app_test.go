package main

import (
	"math/big"
	"testing"

	"github.com/dannycalleri/rank/issues"
	"github.com/dannycalleri/rank/messages"
	"github.com/dannycalleri/rank/pullrequests"
	"github.com/dannycalleri/rank/stars"
)

func TestStars(t *testing.T) {
  score := stars.Calculate(5000)
  if score != 1 {
    t.Errorf("Score was incorrect, got: %f, want: %d.", score, 1)
  }
}

func TestIssuesWithCommentsByMembers(t *testing.T) {
  issuesList := messages.IssuesPayload{
    Issues: []messages.Issue{
      {
        Id: 1,
        Number: 1,
        Title: "I'm a title",
        Comments: 1,
        CommentsList: []messages.Comment{
          {
            Id: 1,
            AuthorAssociation: "COLLABORATOR",
          },
        },
      },
      {
        Id: 2,
        Number: 2,
        Title: "I'm a title",
        Comments: 1,
        CommentsList: []messages.Comment{
          {
            Id: 1,
            AuthorAssociation: "SOMEONE",
          },
        },
      },
    },
  }
  score := issues.Calculate(issuesList)
  if score != 0.5 {
    t.Errorf("Score was incorrect, got: %f, want: %f.", score, 0.5)
  }
}

func TestIssuesWithoutCommentsByMembers(t *testing.T) {
  issuesList := messages.IssuesPayload{
    Issues: []messages.Issue{
      {
        Id: 1,
        Number: 1,
        Title: "I'm a title",
        Comments: 1,
        CommentsList: []messages.Comment{
          {
            Id: 1,
            AuthorAssociation: "SOMEONE",
          },
        },
      },
    },
  }
  score := issues.Calculate(issuesList)
  if score != 0 {
    t.Errorf("Score was incorrect, got: %f, want: %d.", score, 0)
  }
}

func TestPullRequests(t *testing.T) {
  data := messages.PullRequestsData{
    OpenCount: 10,
    ClosedCount: 90,
  }
  score := pullrequests.Calculate(data)
  test := float64(0.9)

  // compare a to b
  result := big.NewFloat(score).Cmp(big.NewFloat(test))

  if result != 0 {
    t.Errorf("Score was incorrect, got: %f, want: %f.", score, test)
  }
}