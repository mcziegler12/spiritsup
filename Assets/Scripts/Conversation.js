#pragma strict
private var lines : Line[];
private var curLine : int;

function startConversation (newlines : Line[]) {
	lines = newlines;
	GameObject.FindObjectOfType(DialogueManager).startConversation(this, lines[0]);
	curLine = 1;
}

function nextLine() : Line {
	if (curLine == lines.length) {
		curLine = 0;
		GameObject.FindObjectOfType(DialogueManager).stopConversation();
		return null;
	}
	else {
		curLine++;
		return lines[curLine-1];
	}
}