import { useEffect, useMemo, useState } from 'react';

const gameThemes = {
  ecovision: {
    title: 'EcoVision Snake',
    subtitle: 'Collect eco nodes and avoid polluted trails.',
    color: '#2DD4BF',
    panel: 'from-[#072A1D] to-[#0A1712]',
  },
  joblink: {
    title: 'JobLink Flappy',
    subtitle: 'Fly through hiring gates and keep your momentum.',
    color: '#FBBF24',
    panel: 'from-[#332606] to-[#1A1406]',
  },
  documind: {
    title: 'DocuMind Tetris',
    subtitle: 'Organize legal blocks into perfect lines.',
    color: '#C084FC',
    panel: 'from-[#281543] to-[#160E28]',
  },
  smartpay: {
    title: 'SmartPAY 2048',
    subtitle: 'Merge salary tiles and reach the 2048 target.',
    color: '#FF6B9D',
    panel: 'from-[#3A1024] to-[#1C0A12]',
  },
};

const supportedGames = {
  ecovision: SnakeGame,
  joblink: FlappyGame,
  documind: TetrisGame,
  smartpay: Game2048,
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function usePersistentHighScore(storageKey, score) {
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !storageKey) return;
    const saved = Number(window.localStorage.getItem(storageKey) || '0');
    if (!Number.isNaN(saved) && saved > 0) {
      setHighScore(saved);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined' || !storageKey) return;
    if (score <= highScore) return;
    setHighScore(score);
    window.localStorage.setItem(storageKey, String(score));
  }, [highScore, score, storageKey]);

  return highScore;
}

function SnakeGame({ color, storageKey }) {
  const gridSize = 14;
  const baseTickMs = 210;
  const minTickMs = 85;

  const createInitialState = () => ({
    snake: [
      { x: 7, y: 7 },
      { x: 6, y: 7 },
    ],
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: { x: 11, y: 8 },
    running: false,
    score: 0,
    gameOver: false,
  });

  const [state, setState] = useState(createInitialState);
  const highScore = usePersistentHighScore(storageKey, state.score);

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key;
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
      };

      const next = map[key];
      if (!next) return;
      event.preventDefault();

      setState((prev) => {
        if (prev.gameOver) return prev;
        if (prev.direction.x === -next.x && prev.direction.y === -next.y) return prev;
        return {
          ...prev,
          nextDirection: next,
          running: true,
        };
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!state.running || state.gameOver) return undefined;

    // Start slower and ramp up speed as score increases.
    const tickMs = Math.max(minTickMs, baseTickMs - state.score);

    const id = setInterval(() => {
      setState((prev) => {
        const direction = prev.nextDirection;
        const head = prev.snake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };

        if (newHead.x < 0 || newHead.y < 0 || newHead.x >= gridSize || newHead.y >= gridSize) {
          return { ...prev, running: false, gameOver: true };
        }

        if (prev.snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          return { ...prev, running: false, gameOver: true };
        }

        const ate = newHead.x === prev.food.x && newHead.y === prev.food.y;
        const nextSnake = [newHead, ...prev.snake];
        if (!ate) nextSnake.pop();

        let nextFood = prev.food;
        if (ate) {
          do {
            nextFood = { x: randomInt(0, gridSize - 1), y: randomInt(0, gridSize - 1) };
          } while (nextSnake.some((segment) => segment.x === nextFood.x && segment.y === nextFood.y));
        }

        return {
          ...prev,
          snake: nextSnake,
          direction,
          food: nextFood,
          score: prev.score + (ate ? 10 : 0),
        };
      });
    }, tickMs);

    return () => clearInterval(id);
  }, [state.running, state.gameOver, state.score]);

  const cellMap = useMemo(() => {
    const map = new Map();
    state.snake.forEach((segment, idx) => {
      map.set(`${segment.x},${segment.y}`, idx === 0 ? 'head' : 'body');
    });
    map.set(`${state.food.x},${state.food.y}`, 'food');
    return map;
  }, [state.snake, state.food]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-pixel text-[10px]" style={{ color }}>SCORE: {state.score}</div>
        <div className="font-pixel text-[9px] text-white/80">HIGH: {highScore}</div>
      </div>
      <div className="font-pixel text-[8px] text-white/60 text-center mb-3">ARROWS / WASD</div>

      <div
        className="grid gap-1 border border-white/20 p-2 bg-black/30 aspect-square w-full max-w-[360px] mx-auto"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const x = i % gridSize;
          const y = Math.floor(i / gridSize);
          const type = cellMap.get(`${x},${y}`);
          let className = 'bg-white/5 border border-white/5';

          if (type === 'head') className = 'bg-teal border border-white/40';
          if (type === 'body') className = 'bg-emerald-500/80 border border-emerald-300/60';
          if (type === 'food') className = 'bg-rose-400 border border-rose-200';

          return <div key={`${x}-${y}`} className={className} />;
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setState((prev) => (prev.gameOver ? createInitialState() : { ...prev, running: !prev.running }))}
          className="font-pixel text-[9px] px-3 py-2 border"
          style={{ borderColor: color, color }}
        >
          {state.gameOver ? 'RETRY' : state.running ? 'PAUSE' : 'START'}
        </button>
        <button
          onClick={() => setState(createInitialState())}
          className="font-pixel text-[9px] px-3 py-2 border border-white/30 text-white"
        >
          RESET
        </button>
      </div>

      {state.gameOver ? (
        <p className="font-body text-sm text-center text-rose-200 mt-3">Game over. Try another run.</p>
      ) : null}
    </div>
  );
}

