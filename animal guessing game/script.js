const ANIMALS = [
  {
    name: "Dog",
    region: "🏠 Domestic",
    hints: [
      "I have a very strong sense of smell and can hear sounds that humans cannot hear from far away.",
      "I am a loyal and friendly animal that many families keep as a pet.",
      "I walk on four legs, wag my tail when I am happy, and bark to communicate with people.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/500px-YellowLabradorLooking_new.jpg",
    sound: null,
  },
  {
    name: "Cat",
    region: "🏠 Domestic",
    hints: [
      "I sleep up to 16 hours a day and can jump much higher than my own height.",
      "I have soft fur, long whiskers, and sharp claws that help me climb and catch things.",
      "I make a meow sound and people often keep me as a quiet pet at home.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/500px-Cat_November_2010-1a.jpg",
    sound: null,
  },
  {
    name: "Cow",
    region: "🇮🇳 India",
    hints: [
      "I have four stomachs and I chew my food twice — once when I eat and once when I bring it back up later.",
      "In India, you often see me walking freely on roads and near houses.",
      "I am a large domestic animal that gives milk and makes a moo sound.",
    ],
    image:
      "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293fGVufDB8fDB8fHww",
    sound: null,
  },
  {
    name: "Goat",
    region: "🇮🇳 India",
    hints: [
      "I have rectangular pupils that give me almost 360-degree vision to watch for danger on all sides.",
      "I am a small horned animal that will eat almost anything — leaves, grass, and many kinds of plants.",
      "I say 'meh', I give milk, and I am commonly raised on farms across India.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
    sound: null,
  },
  {
    name: "Horse",
    region: "🌍 Worldwide",
    hints: [
      "I am a strong and fast animal that can travel for long distances without getting tired.",
      "I am a large mammal with a long tail, and strong legs and I communicate by neighing.",
      "Humans ride me and use my speed for transport, racing, and other fast sports like polo.",
    ],
    image:
      "https://media.istockphoto.com/id/521697371/photo/brown-pedigree-horse.jpg?s=612x612&w=0&k=20&c=x19W0K7iuQhQn_7l3wRqWq-zsbo0oRA33C3OF4nooL0=",
    sound: null,
  },
  {
    name: "Hen",
    region: "🏠 Domestic",
    hints: [
      "I am a bird that cannot fly very far and spend most of my time on the ground.",
      "I scratch the soil with my feet to find food like insects and grains.",
      "Farmers raise me for eggs and sometimes for meat.",
    ],
    image:
      "https://cdn.pixabay.com/photo/2018/07/13/11/24/chicken-3535547_1280.jpg",
    sound: null,
  },
  {
    name: "Duck",
    region: "🌍 Worldwide",
    hints: [
      "My feathers are covered with special oil that keeps them waterproof when I swim.",
      "I can walk on land, swim in water, and fly in the sky.",
      "I live near ponds, lakes, and rivers. I say 'quack'.",
    ],
    image:
      "https://i.pinimg.com/736x/58/92/a5/5892a5ad44ab6246a6a29a23b18b4e58.jpg",
    sound: null,
  },
  {
    name: "Parrot",
    region: "🇮🇳 India",
    hints: [
      "I am a colorful bird that can copy human sounds and words.",
      "I have a strong curved beak that helps me eat seeds and fruits.",
      "I am commonly bright green with a red beak, and many people keep me as a pet.",
    ],
    image:
      "https://i.pinimg.com/474x/69/e2/e9/69e2e9cd082c665dd0dff0fd98f79503.jpg",
    sound: null,
  },
  {
    name: "Elephant",
    region: "🇮🇳 India",
    hints: [
      "I am the biggest land animal and I have very large, floppy ears.",
      "I use my long trunk to eat food, drink water, and pick up things.",
      "I have two long white tusks and I make a loud trumpeting sound.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/500px-African_Bush_Elephant.jpg",
    sound: null,
  },
  {
    name: "Monkey",
    region: "🇮🇳 India",
    hints: [
      "I use my hands and tail to grab branches and move easily from one tree to another.",
      "I belong to the primate family and look similar to humans in my actions and movements.",
      "People often see me around villages and cities, especially near temples and markets.",
    ],
    image:
      "https://images.unsplash.com/photo-1605559911160-a3d95d213904?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww",
    sound: null,
  },
  {
    name: "Tiger",
    region: "🇮🇳 India",
    hints: [
      "I have orange fur with black stripes all over my body.",
      "I move silently through forests and grasslands while hunting my prey.",
      "I am India's national animal and the largest wild cat in the world.",
    ],
    image:
      "https://img.freepik.com/free-photo/tiger-looking-with-open-mouth_1150-18083.jpg?semt=ais_hybrid&w=740&q=80",
    sound: null,
  },
  {
    name: "Bear",
    region: "🌍 Worldwide",
    hints: [
      "I am a very large animal with thick fur, and powerful claws made for digging or climbing.",
      "I am an omnivore, so I eat both plants and animals.",
      "During winter, I hibernate by sleeping in a den for a long time.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1280px-2010-kodiak-bear-1.jpg",
    sound: null,
  },
  {
    name: "Camel",
    region: "🇮🇳 Rajasthan",
    hints: [
      "I can walk on hot deserts for a long time without needing to drink water.",
      "I have a big hump on my back where I store fat for energy.",
      "I am called the 'Ship of the Desert'.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg",
    sound: null,
  },
  {
    name: "Lion",
    region: "🌍 Africa / India",
    hints: [
      "I am one of the few big cats that live and hunt in groups.",
      "The male of my species has a big fluffy mane around his face, and I have a very powerful roar.",
      "I am called the King of the Jungle, but I actually live in grasslands.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/500px-Lion_waiting_in_Namibia.jpg",
    sound: null,
  },
  {
    name: "Crow",
    region: "🌍 Worldwide",
    hints: [
      "I am a very smart bird with all-black feathers and a strong beak.",
      "You can often find me in cities and villages, making a loud 'kaw-kaw' sound.",
      "In famous stories, I am the bird that dropped stones into a pot to drink water.",
    ],
    image:
      "https://i.pinimg.com/736x/8f/2b/53/8f2b53596a85e0d1760a74be3699f5fa.jpg",
    sound: null,
  },
  {
    name: "Crocodile",
    region: "🇮🇳 India",
    hints: [
      "I am a large reptile with tough, scaly skin and a long tail that helps me swim fast.",
      "I live in rivers and lakes and I have very strong jaws and sharp teeth.",
      "I look like a big green lizard with a long mouth.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/250px-Nile_crocodile_head.jpg",
    sound: null,
  },
  {
    name: "Frog",
    region: "🌍 Worldwide",
    hints: [
      "I am a small amphibian that starts my life as a tadpole swimming in the water with a tail and gills.",
      "I have a long, sticky tongue that I can flick out super fast to catch flies and other insects.",
      "I usually live near ponds or damp places because I need to keep my skin wet to stay healthy.",
    ],
    image:
      "https://www.pugdundeesafaris.com/blog/wp-content/uploads/2020/01/common-indian-toad.png",
    sound: null,
  },
  {
    name: "Honey Bee",
    region: "🌍 Worldwide",
    hints: [
      "I am a small flying insect with yellow and black stripes.",
      "I fly from flower to flower to collect nectar and I live in a hive.",
      "I make sweet honey and I have a 'buzz' sound when I fly.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Apis_mellifera_Western_honey_bee.jpg/500px-Apis_mellifera_Western_honey_bee.jpg",
    sound: null,
  },
  {
    name: "Snake",
    region: "🇮🇳 India",
    hints: [
      "I have no legs, arms, or ears. I move by sliding my long body on the ground in a wavy line.",
      "I stick my tongue out to smell the air and I can shed my old skin.",
      "Some of us are venomous and some are not, and I make a hissing sound.",
    ],
    image:
      "https://i.pinimg.com/236x/68/fd/3e/68fd3e1207db9b0874fd7fdfc4a0678f.jpg",
    sound: null,
  },
  {
    name: "Spider",
    region: "🌍 Worldwide",
    hints: [
      "I am a small creature with eight legs and I do not have any wings or antennae.",
      "I am an expert at spinning sticky silk webs to catch flies and other small insects.",
      "I have many eyes, but I mostly feel vibrations to know when my dinner is near.",
    ],
    image:
      "https://cms.bbcearth.com/sites/default/files/image/funfact/Spider-Fun-Fact_Factfile_BBC-Earth-Factfiles-.jpg?imwidth=1920",
    sound: null,
  },
  {
    name: "Peacock",
    region: "🇮🇳 India",
    hints: [
      "I am a large, beautiful bird with a long blue neck and a small crown of feathers on my head.",
      "I am famous for opening my back feathers into a big, colorful fan with many 'eye' spots.",
      "I am the national bird of India, and I love to dance and spread my feathers when it rains.",
    ],
    image:
      "https://img.freepik.com/free-photo/peacock-walking-ground-with-its-tail-open_181624-27071.jpg?semt=ais_user_personalization&w=740&q=80",
    sound: null,
  },
  {
    name: "Rabbit",
    region: "🌍 Worldwide",
    hints: [
      "I am a small fluffy mammal with very long ears and a small cotton-ball tail.",
      "I have long front teeth that never stop growing, so I constantly chew grass and vegetables.",
      "I live in underground tunnels called burrows and I can sense danger quickly with my twitching nose.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/500px-Oryctolagus_cuniculus_Rcdo.jpg",
    sound: null,
  },
  {
    name: "Rhinoceros",
    region: "🇮🇳 India",
    hints: [
      "I am a very large, heavy animal with thick armour-like skin and one or two horns on my nose.",
      "My horn is not made of bone — it is made of keratin, the same material as your fingernails.",
      "I love to roll in the mud to protect my sensitive skin from the sun and keep myself cool.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/Great-Indian-one-horned-rhinoceros-at-Kaziranga-national-park-in-Assam-India.jpg",
    sound: null,
  },
  {
    name: "Hippopotamus",
    region: "🌍 Africa",
    hints: [
      "I am one of the heaviest land animals, but I spend most of my time in rivers and lakes to keep cool.",
      "I open my huge mouth very wide to show off my long tusk-like teeth or scare enemies.",
      "My name means 'river horse' in Greek!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Portrait_Hippopotamus_in_the_water.jpg",
    sound: null,
  },
  {
    name: "Giraffe",
    region: "🌍 Africa",
    hints: [
      "I am the tallest animal in the world. My neck alone is almost as tall as a grown man.",
      "I have a very powerful heart to pump blood all the way up my neck to my brain.",
      "I have a brown patchy coat and I eat leaves from the very tops of tall trees that no other animal can reach!",
    ],
    image: "https://cdn.britannica.com/55/75855-050-3D52AB80/giraffe-Kenya.jpg",
    sound: null,
  },
  {
    name: "Zebra",
    region: "🌍 Africa",
    hints: [
      "I look exactly like a horse but I am covered in black and white stripes all over my body.",
      "My stripes confuse biting insects — the black and white pattern makes it hard for flies to land on me.",
      "I live in the grassy plains of Africa and travel in large groups called herds to stay safe from lions.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/500px-Plains_Zebra_Equus_quagga.jpg",
    sound: null,
  },
  {
    name: "Shark",
    region: "🌍 Ocean",
    hints: [
      "I am a large fish with many rows of sharp teeth and a fin on my back.",
      "I never stop swimming, and I can smell even a tiny drop of blood in the ocean.",
      "I am the star of the movie 'Jaws' and the famous 'Baby Shark' song.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/White_shark.jpg/500px-White_shark.jpg",
    sound: null,
  },
  {
    name: "Kangaroo",
    region: "🌍 Australia",
    hints: [
      "I am a furry mammal with huge back legs that I use like powerful springs to jump very high.",
      "I carry my baby in a pouch on my belly and I move by hopping on my two powerful legs.",
      "I am the most famous animal from Australia and I am a great jumper but I cannot walk backward.",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1666777247057-40fd5ff166c4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FuZ2Fyb298ZW58MHx8MHx8fDA%3D",
    sound: null,
  },
  {
    name: "Penguin",
    region: "🌍 Antarctica",
    hints: [
      "I am a bird that cannot fly through the air, but I use my wings like flippers to 'fly' underwater.",
      "I wear a black and white coat that looks like a formal suit, which helps me hide from hunters in the ocean.",
      "I live on the icy lands of the South Pole, where I waddle on my short legs or slide on my belly over the ice.",
    ],
    image:
      "https://cdn.britannica.com/77/81277-050-2A6A35B2/Adelie-penguin.jpg",
    sound: null,
  },
  {
    name: "Dolphin",
    region: "🌍 Ocean",
    hints: [
      "I am a very intelligent sea animal that lives in oceans and seas around the world.",
      "I breathe air through a hole on top of my head and love to jump and swim near boats.",
      "I use clicking and whistling sounds to communicate, and I am known for being friendly to humans.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tursiops_truncatus_01.jpg/500px-Tursiops_truncatus_01.jpg",
    sound: null,
  },
];

const MAX_LIVES = 3;

let state = {
  score: 0,
  best: 0,
  streak: 0,
  round: 0,
  lives: MAX_LIVES,
  currentAnimal: null,
  hintsRevealed: 1,
  timerValue: 30,
  timerInterval: null,
  gameActive: false,
  usedAnimals: [],
  roundOver: false,
  pendingGameOver: false,
};

const POINTS = { 1: 30, 2: 20, 3: 10 };
const TIMER_DURATION = 60;
const CIRCUMFERENCE = 2 * Math.PI * 20;

function startGame() {
  state.score = 0;
  state.best = parseInt(localStorage.getItem("wm_best") || "0");
  state.streak = 0;
  state.round = 0;
  state.lives = MAX_LIVES;
  state.usedAnimals = [];
  state.gameActive = true;
  state.pendingGameOver = false;
  updateScoreBar();
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  nextRound();
}

function nextRound() {
  if (state.pendingGameOver) {
    _showGameOverScreen();
    return;
  }

  document.getElementById("resultCard").classList.remove("show");
  document.getElementById("gameOverScreen").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");
  document.getElementById("timeoutBanner").classList.remove("show");
  document.getElementById("feedback").classList.remove("show");

  const btn = document.getElementById("resultNextBtn");
  btn.textContent = "Next Animal →";
  btn.onclick = nextRound;

  ["hint1", "hint2", "hint3"].forEach((id) =>
    document.getElementById(id).classList.remove("visible"),
  );
  document.getElementById("dot1").className = "hint-dot active-hard";
  document.getElementById("dot2").className = "hint-dot";
  document.getElementById("dot3").className = "hint-dot";

  let pool = ANIMALS.filter((a) => !state.usedAnimals.includes(a.name));
  if (!pool.length) {
    state.usedAnimals = [];
    pool = [...ANIMALS];
  }
  const animal = pool[Math.floor(Math.random() * pool.length)];
  state.currentAnimal = animal;
  state.usedAnimals.push(animal.name);
  state.hintsRevealed = 1;
  state.roundOver = false;
  state.round++;

  document.getElementById("hint1Text").textContent = animal.hints[0];
  document.getElementById("hint2Text").textContent = animal.hints[1];
  document.getElementById("hint3Text").textContent = animal.hints[2];

  setTimeout(
    () => document.getElementById("hint1").classList.add("visible"),
    100,
  );

  document.getElementById("hintBtn").disabled = false;
  document.getElementById("submitBtn").disabled = false;
  document.getElementById("guessInput").disabled = false;
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").focus();

  document.getElementById("roundTag").textContent = `Round ${state.round}`;

  updateScoreBar();
  startTimer();
}

function startTimer() {
  clearInterval(state.timerInterval);
  state.timerValue = TIMER_DURATION;
  updateTimerUI(TIMER_DURATION, TIMER_DURATION);

  state.timerInterval = setInterval(() => {
    state.timerValue--;
    updateTimerUI(state.timerValue, TIMER_DURATION);
    if (state.timerValue <= 0) {
      clearInterval(state.timerInterval);
      timeOut();
    }
  }, 1000);
}

function updateTimerUI(val, total) {
  const circle = document.getElementById("timerCircle");
  const frac = val / total;
  circle.style.strokeDashoffset = CIRCUMFERENCE * (1 - frac);
  document.getElementById("timerNum").textContent = val;
  circle.style.stroke =
    frac > 0.5
      ? "var(--accent)"
      : frac > 0.25
        ? "var(--medium)"
        : "var(--hard)";
}

function timeOut() {
  if (state.roundOver) return;
  state.roundOver = true;
  clearInterval(state.timerInterval);
  disableInput();
  revealAllHints();

  state.lives--;
  state.streak = 0;
  updateScoreBar();

  document.getElementById("timeoutBanner").classList.add("show");
  document.getElementById("timeoutText").textContent =
    `The answer was: ${state.currentAnimal.name}`;

  setTimeout(() => showResult(false, 0), 1800);
}

function showNextHint() {
  if (state.hintsRevealed >= 3 || state.roundOver) return;
  state.hintsRevealed++;
  if (state.hintsRevealed === 2) {
    document.getElementById("hint2").classList.add("visible");
    document.getElementById("dot2").className = "hint-dot active-medium";
  } else {
    document.getElementById("hint3").classList.add("visible");
    document.getElementById("dot3").className = "hint-dot active-easy";
    document.getElementById("hintBtn").disabled = true;
  }
}

function revealAllHints() {
  ["hint1", "hint2", "hint3"].forEach((id) =>
    document.getElementById(id).classList.add("visible"),
  );
  document.getElementById("dot2").className = "hint-dot active-medium";
  document.getElementById("dot3").className = "hint-dot active-easy";
}

function handleKey(e) {
  if (e.key === "Enter") submitGuess();
}

function submitGuess() {
  if (state.roundOver) return;
  const input = document.getElementById("guessInput");
  const guess = input.value.trim().toLowerCase();
  if (!guess) return;
  const answer = state.currentAnimal.name.toLowerCase();
  if (
    guess === answer ||
    answer.includes(guess) ||
    guess.includes(answer.split(" ")[0])
  ) {
    correctGuess();
  } else {
    wrongGuess();
  }
}

function correctGuess() {
  clearInterval(state.timerInterval);
  state.roundOver = true;
  disableInput();
  const pts = POINTS[state.hintsRevealed] || 10;
  state.score += pts;
  state.streak++;
  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem("wm_best", state.best);
  }
  updateScoreBar();
  launchConfetti();
  showResult(true, pts);
}

function wrongGuess() {
  const input = document.getElementById("guessInput");
  input.classList.remove("shake");
  void input.offsetWidth;
  input.classList.add("shake");
  const fb = document.getElementById("feedback");
  fb.textContent = "❌ Wrong guess — try again!";
  fb.classList.add("show");
  setTimeout(() => fb.classList.remove("show"), 2000);
  setTimeout(() => input.classList.remove("shake"), 500);
  input.value = "";
  input.focus();
}

function skipRound() {
  if (state.roundOver) {
    nextRound();
    return;
  }
  clearInterval(state.timerInterval);
  state.roundOver = true;
  state.streak = 0;
  state.lives--;
  disableInput();
  revealAllHints();
  updateScoreBar();

  document.getElementById("timeoutBanner").classList.add("show");
  document.getElementById("timeoutText").textContent =
    `The answer was: ${state.currentAnimal.name}`;

  setTimeout(() => showResult(false, 0), 800);
}

function showResult(correct, pts) {
  document.getElementById("gameScreen").classList.add("hidden");

  const img = document.getElementById("resultImg");
  img.src = state.currentAnimal.image;
  img.alt = state.currentAnimal.name;
  if (!correct) {
    img.classList.add("lost");
  } else {
    img.classList.remove("lost");
  }

  document.getElementById("resultName").textContent = state.currentAnimal.name;
  const region = state.currentAnimal.region || "";

  if (correct) {
    document.getElementById("resultSub").textContent =
      `${region}  •  Identified after hint #${state.hintsRevealed}`;
    document.getElementById("pointsBadge").textContent = `+${pts} pts 🏆`;
    document.getElementById("pointsBadge").style.display = "inline-flex";
  } else {
    document.getElementById("resultSub").textContent =
      `${region}  •  Better luck next time!`;
    document.getElementById("pointsBadge").style.display = "none";
  }

  const btn = document.getElementById("resultNextBtn");
  if (state.lives <= 0) {
    state.pendingGameOver = true;
    state.gameActive = false;
    if (state.score > state.best) {
      state.best = state.score;
      localStorage.setItem("wm_best", state.best);
    }
    btn.textContent = "See Final Results →";
    btn.onclick = _showGameOverScreen;
  } else {
    btn.textContent = "Next Animal →";
    btn.onclick = nextRound;
  }

  document.getElementById("resultCard").classList.add("show");
}

function _showGameOverScreen() {
  document.getElementById("resultCard").classList.remove("show");
  document.getElementById("goScore").textContent = state.score;
  document.getElementById("goRounds").textContent = state.round;
  document.getElementById("goBest").textContent = state.best;
  document.getElementById("gameOverScreen").classList.remove("hidden");
}

function launchConfetti() {
  const colors = [
    "#00e5a0",
    "#ff6b6b",
    "#ffd93d",
    "#b69fff",
    "#00b8d4",
    "#fff",
  ];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const color = colors[Math.floor(Math.random() * colors.length)];
      el.style.cssText = `
              left:${Math.random() * 100}%;background:${color};
              width:${Math.random() * 10 + 6}px;height:${Math.random() * 10 + 6}px;
              border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
              animation-duration:${Math.random() * 2 + 1.5}s;
              animation-delay:${Math.random() * 0.5}s;
            `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3500);
    }, i * 20);
  }
}

function disableInput() {
  document.getElementById("guessInput").disabled = true;
  document.getElementById("submitBtn").disabled = true;
  document.getElementById("hintBtn").disabled = true;
}

function updateScoreBar() {
  document.getElementById("scoreDisplay").textContent = state.score;
  document.getElementById("roundDisplay").textContent = state.round;
  document.getElementById("streakDisplay").textContent =
    state.streak + (state.streak >= 3 ? "🔥" : "");
  document.getElementById("bestDisplay").textContent = state.best;
  const hearts =
    "❤️".repeat(state.lives) +
    "🖤".repeat(Math.max(0, MAX_LIVES - state.lives));
  document.getElementById("livesDisplay").textContent = hearts;
}

function restartGame() {
  clearInterval(state.timerInterval);
  state.score = 0;
  state.streak = 0;
  state.round = 0;
  state.lives = MAX_LIVES;
  state.usedAnimals = [];
  state.gameActive = false;
  state.roundOver = true;
  state.pendingGameOver = false;

  const btn = document.getElementById("resultNextBtn");
  btn.textContent = "Next Animal →";
  btn.onclick = nextRound;

  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("resultCard").classList.remove("show");
  document.getElementById("gameOverScreen").classList.add("hidden");
  document.getElementById("startScreen").classList.remove("hidden");
  updateScoreBar();
}

state.best = parseInt(localStorage.getItem("wm_best") || "0");
updateScoreBar();
