#pragma strict
public var chargeSpeed : float = 5.0;
private var patrolScript : AlertPatrol;
private var lostSightTime : int;
private var isAttacking : boolean;
private var cooldown : int;
private var player : GameObject;
private var target : Transform;

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
				rigidbody.velocity = Vector3(0, 0, 0);
				isAttacking = true;
				transform.rotation = Quaternion.LookRotation(Vector3(player.transform.position.x - transform.position.x, 0, player.transform.position.z - transform.position.z));
				target = player.transform;
				wait();
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

function wait() {
	yield WaitForSeconds(2.0);
}

function Attack() {
	if (isAttacking) {
		rigidbody.velocity = transform.forward * chargeSpeed;
		if (Vector3.Distance(transform.position, target.position) <= 2) {
			isAttacking = false;
			rigidbody.velocity = Vector3(0, 0, 0);
		}
	}
	cooldown = 60;
}

function OnCollisionEnter (collision : Collision) {
	if (collision.collider.name == "Player") {
		isAttacking = false;
		rigidbody.velocity = Vector3(0, 0, 0);
		player.GetComponent(ThirdPersonController).takeDamage();
		rigidbody.velocity = Vector3.zero;
	}
}