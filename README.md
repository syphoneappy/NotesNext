**Installing and Running Application**

This guide details the necessary steps to install dependencies, set up your Django backend application, and run it:

**1. Setting Up Your Environment:**

**Prerequisites:**

- **Python (version 3.10 or later):** Download and install it from [https://www.python.org/downloads/](https://www.python.org/downloads/) if not already installed. You can verify its presence by running `python --version` in a terminal.
- **pip (Python package manager):** This is usually bundled with Python. Run `pip --version` in the terminal to check. If not available, follow Python installation instructions.

**Optional: Using a virtual environment:**

Creating a virtual environment is highly recommended to isolate project dependencies and avoid conflicts with other Python installations:

```bash
python3 -m venv backend_env  # Replace 'backend_env' with your desired name
source backend_env/bin/activate  # Windows: backend_env\Scripts\activate.bat
```

**2. Installing Dependencies:**

**Using `requirements.txt`:**

- Create a file named `requirements.txt` in your project directory.
- List all required dependencies and versions:

```
Django==4.3.3
```

- Install dependencies using pip:

```bash
pip install -r requirements.txt
```

**Using pip directly:**

Alternatively, you can install them directly:

```bash
pip install Django==4.3.3  # Adjust versions as needed
```

**4. Running the Development Server:**

**Using the built-in development server (not recommended for production):**

- Start the server:

```bash
python manage.py runserver
```

- Access the development server at http://127.0.0.1:8000/ in your web browser.

**Using Gunicorn (recommended for production):**

- Configure Gunicorn in a production environment (e.g., WSGI configuration).
- Run it with the following command:

```bash
gunicorn backend.wsgi:application
```

### Deploying Django Application on Azure VM:

1. **Create an Azure VM:**
   - Log in to the Azure Portal.
   - Click on "Create a resource" and search for "Virtual Machine".
   - Follow the prompts to create a new VM, choosing the appropriate size, region, and OS (e.g., Ubuntu).
   - Make sure to allow inbound traffic to ports 80 (HTTP) and 443 (HTTPS) in the networking settings.

2. **Connect to the VM:**
   - Once the VM is created, connect to it using SSH or RDP, depending on the OS.
   - Install necessary dependencies such as Python, pip, and virtualenv.

3. **Clone Your Django Project:**
   - Clone your Django project from your Git repository onto the VM.
   - Navigate to the project directory.

4. **Install Dependencies:**
   - Create a virtual environment: `virtualenv venv`.
   - Activate the virtual environment: `source venv/bin/activate`.
   - Install Python dependencies: `pip install -r requirements.txt`.

5. **Configure Django Settings:**
   - Update database settings, static files, and other configurations in `settings.py`.
   - Set `DEBUG=False` for production.

6. **Run Migrations:**
   - Run Django migrations to apply database changes: `python manage.py migrate`.

7. **Collect Static Files:**
   - Collect static files into one directory: `python manage.py collectstatic`.

8. **Set Up Web Server:**
   - Configure a web server like Nginx or Apache to serve the Django application (Recommended Nginx).
   - Create a virtual host configuration file and point it to your Django project's `wsgi.py` file and also configure gunicorn.
   - Enable the virtual host and restart the web server.

9. **Set Up Domain and SSL (Optional):**
   - Configure a domain name for your VM and set up SSL certificates using Let's Encrypt or Azure SSL use 3rd party ssl service for certificate.

10. **Test Your Application:**
    - Access your Django application through the domain name or public IP address of the VM.
    - Make sure everything is working as expected.

### Deploying Next.js Frontend on Azure Functions:

1. **Create an Azure Function App:**
   - Log in to the Azure Portal.
   - Click on "Create a resource" and search for "Function App".
   - Follow the prompts to create a new Function App, choosing the appropriate settings like runtime stack and region.

2. **Set Up Deployment Source:**
   - Connect your Function App to a Git repository where your Next.js frontend code resides.
   - Configure continuous deployment so that changes are automatically deployed when you push to the repository.

3. **Create Azure Functions:**
   - Define Azure Functions for each route or API endpoint in your Next.js application.
   - at this time update the BaseUrl in nextjs app to the django server ipaddress and update cors_origin. 
   - Use the appropriate trigger type and language (e.g., HTTP trigger for API endpoints).

4. **Install Dependencies:**
   - Set up a `package.json` file in your Function App with the necessary dependencies for your Next.js application.
   - Install dependencies using `npm install`.

5. **Build Your Next.js Application:**
   - Run the build command to generate the production build of your Next.js application: `npm run build`.

6. **Configure Azure Functions:**
   - Set up routing and handling for incoming requests in your Azure Functions based on your Next.js application's routes.

7. **Test Your Frontend:**
   - Access your Next.js frontend through the URL provided by the Azure Function App.
   - Ensure that all pages, components, and API endpoints are functioning correctly.

8. **Monitoring and Scaling:**
   - Set up monitoring and logging for your Azure Function App to track performance and errors.
   - Configure auto-scaling rules to handle varying levels of traffic efficiently.

By following these steps, I have successfully deployed Django application on an Azure VM and Next.js frontend on Azure Functions. 


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


