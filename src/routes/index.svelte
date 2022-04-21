<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<script>
  import { onMount } from "svelte";
  function show() {
    window.setTimeout(function () {
      var instance = new Notification(
        "poo", {
          body: "hello friend"
        }
      );

      instance.onclick = function () {
        // Something to do
      };
      instance.onerror = function () {
        // Something to do
      };
      instance.onshow = function () {
        // Something to do
      };
      instance.onclose = function () {
        // Something to do
      };
    }, 0);

    return false;
  }
  onMount(() => {
    var Notification = window.Notification || window.mozNotification || window.webkitNotification;

    Notification.requestPermission(function (permission) {
      console.log(permission);
    });
  });
</script>

<button href="#" on:click={show}>Notify me!</button>