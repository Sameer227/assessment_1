token must be passed in format - "Bearer token"


1. /api/user
   type: POST
   payload: {
   "email":"email"
   }
   authorization - NO
   // you will get the email, pls check spam as well

2. /api/login
   type: POST
   payload: {
   "username":"email",
   "passowrd":"password"
   }
   authorization - NO

3. /api/task
   type: POST
   payload: {
   "task":"task no 9",
   "date":"2022-02-01",
   "status": "Completed"
   }
   authorization - YES

4. /api/task/:id
   type: PATCH
   payload: {
   "task":"task no 9",
   "date":"2022-02-01",
   "status": "Completed"
   }
   authorization - YES

5. /api/task?page=2&list=3
   type: GET

6. /api/sort
   type: POST
   payload: {
   "sortedData":[9,5,4,3]
   }
authorization - YES

7. /api/task/:id
   type: DELETE
authorization - YES