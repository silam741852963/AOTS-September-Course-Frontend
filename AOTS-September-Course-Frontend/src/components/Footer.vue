<template>
  <footer
    class="flex place-content-between sticky bottom-0 w-full px-3 border-t-2 bg-black"
  >
    <p class="text-2xl text-center">&copy; RAA {{ date.getFullYear() }}</p>

    <a href="tel:+555-123-4567">Phone: 555-123-4567</a>
    <a href="mailto:raa.rent@example.com">raa.rent@example.com</a>
    <address class="text-right">
      1234 Elm Street <br />
      Maplewood, Anytown 56789 <br />
      Fictional Country <br />
    </address>
  </footer>
</template>
<script setup>
const date = new Date();
</script>
