#pragma strict
@script RequireComponent(Rigidbody)

public var firstWaypoint : Waypoint;
public var isRolling : boolean;
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
		transform.rotation = Quaternion.LookRotation(Vector3(waypointTransform.position.x - transform.position.x, 0, waypointTransform.position.z - transform.position.z));
		if (isRolling) {
			rigidbody.AddForce(transform.forward * speed);
		}
		else {
			rigidbody.velocity = transform.forward * speed;
		}
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