# CurateSphere
CurateSphere is a PERN stack (PostgreSQL, Express, React, Node.js) CRUD application that leverages the Harvard Art Museums API to allow users to create and manage their own art exhibitions, featuring artworks curated from the API.

![screenshot of landing page](/frontend/public/images/Screenshot%202024-08-06%20at%2010.13.38 PM.png)

## Features
- User registration and authentication with JWT middleware
- Artwork search via Harvard Art Museums API integration with advanced filtering
- User dashboard with functionality to create, view, edit, and delete exhibitions
- Responsive design with Tailwind CSS
- Explore page for viewing exhibitions created by other users

![screenshot of artwork search page](/frontend/public/images/Screenshot%202024-08-06%20at%2010.15.41 PM.png)

## Technologies Used
- **React + Vite**: State management with `useContext` and reducers
- **Tailwind CSS**: For responsive design
- **Node.js & Express.js**: Server-side logic and routing
- **PostgreSQL + Sequelize**: Database management and ORM
- **JWT**: For secure authentication

### Deployed App Link: 
[Your Deployment Link Here]

## How We Get the Objects

The Harvard Art Museums API allows us to retrieve and store information about our searches and the objects in our state, providing an exceptional user experience. Here’s how it works:

### Fetching All Objects
We start by fetching objects using the API call:

```javascript
fetch('.../objects?apikey=API_KEY');
```

This call returns an `info` object, which contains essential details such as:
- **Next page URL**: Helps us fetch subsequent results.
- **Total number of objects available**: With over 244,000 objects available, it's crucial to retrieve them in batches to optimize load times and capacity.

### Using API Endpoints for Filters
The API provides specific endpoints, such as `/medium` or `/culture`, allowing us to retrieve the entire list of available filters along with their subcategories and IDs. These IDs are then used to query the search on the backend, ensuring accurate and filtered results.

### Complex Filter Queries

![screenshot of landing page](/frontend/public/images/Screenshot%202024-08-08%20at%209.29.50 PM.png)

To handle complex filter queries, we designed a state object that contains the search parameters used in our backend requests. This state management allows us to dynamically add key-value pairs from the frontend, such as:

```javascript
medium: "oil"
```

This object is then sent to our backend, where it's reassembled into a URL following a pattern like `&size=12&medium=oil`. This approach enables us to combine multiple queries while maintaining a user-friendly interface that reflects the selected filters.


### State Management with Context API and Reducer Functions

To effectively manage the state across our application, we leveraged the React Context API combined with reducer functions to dispatch actions. This approach proved invaluable, particularly for managing the complex data structures returned from the Harvard Art Museums API.

By organizing our state into distinct contexts, we ensured a clean separation of concerns and improved maintainability. Specifically, we implemented three contexts: **Global**, **Exhibition**, and **Artwork**, each handling different aspects of the application's state.

#### Global Context
The **Global Context** manages overarching state that is shared across multiple components, such as user authentication status and global UI settings.

```javascript
  const [user, setUser] = useState(getUser());
```

#### Exhibition Context
The **Exhibition Context** is dedicated to managing the state related to user-created exhibitions. This includes the creation, editing, viewing, and deletion of exhibitions.

```javascript
const initialState = {
  showExb: {},
  exploreExbs: [],
  myExbs: [],
};
```

#### Artwork Context
The **Artwork Context** handles the state for artworks, including the data retrieved from the Harvard Art Museums API, and any user interactions such as filtering or selecting artworks for exhibitions.

```javascript
const initialArtworksState = {
  records: [],
  info: {
    totalrecordsperquery: null,
    totalrecords: null,
    page: null,
    next: "",
    prev: "",
  },
  showArtwork: {},
  displayView: "",
  isLoading: false,
  isError: false,
  artFilter: {
    size: "12",
  },
  century: {
    title: "Century",
    records: [],
  },
  classification: {
    title: "Classification",
    records: [],
  },
  culture: {
    title: "Culture",
    records: [],
  },
  medium: {
    title: "Medium",
    records: [],
  },
  period: {
    title: "Period",
    records: [],
  },
  technique: {
    title: "Technique",
    records: [],
  },
  worktype: {
    title: "Work Type",
    records: [],
  },
};
```
Each context is equipped with its own set of functions, initial state, and a reducer function, enabling us to dispatch actions and update the state in a controlled and predictable manner. This structure not only simplifies the handling of complex API data but also enhances the scalability of the application as new features are introduced.

### Local State vs. Global State for Filters
We encountered a challenge with maintaining the state of checkboxes when using local state alone. Specifically, the checkboxes would reset when the filter menu was closed, even though the filters remained active. To resolve this, we implemented both local and global state management by adding two fields to each filter object (e.g., `medium: {name: "oil", id: 123456}`). 

- **Local State**: Controls the checkbox's state based on the `isChecked` value.
- **Global State**: Updates the `isChecked` value and dispatches actions to a reducer. This approach ensures that the checkbox state persists, even when the filter menu is closed and reopened.

## Obscuring the API Key

Although the Harvard API is free, we explored ways to obscure the API key as a precaution for potential future use with paid APIs. Here's our approach:

1. **Extract the API Key**: We first created a function to extract the API key from the API response.
2. **Generate a Placeholder**: We replaced the API key in the URLs with a placeholder value.
3. **Backend Replacement**: On the backend, we replace the placeholder with the actual API key stored in environment variables before making API calls.

For example, the `info` object from the Harvard API contains a `next` URL, which includes the hard-coded API key. We replaced this with a placeholder, and on the backend, we used logic to insert the real API key before making the request.

This was a fascinating challenge, and you can explore the implementation in the following files:
- **Backend**: `backend/controllers/artworks.js`
- **Frontend**: `frontend/src/services/artworkService.js`

