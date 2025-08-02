document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');

  // Suit images for collage (equal representation, random order)
  const gridImages = [
    'assets/pepesuit.png',
    'assets/pepesuit2.png',
    'assets/pepeinsuit3.png',
    'assets/pepeinsuit4.png',
    'assets/wojakinsuit.png',
    'assets/bobosuit1.png',
    'assets/bobosuit2.png',
    'assets/bobosuit3.png',
    'assets/chudsuit.png'
  ];



  function createGrid() {
    grid.innerHTML = '';

    const squareSize = 120; // px
    const columns = Math.max(1, Math.floor(window.innerWidth / squareSize));
    const rows = Math.ceil(window.innerHeight / squareSize);
    const total = columns * rows;

    // Build pool with equal counts of each image
    const repetitions = Math.ceil(total / gridImages.length);
    let pool = [];
    for (let i = 0; i < repetitions; i++) {
      pool = pool.concat(gridImages);
    }
    pool = pool.slice(0, total);

    // Shuffle until no adjacency conflicts
    const isConflict = (arr, idx) => {
      const img = arr[idx];
      const x = idx % columns;
      const y = Math.floor(idx / columns);
      for (let offset = 1; offset <= 2; offset++) {
        // Horizontal
        const nx = x + offset;
        if (nx < columns && arr[y * columns + nx] === img) return true;
        // Vertical
        const ny = y + offset;
        if (ny < rows && arr[ny * columns + x] === img) return true;
      }
      return false;
    };

    let arranged = pool.slice();
    let tries = 100;
    while (tries < 100) {
      arranged = pool.slice().sort(() => Math.random() - 0.5);
      let ok = true;
      for (let i = 0; i < arranged.length; i++) {
        if (isConflict(arranged, i)) { ok = false; break; }
      }
      if (ok) break;
      tries++;
    }

    arranged.forEach(src => {
      const div = document.createElement('div');
      div.className = 'square';
      const img = document.createElement('img');
      img.src = src;
      div.appendChild(img);
      grid.appendChild(div);
    });
  }

  createGrid();
  window.addEventListener('resize', createGrid);

  // --- Rotate other news ---
  const otherNewsList = [
    'Startup News: <a href="https://startupnews.fyi/2025/08/01/defi-shouldnt-fear-suitcoiners/" target="_blank">link</a>',
    'Openexo: <a href="https://openexo.com/feed/item/the-rise-of-the-suitcoiners-a-discussion-on-the-ongoing-wall-street-takeover-of-bitcoin" target="_blank">link</a>',
    'AI Invest: <a href="https://www.ainvest.com/news/bitcoin-news-today-defi-embraces-institutional-investors-24-billion-rwa-surge-2508/" target="_blank">link</a>',
    'CFB: <a href="https://www.cfbenchmarks.com/blog/suitcoiners" target="_blank">link</a>'
  ];
  let otherIdx = 0;
  const otherContainer = document.getElementById('otherNews');
  function rotateOther() {
    otherContainer.style.opacity = 0;
    setTimeout(() => {
      otherContainer.innerHTML = otherNewsList[otherIdx];
      otherContainer.style.opacity = 1;
      otherIdx = (otherIdx + 1) % otherNewsList.length;
    }, 200);
  }
  rotateOther();
  setInterval(rotateOther, 1750);

  // --- Populate ticker with enough copies to ensure seamless scrolling ---
  const ticker = document.getElementById('ticker');
  function populateTicker() {
    if (!ticker) return;
    const spanHTML = ticker.querySelector('.ticker-item').outerHTML;
    while (ticker.scrollWidth < window.innerWidth * 4) {
      ticker.insertAdjacentHTML('beforeend', spanHTML);
    }
  }
  populateTicker();
  window.addEventListener('resize', populateTicker);
});