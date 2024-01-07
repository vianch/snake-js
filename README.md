# My Snake Game

A classic Snake game implemented in JavaScript, providing a nostalgic trip with a modern twist. Use your keyboard or on-screen arrows to control the snake, and compete for high scores!
<img width="892" alt="Screenshot 2024-01-07 at 16 56 02" src="https://github.com/vianch/my-snake-game/assets/1800887/91d912db-62fa-40d2-a882-f8efc5cab65b">
<img width="893" alt="Screenshot 2024-01-07 at 16 56 05" src="https://github.com/vianch/my-snake-game/assets/1800887/be74ca92-9ced-47eb-954e-2445e6ece7c2">



## Game Instructions

- **Movement**: Use the arrow keys `←`, `↑`, `↓`, `→` to control the snake's direction. For mobile or touch devices, use the on-screen arrows.
<img width="319" alt="Screenshot 2024-01-07 at 16 56 43" src="https://github.com/vianch/my-snake-game/assets/1800887/358369e3-bf0f-4a6e-a8fe-4f4690867aa2">

- **Start Game**: Press the spacebar or use the Start button to begin the game.
<img width="129" alt="Screenshot 2024-01-07 at 16 57 07" src="https://github.com/vianch/my-snake-game/assets/1800887/c19fefd1-1abc-4f48-8329-dd8ce9e9c4af">

- **View Scores**: Click on "See scores" to check the latest 10 scores displayed on the top right corner of the game screen.
<img width="391" alt="Screenshot 2024-01-07 at 16 57 23" src="https://github.com/vianch/my-snake-game/assets/1800887/1de44225-3752-487c-bf0c-5caa9ddd719b">

- **Scores**: High scores and the current score are displayed on the top left corner during gameplay.
<img width="196" alt="Screenshot 2024-01-07 at 16 57 37" src="https://github.com/vianch/my-snake-game/assets/1800887/f55dacd5-70fb-4f80-b2de-a01926a31124">

## Getting Started

To set up the game for development or build it for production, you'll need to have [Node.js](https://nodejs.org/en/) installed. Then, follow these instructions:

1. Clone the repository:

```bash
git clone git@github.com:vianch/my-snake-game.git
cd my-snake-game
```

2. Install dependencies:

```bash
yarn install
```

3. To start the development server:

```bash
yarn run start:dev
```

4. To build for production:

```bash
yarn run build
```

## Development Scripts

- `build`: Bundles the application and minifies JavaScript, CSS, and HTML for production.
- `build:prod`: Bundles and minifies JavaScript for production with browser-specific targets.
- `build:dev`: Development build that watches for changes.
- `dev`: Starts the development server with live reloading.
- `init`: Cleans any previous builds and reinstalls dependencies before a fresh build.
- `lint:style`: Runs StyleLint with autocorrection when possible.
- `lint:formatting`: Runs Prettier to format the code.
- `lint`: Runs both linting scripts for styles and formatting.
- `minify:html`: Minifies the HTML file for production.
- `minify:css`: Minifies the CSS file for production.
- `start`: Runs the default setup script.
- `start:dev`: Starts the development server with source maps and live reloading.

**Note:** To execute any of these scripts, use `yarn run <script-name>` replacing `<script-name>` with the desired script.

## Dependencies

Below is a list of development and production dependencies for this project:

### Development Dependencies

- *esbuild*: A fast bundler and minifier.
- *eslint*: Pluggable JavaScript linter.
- *eslint-config-airbnb-base*, *eslint-config-prettier*: ESLint configurations for coding standards and to disable style rules that conflict with Prettier.
- *eslint-plugin-import*, *eslint-plugin-prettier*: ESLint plugins for managing imports and integrating Prettier.
- *clean-css-cli*: Command-line interface for minifying CSS files.
- *html-minifier*: Minifies HTML files.
- *husky*: A tool for using git hooks.
- *prettier*: Code formatter.
  
### Production Dependencies

- *@supabase/supabase-js*: JavaScript client for interacting with Supabase APIs.

## Author

- Victor Chavarro - <info@vianch.com>

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
