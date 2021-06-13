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
    search() {
        let text;
    if (city.item === "") {
        text = "There are no items to be found here."
    } else {
        text = "You have found " + city.item + "!";
    }
    document.getElementById("currentEvent").innerHTML = text;
    document.getElementById("userInput").focus();   
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
let companions = [];

class Pokaymon extends Character {
    constructor(name, description, conversation, type, weakness) {
        super(name, description, conversation)
        this._type = type;
        this._weakness = weakness;
    }
    addToCompanions(name) {
        companions.append(this._name);
    }
}
let fightStatus;
class GymLeader extends Pokaymon {
    constructor(name, description, conversation, type, weakness, weakness2, weakness3, badge) {
        super(name, description, conversation, type, weakness)
        this._weakness2 = weakness2;
        this._weakness3 = weakness3;
        this._badge = badge;
        
    }
    fight(badge, type) {
        if (badge === this._weakness || badge === this._weakness2 ||badge === this._weakness3 ||  type === this._weakness || type === this._weakness2 || type === this._weakness3) {
            fightStatus = "win";
            return true;
        } else {
            fightStatus = "lose"
            return false;
        }
    }
    talk() {
        if (fightStatus === "win") {
            return this._name + " says '" + this._conversation + "'";
        } else {
            return this._name + " cackles loudly '" + this._conversation + "'";
        }
    }
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
        return "This is a " + this._name + ", " + this._description;
    }
}

class Badge extends Item {
    constructor(name, description, type) {
        super(name, description)
        this._type = type;
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
    document.getElementById("currentEvent").innerHTML = text;
    document.getElementById("userInput").focus();
}

function help() {
    const text = "You are a Pokaymon trainer travelling the Canto region on your quest to acquire all 8 gym badges. You can use commands such as north or east to move around. You can interact with characters or objects by using 'fight' or 'inventory'.";
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

let currentCity;

function startGame() {
    currentCity = cratetown;
    firstVisitCratetown();
    displayCityInfo(currentCity);
    
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            document.getElementById("currentEvent").innerHTML = "";
            const command = document.getElementById("userInput").value;
            const directions = ["east", "west", "north", "south"];

            if (command.toLowerCase() === "help") {
                help();
            } else if (command.toLowerCase() === "inventory") {
                getInventory();
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

const pebble = new Badge("Pebble Badge", "gained by defeated gym leader Block", "rock");
const waterfall = new Badge("Waterfall Badge", "gained by defeated gym leader Foggy", "water");
const cracking = new Badge("Cracking Badge", "gained by defeated gym leader Lt. Emerge", "electric");
const prism = new Badge("Prism Badge", "gained by defeated gym leader Ericar", "grass");
const spirit = new Badge("Spirit Badge", "gained by defeated gym leader Toga", "poison");
const quagmire = new Badge("Quagmire Badge", "gained by defeated gym leader Hermione", "psychic");
const terrain = new Badge("Terrain Badge", "gained by defeated gym leader Geovanni", "ground");
const lava = new Badge("Lava Badge", "gained by defeated gym leader Flame", "fire");

const peekachoo = new Pokaymon("Peekachoo", "is an electric-type Pokaymon", "Peeka! Peeekkaaa!", "electric", "ground");

const mum = new Character("Mum", "she is always there for you and always gives great advice", "Have you tried asking for help?")

const foggy = new GymLeader("Foggy", "she is the water-type gym leader", "Hi! You're a new face! What's your policy on Pokaymon? What's your approach? My policy for battle is... an all-out offensive with Water-type Pokaymon!", "water", "grass", "electric", "", waterfall);
const ericar = new GymLeader("Ericar", "she is the grass-type gym leader", "Welcome. My name is Ericar. I am the Gym Leader of Jade City Gym. I am a student of the art of flower arranging. My Pokaymon are all of the Grass type. ...Oh, I'm sorry. Did you perhaps wish to challenge me?", "grass", "poison", "fire", "", prism);
const ltemerge = new GymLeader("Lt. Emerge", "he is the electric-type gym leader", "Hey, kid! What do you think you're doing here? You won't live long in combat! Not with your puny power! I tell you, kid, electric Pokaymon saved me during the war! They zapped my enemies into paralysis! The same as I'll do you to you.", "electric", "ground", "", "", cracking);
const flame = new GymLeader("Flame", "he is the fire-type gym leader", "Hah! I'm Flame, the red-hot Leader of Scarlet Gym! My fiery Pokaymon are all ready with intense heat! They incinerate all challengers!","fire", "ground", "rock", "water", lava);
const block = new GymLeader("Block", "he is the rock-type gym leader", "I'm Block, Lead City's Gym Leader. You can see just by looking at my Pokaymon how rock hard my willpower is. My Pokaymon are all hard as rock and have true-grit determination!","rock", "water", "grass", "", pebble);
const hermione = new GymLeader("Hermione", "she is the psychic-type gym leader", "... So you've come! I had a vision of your arrival. My Pokaymon is hurt, if you could give me a potion, I will give you my badge.", "psychic", "", "", "", quagmire);
const geovanni = new GymLeader("Geovanni", "he is the ground-type gym leader", "So! I must say, I am impressed you got here. Team Locket captures Pokaymon from around the world. They're important tools for keeping our criminal enterprise going. I am the leader, Geovanni! For your insolence, you will feel a world of pain!", "ground", "water", "grass", "", terrain);
const toga = new GymLeader("Toga", "he is the poison-type gym leader", "Fwahahaha! A mere child like you dares to challenge me? That very idea makes me shiver with mirth! Very well, I shall show you true terror as a ninja master! Opponents can't lay a hand on me, as poison brings their steady doom.", "poison", "ground", "psychic", "", spirit);

cratetown.character = mum;
skyBlue.character = foggy;
jade.character = ericar;
crimson.character = ltemerge;
scarlet.character = flame;
lead.character = block;
amber.character = hermione;
olive.character = geovanni;
blush.character = toga;

const potion = new Item("Potion", "this can be used during a fight to heal your Pokaymon if it looks like it may faint.");

jade.item = potion;

cratetown.linkCity("east", skyBlue);
cratetown.linkCity("south", scarlet);
cratetown.linkCity("west", jade);

skyBlue.linkCity("south", crimson);
skyBlue.linkCity("west", cratetown);

jade.linkCity("south", lead);
jade.linkCity("east", cratetown);

crimson.linkCity("north", skyBlue);
crimson.linkCity("south", amber);
crimson.linkCity("west", scarlet);

scarlet.linkCity("north", cratetown);
scarlet.linkCity("east", crimson);
scarlet.linkCity("west", lead);
scarlet.linkCity("south", olive);

lead.linkCity("north", jade);
lead.linkCity("south", blush);
lead.linkCity("east", scarlet);

amber.linkCity("north", crimson);
amber.linkCity("west", olive);

olive.linkCity("north", scarlet);
olive.linkCity("east", amber);
olive.linkCity("west", blush);

blush.linkCity("north", lead);
blush.linkCity("east", olive);

startGame();