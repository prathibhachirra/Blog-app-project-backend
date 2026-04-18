# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


####
Note: 
We will start implementation of Frontend app for Blog platform from in next session. Revise the Backend which was already implemented  ,before create mental model for Frontend app. Please complete the following implementations in the Frontend app for next session.

Create new React app
Install TailwindCSS
Install react-hook-form
Create the following components 
     a. Home
     b. Register
     c. Login
     d. AddArticle
     e. UserDashboard
     f.  AuthorDashboard
     g. AdminDashboard
Design forms in Register, Login & AddArticle components  with responsive nature as like in the attached sample UIs

Add  validations for specific fields with respect to UserModel & ArticleModel that we already created in the Backend of Blog platform and display validation error messages below the specific input fields


One should complete all the above 5 steps before attending next session.
Image
Image
Image
Note: Create all mentioned components and design only Regsiter, Login & AddArticle components which require forms.

We will implement Routing in live session.


### axios

### from userprofile component
read articles of all authors
display them in the form of grid of cards
1. card for extra small
2. cards for small
3. cards for medium
4. cards from large screen onwards


### flow
user selects file
frontend validations (instant feedback)
user submits form
backend  validates again(security)
upload---->save

