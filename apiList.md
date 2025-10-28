##DEVTINDER APIs

#authRouter
- POST /signup
- POST /login
- POST /logout

#profileRouter
- GET /profile
- PATCH /profile/edit
-PATCH /profile/password

#connectionRequestRouter
-POST /request/send/interested/:userId
- POST /request/send/rejected/:userId
- POST /request/send/review/accepted/:reviewId
- POST /request/send/review/rejected/:reviewId

#userRouter
-GET /user/connections
-GET /user/requests
-GET /user/feed - get the profile of other users on platform

STATUS: ignore, interested, accepted, rejected