#pragma strict
@script RequireComponent(AudioSource)

public var greetingClip : AudioClip;

function Start () {

}

function Update () {

}

function OnTriggerEnter(other : Collider) {
	if (other.GetComponent(ThirdPersonController)) {
		audio.clip = greetingClip;
		audio.Play();
	}
}