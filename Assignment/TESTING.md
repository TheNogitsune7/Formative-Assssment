# Chessroom — testing evidence

Checked on 28 October 2026 in the sandbox Chromium browser. Widths below are browser-emulated CSS pixels, not tests on physical phones. JavaScript syntax was checked with `node --check script.js`. These are real completed checks, not a claim that the student personally ran them.

## Completed checks

The page loaded and initialized at 320, 390, 768 and 1440 pixels wide. At every width the board remained square, both colour themes stayed within the viewport, and the page had no horizontal overflow. Startup error and unhandled-rejection listeners recorded no errors in the tested frames. Desktop and phone full-page renders were inspected; the images are [desktop](evidence/desktop.png) and [phone](evidence/phone.png).

The board contained 64 squares and 32 pieces at the start. Next advanced e2–e4; Previous restored the starting position. All six half-moves reached the expected bishops on c4 and c5, disabled the final Next control, and displayed 06 / 06. Reset restored all 32 original pieces. Board-position text updated with the demonstration.

The piece selector displayed the requested explanation and updated `aria-pressed`. A phone selector CSS specificity issue found during inspection was corrected; the final phone layout uses a three-column grid. The theme switch changed colours, its accessible label and its pressed state.

The mobile menu opened, closed after selecting a section, and closed with Escape while returning focus to its button. All source anchor targets exist. The page has one h1 and the required semantic elements; IDs are unique, the bundled image has descriptive alternative text, and local assets returned HTTP 200.

The quiz showed a message when submitted without an answer. Three correct answers scored 3 / 3; repeated submission did not add extra points. Three incorrect answers scored 0 / 3 and displayed explanations. Restart reset the questions and score. No errors were observed during these interaction checks.

With the application JavaScript omitted in a test frame, all six piece explanations and the navigation stayed visible, while inactive interactive controls stayed hidden. This checks the progressive-enhancement fallback; it is not a separate browser compatibility certification.

## Recheck yourself in browser developer tools

1. Open `index.html` or serve the folder, then open Developer Tools → Console. Reload and confirm there are no errors.
2. Use responsive/device mode at 390 × 844 and 1440 × 1000. Check every section, both themes and the expanded mobile menu; watch for clipped text or sideways scrolling.
3. Try Next, Previous and Reset, select all six pieces, and complete the quiz using both correct and incorrect answers.
4. Navigate using Tab, Shift+Tab, Enter, Space, arrow keys for the quiz radio group, and Escape for the menu. Confirm focus is visible.
5. Disable JavaScript and reload to read the static guide. Re-enable it afterward.
6. Test in another browser and on your own phone before submission. Those environments have not been verified here.

## Scope

The opening explorer is a fixed teaching sequence. It does not provide unrestricted play, a legal-move engine, an AI opponent or 3D rendering. There is no contact form, data collection or backend. The site needs no network access after download; the source links are optional further reading.
