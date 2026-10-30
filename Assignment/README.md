# Chessroom — Web Refresher

**Module:** Web Development II — CCO5104-20P  
**Assessment:** Web Refresher, formative activity  
**Topic:** A beginner’s guide to chess

## Reflection

*Suggested wording: confirm that it matches your own experience and personalise it before submitting. The reflection paragraph below is within the required 100–150 words.*

Developing Chessroom helped me revisit how HTML, CSS and JavaScript work together. Organising the chess content into semantic sections was straightforward because each area had a clear purpose. Using Grid for the chessboard and Flexbox for navigation made the layout easier to understand. The main challenge was keeping the page readable on smaller screens while updating the opening explorer and quiz consistently. A mobile layout issue highlighted the importance of CSS specificity. Opening the page on Android also showed why linked files must remain accessible to the browser. During Web Development II, I would like to improve my JavaScript event handling, especially separating state, rendering and user interactions. My next step is to review the assisted code carefully and practise explaining how each feature works.

## Website and brief requirements

Chessroom is a single-page responsive information website built with HTML5, custom CSS and JavaScript, without React. It uses `header`, `nav`, `main`, `section` and `footer`, a clear heading hierarchy, labelled controls and descriptive image alternative text.

CSS Grid and Flexbox organise the layout. Media queries adapt the navigation, spacing, chessboard and content for phone and desktop screens. JavaScript uses DOM manipulation and event listeners for the opening stepper, piece selector, theme switcher, mobile menu and three-question quiz. The board demonstrates a fixed Italian Game opening; it is not an unrestricted chess game.

## Files and running the page

Keep `index.html`, `style.css`, `script.js` and the `assets/` folder together. `README.md` contains this reflection and attribution. `TESTING.md` and `evidence/` provide testing notes and screenshots; `SOURCES.md` records the references.

Extract the project ZIP before opening `index.html` on a desktop browser. Alternatively, run the following command from the project folder and visit `http://localhost:3000`:

```bash
python3 -m http.server 3000
```

Android `content://` file opening may prevent the browser from accessing neighbouring CSS and JavaScript files. Use a local web server or hosted version to test the separate-file project. The separately supplied phone-preview HTML is only a convenience copy; submit the organised project files required by the brief.

## Testing

Assisted Chromium checks at 320, 390, 768 and 1440 pixels wide confirmed responsive layouts without horizontal overflow. The opening controls, piece selector, theme switcher, mobile menu and quiz were exercised, with no JavaScript errors observed in those checks. A phone piece-selector layout issue was corrected. Details and a browser developer-tools checklist are in [TESTING.md](TESTING.md). Repeat the checks yourself before submission; emulated viewports do not replace testing on your own devices.

## Sources

Chess explanations were informed by the [FIDE Laws of Chess](https://handbook.fide.com/chapter/e012023) and the [Chess.com Italian Game guide](https://www.chess.com/openings/Italian-Game). The bundled chess image is by [Callum Mullin on Unsplash](https://unsplash.com/photos/chess-pieces-on-a-wooden-board-with-dark-background-LJWHLiLx_g8), used under the [Unsplash Licence](https://unsplash.com/license). No external JavaScript libraries are used.
