'use strict';

// Manus AI assisted with this implementation; see SOURCES.md for attribution.
// This is a fixed instructional opening, not a chess engine or unrestricted game.
const openingMoves = [
  { from: 'e2', to: 'e4', notation: '1. e4', title: 'Take a little space.', note: 'White advances a central pawn, opening paths for the bishop and queen.' },
  { from: 'e7', to: 'e5', notation: '1... e5', title: 'Meet in the centre.', note: 'Black answers with a central pawn and opens lines for development.' },
  { from: 'g1', to: 'f3', notation: '2. Nf3', title: 'Develop with a purpose.', note: 'White brings out a knight, attacking the pawn on e5 and influencing the centre.' },
  { from: 'b8', to: 'c6', notation: '2... Nc6', title: 'Defend and develop.', note: 'Black develops a knight to c6, supporting the e5 pawn.' },
  { from: 'f1', to: 'c4', notation: '3. Bc4', title: 'Welcome to the Italian Game.', note: 'White develops the bishop toward f7. The Italian Game is now on the board.' },
  { from: 'f8', to: 'c5', notation: '3... Bc5', title: 'Two sides, one clear plan.', note: 'Black develops the bishop to c5. This continuation is the Giuoco Piano.' }
];
const backRank = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
const pieceSymbols = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const pieceNames = { k: 'king', q: 'queen', r: 'rook', b: 'bishop', n: 'knight', p: 'pawn' };
const files = 'abcdefgh';
const board = document.querySelector('#board');
const previousMoveButton = document.querySelector('#previous-move');
const nextMoveButton = document.querySelector('#next-move');
const resetOpeningButton = document.querySelector('#reset-opening');
let openingStep = 0;

function createStartingPosition() {
  const position = {};
  for (let file = 0; file < files.length; file += 1) {
    position[`${files[file]}8`] = { type: backRank[file], colour: 'black' };
    position[`${files[file]}7`] = { type: 'p', colour: 'black' };
    position[`${files[file]}2`] = { type: 'p', colour: 'white' };
    position[`${files[file]}1`] = { type: backRank[file], colour: 'white' };
  }
  return position;
}

function renderOpening() {
  // Rebuild from the starting position so backward and reset actions cannot drift.
  const position = createStartingPosition();
  for (let moveIndex = 0; moveIndex < openingStep; moveIndex += 1) {
    const move = openingMoves[moveIndex];
    position[move.to] = position[move.from];
    delete position[move.from];
  }
  const lastMove = openingMoves[openingStep - 1];
  const squareFragment = document.createDocumentFragment();
  const whiteDescription = [];
  const blackDescription = [];

  for (let rank = 8; rank >= 1; rank -= 1) {
    for (let file = 0; file < files.length; file += 1) {
      const coordinate = `${files[file]}${rank}`;
      const piece = position[coordinate];
      const square = document.createElement('span');
      const isLight = (file + rank) % 2 === 0;
      square.className = `square ${isLight ? 'light' : 'dark'}`;
      square.dataset.square = coordinate;
      square.setAttribute('aria-hidden', 'true');
      if (piece) {
        square.classList.add(`${piece.colour}-piece`);
        square.textContent = pieceSymbols[piece.type];
        square.dataset.piece = `${piece.colour}-${piece.type}`;
        const description = `${pieceNames[piece.type]} on ${coordinate}`;
        if (piece.colour === 'white') whiteDescription.push(description);
        else blackDescription.push(description);
      }
      if (lastMove && (coordinate === lastMove.from || coordinate === lastMove.to)) square.classList.add('last-move');
      squareFragment.append(square);
    }
  }
  board.replaceChildren(squareFragment);
  const shortDescription = lastMove ? `Chess opening after ${lastMove.notation}: ${lastMove.from} to ${lastMove.to}. White is at the bottom.` : 'Chessboard in the standard starting position, with White at the bottom.';
  board.setAttribute('aria-label', shortDescription);
  document.querySelector('#board-description').textContent = `White: ${whiteDescription.join('; ')}. Black: ${blackDescription.join('; ')}.`;
  document.querySelector('#step-count').textContent = `${String(openingStep).padStart(2, '0')} / 06`;
  document.querySelector('#move-title').textContent = lastMove ? `${lastMove.notation} — ${lastMove.title}` : 'Start with a plan.';
  document.querySelector('#move-note').textContent = lastMove ? lastMove.note : 'Advance a central pawn, develop your pieces, and prepare to protect your king.';
  previousMoveButton.disabled = openingStep === 0;
  nextMoveButton.disabled = openingStep === openingMoves.length;
  resetOpeningButton.disabled = openingStep === 0;
}

previousMoveButton.addEventListener('click', () => {
  openingStep = Math.max(0, openingStep - 1);
  renderOpening();
});
nextMoveButton.addEventListener('click', () => {
  openingStep = Math.min(openingMoves.length, openingStep + 1);
  renderOpening();
});
resetOpeningButton.addEventListener('click', () => {
  openingStep = 0;
  renderOpening();
});

