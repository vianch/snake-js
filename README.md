# My Snake Game

A classic Snake game implemented in JavaScript, providing a nostalgic trip with a modern twist. Use your keyboard or on-screen arrows to control the snake, and compete for high scores!

## Game Instructions

- **Movement**: Use the arrow keys `←`, `↑`, `↓`, `→` to control the snake's direction. For mobile or touch devices, use the on-screen arrows.
- **Start Game**: Press the spacebar or use the Start button to begin the game.
- **View Scores**: Click on "See scores" to check the latest 10 scores displayed on the top right corner of the game screen.
- **Scores**: High scores and the current score are displayed on the top left corner during gameplay.

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
yarn run dev
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
