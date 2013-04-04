#pragma strict
var speechText : String;
var speakerName : String;
var speakerPortrait : Texture;

function initLine(newline : String, newname : String, portFile : String) {
	speechText = newline;
	speakerName = newname;
	speakerPortrait = Resources.Load(portFile, Texture);
}