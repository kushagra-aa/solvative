# Solvative

- [GeoDB Cities][API]
- [Flags API][Flags]

## Technologies Used

- **Frontend:** ReactJS, TypeScript.

## Functionalities

### Static Counter

Static Counter on Table

### Country Flags

Dynamic Country Flags from [Flags API][Flags]
> Using Flags API as the mentioned `https://www.countryflagsapi.com/` is not working.

### Search

Use keyboard shortcut `ctrl + /` or `cmd + /` to instantly start searching.
Press `Enter` or `Return` to Search. OR wait `500ms` for search to kick in automatically.

### Debounce

A way that API calls are not made on every keystroke.
Uses `useDebounce` a custom hook made my me, '<https://www.npmjs.com/package/@kushagra-aa/hooks-usedebounce>'

### Pagination

Pagination Updates depending on search result.

### Custom Page Size

An Option to user to let user view as many items as user want on a page instead of default `pageSize`.

The max `pageSize` is capped to `10` due to restrictions from the [API][API]

### No Data Found

Shows a `NoDataFound` element if the data in table is empty.

### Responsive

All views are fully responsive up to `300px` width.

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/kushagra-aa/solvative.git
   ```

2. Navigate to the project directory:

   ```bash
   cd solvative
   ```

3. Make a `.env` file and paste the values:

   ```properties
   VITE_BASE_URL = 
   VITE_RAPID_API_KEY = 
   VITE_RAPID_API_HOST = 
   ```

   > You need to have the following environment variables, if you don't have them you get then from [HERE(RapidAPI)][API]

4. Install dependencies

    ```bash
    yarn
    ```

    OR

    ```bash
    npm i
    ```

4. Run Frontend

   ```bash
   yarn dev
   ```

   OR

   ```bash
   npm run dev
   ```

[API]: https://rapidapi.com/wirefreethought/api/geodb-cities
[Flags]: https://flagsapi.com/
