
**Bark Base project Endpoints**
**User**---
POST: api/v1/auth
This is the create user endpoint

Required params: email & password

POST: api/v1/auth/session
This is the login user endpoint

Required params: email & password

DELETE: api/v1/auth/session
This is the logout user endpoint

Required params: none-- clears auth cookie

GET: api/v1/auth/user
This is the protected endpoint that returns the user object

Required: email & cookie

**Pet**
POST: api/v1/pet
This is the create pet endpoint

Required params: ownerId, name, birthday

Optional params: imageUrl

Pet with no contacts/medical records
'{ "petId": "4",
"ownerId": "2",
"name": "Fido",
"birthday": "2022-01-01T08:00:00.000Z",
"imageUrl": "https://place-puppy.com/300x300",
"contacts": [ null ],
"medical": [ null ]
}'
GET: api/v1/pet/all/:id
This is the getAll pets by ownerId endpoint

Required params: ownerId

GET: api/v1/pet/:id
This gets a pet by its pet_id

Required params: petId

Patch: api/v1/pet/:id
This is the update endpoint for a pet

Optional: ownerId, name, birthday, imageUrl

Note: params missing will revert to null, control input to default to previous value or empty string

Delete: api/v1/pet/:id
This is the delete endpoint for a pet

**Contact**
POST: api/v1/contact
This is the create contact endpoint

Required params: type, name,ownerId, petId

Optional params: phone, email, address,

GET: api/v1/contact/all/:id
This is the getAll contacts by ownerId endpoint

Required params: ownerId

Patch: api/v1/contact/:id
This is the update endpoint for a contact

Optional: phone, email, address, petId

Note: params missing will revert to null, control input to default to previous value or empty string

Delete: api/v1/contact/:id
This is the delete endpoint for a contact

Requires: contactId

**Medical**
POST: api/v1/medical
This is the create medical endpoint

Required params: petId

Optional params: vetId, medicines, notes, nextApt

GET: api/v1/medical/:id
This gets the medical records with a petId

Required params: petId

Patch: api/v1/medical/:id
This is the update endpoint for a medical record

Optional: phone, email, address

Note: params missing will revert to null, control input to default to previous value or empty string

Delete: api/v1/medical/:id
This is the delete endpoint for a medical

Requires: medicalId