function FlappyGame({ color, storageKey }) {
  const width = 360;
  const height = 320;
  const birdX = 70;
  const birdSize = 18;
  const pipeWidth = 46;
  const gap = 96;
  const flapImpulse = -5.1;

  const createPipe = (x) => ({
    x,
    topHeight: randomInt(30, height - gap - 30),
    passed: false,
  });

  const createInitialState = () => ({
    birdY: 140,
    velocity: 0,
    pipes: [createPipe(320), createPipe(520), createPipe(720)],
    score: 0,
    running: false,
    gameOver: false,
  });

  const [state, setState] = useState(createInitialState);
  const highScore = usePersistentHighScore(storageKey, state.score);

  const flap = () => {
    setState((prev) => {
      if (prev.gameOver) return createInitialState();
      return {
        ...prev,
        running: true,
        velocity: flapImpulse,
      };
    });
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code !== 'Space') return;
      event.preventDefault();
      flap();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!state.running || state.gameOver) return undefined;

    const id = setInterval(() => {
      setState((prev) => {
        const gravity = 0.42;
        const nextVelocity = prev.velocity + gravity;
        const nextBirdY = prev.birdY + nextVelocity;

        if (nextBirdY < 0 || nextBirdY > height - birdSize) {
          return { ...prev, birdY: Math.max(0, Math.min(nextBirdY, height - birdSize)), running: false, gameOver: true };
        }

        let collided = false;
        let score = prev.score;

        const nextPipes = prev.pipes.map((pipe) => {
          let nextX = pipe.x - 2.8;
          let topHeight = pipe.topHeight;
          let passed = pipe.passed;

          if (!passed && nextX + pipeWidth < birdX) {
            score += 1;
            passed = true;
          }

          if (nextX + pipeWidth < -4) {
            const farthestX = Math.max(...prev.pipes.map((p) => p.x));
            nextX = farthestX + 200;
            topHeight = randomInt(30, height - gap - 30);
            passed = false;
          }

          const hitX = birdX + birdSize > nextX && birdX < nextX + pipeWidth;
          const bottomY = topHeight + gap;
          const hitY = nextBirdY < topHeight || nextBirdY + birdSize > bottomY;
          if (hitX && hitY) collided = true;

          return { x: nextX, topHeight, passed };
        });

        if (collided) {
          return { ...prev, birdY: nextBirdY, velocity: nextVelocity, pipes: nextPipes, running: false, gameOver: true };
        }

        return {
          ...prev,
          birdY: nextBirdY,
          velocity: nextVelocity,
          pipes: nextPipes,
          score,
        };
      });
    }, 24);

    return () => clearInterval(id);
  }, [state.running, state.gameOver]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-pixel text-[10px]" style={{ color }}>SCORE: {state.score}</div>
        <div className="font-pixel text-[9px] text-white/80">HIGH: {highScore}</div>
      </div>
      <div className="font-pixel text-[8px] text-white/60 text-center mb-3">SPACE OR TAP</div>

      <button
        onClick={flap}
        className="relative mx-auto w-full max-w-[360px] h-[320px] block overflow-hidden border border-white/25 bg-gradient-to-b from-cyan-900/55 to-slate-900/70"
      >
        <div className="absolute inset-x-0 bottom-0 h-12 bg-amber-800/65" />

        {state.pipes.map((pipe, idx) => {
          const bottomTop = pipe.topHeight + gap;
          return (
            <div key={`${idx}-${pipe.x}`}>
              <div
                className="absolute bg-emerald-500/95 border border-emerald-200/70"
                style={{ left: pipe.x, top: 0, width: pipeWidth, height: pipe.topHeight }}
              />
              <div
                className="absolute bg-emerald-500/95 border border-emerald-200/70"
                style={{ left: pipe.x, top: bottomTop, width: pipeWidth, height: height - bottomTop }}
              />
            </div>
          );
        })}

        <div
          className="absolute bg-yellow-300 border border-yellow-100"
          style={{ left: birdX, top: state.birdY, width: birdSize, height: birdSize, borderRadius: 2 }}
        />

        {!state.running && !state.gameOver ? (
          <div className="absolute inset-0 flex items-center justify-center text-white/85 font-pixel text-[9px]">PRESS TO START</div>
        ) : null}

        {state.gameOver ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35 text-rose-200 font-pixel text-[9px]">CRASHED - PRESS TO RETRY</div>
        ) : null}
      </button>
    </div>
  );
}

