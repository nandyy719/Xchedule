<script>
  import {onMount} from 'svelte';
  import axios from 'axios';
  const endpoint = "http://localhost:3000/posts";
  let posts = [];

  onMount(async () => {
    try{
      const res = await axios.get(endpoint);
      posts = res.data;
    } catch(error){
      console.error(error);
    }
    
  });


</script>

<main>
  <h1>Hello World!</h1>
  {#each posts as post}
    <div>
      <p>{post.title}</p>
    </div>
  {/each}
</main>

<style>

</style>
