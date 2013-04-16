#pragma strict

private var objectTransform : Transform;
private var isGoingUp : boolean = true;
private var startY : float;

public var heightOffset : float = 1.0;

public var movementSpeed : float = 0.2;
public var rotationSpeed : float = 1.0;

private var auraObject : GameObject;

function Start () {
	objectTransform = GetComponent.<Transform>();
	startY = objectTransform.localPosition.y;
	auraObject = GameObject.Find("PenPickupAura");
	
	//Set the aura's position to the pickup's position
	var auraTransform : Transform;
	auraTransform = auraObject.GetComponent.<Transform>();
	auraTransform.position = objectTransform.position;
	auraTransform.parent = objectTransform;
}

function Update () {
	if(isGoingUp) {
		objectTransform.localPosition.y += movementSpeed;
		if (objectTransform.localPosition.y > heightOffset + startY) {
			isGoingUp = false;
		}
	}
	else {
		objectTransform.localPosition.y -= movementSpeed;
		if (objectTransform.localPosition.y < startY - heightOffset) {
			isGoingUp = true;
		}
	}
	objectTransform.Rotate(Vector3(0, 0, 1), rotationSpeed);
}