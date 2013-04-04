#pragma strict
private var conv : Conversation;
private var lines : Line[] = new Line[4];
private var convStarted : boolean;

function Start() {
	conv = new Conversation();
	convStarted = false;
	for (var i = 0; i < lines.length; i++) {
		lines[i] = new Line();
	}
	lines[0].initLine("Hello, I'm Maki.", "Maki", "Maki");
	lines[1].initLine("Hi! I'm Tamako!", "Tamako", "Tamako");
	lines[2].initLine("Love Live! School Idol Project", "Maki", "Maki");
	lines[3].initLine("Tamako Market", "Tamako", "Tamako");
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