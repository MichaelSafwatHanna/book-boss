# Book Boss

## Objective

Design and implement a simple library management system to manage books and borrowers.

## Getting started

1. Prerequisites to be installed on host machine
   1. docker
2. Run the command
   > docker compose up
3. Wait a bit (around 2-3 minutes) until the containers are up and running
4. Go to [http://localhost:3000](http://localhost:3000)
5. Hit /auth/signup endpoint with name, email and password

    ```sh
      curl -X POST \
        -H "Content-Type: application/json" \
        -d '{
          "name": "John Doe",
          "email": "john.doe@example.com",
          "password": "password123"
        }' \
        http://localhost:3000/auth/signup
    ```

6. Copy the access token and use it as a Bearer token in the upcoming requests.

## System design

### Endpoints

1. Books

    1. POST /books - Create a new book.

         ```sh
            curl -X POST \
              -H "Authorization: Bearer YOUR_JWT_TOKEN" \
              -H "Content-Type: application/json" \
              -d '{
                "title": "The Lord of the Rings",
                "ISBN": "978-0395486409",
                "location": "Shelf A1",
                "quantity": 1,
                "authorId": "UUID"
              }' \
              http://localhost:3000/books         
         ```

    2. GET /books - Get a list of all books. (Can search by query params [title, ISBN, author name])

       ```sh
         curl -X GET \
         -H "Authorization: Bearer YOUR_JWT_TOKEN" \
         -H "Content-Type: application/json" \
         http://localhost:3000/books/search?title=The+Lord+of+the+Rings
       ```

    3. GET /books/:id - Get a specific book by ID.

         ```sh
            curl -X GET \
              -H "Authorization: Bearer YOUR_JWT_TOKEN" \
              http://localhost:3000/books/UUID
         ```

    4. PUT /books/:id - Update a specific book by ID.

         ```sh
            curl -X PUT \
              -H "Authorization: Bearer YOUR_JWT_TOKEN" \
              -H "Content-Type: application/json" \
              -d '{
                "title": "The Lord of the Rings: The Fellowship of the Ring"
              }' \
              http://localhost:3000/books/UUID
         ```

    5. DELETE /books/:id - Delete a specific book by ID.

         ```sh
            curl -X DELETE \
              -H "Authorization: Bearer YOUR_JWT_TOKEN" \
              http://localhost:3000/books/UUID
         ```

2. Authors
   1. POST /authors - Create a new author.

      ```sh
         curl -X POST \
            -H "Authorization: Bearer YOUR_JWT_TOKEN" \
            -H "Content-Type: application/json" \
            -d '{
              "name": "J.R.R. Tolkien"
            }' \
            http://localhost:3000/authors
      ```

   2. GET /authors - Get a list of all authors.

      ```sh
         curl -X GET \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/authors
      ```

   3. GET /authors/:id - Get a specific author by ID.

      ```sh
         curl -X GET \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/authors/UUID
      ```

   4. PUT /authors/:id - Update a specific author by ID.

      ```sh
      curl -X PUT \
         -H "Authorization: Bearer YOUR_JWT_TOKEN" \
         -H "Content-Type: application/json" \
         -d '{
           "name": "J.R.R. Tolkien (updated)"
         }' \
         http://localhost:3000/authors/UUID
      ```

   5. DELETE /authors/:id - Delete a specific author by ID.

      ```sh
         curl -X DELETE \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/authors/UUID
      ```

3. Authentication
    1. POST /auth/login - Login and obtain a JWT token.

         ```sh
            curl -X POST \
               -H "Content-Type: application/json" \
               -d '{
                "email": "john.doe@example.com",
                "password": "password123"
               }' \
               http://localhost:3000/auth/login
         ```

    2. POST /auth/signup - Create a new user account and return an access token.

       ```sh
         curl -X POST \
           -H "Content-Type: application/json" \
           -d '{
             "name": "John Doe",
             "email": "john.doe@example.com",
             "password": "password123"
           }' \
           http://localhost:3000/auth/signup
       ```

4. Borrowing

   1. POST /books/:bookId/borrow - Borrow a book.

         ```sh
            curl -X POST \
              -H "Authorization: Bearer YOUR_JWT_TOKEN" \
              -H "Content-Type: application/json" \
              -d '{
                "bookId": "1",
                "dueDate": "2023-11-14T00:00:00.000Z"
              }' \
              http://localhost:3000/books/1/borrow
         ```

   2. GET /borrows - Get a list of all borrows of the logged in user.

      ```sh
         curl -X GET \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/borrows
      ```

   3. GET /admin/borrows/checked-out - Get a list of all checked-out books.

      ```sh
         curl -X GET \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/admin/borrows/checked-out
      ```

   4. PUT /borrows/:id/return - Return a book.

      ```sh
         curl -X PUT \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/borrows/1/return
      ```

   5. GET /admin/borrows/overdue/export - Downloads an excel of all overdue books.

      ```sh
         curl -X GET \
           -H "Authorization: Bearer YOUR_JWT_TOKEN" \
           http://localhost:3000/admin/borrows/overdue/export
      ```

## If I had more time I'd have done

1. Add unit tests.
2. Add authorization to admin endpoints, currently some administrative endpoints are accessed by anyone with an access token.
