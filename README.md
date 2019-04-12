# Petful Server

by Ali Lahrime and Daniel Ors

## Intro

Petful is an animal adoption tool - we have many cute puppies and kittens for you to adopt!

Simply click the link below and select the dog or cat you would like to adopt.

## Demo

https://petful-ali-daniel.now.sh/

## Tech Stack

* ExpressJS
* NodeJS
* RESTful API
* Deployed using Heroku

### Tech Concept

A key limitation placed on this application's development was the requirement of a FIFO Queue data type for all pets and adopter names. We accomplished this by defining a store array of data objects and enqueue-ing them into a Queue. Our GET and DELETE methods would then read and remove from the front of the queue every time they were sent. Once the Queue is emptied, we have a conditional statement than automatically runs a refilling function on the next GET request. Enjoy!