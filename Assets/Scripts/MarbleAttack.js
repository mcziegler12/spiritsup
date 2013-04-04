#pragma strict
public var chargeSpeed : float = 5.0;
private var patrolScript : AlertPatrol;
private var lostSightTime : int;
private var isAttacking : boolean;
private var cooldown : int;
private var player : GameObject;

function Start () {
	patrolScript = GetComponent(AlertPatrol);
	lostSightTime = 0;
	cooldown = 0;
	isAttacking = false;
	player = GameObject.FindWithTag("Player");
}

function Update () {
	if (patrolScript.isAlert()) {
		if (patrolScript.isAware()) {
			if (cooldown <= 0) {
				Attack();
			}
			cooldown--;
			if (cooldown < 0) {
				cooldown = 0;
			}
		}
		else {
			transform.rotation.y += 5;
			lostSightTime++;
			if (lostSightTime >= 90) {
				lostSightTime = 0;
				patrolScript.setIdle();
			}
		}
	}
}

function Attack() {
	isAttacking = true;
	rigidbody.velocity = Vector3(0, 0, 0);
	transform.rotation = Quaternion.LookRotation(Vector3(player.transform.position.x - transform.position.x, 0, player.transform.position.z - transform.position.z));
	yield WaitForSeconds(2.0);
	rigidbody.velocity = transform.forward * chargeSpeed;
	yield WaitForSeconds(1.0);
	rigidbody.velocity = Vector3.zero;
	isAttacking = false;
	cooldown = 60;
}

function OnCollisionEnter (collision : Collision) {
	if (collision.collider.name == "Player") {
		player.GetComponent(ThirdPersonController).takeDamage();
		rigidbody.velocity = Vector3.zero;
	}
}