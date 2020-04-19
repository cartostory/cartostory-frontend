<script>
export default {
  name: 'Landing',
};
</script>

<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns">
        <div class="column is-6 is-offset-3">

          <div class="columns">
            <div class="column">
              <h1 class="title is-1 has-text-weight-normal has-text-centered has-mb-1">Cartostory</h1>
            </div>
          </div>

          <div class="columns">

            <div class="column is-6 section-left has-pb-0">
              <h2 class="title is-2 has-text-weight-normal has-text-centered has-mb-2">Napsat příběh</h2>
              <p>Chcete napsat svůj vlastní příběh? Z&nbsp;prázdnin, dovolené nebo jen zajímavého sobotního
                výletu?</p>
              <b-button @click="$router.push('/story/create')">Chci psát</b-button>
            </div>

            <div class="column is-6 section-right has-pb-0">
              <h2 class="title is-2 has-text-weight-normal has-text-centered has-mb-2">Číst příběh</h2>
              <p>Váš kamarád nebo příbuzný napsal příběh a poslal vám jeho adresu? Můžete si ho přečíst.</p>
              <b-button @click="$router.push('/story/load')">Chci číst</b-button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</template>

<style lang="scss" scoped>
p {
  flex: 1;
  margin-bottom: 1rem;
}

.section-left,
.section-right {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.section-left {
  border-right: 1px solid #F56C6C;
  padding-right: 1rem;
}

.section-right {
  padding-left: 1rem;
}

.section-right p {
  flex: 1 0 auto;
}
</style>
