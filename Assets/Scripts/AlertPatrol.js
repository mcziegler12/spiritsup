#pragma strict
@script RequireComponent(Rigidbody)

public var firstWaypoint : Waypoint;
private var nextWaypoint : Waypoint;

public var speed : float = 1.0;

function Start () {
	if (firstWaypoint) {
		nextWaypoint = firstWaypoint;
	}
}

function Update () {
	if (nextWaypoint) {
		var waypointTransform : Transform = nextWaypoint.transform;
		var moveDir : Vector3 = Vector3(waypointTransform.position.x - transform.position.x, 0, waypointTransform.position.z - transform.position.z);
		moveDir.Normalize();
		rigidbody.AddForce(moveDir * speed);
	}
}

function changeWaypoint(newWaypoint : Waypoint) {
	if (newWaypoint != nextWaypoint) {
		nextWaypoint = newWaypoint;
	}
	else {
		Debug.Log("Identical waypoint");
	}
}