const pieceButtons = document.querySelectorAll('[data-piece]');
const pieceDetails = document.querySelectorAll('[data-detail]');
function selectPiece(selectedPiece) {
  pieceButtons.forEach((button) => {
    const isSelected = button.dataset.piece === selectedPiece;
    button.classList.toggle('is-selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
  pieceDetails.forEach((detail) => { detail.hidden = detail.dataset.detail !== selectedPiece; });
}
pieceButtons.forEach((button) => {
  button.addEventListener('click', () => selectPiece(button.dataset.piece));
});

// Native radio inputs support keyboard navigation and keep quiz validation simple.
const quizQuestions = [
  { question: 'Which piece can jump over other pieces?', answers: ['The bishop', 'The knight', 'The rook'], correct: 1, explanation: 'The knight can jump. It moves two squares in one direction and one at a right angle.' },
  { question: 'How does a pawn normally capture?', answers: ['One square diagonally forward', 'One square straight forward', 'One square backwards'], correct: 0, explanation: 'Pawns move forward but normally capture one square diagonally forward. En passant is a special case.' },
  { question: 'Which is a useful opening principle?', answers: ['Move your queen repeatedly', 'Ignore the centre', 'Develop your knights and bishops'], correct: 2, explanation: 'Developing pieces helps them influence the board. Combine this with centre control and king safety.' }
];
const quizForm = document.querySelector('#quiz-form');
const quizOptions = document.querySelector('#quiz-options');
const quizFeedback = document.querySelector('#quiz-feedback');
const checkAnswerButton = document.querySelector('#check-answer');
const nextQuestionButton = document.querySelector('#next-question');
const quizResults = document.querySelector('#quiz-results');
let questionIndex = 0;
let quizScore = 0;
let answerChecked = false;

function renderQuestion() {
  answerChecked = false;
  quizForm.hidden = false;
  quizResults.hidden = true;
  const question = quizQuestions[questionIndex];
  document.querySelector('#quiz-question').textContent = question.question;
  quizOptions.replaceChildren();
  question.answers.forEach((answer, answerIndex) => {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = String(answerIndex);
    const text = document.createElement('span');
    text.textContent = answer;
    label.append(radio, text);
    quizOptions.append(label);
  });
  quizFeedback.textContent = '';
  quizFeedback.classList.remove('is-incorrect');
  checkAnswerButton.hidden = false;
  nextQuestionButton.hidden = true;
  nextQuestionButton.textContent = questionIndex === quizQuestions.length - 1 ? 'See my result →' : 'Next question →';
  document.querySelector('#quiz-progress-text').textContent = `QUESTION ${String(questionIndex + 1).padStart(2, '0')} / 03`;
  document.querySelector('#quiz-progress-bar').style.width = `${((questionIndex + 1) / quizQuestions.length) * 100}%`;
}

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (answerChecked) return;
  const answer = quizForm.querySelector('input[name="answer"]:checked');
  if (!answer) {
    quizFeedback.textContent = 'Choose an answer before checking.';
    quizFeedback.classList.add('is-incorrect');
    quizOptions.querySelector('input').focus();
    return;
  }
  const question = quizQuestions[questionIndex];
  const isCorrect = Number(answer.value) === question.correct;
  if (isCorrect) quizScore += 1;
  answerChecked = true;
  quizFeedback.textContent = `${isCorrect ? 'Correct.' : 'Not quite.'} ${question.explanation}`;
  quizFeedback.classList.toggle('is-incorrect', !isCorrect);
  quizOptions.querySelectorAll('input').forEach((input) => { input.disabled = true; });
  checkAnswerButton.hidden = true;
  nextQuestionButton.hidden = false;
  nextQuestionButton.focus();
});

nextQuestionButton.addEventListener('click', () => {
  if (!answerChecked) return;
  if (questionIndex < quizQuestions.length - 1) {
    questionIndex += 1;
    renderQuestion();
    quizOptions.querySelector('input').focus();
  } else {
    quizForm.hidden = true;
    quizResults.hidden = false;
    document.querySelector('#quiz-score').textContent = `${quizScore} / 3 correct`;
    document.querySelector('#quiz-result-note').textContent = quizScore === quizQuestions.length ? 'A thoughtful start. Try the opening explorer next, or explain the piece movements to a friend.' : 'Every answer is a chance to learn. Revisit the piece guide, then have another go.';
    document.querySelector('#quiz-progress-text').textContent = 'PRACTICE COMPLETE / 03';
    document.querySelector('#restart-quiz').focus();
  }
});
document.querySelector('#restart-quiz').addEventListener('click', () => {
  questionIndex = 0;
  quizScore = 0;
  renderQuestion();
  quizOptions.querySelector('input').focus();
});

const themeToggle = document.querySelector('#theme-toggle');
themeToggle.addEventListener('click', () => {
  const isLight = document.body.dataset.theme !== 'light';
  document.body.dataset.theme = isLight ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  document.querySelector('meta[name="theme-color"]').content = isLight ? '#f5f4ec' : '#081b2c';
});

const menuToggle = document.querySelector('#menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}
menuToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? 'Close' : 'Menu';
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeMenu();
    menuToggle.focus();
  }
});
window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });

renderOpening();
selectPiece('knight');
renderQuestion();
// Expose controls only after successful initialization; the static guide remains usable without JS.
document.body.classList.add('js-ready');
