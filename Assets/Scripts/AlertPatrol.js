#pragma strict
@script RequireComponent(Rigidbody)

public var firstWaypoint : Waypoint;
public var isRolling : boolean;
private var nextWaypoint : Waypoint;
private var awarePlayer : boolean;

public var speed : float = 1.0;
public var visionAngle : float = 60;
public var visionRange : float = 100;

function Start () {
	if (firstWaypoint) {
		nextWaypoint = firstWaypoint;
	}
	awarePlayer = false;
}

function Update () {
	findPlayer();
	if (nextWaypoint && !awarePlayer) {
		var waypointTransform : Transform = nextWaypoint.transform;
		transform.rotation = Quaternion.LookRotation(Vector3(waypointTransform.position.x - transform.position.x, 0, waypointTransform.position.z - transform.position.z));
		if (isRolling) {
			rigidbody.AddForce(transform.forward * speed);
		}
		else {
			rigidbody.velocity = transform.forward * speed;
		}
	}
	else if (awarePlayer) {
		var player : GameObject = GameObject.FindWithTag("Player");
		transform.rotation = Quaternion.LookRotation(Vector3(player.transform.position.x - transform.position.x, 0, player.transform.position.z - transform.position.z));
		if (isRolling) {
			rigidbody.AddForce(transform.forward * speed);
		}
		else {
			rigidbody.velocity = transform.forward * speed;
		}
	}
	
}

function findPlayer() {
	var player : GameObject = GameObject.FindWithTag("Player");
	var hit : RaycastHit;
	var distanceToPlayer : float = Vector3.Distance(transform.position, player.transform.position);
	var directionToPlayer : Vector3 = player.transform.position - transform.position;
	var angleToPlayer : float = Vector3.Angle(directionToPlayer, transform.forward);
	//Debug.Log(distanceToPlayer); Debug.Log(directionToPlayer); Debug.Log(angleToPlayer);
	
	if (Mathf.Abs(angleToPlayer) < visionAngle && distanceToPlayer < visionRange) {
		Physics.Linecast(transform.position, player.transform.position, hit);
		Debug.Log(hit.collider.name);
		if (hit.collider.name == player.collider.name) {
			awarePlayer = true;
		}
		else {
			awarePlayer = false;
		}
	}
	else {
		awarePlayer = false;
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