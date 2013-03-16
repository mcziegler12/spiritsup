#pragma strict

public var enabled = true;
public var nextWaypoint : Waypoint;

function Start () {
	
}

function Update () {

}

function OnTriggerEnter (other : Collider) {
	if (other.GetComponent(AlertPatrol)) {
		if (nextWaypoint) {
			other.GetComponent(AlertPatrol).changeWaypoint(nextWaypoint);
		}
	}
}