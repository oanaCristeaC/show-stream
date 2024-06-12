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


I used the following:
    - repository pattern to interact with data
    - services to interact with the API and process business logic
    - components to display the data
        - I have tried to create reusable components, but I have not been able to do it as much as I would like
    - router to navigate between pages
    - store to manage the state of the application (pina)

I havent gotten time to implement tests, I wanted to use Vue Test Utils and Vitest to test the components and services.

Note: as the api didnt give possibility to search and filter I use IndexDb and in memory data
