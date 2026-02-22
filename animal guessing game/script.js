const ANIMALS = [
  {
    name: "Dog",
    region: "🏠 Domestic",
    hints: [
      "I have a wet nose that can detect smells 100,000 times better than a human, and I can hear sounds from 4 times farther away.",
      "I have four legs, I wag my tail when happy, and I bark to communicate with my owner.",
      "I am the most popular pet in the world — people call me man's best friend!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/500px-YellowLabradorLooking_new.jpg",
    sound: null,
  },
  {
    name: "Cat",
    region: "🏠 Domestic",
    hints: [
      "I sleep up to 16 hours a day, can jump 6 times my own height, and I always land on my feet.",
      "I have whiskers, sharp claws, and I make a soft rumbling sound called purring when I am happy.",
      "I say 'meow' and I am a very popular furry pet that people keep at home.",
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
      "I am a large domestic animal that gives milk, and I say 'moo'.",
      "You see me walking freely on Indian roads — I am considered sacred in India!",
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
      "I am a small horned animal that will eat almost anything — leaves, grass, even cardboard!",
      "I say 'meh' or 'baa', I give milk, and I am commonly raised on farms across India.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
    sound: null,
  },
  {
    name: "Horse",
    region: "🌍 Worldwide",
    hints: [
      "I can sleep both standing up and lying down, and I can run within just a few hours of being born.",
      "I am a large mammal with a flowing mane and tail, and I communicate by neighing.",
      "Humans have ridden me for thousands of years — I am used in races, polo, and farming.",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nokota_Horses_cropped.jpg/500px-Nokota_Horses_cropped.jpg",
    sound: null,
  },
  {
    name: "Hen",
    region: "🏠 Domestic",
    hints: [
      "I have no teeth — I swallow small stones to help grind up my food inside my stomach.",
      "I am a female bird that clucks, lives on farms, and lays eggs that you eat for breakfast.",
      "My male partner is the rooster who crows every morning. You see me on almost every Indian farm!",
    ],
    image:
      "https://cdn.pixabay.com/photo/2018/07/13/11/24/chicken-3535547_1280.jpg",
    sound: null,
  },
  {
    name: "Duck",
    region: "🌍 Worldwide",
    hints: [
      "My feathers are completely waterproof — water just rolls off me — and I can see in almost every direction without turning my head.",
      "I am a bird with a flat orange beak that can walk, fly, and swim. I say 'quack'.",
      "You can see me floating on ponds and lakes. Kids love to feed me bread at parks!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/500px-Bucephala-albeola-010.jpg",
    sound: null,
  },
  {
    name: "Parrot",
    region: "🇮🇳 India",
    hints: [
      "I am one of the very few animals that can mimic human speech, and I can live up to 80 years — longer than many humans!",
      "I am a colourful bird with a curved beak that copies sounds and words people say to me.",
      "I am commonly bright green with a red beak in India — people call me 'Mittu' and keep me as a pet!",
    ],
    image:
      "https://i.pinimg.com/474x/69/e2/e9/69e2e9cd082c665dd0dff0fd98f79503.jpg",
    sound: null,
  },
  {
    name: "Elephant",
    region: "🇮🇳 India",
    hints: [
      "I am the only animal that cannot jump, and I use low rumbling sounds too deep for humans to hear to talk to others far away.",
      "I have a long trunk with over 40,000 muscles that I use to drink, pick up objects, and greet friends.",
      "I am the largest land animal on Earth, I have big ears and tusks, and I never forget anything!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/500px-African_Bush_Elephant.jpg",
    sound: null,
  },
  {
    name: "Monkey",
    region: "🇮🇳 India",
    hints: [
      "I have fingerprints almost identical to human fingerprints, and I use my tail like an extra hand to grip branches.",
      "I am a primate with a long tail who lives in trees, swings through branches, and loves fruits.",
      "You will find me stealing food near temples and markets all across India — I am very clever and mischievous!",
    ],
    image:
      "https://images.unsplash.com/photo-1605559911160-a3d95d213904?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ua2V5fGVufDB8fDB8fHww",
    sound: null,
  },
  {
    name: "Tiger",
    region: "🇮🇳 India",
    hints: [
      "I am an excellent swimmer and I love water — unlike most cats. My roar can be heard from 3 kilometres away.",
      "I have orange fur with black stripes. No two of us have the same stripe pattern — it is unique like a fingerprint.",
      "I am India's national animal and the largest wild cat in the world. You can find me in places like Jim Corbett!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Walking_tiger_female.jpg/500px-Walking_tiger_female.jpg",
    sound: null,
  },
  {
    name: "Deer",
    region: "🇮🇳 India",
    hints: [
      "I shed and regrow my antlers every single year — they are the fastest-growing bone tissue in the animal kingdom.",
      "I am a fast, graceful animal with big brown eyes and the males of my kind grow branching horns on their heads.",
      "I am gentle and harmless — I eat grass and leaves in forests. A tiger's favourite meal!",
    ],
    image:
      "https://media.istockphoto.com/id/472096009/photo/deer-fawn.jpg?s=612x612&w=0&k=20&c=yrn9kafoYvfcutnWXn_fJCoONqyCndIb0qi_Jqte5L0=",
    sound: null,
  },
  {
    name: "Bear",
    region: "🌍 Worldwide",
    hints: [
      "I do not truly hibernate — my body temperature only drops slightly and I can wake up quickly if disturbed during my winter sleep.",
      "I am a large furry mammal that loves honey. I sleep through most of winter in a den.",
      "Winnie-the-Pooh and Baloo from The Jungle Book are both based on me!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1280px-2010-kodiak-bear-1.jpg",
    sound: null,
  },
  {
    name: "Camel",
    region: "🇮🇳 Rajasthan",
    hints: [
      "My hump stores fat — not water — and I can drink up to 200 litres of water in one go to prepare for the desert.",
      "I can survive many days without water and I am built for hot sandy deserts with tough feet and long eyelashes.",
      "I am called the 'Ship of the Desert'. You can ride me at the Pushkar fair in Rajasthan!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/43/07._Camel_Profile%2C_near_Silverton%2C_NSW%2C_07.07.2007.jpg",
    sound: null,
  },
  {
    name: "Lion",
    region: "🌍 Africa / India",
    hints: [
      "I am the only cat that lives in social groups called prides. The females do most of the hunting while the males guard the territory.",
      "The male of my species has a big fluffy mane around his face. I have a very powerful roar.",
      "I am called the King of the Jungle, but I actually live in grasslands. India has a small group of us in Gir forest, Gujarat!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/500px-Lion_waiting_in_Namibia.jpg",
    sound: null,
  },
  {
    name: "Fox",
    region: "🌍 Worldwide",
    hints: [
      "I use the Earth's magnetic field like a compass to judge distance and direction when pouncing on prey hidden under snow.",
      "I am a small, clever wild animal with a bushy tail, pointy ears, and a narrow face.",
      "I am famous for being sly and cunning in folk stories — I look like a mix of a dog and a cat!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Vulpes_vulpes_ssp_fulvus.jpg/500px-Vulpes_vulpes_ssp_fulvus.jpg",
    sound: null,
  },
  {
    name: "Crocodile",
    region: "🇮🇳 India",
    hints: [
      "I have not changed much in over 200 million years — I was alive when dinosaurs roamed the Earth. I also cannot stick out my tongue.",
      "I am a large reptile with very powerful jaws and tough scaly skin. I live in rivers and lakes.",
      "I lie completely still in water pretending to be a floating log — then I suddenly snap at my prey!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/250px-Nile_crocodile_head.jpg",
    sound: null,
  },
  {
    name: "Snake",
    region: "🇮🇳 India",
    hints: [
      "I have no eyelids — my eyes are always open, even when I sleep. I smell the air using my forked tongue.",
      "I have no legs or arms. I move by sliding my long body on the ground and I shed my skin as I grow.",
      "Some of us are venomous and some are not. I hiss when scared and I eat rats whole!",
    ],
    image:
      "https://i.pinimg.com/236x/68/fd/3e/68fd3e1207db9b0874fd7fdfc4a0678f.jpg",
    sound: null,
  },
  {
    name: "Peacock",
    region: "🇮🇳 India",
    hints: [
      "My spectacular tail — called a train — is not actually my tail feathers. It grows from my back, and I rattle it to make a rustling sound during courtship.",
      "The male of my species has a huge, fan-like display of feathers with eye-shaped patterns. The female is plain brown.",
      "I am India's national bird. I am famous for dancing when it rains and spreading my beautiful colourful feathers!",
    ],
    image:
      "https://img.freepik.com/free-photo/peacock-walking-ground-with-its-tail-open_181624-27071.jpg?semt=ais_user_personalization&w=740&q=80",
    sound: null,
  },
  {
    name: "Rabbit",
    region: "🌍 Worldwide",
    hints: [
      "My teeth never stop growing my entire life, so I must constantly chew to keep them worn down.",
      "I am a small fluffy mammal with very long ears and a small cotton-ball tail. I hop everywhere I go.",
      "I love eating carrots and vegetables. Bugs Bunny from cartoons is based on me!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Oryctolagus_cuniculus_Rcdo.jpg/500px-Oryctolagus_cuniculus_Rcdo.jpg",
    sound: null,
  },
  {
    name: "Rhinoceros",
    region: "🇮🇳 India",
    hints: [
      "My horn is not made of bone — it is made of keratin, the same material as your fingernails, pressed tightly together.",
      "I am a very large, heavy animal with thick armour-like skin and one or two horns on my nose.",
      "I love rolling in mud to keep cool. The Indian version of me lives in Assam and has just one horn!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/77/Great-Indian-one-horned-rhinoceros-at-Kaziranga-national-park-in-Assam-India.jpg",
    sound: null,
  },
  {
    name: "Hippopotamus",
    region: "🌍 Africa",
    hints: [
      "I sweat a red oily liquid that acts as sunscreen and kills bacteria — people once thought I was sweating blood.",
      "I am one of the heaviest land animals, but I spend most of my time in rivers and lakes to keep cool.",
      "I open my huge mouth very wide to show off or scare enemies. My name means 'river horse' in Greek!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Portrait_Hippopotamus_in_the_water.jpg",
    sound: null,
  },
  {
    name: "Giraffe",
    region: "🌍 Africa",
    hints: [
      "I only sleep about 30 minutes a day in short bursts, and my heart is massive — nearly 11 kg — to pump blood all the way up my long neck.",
      "I am the tallest animal in the world. My neck alone is almost as tall as a grown man.",
      "I have a brown patchy coat and I eat leaves from the very tops of tall trees that no other animal can reach!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Giraffe_Mikumi_National_Park.jpg/500px-Giraffe_Mikumi_National_Park.jpg",
    sound: null,
  },
  {
    name: "Zebra",
    region: "🌍 Africa",
    hints: [
      "My stripes confuse biting insects — the black and white pattern makes it hard for flies to land on me. No two of us have the same pattern.",
      "I look exactly like a horse but I am covered in black and white stripes all over my body.",
      "I live in Africa and roam in large herds. You have definitely seen me in The Lion King!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Plains_Zebra_Equus_quagga.jpg/500px-Plains_Zebra_Equus_quagga.jpg",
    sound: null,
  },
  {
    name: "Hyena",
    region: "🌍 Africa",
    hints: [
      "My jaw is so powerful I can crush and digest bones that no other animal can eat. My laughing sound is actually a signal of excitement, not happiness.",
      "I make a laughing sound to communicate and I live in groups. I am both a hunter and a scavenger.",
      "I am the villain in The Lion King — Shenzi, Banzai, and Ed are all my kind!",
    ],
    image:
      "https://images.unsplash.com/photo-1750345536221-0758d52ce0ff?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGh5ZW5hc3xlbnwwfHwwfHx8MA%3D%3D",
    sound: null,
  },
  {
    name: "Jackal",
    region: "🌍 Africa / India",
    hints: [
      "I can hear the sound of a vulture landing from several kilometres away and I use that as a clue to find food.",
      "I am a medium-sized wild animal that looks like a thin dog. I howl at night and eat both meat and fruits.",
      "I am famous in Indian folk tales for being the clever trickster animal who outsmarts the lion!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Flickr_-_Rainbirder_-_Golden_Jackal_%281%29.jpg",
    sound: null,
  },
  {
    name: "Porcupine",
    region: "🇮🇳 India",
    hints: [
      "My quills are not shot out like arrows — that is a myth. But they detach very easily and stick painfully into anything that touches them.",
      "I am covered in long, sharp, needle-like spines all over my back that I rattle as a warning.",
      "I am a large rodent found in Indian forests. My spines protect me like armour from any predator!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Weissschwanzstachelschwein_Hystrix_indica_Tierpark_Hellabrunn-12_%28cropped%29.jpg",
    sound: null,
  },
  {
    name: "Kangaroo",
    region: "🌍 Australia",
    hints: [
      "I cannot walk backwards, and a newborn baby of mine is only the size of a grape when it crawls into my pouch.",
      "I carry my baby in a pouch on my belly and I move by hopping on my two powerful back legs.",
      "I live in Australia and I am on their national coat of arms — the most famous animal of that country!",
    ],
    image:
      "https://plus.unsplash.com/premium_photo-1666777247057-40fd5ff166c4?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2FuZ2Fyb298ZW58MHx8MHx8fDA%3D",
    sound: null,
  },
  {
    name: "Penguin",
    region: "🌍 Antarctica",
    hints: [
      "I am a bird, but my wings evolved into flippers over millions of years. I can swim faster than most fish but I cannot fly at all.",
      "I wear a black and white coat that looks like a formal suit. I waddle on land but glide through water.",
      "I live on icy cold land near the South Pole. You have seen me in cartoons like Happy Feet!",
    ],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Aptenodytes_forsteri_-Snow_Hill_Island%2C_Antarctica_-adults_and_juvenile-8.jpg",
    sound: null,
  },
  {
    name: "Dolphin",
    region: "🌍 Ocean",
    hints: [
      "I use clicking sounds that bounce off objects to build a 3D picture of my surroundings — even seeing inside the bodies of fish and other creatures.",
      "I am a very intelligent sea mammal that breathes air, loves jumping near boats, and lives in social groups.",
      "I always look like I am smiling and I am one of the friendliest animals to humans. You have seen me at aquarium shows!",
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
