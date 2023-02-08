let input = [
	"Kuro",
	"Anna",
	"Lucy",
	"Klara",
	"Kat",
	"Yari",
	"David",
	"Wild",
	"Jojo",
	"Zi Shan",
	"Mykel",
	"Saigui",
	"Nicoll",
	"Nikolai",
	"Hans",
	"Mars",
	"Mae",
	"Sofia",
	"Fra",
	"Sid",
	"Selena",
	"BN",
	"Moka",
	"Taeko",
	"Dar",
	"Eden",
	"Kanako",
	"Jacob",
	"Salvi",
	"Siwar"
]

// This method gets multiple random items from a list by using the Modern Fisher-Yates Shuffle method
// This method makes duplicates impossible by putting "taken" numbers in the "shuffled part" of the list and only getting a new number from the "unshuffled part".
function getRandomNames(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);

  while (n--) {
    // Get random number (x)
    var x = Math.floor(Math.random() * len);

    // Fill in the choice list from back to front (cuz `n--` in while loop)
    // Get the name belonging to the random number. If the random number appeared before, use the number linked to in the "taken list" to get a non-duplicate name.
    result[n] = arr[x in taken ? taken[x] : x];

    // Register the random number in the "taken list" and link it to index number that goes from (array length - 1) to 0.
    // When a random number has already appeared, it uses the previous index number for the result and overwrites the link with the new index number.
    // When the next index number already has a link (which will always be a higher number), it copies that link, since it's not possible to get a random number that high anymore.
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

console.log(getRandomNames(["a", "b", "c", "d", "e"], 3));