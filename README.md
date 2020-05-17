# gitly.dev

**gitly.dev** is a web application that **takes in input the name of a GitHub repository** and **outputs a score that tells how active a GitHub repository is**. I often found myself doing this sort of checks manually, thus I thought it would have been nice to automatize the whole process.

This is a project written for fun in **TypeScript, Go and plain JavaScript** with React for the front-end.

Since it has been written for fun, **over-engineering was the rule**.

## Architecture

The actors involved are:

- a _web application_ serving web pages written in JavaScript using Next.js (found inside the `app` folder)
- _APIs_ (TypeScript + Node.js) (found inside the `api` folder)
- a _processing_ daemon written in Go (found inside the `processing` folder)
- Redis - used as cache and PubSub system

Both the APIs and the processing Go applications are subscribed to the same Redis PubSub channels.
When the web application sends a request to calculate the score for a particular repository:

- APIs: publish a message inside the channel with a particular id that identifies the request
- APIs: record a callback for that particular request, waiting for a response
- Processing daemon: calculates the score inside a goroutine and publishes it inside the channel
- APIs: return the result to the client

I hope to publish a (sequence diagram)[https://en.wikipedia.org/wiki/Sequence_diagram] soon.

### How to get better

Parallelize requests inside `api/app.ts` with `Promise.all()`, at the moment they are serial for simplicity.

Right now, as you can see in `docker-compose.production.yml` each node has its own **Redis**, this should be externalized and shared, especially if traffic will be high (unlikely).

## How to help

Open an issue, sends pull requests, you're free to contribute.
