# 4Asset People Management

Application developed as a technical assessment for the Front-end Developer position at 4Asset.

## Technologies

* Angular 17
* TypeScript
* Bootstrap 5
* SCSS
* RxJS
* ngx-translate
* ngx-mask

## Features

* User authentication
* User registration
* People listing
* Create person
* Edit person
* Delete person
* Route protection with Auth Guard
* HTTP Interceptors
* Internationalization (pt-BR / en)
* Responsive interface
* Reusable modal components
* Form validations

## Project Structure

The application was organized using a feature-based architecture to improve scalability and maintainability.

```txt
src/app
├── core
├── shared
├── features
│   ├── auth
│   └── people
```

## Environment Configuration

Update the API URL in:

```txt
src/environments/environment.ts
```

Example:

```ts
export const environment = {
  apiUrl: 'https://dev-api-plt.4asset.net.br/exam'
};
```

## Installation

Install dependencies:

```bash
npm install
```

## Development Server

Run the application locally:

```bash
ng serve
```

Access:

```txt
http://localhost:4200
```

## Build

Generate production build:

```bash
ng build
```

## Additional Notes

* The application uses standalone components.
* Authentication is handled using JWT token storage.
* Protected routes are implemented using Angular Guards.
* API requests automatically include authentication tokens through HTTP Interceptors.
* Unauthorized requests (401) redirect the user back to the login page.
