<script context="module" lang="ts">
  import type { Load } from './__types/index@big';

  export const load: Load = async () => {
    return {
      stuff: {
        animate: true,
      },
    };
  };
</script>

<div class="
  h-32 w-32
  sm:h-52 sm:w-52 
  rounded-full overflow-hidden mx-auto 
  mt-8 border-accent border-2">
  <img src="/images/headshot.jpg" alt="headshot" />
</div>
<div class="mx-auto text-center mt-4 
  text-2xl sm:text-3xl 
  font-display text-accent">
  Albert Choi
</div>
<div class="mx-auto text-center mt-1 
  text-lg sm:text-xl
  font-display text-accent">
  I write code and sometimes prose.
</div>

<div class="flex flex-col sm:flex-row 
  items-center
  mx-auto w-2/3 sm:justify-evenly mt-4 
  text-xl sm:text-2xl 
  text-pop font-display">
  <div class="hover:scale-110">
    <a href="/blog">Blog</a>
  </div>
  <div class="hover:scale-110">
    <a href="/prose">Prose</a>
  </div>
  <div class="hover:scale-110">
    <a href="/code">Code</a>
  </div>
</div>

<div class="flex mt-4 w-2/3 mx-auto justify-evenly
  text-pop text-2xl sm:text-4xl">
  <a href="https://github.com/fichince" target="_blank" rel="noreferrer noopener"
    class="hover:scale-110">
    <!--<FontAwesomeIcon icon={faGithubSquare} />--> github
  </a>
  <a href="https://www.facebook.com/albert.choi.583/" target="_blank" rel="noreferrer noopener"
    class="hover:scale-110">
    <!--<FontAwesomeIcon icon={faFacebookSquare} />--> facebook
  </a>
  <a href="https://www.linkedin.com/in/albert-choi-202b8923/" target="_blank" rel="noreferrer noopener"
    class="hover:scale-110">
    <!--<FontAwesomeIcon icon={faLinkedin} />--> linkedin
  </a>
</div>
