#pragma strict
private var activeConv : Conversation;
private var dialogActive : boolean;
private var currentLine : Line;
public var background : Texture;

public function Start() {
	dialogActive = false;
}

function startConversation(newConv : Conversation, firstLine : Line) {
	activeConv = newConv;
	currentLine = firstLine;
	dialogActive = true;
	GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = false;
	GameObject.FindWithTag("Player").GetComponent(ThirdPersonController).enabled = false;
}

function stopConversation() {
	dialogActive = false;
	activeConv = null;
	currentLine = null;
	GameObject.FindWithTag("Player").GetComponent(CharacterMotor).enabled = true;
	GameObject.FindWithTag("Player").GetComponent(ThirdPersonController).enabled = true;
}

function OnGUI() {
	if (dialogActive) {
		var e : Event = Event.current;
		if (e.type == EventType.MouseDown) {
			currentLine = activeConv.nextLine();
		}
		
		if (background) {
			GUI.DrawTexture(Rect(20, Screen.height - 210, Screen.width - 40, 180), background);
		}
		GUI.Label(Rect(50, Screen.height - 200, 50, 20), currentLine.speakerName);
		GUI.DrawTexture(Rect(50, Screen.height - 160, 110, 110), currentLine.speakerPortrait);
		GUI.Label(Rect(220, Screen.height - 160, Screen.width - 200, 200), currentLine.speechText);
	}
}