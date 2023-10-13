<script>
	import '../app.postcss';
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
</script>

<Navbar  >
  <NavBrand href="/">
    <span class="self-center text-2xl text-blue-600 dark:text-white">Dreambox</span>
    </NavBrand>
    <NavHamburger />
  <NavUl >
    <NavLi href="/">Home</NavLi>
    <NavLi href="/story">Story</NavLi>
  </NavUl>
</Navbar>
<slot />


