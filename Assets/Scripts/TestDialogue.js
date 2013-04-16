#pragma strict
private var conv : Conversation;
private var lines : Line[] = new Line[7];
private var convStarted : boolean;

function Start() {
	conv = new Conversation();
	convStarted = false;
	for (var i = 0; i < lines.length; i++) {
		lines[i] = new Line();
	}
	lines[0].initLine("Hey, I haven't seen you around here before.", "Janice", "Janice");
	lines[1].initLine("I was accidentally thrown down here with the other unwanted toys.", "Margaritte", "Margaritte");
	lines[2].initLine("I need to find a way back up.", "Margaritte", "Margaritte");
	lines[3].initLine("It won't be easy, especially when you're still clearly loved.", "Janice", "Janice");
	lines[4].initLine("Not every toy down here is going to be as friendly as I am. Some are going to resent you for it.", "Janice", "Janice");
	lines[5].initLine("You'll have to fight your way through some of the more hostile toys. You should find something you can use to defend yourself with.", "Janice", "Janice");
	lines[6].initLine("I will. Thanks for the warning!", "Margaritte", "Margaritte");
}

function OnTriggerStay (other : Collider) {
	if (other.GetComponent(ThirdPersonController)) {
		if (Input.GetKeyDown(KeyCode.E) && !convStarted) {
			convStarted = true;
			conv.startConversation(lines);
		}
	}
}

function OnTriggerExit (other : Collider) {
	convStarted = false;
}