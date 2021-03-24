# User directory search

The following application replicates a searchable directory of 2 million users.  

#### To run

From the command line

`$ docker-compose up --build`

Then navigate to [localhost](http://localhost)

The seeding process may take some time as 2 million records need to be written to the database.

#### Usage

Type in a user's name in the search box to display tabulated results matching their query.  

![Table](https://raw.githubusercontent.com/robertveboyd/rethink-data-search/master/images/usage-1.png)

![Search](https://raw.githubusercontent.com/robertveboyd/rethink-data-search/master/images/usage-2.png)

Up to 100 results can be shown on the page at a time.  To query more results click the back and next icons at the bottom of the table.

#### Aritecture

The full-stack application is dockerized to enable easy runtime on any system.  An overview of the services and networking is shown below

![Docker network](https://raw.githubusercontent.com/robertveboyd/rethink-data-search/master/images/docker-network.png)

- The frontend is built with React using material-ui for styling.  A static production build is created and served on port 8000 with Nginx.
- The backend uses Express for its web server served on port 9000.  Mongoose is used to connect to MongoDB.
- 2 million user records are generated through faker.js and are imported into MongoDB.
- A proxy server is set up with Nginx to serve both the frontend and backend through port 80, this is the only port exposed outside of the container.

##### User Model

field | type | desciption | example
-------------: | -------------: | ------------- | -------------
name | String | first and last name | Robert Boyd
address | String | street address | 123 Main Street
phone | String | phone number | (709)-555-1234

#### Data Fetching

Data is fetched in small chunks via pagination.  The application will request and show up to 100 records at a time.  The user can click on the back and next arrows at the bottom of the table to navigate through search results.

#### Data Search

When text is entered into the search box a new request will be made to the backend returning records whose name contains the supplied query text.  Rather than making an API request each time a character is added or removed from the search box, a "debounce" hook is implemented so that a request to the API is made 500ms after typing has stopped.  This enforces a request rate limit and reduces the number of API calls to the server.

#### Limitations

<li>Search will only be performed on the user's name - not on address or phone number</li>
<li>Each time a new page of data is requested a call is made to the API.  In practice whenever a request is made we could be requesting and caching data from adjacent pages to reduce load times on page change</li>