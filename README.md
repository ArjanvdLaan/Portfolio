# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Inspirational Homepage

A basic and fully responsive homepage app in which the user can:
- change backgrounds
- enter a thought and get it to be dipslayed
- rearrange they're thoughts
- check the current weather
- enjoy a joke


# React Reddit Client

A basic react application that fetches data from the Reddit API and displays it per post in a neat and tidy format.

Functionalities:
- infinite scrolling,
- voting mechanism,
- correct displaying in a seperate panel if the title is to large.
- CI/CD workflow
- OAuth workflow (securely access to resources on behalf of a user, without sharing their credentials directly)

And a clean and simplistic design.

Problems/challenges I fixed:

- Challenge: infinite scrolling: How to let the browser know when to load more posts?
- Fix: Intersection observer. It observes an element. I gave it a treshhold of 1.0 so that when the element is fully visible, together with the UseRef hook, it'll load new posts without re-rendering (persistence accross renders).

- Challenge: voting on a post (and actually update vote count on Reddit itself).
- Fix: backend server. (CORS Cross Origin Resource Sharing). I've used Node Axios & Express to setup a small backend server which acts as a proxy for the vote coming from the frontend. Backend-to-backend requests aren't subject to CORS.

- Problem: first fetch coming in twice.
- Fix: Arrange state with initial load. When initialLoad is true, skip the fetch, and set initial load to false.

- Problem: the web app showed a blank screen after interacting th he page.
- Fix: I checked the dependencies in package.json and found out that one dependency I used wasn't listed in the list with dependencies.

- Challenge: Show an indicator in front of an image to let the user know the image is part of an image gallery.
- Fix: Use display grid in combination with Z-index to set elements in front of each other.

- Problem: Filtering out text-only posts sometimes results in rendering less than 3 posts.
- Fix: Use a temporary after parameter which only updates the after parameter if a total of 3 posts are fetched.

- Problem: Double login: I saw that the issue o f the double login was due to the fact that the authentication check came before the authorization code was present, so a second login was done effectively using the first auth code.
- Fix: After succesful authorization, the Reddit API sends a URL back with an auth code. The authorization flow was retriggerd on page reload. The code was rejected because it remained in the URL an wasn't cleaned up. After a succesful exchange of the authCode,the authcode has to be cleaned up from the URL, for an authCode is single use only. I used replaceState() for this.

- Problem: Fixed icons that do not appear on top of the gallery image despite having a higher z-index.
- Fix: The stacking context matters. I cahnged the position of the icons component to be lower than the component in which the gallery image sits, so I changed the global context for the two components(the document source order).

- Problem: The pure JavaScript file didn't get updated during development inside the React app.
- Fix: Because the JS files were being served as static files, they should be placed inside the public folder, for React doesn't watch files outside the src directory for changes, they're standalone projects/files.

- Problem: The loading placeholder is shown on first load.
- Fix: the setter of the isLoading state is used to set isLoading to true if posts.length is bigger than 0.

- Problem: Elements change position when a blur effect i applied.
- Fix: Elements with position fixed can be positioned differently because filters create a new containing block. Instead of filtering individual elements a pseudo element (pure css) is created which covers the entire viewport. With z-index stacking the dropdown stays on top.

- Problem: The title elements sometimes overflows, doesn't fit inside it's container.
- Fix: The best solution was to determine a max length for the title and with the substring method set the remaining part of the title inside the disclosure panel of the headless UI.


# Film finder

An app, fully responsive, in which the user can select a genre and based on it get generated a random movie to check out, by seeing it's about which consists of the title, a brief description, it's release date and the corresponding IMDB rating. The user can like or dislike a movie. When liked the movie gets shown inside a list.