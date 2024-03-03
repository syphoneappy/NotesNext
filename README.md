**User Authentication API**

This API provides secure endpoints for user registration, login, logout, and retrieving current user information. It leverages well-established Django REST Framework components and adheres to security best practices.

## Register

**Endpoint**: `/api/register`

**Method**: `POST`

**Request Body**:

```json
{
  "email": "example@example.com",
  "password": "your_password",
  "confirm_password": "your_password"
}
```

**Response (Success):**

```json
{
  "success": "User created successfully"
}
```

**Response (Failure):**

```json
{
  "error": "Password confirmation mismatch or other error details"
}
```

**Description:**

- Registers a new user with the provided email and password.
- Validates password confirmation to prevent accidental mismatches.
- Handles potential exceptions gracefully during user creation, providing specific error details in the response for debugging purposes (while maintaining security by not exposing sensitive information).

## Login

**Endpoint**: `/api/login`

**Method**: `POST`

**Request Body**:

```json
{
  "email": "example@example.com",
  "password": "your_password"
}
```

**Response (Success):**

```json
{
  "success": "Login successful",
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  }
}
```

**Response (Failure):**

```json
{
  "error": "Invalid credentials or other error details"
}
```

**Description:**

- Authenticates a user using the provided email and password.
- Uses Django's built-in authentication functionalities for secure user verification.
- Returns authentication tokens (refresh and access) upon successful login, allowing for extended session management and token-based authentication in subsequent requests.
- Provides informative error messages in the response for unsuccessful login attempts, guiding the user towards resolving the issue.

## Logout

**Endpoint**: `/api/logout`

**Method**: `POST`

**Request Body**:

```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (Success):**

```json
{
  "message": "Successfully logged out"
}
```

**Response (Failure):**

```json
{
  "error": "Invalid token or other error details"
}
```

**Description:**

- Logs out the currently authenticated user by blacklisting the provided token.
- Employs Django REST Framework's authentication and token management features for secure session termination.
- Returns a success message upon successful logout or an error message if the provided token is invalid or other issues arise.

## Current User Details

**Endpoint**: `/api/currentuser`

**Method**: `GET`

**Authorization**: Required (requires a valid access token)

**Response (Success):**

```json
{
  "email": "example@example.com",
  // Other user fields
}
```

**Response (Failure):**

```json
{
  "error": "Unauthorized or other error details"
}
```

**Description:**

- Retrieves information about the currently authenticated user.
- Requires a valid access token in the authorization header for access control.
- Returns essential user details upon successful authentication or an error message if the user is unauthorized or other issues occur.

## Security Considerations

- This API adheres to Django REST Framework's built-in security mechanisms.
- User passwords are stored securely using industry-standard hashing techniques.
- Authentication tokens are issued with appropriate expiration times and refresh mechanisms to mitigate security risks.
- Error messages during registration and login should not reveal sensitive information to maintain security.

## Notes API

This API provides endpoints for managing notes associated with the currently authenticated user.

## Note List

**Endpoint**: `/api/notes/`

**Method**: `GET`, `POST`

**Authorization**: Required (requires a valid access token)

**Request (GET):**

- No request body required.

**Response (GET - Success):**

```json
[
  {
    "id": 1,
    "title": "Note 1",
    "content": "This is the content of note 1.",
    "user": 1,
    // Other note fields
  },
  {
    "id": 2,
    "title": "Note 2",
    "content": "This is the content of note 2.",
    "user": 1,
    // Other note fields
  }
]
```

**Response (GET - Failure):**

```json
{
  "error": "Unauthorized or other error details"
}
```

**Request (POST):**

```json
{
  "title": "New Note",
  "content": "This is the content of the new note."
}
```

**Response (POST - Success):**

```json
{
  "id": 3,
  "title": "New Note",
  "content": "This is the content of the new note.",
  "user": 1,
  // Other note fields
}
```

**Response (POST - Failure):**

```json
{
  "title": ["This field is required."],
  "content": ["This field is required."]
}
```

**Description:**

- Retrieves or creates notes for the authenticated user.
- Requires authentication for access control.
- The `GET` method fetches all notes belonging to the user.
- The `POST` method creates a new note for the user.

## Note Detail

**Endpoint**: `/api/notes/<pk>/`

**Method**: `GET`, `PUT`, `DELETE`

**Authorization**: Required (requires a valid access token)

**Path Variable:**

- `<pk>`: The ID of the note to retrieve, update, or delete.

**Request (GET):**

- No request body required.

**Response (GET - Success):**

```json
{
  "id": 1,
  "title": "Note 1",
  "content": "This is the content of note 1.",
  "user": 1,
  // Other note fields
}
```

**Response (GET - Failure):**

```json
{
  "error": "Note not found or other error details"
}
```

**Request (PUT):**

```json
{
  "title": "Updated Note",
  "content": "This is the updated content of the note."
}
```

**Response (PUT - Success):**

```json
{
  "id": 1,
  "title": "Updated Note",
  "content": "This is the updated content of the note.",
  "user": 1,
  // Other note fields
}
```

**Response (PUT - Failure):**

```json
{
  "title": ["This field is required."],
  "content": ["This field is required."]
}
```

**Request (DELETE):**

- No request body required.

**Response (DELETE - Success):**

- No content returned (status code 204)

**Response (DELETE - Failure):**

```json
{
  "error": "Note not found or other error details"
}
```

**Description:**

- Retrieves, updates, or deletes an individual note for the authenticated user.
- Requires authentication and the note ID for access control.
- The `GET` method fetches a specific note based on its ID.
- The `PUT` method updates an existing note with the provided data.
- The `DELETE` method removes a note.


