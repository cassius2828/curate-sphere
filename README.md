# CurateSphere

CurateSphere is a PERN stack (PostgreSQL, Express, React, Node.js) CRUD application that leverages the Harvard Art Museums API to allow users to create and manage their own art exhibitions, featuring artworks curated from the API.

![screenshot of landing page](/frontend/public/images/Screenshot%202024-08-06%20at%2010.13.38 PM.png)

## Features

- User registration and authentication with JWT middleware
- Artwork search via Harvard Art Museums API integration with advanced filtering
- User dashboard with functionality to create, view, edit, and delete exhibitions
- Responsive design with Tailwind CSS
- Explore page for viewing exhibitions created by other users
- E2E testing with cypress

![screenshot of artwork search page](/frontend/public/images/Screenshot%202024-08-06%20at%2010.15.41 PM.png)

## Technologies Used

- **React + Vite**: State management with `useContext` and reducers
- **Tailwind CSS**: For responsive design
- **Node.js & Express.js**: Server-side logic and routing
- **PostgreSQL + Sequelize**: Database management and ORM
- **JWT**: For secure authentication
- **Cypress**: For E2E Testing

### Deployed App Link:

[Curate Sphere](https://curate-sphere.netlify.app/)

## How We Get the Objects

The Harvard Art Museums API allows us to retrieve and store information about our searches and the objects in our state, providing an exceptional user experience. Here’s how it works:

### Fetching All Objects

We start by fetching objects using the API call:

```javascript
fetch(".../objects?apikey=API_KEY");
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
{
  size: 12, { medium: { oil: 12345 } };
}
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

The **Artwork Context** handles the state for artworks, including data retrieved from the Harvard Art Museums API and any user interactions such as filtering or selecting artworks for exhibitions. Initially, the data for the category records, such as classification.records, were structured as an array of objects. However, to improve efficiency in selecting and deselecting filters, and to keep the checkbox UI in sync with the active filters, we transformed the data into an object of objects (in our context). A formatted string of the subcategory name allows for lookup times of O(1) while keeping subcategories alphabetized.


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
  showArtworkInfoLists: [],
  displayView: "",
  isLoading: false,
  isError: false,
  artFilter: {
    size: "12",
  },
  searchQuery: "",
  century: {
    title: "Century",
    records: {},
  },
  classification: {
    title: "Classification",
    records: {},
  },
  culture: {
    title: "Culture",
    records: {},
  },
  medium: {
    title: "Medium",
    records: {},
  },
  period: {
    title: "Period",
    records: {},
  },
  technique: {
    title: "Technique",
    records: {},
  },
  worktype: {
    title: "Work Type",
    records: {},
  },
};
```

#### Backend: Fetching Data

The backend function fetches and sends the data to the frontend:

```javascript
const getFilterObjs = async (req, res) => {
  const { page, filter } = req.query;

  try {
    const response = await fetch(
      `${BASE_URL}/${filter}?apikey=${API_KEY}&size=100&page=${page}`
    );
    let data = await response.json();
    data.info.next = swapApiKeyAndPlaceholder(data.info.next, "API_KEY");
    data.info.prev = "";

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: `cannot get ${filter} objs from harvard api` });
  }
};
```

#### Data Transformation

Once the data is received in the frontend, it is processed and transformed. Before setting the state, the subcategories are alphabetized and transformed into an object. Each subcategory is assigned two new properties: isChecked (boolean, default false) and clickCount (number, default 0) to keep the checkbox state in sync with the filters.

```javascript
  const handleGetWorktypeObjs = async () => {
    try {
      const data1 = await getFilterObjs("worktype", 1);
      const data2 = await getFilterObjs("worktype", 2);
      const data3 = await getFilterObjs("worktype", 3);
      const data4 = await getFilterObjs("worktype", 4);
      const data5 = await getFilterObjs("worktype", 5);

      let data = [
        ...data1.records,
        ...data2.records,
        ...data3.records,
        ...data4.records,
        ...data5.records,
      ];

      // Sort data by name
      const sortedArray = data.sort((a, b) => {
        console.log(`Comparing "${a.name}" with "${b.name}"`);
        return a.name.localeCompare(b.name);
      });

      // Reconstruct the object using the sorted array
      const sortedData = sortedArray.reduce((acc, item) => {
        console.log(item.id, " int");
        console.log(item.id.toString(), " string");
        acc[item.name.toLowerCase().replace(/[\s.,]/g, "")] = {
          ...item,
          isChecked: false,
          clickCount: 0,
        }; // Maintain the access point as the id
        return acc;
      }, {});
      dispatch({
        type: "getWorktypeObjs/artworks",
        payload: sortedData,
      });
    } catch (err) {
      console.error(err);
      console.log(`Unable to fetch worktype objs | context`);
    }
  };
```

#### Setting Data in State

The transformed data is dispatched to the reducer, where it updates the relevant category state.
```javascript
    case "getWorktypeObjs/artworks":
      return {
        ...state,
        worktype: {
          ...state.worktype,
          records: action.payload,
        },
      };
```

## Toggling Subcategory Filter Checkbox

In the checkbox component, we initialize the local state to the current isChecked and clickCount values from the subcategory object passed in. Then, in the onClick function, we toggle the isChecked value and increment the clickCount. To ensure these values are updated correctly when dispatched to the context, we preemptively flip isChecked and increment clickCount in the onClick.

```javascript
export const SearchFilterCheckBox = ({ category, primaryCategoryKey }) => {
  // this will start as false, static value from prop
  const [isChecked, setIsChecked] = useState(category.isChecked);
  // this will start as 0. static value from prop
  const [clickCount, setClickCount] = useState(category.clickCount);
  const { handleToggleCheckbox, handleFilterObj } = useArtworkContext();

  return (
    <li className="flex items-center gap-4 p-3 bg-gray-200 ">
      <div
        data-cy="subcategory-checkbox"
        onClick={() => {
          setIsChecked((prev) => !prev);
          setClickCount((prev) => prev + 1);
          handleToggleCheckbox(
            primaryCategoryKey,
            category.id,
            category.name,
            !isChecked,
            clickCount + 1
          );
          handleFilterObj(
            primaryCategoryKey.toLowerCase(),
            category.name,
            category.id
          );
        }}
        className="border-2 relative z-10 border-black p-3 cursor-pointer"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          {isChecked ? "X" : ""}
        </span>
      </div>
      <span data-cy="checkbox-category-name" className="capitalize">
        {category.name}
      </span>
    </li>
  );
};

```

#### Handling the Checkbox Toggle in Context

In the context file, the handleToggleCheckbox function processes the checkbox toggle before dispatching the updated values to the reducer.

```javascript
  const handleToggleCheckbox = (
    primaryCategoryKey,
    subCategoryId,
    subcategoryKey,
    updatedIsChecked,
    updatedClickCount
  ) => {
    primaryCategoryKey = primaryCategoryKey.toLowerCase();

    const formattedKeyName = subcategoryKey
      .toLowerCase()
      .replace(/[\s.,]/g, ""); // Maintain the access point as the id

    console.log(medium);
    dispatch({
      type: "toggleCheckbox/artworks",
      payload: {
        primaryCategoryKey,
        subCategoryId,
        updatedIsChecked,
        updatedClickCount,
        subcategoryKey: formattedKeyName,
      },
    });
  };
```

#### Reducer: Updating the Checkbox State

In the reducer, we update the isChecked and clickCount values in the state for the relevant subcategory by using the formatted subcategory key.
```javascript
    case "toggleCheckbox/artworks":
      const {
        primaryCategoryKey,
        subcategoryKey,
        updatedIsChecked,
        updatedClickCount,
      } = action.payload;

      return {
        ...state,
        [primaryCategoryKey]: {
          // spread the state of the category | keep title, update records
          ...state[primaryCategoryKey],
          // find matching key-value from payload
          records: {
            ...state[primaryCategoryKey].records,
            [subcategoryKey]: {
              ...state[primaryCategoryKey].records[subcategoryKey],
              isChecked: updatedIsChecked,
              clickCount: updatedClickCount,
            },
          },
        },
      };
```

## Context Cont.

Each context is equipped with its own set of functions, initial state, and a reducer function, enabling us to dispatch actions and update the state in a controlled and predictable manner. This structure not only simplifies the handling of complex API data but also enhances the scalability of the application as new features are introduced.

## Obscuring the API Key

Although the Harvard API is free, we explored ways to obscure the API key as a precaution for potential future use with paid APIs. Here's our approach:

1. **Extract the API Key**: We first created a function to extract the API key from the API response.
2. **Generate a Placeholder**: We replaced the API key in the URLs with a placeholder value.
3. **Backend Replacement**: On the backend, we replace the placeholder with the actual API key stored in environment variables before making API calls.

For example, the `info` object from the Harvard API contains a `next` URL, which includes the hard-coded API key. We replaced this with a placeholder, and on the backend, we used logic to insert the real API key before making the request.

This was a fascinating challenge, and you can explore the implementation in the following files:

- **Backend**: `backend/controllers/artworks.js`
- **Frontend**: `frontend/src/services/artworkService.js`
