Hello!
Clone this repository:
<code>git clone https://github.com/KaPuTaH-UluTka/Simple-CRUD-API </code>

Switch on dev branch:
<code>git checkout develop</code>

Change port at .env file(if you want) and run scripts.

Run application on production mode:
<code>npm run start:prod</code>

Run application on dev mode:
<code>npm run start:dev</code>

Run application on cluster mode:
<code>npm run start:multi</code>

Run first test case:
<code>npm run firstTest</code>

Run second test case:
<code>npm run secondTest</code>

Run third test case:
<code>npm run thirdTest</code> 

Server API

Methods:

GET
<code>api/users</code>  for all users
Server should answer with status code 200 and all users records

GET
<code>api/users/${userId}</code> for uniq user
Server answers with status code 200 and record with id === userId if it exists
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist

POST
<code>api/users</code>  for create new user
Server answers with status code 201 and newly created record
Server answers with status code 400 and corresponding message if request body does not contain required fields

PUT 
<code>api/users/{userId}</code>  for update uniq user
Server answers with status code 200 and updated record
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist

DELETE 
<code>api/users/${userId}</code>  for delete uniq user
Server answers with status code 204 if the record is found and deleted
Server answers with status code 400 and corresponding message if userId is invalid (not uuid)
Server answers with status code 404 and corresponding message if record with id === userId doesn't exist
