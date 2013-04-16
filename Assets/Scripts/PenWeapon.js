#pragma strict
public var pushForce : float = 3.0;
var explosion : Transform;

function Start () {

}

function Update () {

}

function OnTriggerEnter(collision : Collider) {
	if (GameObject.Find("Player").GetComponent(Pen).getIsAttacking() && collision.GetComponent(AlertPatrol)) {
		var explosionIns : Transform;
		explosionIns = Instantiate(explosion, collision.transform.position, collision.transform.rotation);
		Destroy(explosionIns.gameObject, 0.5);
	}
}

function OnTriggerStay(collision : Collider)  {
	if (GameObject.Find("Player").GetComponent(Pen).getIsAttacking()) {
		if (collision.GetComponent(MarbleAttack)) {
			collision.rigidbody.AddForce(transform.up * pushForce);
		}
	}
}