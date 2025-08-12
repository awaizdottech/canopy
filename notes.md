# RESEARCH & PUT ON PAPER BEFORE JUMPING ON KEYBOARD, THEN CONFIRM UR CONCLUSIONS & IDEAS FOR IMPLEMENTATION WITH MENTOR

# IMPLEMENT ALL THE GOOD PRACTICES & STANDARDS U KNOW FROM THE BEGINNING. DONT DO STUFF ONLY BECAUSE U HAVE TO.

- class based approaches are better for large scale projects
- monorepo - nx, pnpm workspaces
- wxt, ts-pattern, tanstack, tsyringe, nestjs, webExtension-polyfill
- all configs - why do we need tsc - b for build when just vite just works fine for dev

## server

### top priority

- error statements standardisation
- how env variables are used in nodejs & how does dotenv work
- custom & http defined status codes in nodejs used as variables
- morgan details(imnplemented in little more detail in echo, as well as winston), implementation for production & logging levels with respect to production, development, testing etc
- client doesnt need detail messages of what went wrong
- types & interfaces in caps. dont create array types of interfaces as we can just use type[] to define an array of that type

### next

- rerturn types for all functions & types wherever possible
- what tsc cmd does
- types of licenses
- tsc v tsc -b cmds
- tsconfig fields with all possible values
- tokens not in body. how to handle them for mobile. how can react code be used for mobile apps. which frontend & how does it send tokens in header
- arrow vs normal functions
- all packages in package.json details

### later

- tsyringe for IoC
- role & aria lables - WCAG
- what other file structures can be used
- unit testing
- rate limiting
- location based stock & order handling for both customer & admin
- loggers in nodejs
- add createdAt & updatedAt fields in all tables
- more adv sql
- explore paty tools & try to figure out how u could build that

## client

- maps arent suitable for the project usecase
- generic name for restApi & separate functions for get, post, put, delete
- what errors are caught by errorElement: <ErrorPage />, so should it be notfound?
- useref in header instead of useState, useref doesnt rerender the component - study about it
- why two diff menus in header
- skeletons
- styled components instead of inline styles
- profile page design - tabs list on left as per which data will be fetched

- no cart products listed on home page
- whats vite, vite.config.ts
- how env variables are used in our website as its static & can they be changed. do we use other packages to handle env variables in react other than vite
- how vite works with react. which file is the entry point, how does it know where to start, etc.
- vite build
- u have nanoid in package.json, but not used anywhere
- react-dom package
- eslint, its config
- vite-env.d.ts whats that
- diff between app.css & index.css
- strict mode - resource?
- comments that document the code via jsdoc or tsdoc etc
- bundler configurations for min bundle size
- lodash

### research

- check if dynamic imports like `const { neededFunction } = await import('./functions.ts');` bundles the files as a separate chunk like lazy loading

# use the libraries u depend on to their full potential. start by fully going through their github readme first

## where did I lose my marks & for what

- its better to give default params instead of using optional chaining whenever u want to use that
- non-auth shouldnt throw errors with details except register route
- every function should have return type - manually mentioned or auto detected
- make sure to remove unused exports & related code
