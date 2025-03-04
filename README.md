# RESEARCH & PUT ON PAPER BEFORE JUMPING ON KEYBOARD, THEN CONFIRM UR CONCLUSIONS & IDEAS FOR IMPLEMENTATION WITH MENTOR

E-Commerce Application - React.js Training Project <br>
Objective <br>

- The goal of this project is to help trainees learn and apply core React.js concepts by building a fully functional e-commerce application. The application will cover React hooks, lifecycle methods, public/private routing, Zustand store, API calls using Axios, performance optimization, authentication, authorization, and more.<br>

Technology Stack

- Frontend: React.js, React Router, Zustand, Axios
- Backend API: DummyJSON (https://dummyjson.com) to begin with later, we will implement APIs in nodejs once we are done with React project
- Authentication: JSON Web Tokens (JWT) frontend authentication to begin with later, we will implement APIs in nodejs
- Styling: Material UI (https://mui.com) with Dark mode toggle
- State Management: Zustand
- Deployment: Github pages <br>

Features Overview

1. User Authentication & Authorization
   - User registration & login (JWT-based)<br>
     - User should be able to login with mobile/email and password
   - Role-based access control (Customer/Admin)
   - Store token in local storage/session storage/cookie
   - Store logged in user profile in Zustand store
   - This component should be a popup as user should be able to login from any of the public page.
   - Logout functionality
2. Product Listing & Search
   - This is a public customer route and default home route
   - Fetch products from DummyJSON API, later we will integrate Nodejs APIs
   - Display products in a grid layout
   - Search products by name/category
   - Implement filters (price, category, rating)
   - Implement pagination
   - On page reload user should stay on this page and filters also should persist<br>
     - You can set filters in query parameters
3. Product Details Page
   - This is a public customer route
   - Take the product id from path parameters
   - On page reload user should stay on this page
   - Display product information (title, price, description, image, etc.)
   - Show related products
   - Show and Add reviews & ratings
4. Shopping Cart
   - This is a public customer route
   - Add/remove items from the cart (using Zustand store)
   - Show cart summary (total price, item count)
   - On page reload user should stay on this page and see previous cart items
   - Handle stock availability
5. Checkout & Order Management
   - This is a private customer route. Ask user to login if user not logged in.
   - Capture user details (name, address, payment method) (Pre-fill available details)
   - Simulated payment process (mock API response)
   - Store order details in API/local storage
   - Show order confirmation page
6. User Dashboard
   - This is a private customer route. Ask user to login if user not logged in.
   - View past orders with order status
   - Edit profile information
7. Admin Panel
   - This is a private admin route. Ask user to login if user not logged in.
   - View all orders and update the status of order
8. Performance Optimization
   - Lazy loading components using React Suspense
   - Memoization using useMemo and useCallback
   - Virtualized lists for large product lists
9. Nodejs API Integration
   - Implement login API with JWT authentication token.
   - Implement middle wares to authenticate all private APIs
   - Implement CRUD APIs for Products with role based authentication
   - Implement CRUD APIs for Orders with role based authentication
10. Database Integration
    - Create PostgreSQL DB.
    - Create Users, Products and Orders Tables with best practices.

Evaluation Criteria

- Code structure, quality & best practices
- Proper use of React hooks & state management
- Performance Optimisation
- Bundle Size
- API integration & error handling
- UI/UX design & responsiveness
- Authentication & Authorization in Reactjs and Nodejs implementation
- Deployment & documentation

<br>

user:

- username - string
- password - string
- email - string
- mobile - string - not needed for admin
- role - string
- tokens - array of strings
  fields from here not needed for admin
- cart - array of objects - productID, quantity
- orders - past & current - array of orderIDs
- addresses - array of objects - address, city, state, country, pincode
- payment methods - array of objects - cardNumber, expiryDate, cvv, nameOnCard
- profilePic - string

product:

- productID - string
- productName - string
- productPrice - number
- productQuantity - number
- productCategory - string
- productDescription - string
- rating - number
- productImage - string
- reviews - array of objects - reviewRating, reviewComment, reviewUser

orders:

- productID - string
- orderID - string
- orderDate - date
- orderStatus - string
- orderTotal - number
- orderPaymentMethod - string
- orderAddress - string
- orderUserID - string

To Do:
loggers in nodejs

sql tables
user:
id - string - primary key
username - string
password - string
email - string
mobile - string - not needed for admin
role_id - string - foreign key
refresh_token - string
profile_pic - string

role:
id - string - primary key
role - string

cart_item:
id - string - primary key
product_id - string - foreign key
quantity - number
user_id - string - foreign key

address:
id - string - primary key
address - string
user_id - string - foreign key

payment_method:
id - string - primary key
card_number - string
expiry_date - date
cvv - string
name_on_card - string
user_id - string - foreign key

product:
id - string - primary key
name - string
price - number
quantity - number
category - string
description - string
rating - number
image - string

review:
id - string - primary key
rating - number
comment - string
user_id - string - foreign key
product_id - string - foreign key

order:
id - string - primary key
product_id - string - foreign key
quantity - number
date - date
status - string
total - number
payment_method_id - string - foreign key
address_id - string - foreign key
user_id - string - foreign key

createdAt & updatedAt in all tables
cascade on delete in all tables
not storing full account numbers in payment_method table
