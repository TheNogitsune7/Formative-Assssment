# Chessroom — Web Refresher

**Module:** Web Development II — CCO5104-20P

## Reflection

I chose chess because it gave the page a clear theme and made it easy to organise the content. I found the HTML structure fairly straightforward, especially splitting the page into sections for the board, pieces, strategy and quiz. Getting the layout to work on smaller screens was more challenging. There were also problems opening the page when the browser could not find the separate CSS and JavaScript files. That reminded me that a website needs to work outside the environment where it was created. In Web Development II, I want to get more confident with JavaScript event handling. I would like to understand how to manage the opening steps and quiz answers more clearly, rather than relying on trial and error.

## About this project

Chessroom is a small website for people who are new to chess. It explains how the pieces move, introduces a few opening ideas and includes a short quiz. The board lets you step through the Italian Game opening. It is a learning tool, not a full chess game.

The page uses HTML, CSS and JavaScript, without React or other libraries. The HTML is split into clear sections, with headings, labelled controls and image alternative text. Grid and Flexbox handle the layout, and media queries adjust it for smaller screens. JavaScript runs the opening controls, piece selector, quiz, theme switch and mobile menu.

## Opening the website

Extract the ZIP, then open the main `index.html` in Chrome, Edge or Firefox. Everything it needs is included inside that file, so you do not need to set up a server or keep other files beside it.

The `assessment/` folder contains the same website with separate HTML, CSS and JavaScript files, as required by the brief. It also includes the image, source notes and testing evidence. Keep those files together if you open that version or make changes to it.

To run that version through a local server, use these commands from the package folder:

```bash
cd assessment
python3 -m http.server 3000
```

Then open `http://localhost:3000` in your browser.

## Testing

The page was checked in Chromium at widths of 320, 390, 768 and 1440 pixels. The opening controls, menu, themes, piece selector and quiz worked in those checks, with no JavaScript errors observed. A layout problem with the piece selector on small screens was also corrected.

These checks used simulated screen sizes, not physical devices. [TESTING.md](assessment/TESTING.md) includes the results and a checklist for checking the page yourself.

## Sources

The chess information is based on the [FIDE Laws of Chess](https://handbook.fide.com/chapter/e012023) and the [Chess.com Italian Game guide](https://www.chess.com/openings/Italian-Game). The photograph is by [Callum Mullin on Unsplash](https://unsplash.com/photos/chess-pieces-on-a-wooden-board-with-dark-background-LJWHLiLx_g8), used under the [Unsplash Licence](https://unsplash.com/license). More details are in `assessment/SOURCES.md`.