const tetrisShapes = [
  {
    matrix: [
      [1, 1, 1, 1],
    ],
    color: 1,
  },
  {
    matrix: [
      [1, 1],
      [1, 1],
    ],
    color: 2,
  },
  {
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: 3,
  },
  {
    matrix: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: 4,
  },
  {
    matrix: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: 5,
  },
  {
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: 6,
  },
  {
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: 7,
  },
];

const tetrisColors = {
  0: 'bg-white/5 border-white/5',
  1: 'bg-cyan-300 border-cyan-100',
  2: 'bg-yellow-300 border-yellow-100',
  3: 'bg-violet-300 border-violet-100',
  4: 'bg-blue-300 border-blue-100',
  5: 'bg-orange-300 border-orange-100',
  6: 'bg-emerald-300 border-emerald-100',
  7: 'bg-rose-300 border-rose-100',
};

function rotateMatrix(matrix) {
  return matrix[0].map((_, col) => matrix.map((row) => row[col]).reverse());
}

function collides(board, piece, x, y) {
  for (let row = 0; row < piece.length; row += 1) {
    for (let col = 0; col < piece[row].length; col += 1) {
      if (!piece[row][col]) continue;
      const boardY = y + row;
      const boardX = x + col;
      if (boardX < 0 || boardX >= board[0].length || boardY >= board.length) return true;
      if (boardY >= 0 && board[boardY][boardX]) return true;
    }
  }
  return false;
}

