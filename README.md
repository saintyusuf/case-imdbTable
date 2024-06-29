# Case - IMDb Table

<table>
  <tbody>
    <tr>
      <td>
        Requested
      </td>
      <td>
        <p>It is desired to develop a SPA where the user can list movies and view their details. The operations that can be done on the application are listed below:</p>
        <ul>
          <li>Movies should be listed in a table/grid. There should be at least the movie's name, release date and IMDb ID columns.</li>
          <li>Pagination should be done with 10 films on each page.</li>
          <li>It should be possible to search by movie name with a textfield on the grid/table. When the application is first opened, it is desired to act as if the default Pokemon was searched.</li>
          <li>The user should only be able to list movies released in the year he/she wants.</li>
          <li>The user should be able to search only movies, only series or only series episodes if he/she wishes.</li>
          <li>When the movie name is clicked, the user should be directed to another page where the movie's poster and other details (title, duration, genre, director, actors, IMDb score, etc.) can be viewed.</li>
        </ul>
        <br/>
        <p>The technical requirements are listed below. The solution must meet these requirements as much as possible.</p>
        <ul>
          <li>React should be used as a framework.</li>
          <li>OMDb API (http://www.omdbapi.com/) should be used to retrieve movie information.</li>
          <li>TypeScript or ES5+ can be used.</li>
          <li>The commands required to start the application should preferably be provided in README.md</li>
          <li>Use of SASS/LESS/SCSS for custom styling will be considered as a plus point.</li>
          <li>State management Redux usage will be considered as a plus point.</li>
          <li>Using React Hooks will be considered as a plus point.</li>
          <li>Utility libraries such as Lodash, Underscore.js, moment etc. can be used.</li>
          <li>CSS frameworks such as Bootstrap, Semantic UI, Material UI etc. can be used.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>
        Result
      </td>
      <td>
        <img src="https://github.com/saintyusuf/case-imdbTable/blob/main/case-details/result1.png" alt="Result">
        <img src="https://github.com/saintyusuf/case-imdbTable/blob/main/case-details/result2.png" alt="Result">
      </td>
    </tr>
  </tbody>
</table>


## About

This is a case study to measure some React.js skills such as; api request handling, query (search) params handling, data table handling.

## Stack

HTML, CSS, JS, TS, React.js, React Router Dom, Chakra UI, Axios, React Data Table Component, React Icons, React Helmet

## Installation

Clone the repository
```bash 
git clone https://github.com/saintyusuf/case-imdbTable.git
```

Change directory
```bash 
cd case-imdbTable
```

Install dependencies
```bash
npm install
```

Run the project
```bash
npm run start
```