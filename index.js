class City {
    constructor(name, description) {
        this._name = name;
        this._description = description;
        this._linkedCities = {}
        this._character = "";
        this._item = "";
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get character() {
        return this._character;
    }
    set character(value) {
        this._character = value;
    }
    get item() {
        return this._item;
    }
    set item(value) {
        this._item = value;
    }
    describe() {
        return "This is " + this._name + ", " + this._description;
    }
    linkCity(direction, city) {
        this._linkedCities[direction] = city;
    }
    move(direction) {
        if (direction in this._linkedCities) {
            return this._linkedCities[direction];
        } else {
            alert("You can't go that way");
            return this;
        }
    }
}

class Character {
    constructor(name, description, conversation) {
        this._name = name;
        this._description = description;
        this._conversation = conversation;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get conversation() {
        return this._conversation;
    }
    set conversation(value) {
        this._conversation = value;
    }
    describe() {
        return "The person standing before you is " + this._name + ", " + this._description;
    }
    talk() {
        return this._name + " says '" + this._conversation + "'";
    }
}

let inventory = [];
let badgeTypes = [];
/*let companions = []; Don't need this currently as working with one Pokaymon*/

class Pokaymon extends Character {
    constructor(name, description, conversation, type, weakness) {
        super(name, description, conversation)
        this._type = type;
        this._weakness = weakness;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get weakness() {
        return this._weakness;
    }
    set weakness(value) {
        this._weakness = value;
    }
    /*addToCompanions(name) {
        companions.push(this._name);
    } Don't need this at the moment, only dealing with one Pokaymon atm*/
}

class Item {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    describe() {
        return this._name + ", " + this._description;
    }
}

class Badge extends Item {
    constructor(name, description, type) {
        super(name, description)
        this._type = type;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    describe() {
        return this._name + " " + this._description;
    }
}

class GymLeader extends Pokaymon {
    constructor(name, description, conversation, type, weakness, badge) {
        super(name, description, conversation, type, weakness)
        this._badge = badge;
    }
    get badge() {
        return this._badge;
    }
    set badge(value) {
        this._badge = value;
    }    
    fight() {
        if (this._weakness === "electric" || badgeTypes.includes(this.weakness)) {
            return true;
        } else {
            return false;
        } 
    }
}


function displayCityInfo(city) {
    let characterMsg = "";
    if (city.character === "") {
        characterMsg = "";
    } else {
        characterMsg = city.character.describe() + ". " + city.character.talk();
    }
    const text = "<p>" + city.describe() + "</p>" + "<p>" + characterMsg + "</p>";
    document.getElementById("currentCity").innerHTML = text;
    document.getElementById("userInput").focus();
}

function firstVisitCratetown() {
    const text = "You awake to find your best friend Peekachoo watching you. Peekachoo is one of the many creatures called 'Pokaymon' that inhabit this world.";
    document.getElementById("startEvent").innerHTML = text;
    document.getElementById("userInput").focus();
}

function help() {
    const text = `You are a Pokaymon trainer travelling the Canto region on your quest to acquire all 8 gym badges. 
    You can use commands such as north or east to move around. You can interact with characters or objects by using 'fight', 'search', 'give' or 'inventory'.`;
    document.getElementById("currentEvent").innerHTML = text;
    document.getElementById("userInput").focus();
}

function getInventory() {
    let text;
    if (inventory.length === 0) {
        text = "There is nothing in your inventory."
    } else {
        text = inventory[0] + ", ";
        for (i = 1; i < inventory.length; i++) {
            text += inventory[i] + ", ";
        }   
    }
    document.getElementById("currentEvent").innerHTML = text;
    document.getElementById("userInput").focus();
}

function search(city) {
    let text;
    if (city.item === "") {
        text = "There are no items to be found here."
    } else {
        text = "You have found " + city.item.describe() + "!";
        inventory.push(city.item.name);
    }
    document.getElementById("currentEvent").innerHTML = text;
    document.getElementById("userInput").focus();   
}

function fight(GymLeader) {
    let msg = "";
    if (inventory.includes(currentCity.character.badge.name)) {
        msg = "You have already beaten this Gym Leader and have their badge!"
    } else if (GymLeader.fight()) {
        msg = "Your attack was effective! Peekachoo wins! You have gained the " + currentCity.character.badge.describe() + "!";
        inventory.push(currentCity.character.badge.name);
        badgeTypes.push(currentCity.character.badge.type);
    } else {
        loseGame();
    }

    document.getElementById("currentEvent").innerHTML = msg;
    document.getElementById("userInput").focus();
    if (badgeTypes.length === 8) {
        alert("Congratulations you have all 8 Canto gym badges and have beaten the game!");
        startGame();
    }
}

function give() {
    let text;
    console.log(inventory);
    if (currentCity.name === "Amber City") {
        if (inventory.includes("Potion")) {
            text = "You have given your potion to help heal Hermione's Pokaymon. She gives you the Quagmire badge in thanks.";
            inventory = inventory.filter(word => word !== "Potion");
            inventory.push(currentCity.character.badge.name);
            badgeTypes.push(currentCity.character.badge.type);
            console.log(inventory);
        } else {
            text = "Uh oh, it looks like you don't have a Potion. Maybe look around to find one.";
        }
    } else {
        text = "";
        alert("This is not a valid command here!");
    }
    document.getElementById("currentEvent").innerHTML = text;
    document.getElementById("userInput").focus();
}

function loseGame() {
    alert("You received a critical hit and unfortunately Peekachoo fainted.")
    startGame();
}

let currentCity;

function startGame() {
    currentCity = cratetown;
    firstVisitCratetown();
    displayCityInfo(currentCity);
    
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            document.getElementById("startEvent").innerHTML = "";
            document.getElementById("currentEvent").innerHTML = "";
            const command = document.getElementById("userInput").value;
            const directions = ["east", "west", "north", "south"];

            if (command.toLowerCase() === "help") {
                help();
            } else if (command.toLowerCase() === "inventory") {
                getInventory();
            } else if (command.toLowerCase() === "search") {
                search(currentCity);
            } else if (command.toLowerCase() === "fight") {
                fight(currentCity.character);
            } else if(command.toLowerCase() === "give") {
                give();
            } else if (directions.includes(command.toLowerCase())) {
                currentCity = currentCity.move(command.toLowerCase());
                displayCityInfo(currentCity);
            } else {
                alert("Uh-oh, this is not a valid command, please try again!");
            }
            document.getElementById("userInput").value = ""
        }
    });
}

const cratetown = new City("Cratetown", "your cosy little hometown. I hope you've spoken to your Mum!");
const skyBlue = new City("Sky-Blue City", "here you can find the water-type gym.");
const jade = new City("Jade City", "here you can find the grass-type gym.");
const crimson = new City("Crimson City", "here you can find the electric-type gym.");
const scarlet = new City("Scarlet Island", "here you can find the fire-type gym.");
const lead = new City("Lead City", "here you can find the rock-type gym.");
const amber = new City("Amber City", "here you can find the psychic-type gym.");
const olive = new City("Olive City", "here you can find the ground-type gym.");
const blush = new City("Blush City", "here you can find the poison-type gym.");

const pebble = new Badge("Pebble Badge", "gained by defeating gym leader Block", "rock");
const waterfall = new Badge("Waterfall Badge", "gained by defeating gym leader Foggy", "water");
const cracking = new Badge("Cracking Badge", "gained by defeating gym leader Lt. Emerge", "electric");
const prism = new Badge("Prism Badge", "gained by defeating gym leader Ericar", "grass");
const spirit = new Badge("Spirit Badge", "gained by defeating gym leader Toga", "poison");
const quagmire = new Badge("Quagmire Badge", "gained by defeating gym leader Hermione", "psychic");
const terrain = new Badge("Terrain Badge", "gained by defeating gym leader Geovanni", "ground");
const lava = new Badge("Lava Badge", "gained by defeating gym leader Flame", "fire");

const peekachoo = new Pokaymon("Peekachoo", "is an electric-type Pokaymon", "Peeka! Peeekkaaa!", "electric", "ground");

const mum = new Character("Mum", "she is always there for you and always gives great advice", "Have you tried asking for help?")

const foggy = new GymLeader("Foggy", "she is the water-type gym leader", `Hi! You're a new face! What's your policy on Pokaymon?
What's your approach? My policy for battle is... an all-out offensive with Water-type Pokaymon!`, "water", "electric", waterfall);
const ericar = new GymLeader("Ericar", "she is the grass-type gym leader", `Welcome. My name is Ericar. I am the Gym Leader of Jade City Gym.
I am a student of the art of flower arranging. My Pokaymon are all of the Grass type. ...Oh, I'm sorry. Did you perhaps wish to challenge me?`, "grass", "fire", prism);
const ltemerge = new GymLeader("Lt. Emerge", "he is the electric-type gym leader", `Hey, kid! What do you think you're doing here?
You won't live long in combat! Not with your puny power! I tell you, kid, electric Pokaymon saved me during the war! They zapped my enemies into paralysis!
The same as I'll do you to you.`, "electric", "ground", cracking);
const flame = new GymLeader("Flame", "he is the fire-type gym leader", `Hah! I'm Flame, the red-hot Leader of Scarlet Gym!
My fiery Pokaymon are all ready with intense heat! They incinerate all challengers!`,"fire", "rock", lava);
const block = new GymLeader("Block", "he is the rock-type gym leader", `I'm Block, Lead City's Gym Leader.
You can see just by looking at my Pokaymon how rock hard my willpower is. My Pokaymon are all hard as rock and have true-grit determination!`,"rock", "water", pebble);
const hermione = new GymLeader("Hermione", "she is the psychic-type gym leader", `... So you've come! I had a vision of your arrival.
My Pokaymon is hurt, if you could give me a potion, I will give you my badge.`, "psychic", "", quagmire);
const geovanni = new GymLeader("Geovanni", "he is the ground-type gym leader", `So! I must say, I am impressed you got here. Team Locket captures Pokaymon from around the world.
They're important tools for keeping our criminal enterprise going. I am the leader, Geovanni! For your insolence, you will feel a world of pain!`, "ground", "grass", terrain);
const toga = new GymLeader("Toga", "he is the poison-type gym leader", `Fwahahaha! A mere child like you dares to challenge me? That very idea makes me shiver with mirth!
Very well, I shall show you true terror as a ninja master! Opponents can't lay a hand on me, as poison brings their steady doom.`, "poison", "psychic", spirit);

cratetown.character = mum;
skyBlue.character = foggy;
jade.character = ericar;
crimson.character = ltemerge;
scarlet.character = flame;
lead.character = block;
amber.character = hermione;
olive.character = geovanni;
blush.character = toga;

const potion = new Item("Potion", "this can be used during a fight to heal your Pokaymon if it looks like it may faint");

jade.item = potion;

foggy.badge = waterfall;
ericar.badge = prism;
ltemerge.badge = cracking;
flame.badge = lava;
block.badge = pebble;
hermione.badge = quagmire;
geovanni.badge = terrain;
toga.badge = spirit;

cratetown.linkCity("west", skyBlue);
cratetown.linkCity("south", scarlet);
cratetown.linkCity("east", jade);

skyBlue.linkCity("south", crimson);
skyBlue.linkCity("east", cratetown);

jade.linkCity("south", lead);
jade.linkCity("west", cratetown);

crimson.linkCity("north", skyBlue);
crimson.linkCity("south", amber);
crimson.linkCity("east", scarlet);

scarlet.linkCity("north", cratetown);
scarlet.linkCity("west", crimson);
scarlet.linkCity("east", lead);
scarlet.linkCity("south", olive);

lead.linkCity("north", jade);
lead.linkCity("south", blush);
lead.linkCity("west", scarlet);

amber.linkCity("north", crimson);
amber.linkCity("east", olive);

olive.linkCity("north", scarlet);
olive.linkCity("west", amber);
olive.linkCity("east", blush);

blush.linkCity("north", lead);
blush.linkCity("west", olive);



startGame();
