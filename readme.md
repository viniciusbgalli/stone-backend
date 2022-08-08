## General info
This project was developed to solve the STONE backend challenge.
	
## Main Technologies used in this project
* NodeJs
* Typescript
* Jest
* Redis
* Docker

## Application Layers 
* Domain
* Data
* Presentation
* Infra
* Main

## Setup
The api image is public on Docker Hub link: 
https://hub.docker.com/repository/docker/viniciusgalli/stone-api

Since the image is public, you just need the run the following command in the project folder to start the application:

```
$ docker-compose up -d
```

## Setup production
To run the project in a production environment, you may use a cloud provider service to manage the containers, the container name is "viniciusgalli/stone-api:v1", you can see more details in Docker Hub: https://hub.docker.com/repository/docker/viniciusgalli/stone-api


## Application routes
The application functionalities are described below:

### Add customer

#### URL: 
```
http://localhost:3001/customers
```

#### Method: 
```
POST
```

#### Header params:
```
Authorization: Bearer <token>
```

#### Url params:
```
None
```

#### Data Params:
```
document=[number]
name=[string]
```

#### Success Response:
```
Code: 201
Content: { id: "uuidv4-format", document: 12345, name: "John Doe" }
```

#### Error Response:
```	
Code: 401
Content: { "message": "Incorrect JTW token, not Authenticated" }

Code: 403
Content: { "message": "Client not Authorized for this action" }

Code: 400
Content: { "message": "Missing param: <param>" }

Code: 502
Content: { "message": "Cache error" }

Code: 502
Content: { "message": "SSO error" }
```

### Get customer by id

#### URL: 
```
http://localhost:3001/customers/:id
```

#### Method: 
```
GET
```

#### Header params:
```
Authorization: Bearer <token>
```

#### Url params:
```
id=[string]
```

#### Data Params:
```
None
```

#### Success Response:
```
Code: 200
Content: { id: "uuidv4-format", document: 12345, name: "John Doe" }
```

#### Error Response:
```	
Code: 401
Content: { "message": "Incorrect JTW token, not Authenticated" }

Code: 403
Content: { "message": "Client not Authorized for this action" }

Code: 404
Content: { "message": "Invalid param: id" }

Code: 502
Content: { "message": "Cache error" }

Code: 502
Content: { "message": "SSO error" }
```

### Update customer 

#### URL: 
```
http://localhost:3001/customers/:id
```

#### Method: 
```
PUT
```

#### Url params:
```
id=[string]
```

#### Header params:
```
Authorization: Bearer <token>
```

#### Data Params:
```
document=[number]
name=[string]
```

#### Success Response:
```
Code: 200
Content: { id: "uuidv4-format", document: 12345, name: "John Doe" }
```

#### Error Response:
```	
Code: 401
Content: { "message": "Incorrect JTW token, not Authenticated" }

Code: 403
Content: { "message": "Client not Authorized for this action" }

Code: 400
Content: { "message": "Missing param: <param>" }

Code: 404
Content: { "message": "Invalid param: id" }

Code: 502
Content: { "message": "Cache error" }

Code: 502
Content: { "message": "SSO error" }
```