function mergePiece(board, piece, x, y, color) {
  const next = board.map((row) => [...row]);
  for (let row = 0; row < piece.length; row += 1) {
    for (let col = 0; col < piece[row].length; col += 1) {
      if (!piece[row][col]) continue;
      const boardY = y + row;
      const boardX = x + col;
      if (boardY >= 0) next[boardY][boardX] = color;
    }
  }
  return next;
}

function clearLines(board) {
  const rows = board.length;
  const cols = board[0].length;
  const remaining = board.filter((row) => row.some((cell) => cell === 0));
  const removed = rows - remaining.length;
  while (remaining.length < rows) {
    remaining.unshift(Array(cols).fill(0));
  }
  return {
    board: remaining,
    cleared: removed,
  };
}

function randomPiece() {
  const shape = tetrisShapes[randomInt(0, tetrisShapes.length - 1)];
  return {
    matrix: shape.matrix.map((row) => [...row]),
    color: shape.color,
    x: 3,
    y: -1,
  };
}

function TetrisGame({ color, storageKey }) {
  const rows = 16;
  const cols = 10;

  const createInitialState = () => ({
    board: createEmptyBoard(rows, cols),
    piece: randomPiece(),
    score: 0,
    running: false,
    gameOver: false,
  });

  const [state, setState] = useState(createInitialState);
  const highScore = usePersistentHighScore(storageKey, state.score);

  const spawnOrEnd = (board, score) => {
    const nextPiece = randomPiece();
    if (collides(board, nextPiece.matrix, nextPiece.x, nextPiece.y)) {
      return {
        board,
        piece: nextPiece,
        score,
        running: false,
        gameOver: true,
      };
    }

    return {
      board,
      piece: nextPiece,
      score,
      running: true,
      gameOver: false,
    };
  };

  const dropStep = (prev) => {
    if (collides(prev.board, prev.piece.matrix, prev.piece.x, prev.piece.y + 1)) {
      const merged = mergePiece(prev.board, prev.piece.matrix, prev.piece.x, prev.piece.y, prev.piece.color);
      const lineResult = clearLines(merged);
      const score = prev.score + lineResult.cleared * 120;
      return spawnOrEnd(lineResult.board, score);
    }

    return {
      ...prev,
      piece: {
        ...prev.piece,
        y: prev.piece.y + 1,
      },
    };
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key;
      const allowed = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '];
      if (!allowed.includes(key)) return;
      event.preventDefault();

      setState((prev) => {
        if (prev.gameOver) {
          if (key === ' ') return createInitialState();
          return prev;
        }

        let next = {
          ...prev,
          running: true,
        };

        if (key === 'ArrowLeft') {
          if (!collides(prev.board, prev.piece.matrix, prev.piece.x - 1, prev.piece.y)) {
            next = {
              ...next,
              piece: { ...prev.piece, x: prev.piece.x - 1 },
            };
          }
        }

        if (key === 'ArrowRight') {
          if (!collides(prev.board, prev.piece.matrix, prev.piece.x + 1, prev.piece.y)) {
            next = {
              ...next,
              piece: { ...prev.piece, x: prev.piece.x + 1 },
            };
          }
        }

        if (key === 'ArrowUp') {
          const rotated = rotateMatrix(prev.piece.matrix);
          if (!collides(prev.board, rotated, prev.piece.x, prev.piece.y)) {
            next = {
              ...next,
              piece: { ...prev.piece, matrix: rotated },
            };
          }
        }

        if (key === 'ArrowDown') {
          next = dropStep(next);
        }

        if (key === ' ') {
          let hardDrop = next;
          while (!collides(hardDrop.board, hardDrop.piece.matrix, hardDrop.piece.x, hardDrop.piece.y + 1)) {
            hardDrop = {
              ...hardDrop,
              piece: {
                ...hardDrop.piece,
                y: hardDrop.piece.y + 1,
              },
            };
          }
          next = dropStep(hardDrop);
        }

        return next;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!state.running || state.gameOver) return undefined;

    const id = setInterval(() => {
      setState((prev) => {
        if (prev.gameOver) return prev;
        return dropStep(prev);
      });
    }, 360);

    return () => clearInterval(id);
  }, [state.running, state.gameOver]);

  const displayBoard = useMemo(() => {
    const board = state.board.map((row) => [...row]);
    state.piece.matrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (!cell) return;
        const y = state.piece.y + rowIndex;
        const x = state.piece.x + colIndex;
        if (y >= 0 && y < rows && x >= 0 && x < cols) {
          board[y][x] = state.piece.color;
        }
      });
    });
    return board;
  }, [state.board, state.piece]);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-pixel text-[10px]" style={{ color }}>SCORE: {state.score}</div>
        <div className="font-pixel text-[9px] text-white/80">HIGH: {highScore}</div>
      </div>
      <div className="font-pixel text-[8px] text-white/60 text-center mb-3">ARROWS + SPACE</div>

      <div className="mx-auto w-full max-w-[300px] border border-white/20 bg-black/30 p-2">
        <div className="grid grid-cols-10 gap-[3px]">
          {displayBoard.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-5 border ${tetrisColors[cell]}`}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setState((prev) => (prev.gameOver ? createInitialState() : { ...prev, running: !prev.running }))}
          className="font-pixel text-[9px] px-3 py-2 border"
          style={{ borderColor: color, color }}
        >
          {state.gameOver ? 'RETRY' : state.running ? 'PAUSE' : 'START'}
        </button>
        <button
          onClick={() => setState(createInitialState())}
          className="font-pixel text-[9px] px-3 py-2 border border-white/30 text-white"
        >
          RESET
        </button>
      </div>

      {state.gameOver ? (
        <p className="font-body text-sm text-center text-rose-200 mt-3">Stack reached the top. Try again.</p>
      ) : null}
    </div>
  );
}

function slideRowLeft(row) {
  const compact = row.filter((num) => num !== 0);
  const merged = [];
  let scoreGained = 0;

  for (let i = 0; i < compact.length; i += 1) {
    if (compact[i] !== 0 && compact[i] === compact[i + 1]) {
      const value = compact[i] * 2;
      merged.push(value);
      scoreGained += value;
      i += 1;
    } else {
      merged.push(compact[i]);
    }
  }

  while (merged.length < row.length) merged.push(0);
  return { row: merged, scoreGained };
}

function reverseRows(board) {
  return board.map((row) => [...row].reverse());
}

function transpose(board) {
  return board[0].map((_, col) => board.map((row) => row[col]));
}

function addRandomTile(board) {
  const empties = [];
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      if (board[r][c] === 0) empties.push({ r, c });
    }
  }

  if (!empties.length) return board;
  const pick = empties[randomInt(0, empties.length - 1)];
  const next = board.map((row) => [...row]);
  next[pick.r][pick.c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function canMove(board) {
  for (let r = 0; r < board.length; r += 1) {
    for (let c = 0; c < board[r].length; c += 1) {
      if (board[r][c] === 0) return true;
      if (r < board.length - 1 && board[r][c] === board[r + 1][c]) return true;
      if (c < board[r].length - 1 && board[r][c] === board[r][c + 1]) return true;
    }
  }
  return false;
}

function moveBoard(board, direction) {
  let transformed = board.map((row) => [...row]);

  if (direction === 'up' || direction === 'down') transformed = transpose(transformed);
  if (direction === 'right' || direction === 'down') transformed = reverseRows(transformed);

  let moved = false;
  let scoreGained = 0;

  const slided = transformed.map((row) => {
    const result = slideRowLeft(row);
    scoreGained += result.scoreGained;
    if (!moved && row.some((cell, idx) => cell !== result.row[idx])) moved = true;
    return result.row;
  });

  let restored = slided;
  if (direction === 'right' || direction === 'down') restored = reverseRows(restored);
  if (direction === 'up' || direction === 'down') restored = transpose(restored);

  return {
    board: restored,
    moved,
    scoreGained,
  };
}

function Game2048({ color, storageKey }) {
  const createInitialState = () => {
    let board = createEmptyBoard(4, 4);
    board = addRandomTile(board);
    board = addRandomTile(board);
    return {
      board,
      score: 0,
      won: false,
      gameOver: false,
    };
  };

  const [state, setState] = useState(createInitialState);
  const highScore = usePersistentHighScore(storageKey, state.score);

  useEffect(() => {
    const onKeyDown = (event) => {
      const keyMap = {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowUp: 'up',
        ArrowDown: 'down',
      };

      const direction = keyMap[event.key];
      if (!direction) return;
      event.preventDefault();

      setState((prev) => {
        if (prev.gameOver) return prev;
        const moved = moveBoard(prev.board, direction);
        if (!moved.moved) return prev;

        const board = addRandomTile(moved.board);
        const won = board.some((row) => row.some((cell) => cell >= 2048));
        const gameOver = !canMove(board);

        return {
          board,
          score: prev.score + moved.scoreGained,
          won,
          gameOver,
        };
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const tileClass = (value) => {
    if (value === 0) return 'bg-white/10 text-white/20';
    if (value <= 4) return 'bg-slate-100 text-slate-800';
    if (value <= 16) return 'bg-amber-200 text-amber-950';
    if (value <= 64) return 'bg-orange-300 text-orange-950';
    if (value <= 256) return 'bg-pink-300 text-pink-950';
    if (value <= 1024) return 'bg-fuchsia-400 text-white';
    return 'bg-rose-500 text-white';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-pixel text-[10px]" style={{ color }}>SCORE: {state.score}</div>
        <div className="font-pixel text-[9px] text-white/80">HIGH: {highScore}</div>
      </div>
      <div className="font-pixel text-[8px] text-white/60 text-center mb-3">ARROW KEYS</div>

      <div className="mx-auto w-full max-w-[320px] border border-white/20 p-3 bg-black/30">
        <div className="grid grid-cols-4 gap-2">
          {state.board.flatMap((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`h-16 border border-white/20 flex items-center justify-center font-pixel text-xs ${tileClass(cell)}`}
              >
                {cell || ''}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={() => setState(createInitialState())}
          className="font-pixel text-[9px] px-3 py-2 border"
          style={{ borderColor: color, color }}
        >
          NEW GAME
        </button>
      </div>

      {state.won ? <p className="font-body text-sm text-center text-emerald-200 mt-3">You reached 2048.</p> : null}
      {state.gameOver ? <p className="font-body text-sm text-center text-rose-200 mt-1">No moves left. Start a new game.</p> : null}
    </div>
  );
}

export default function ProjectGameModal({ project, onClose }) {
  const theme = gameThemes[project?.slug];
  const GameComponent = supportedGames[project?.slug];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm px-4 py-6 md:py-10" onClick={onClose}>
      <div
        className={`max-w-3xl mx-auto border border-white/20 bg-gradient-to-b ${theme?.panel || 'from-slate-900 to-slate-950'} p-4 md:p-6`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-pixel text-sm md:text-base" style={{ color: theme?.color || '#FFFFFF' }}>
              {theme?.title || 'Project Mini Game'}
            </h3>
            <p className="font-body text-sm text-white/80 mt-2">{theme?.subtitle || 'No game is configured for this project yet.'}</p>
          </div>

          <button onClick={onClose} className="font-pixel text-[10px] px-3 py-2 border border-white/30 text-white/90">
            CLOSE
          </button>
        </div>

        <div className="border border-white/15 bg-black/20 p-4">
          {GameComponent ? (
            <GameComponent color={theme.color} storageKey={`project-game-highscore-${project?.slug}`} />
          ) : (
            <p className="font-body text-sm text-white/75">Mini game unavailable for this project.</p>
          )}
        </div>
      </div>
    </div>
  );
}
