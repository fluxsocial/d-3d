<svelte:options tag={null}/>

<script lang="ts">
    function handleClick() {
        if (path != null) {
            console.log("Trying to load URL/path", path);
            commitExpression(path);
        } else {
            console.error("Please provide either a file or url")
        }
    }

    let path = null
    export let commitExpression
</script>

<label for="myfile">Select a file:</label>
<input type="file" id="file" name="file" bind:value={path}>
<br>
<label for="myfile">Or, use a url:</label>
<input id="url" name="url" bind:value={path}>
<br>
<button on:click={handleClick}>Submit</button>

<style>
</style>