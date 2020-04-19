<script>
export default {
  name: 'StoryJson',
  props: {
    content: {
      required: true,
      type: String,
    },
  },
};
</script>

<template>
  <div class="section">
    <div class="container">
      <div class="columns has-mb-0">
        <div class="column has-pb-0">
          <div class="notification">
            <h1 class="title is-1 has-text-centered">Uložení příběhu</h1>
            <p>Zatím to jinak neumíme, proto si prosím celý příběh zkopírujte a uložte někam, odkud
              ho budete moct později načíst (např. na <a href="https://github.com">GitHub</a>).</p>
          </div>
        </div>
      </div>
      <textarea class="has-padding-1" v-model="content"></textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  background-color: white;
  height: 80vh;
  overflow: hidden;
}

textarea {
  height: 80%;
  overflow: auto;
  width: 100%;
}
</style>
