both node and golang programs are subscribed to the same channel

(node) fetch data
(node) publish data to act upon
  (go) takes data, serialize it, calculate
  (go) program publish calculation results on the channel
(node) read takes data and returns it

From the Node app perspective:

-> (node) redis initialized and application subscribed to channels
-> (node) new request comes in, assign id 1337
-> (node) new request comes in, assign id 1338
-> (node) publish on stars raw_data for 1337 and register callback for 1337
-> (node) publish on stars raw_data for 1338 and register callback for 1338
-> (go) the application receive messages on 'stars' and handles work to goroutines ->
   (go)(goroutine) calculates data and publish complete_data for 1337
   (go)(goroutine) calculates data and publish complete_data for 1338
-> (node) receive message ->
   (node) unpack message, take its id (1337), build the correct key to read the callback, call it
   (node) unpack message, take its id (1338), build the correct key to read the callback, call it
-> (node) once the data is available, unregister callback for 1337
-> (node) once the data is available, unregister callback for 1338
-> (node) send data to client for request 1337
-> (node) send data to client for request 1338
