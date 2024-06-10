This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to run application

*Caution: Please make sure you had run the NestJS Server.

### Go to project folder

```bash
cd nextjs-practice
```

### Install Dependencies Package

```bash
yarn
#or
npm install

```

### Run project

```bash
yarn dev
#or
npm run dev
```

The application will be run in [Application](http://localhost:3000/)

## Feature 

### User Management Dashboard

Can view user information, edit or delete user with action buttons.

![User Dashboard UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717467492/dashboard_ui.png)

### Create New User

Create a new user with following infomations.

![Create User UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717467677/create_user_ui.png)

Error alert will show up if there are any invalid values.

![Validate Create UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717468133/create_validate_ui.png)

### Edit User

Customize user information.

![Edit User UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717470631/edit_user.png)

### Delete User

Delete user information from users list.

![Delete User UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717470876/delete_user.png)

### Search User

You can search user by any field in toolbar.

![Search UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717471349/search_one.png)

Also you can search user by multiple fields.

![Multiple Search UI](https://res.cloudinary.com/dlo17fgwe/image/upload/v1717470868/multiple_search.png)


## How to run this project

Run The NextJS app first (port 3000) => Then run NestJS API Server (port 3001).

Download dependencies:

```bash
yarn
#or 
npm install
```

Run the development server:

```bash
yarn dev
#or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
