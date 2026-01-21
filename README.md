# What's For Dinner

A meal inspiration app.

## Tech Stack

- Next.js 16
- React 19
- Material UI 7
- TanStack Query
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                 | Description                  |
| ----------------------- | ---------------------------- |
| `npm run dev`           | Start development server     |
| `npm run build`         | Build for production         |
| `npm run start`         | Start production server      |
| `npm run lint`          | Run ESLint                   |
| `npm run format`        | Format code with Prettier    |
| `npm run typecheck`     | Run TypeScript type checking |
| `npm test`              | Run Jest unit tests          |
| `npm run test:coverage` | Run tests with coverage      |
| `npm run cy:open`       | Open Cypress test runner     |
| `npm run cy:run`        | Run Cypress tests headlessly |

## Testing

Unit tests use Jest and Testing Library. E2E tests use Cypress.

```bash
npm test              # unit tests
npm run cy:run        # e2e tests
```

## API

The app uses [TheMealDB](https://www.themealdb.com/api.php) API for recipe data.

## Design decisions

- Saving history and restoring history from LocalStore: can be CPU intensive due to the JSON.parse. Ideally if the local storage could grow indefinitely the parsing should be delegate to a WebWorker to avoid possible freezing. For this project is deemed ok to just defer it to idle time with `requestIdleCallback` but in general a better approach would have been using IndexedDB since localStorage could be erased by the browers in certain conditions.
- Ingredients picker: There are too many ingredients that give no results in combination with the areas. Better APIs would have allowed to get Ingredients relative to the are but as per current API that would have required to fetch all meals for an area, get the meal detail for each of them, then extract the ingredients that is highly inefficient and will require lots of network call. For the purpose of this excercise I decided to not do that. Additionally the number of Ingrediets is high and it would require to virtualize the list but I did not have time to implement it. react-window would be my go-to choice.
- Unit testing: tested one or more type of entity: hooks, utility, complex components, API integration. I could not get to a 100% coverage due to time constraint.
- Random recommendation: done with just an API call, the randomization is stable thanks to the useRef holding the Math.random() output and it's all incapsulated in one hook.
- State management: the state required for this app is minimal considering that react-query does the caching internally. I decided to use React Context due to the low amount of data being stored.
- E2E Tests: History tests leverage mocked API call since the history is hardcoded and seeded at each run, not doing so would expose us to test failing due to the removal of one meal from the API. For the inspire flow instead, I decided to call the live API since I wanted a real E2E test for the main flow and because the two hardcoded values are Italian as cusine and Garlic as Ingredient, something for which I'm willing to take the risk of assuming they won't disappear from the API.
