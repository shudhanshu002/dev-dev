# app.use(express.json());
- This line tells your Express app to automatically parse incoming requests with JSON payloads (usually from POST, PUT, PATCH requests), and make that data available under req.body.


# What happens without it?
- If you don't use express.json() and someone sends a JSON body in a POST request like this:
```js
{
  "username": "john",
  "password": "1234"
}
```
- Then in your route handler:
```js
app.post('/login', (req, res) => {
  console.log(req.body); // ❌ undefined
});
```
- You’ll get undefined, because Express doesn’t automatically parse request bodies.


# Older versions of Express required the external body-parser library:
```js
const bodyParser = require('body-parser');
app.use(bodyParser.json());
```