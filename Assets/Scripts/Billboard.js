#pragma strict
var target : Transform;

function Update () {
	transform.LookAt(target);
	transform.eulerAngles.x = 90;
}