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
-POST /request/send/:status/:userId
- POST /request/review/:status/:reviewId


#userRouter
-GET /user/requests/received
-GET /user/connections
-GET /user/feed - get the profile of other users on platform

STATUS: ignore, interested, accepted, rejected