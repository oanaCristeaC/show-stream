# show-stream


## Project Setup

```sh
npm install
```

I used npm v: 9.6.7 and node v: v20.3.1

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
Unfortunately I didn't have time to implements test :( 

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

I have used the following libraries:
- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/):  build in tool for Vue 3
- [Tailwind CSS](https://tailwindcss.com/) 
  - I haven't use it in long time, so I wanted to refresh my memory
- [Vue Router](https://next.router.vuejs.org/)
- [Vue Use](https://vueuse.org/)
- [Vue i18n](https://vue-i18n.intlify.dev/)
  - I wanted to use locale in the app but due to time constraints I didn't have time to implement it
- [Vue Test Utils](https://next.vue-test-utils.vuejs.org/)
  - I wanted to use it for testing components but due to time constraints I didn't have time to implement it
- [ESLint](https://eslint.org/)
  - I havent got time to configure it properly
- [Prettier](https://prettier.io/)
  - same as ESLint




## I used the following:

- Repository pattern to interact with data
- Services to process business logic
- Components to display the data
- Router to navigate between pages
- Store to manage the state of the application (Pinia)


### Note:

Since the data loading was changing, I have chosen to load in memory a few pages.
The number of pages could be fewer or more, depending on the data that is loaded. I have chosen to load 5 pages, but it could have been fewer to speed up the loading time.

While the user is scrolling, the app in the background is storing all the data in IndexedDB.

I could have added a server to check if the pages already exist in IndexedDB and if so, load these instead of making the API request for the first pages.

I could therefore store all the genres in IndexedDB and check if the genre (I saw I misspelled it).

There is a lot of other things that should be improved:
- Add more tests
- Add more reusable components
- Add more loading
- Check if the data is already in IndexedDB
- Add more error handling


