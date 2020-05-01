<script>
export default {
  name: 'Landing',
};
</script>

<template>
  <div class="columns background has-no-margin">
    <div class="column is-half">
      <h1 class="claim has-pl-1">Cartostory je plné příběhů</h1>
    </div>
    <div class="column is-half">
      <div class="box has-padding-2">
        <h1 class="title is-1 has-text-centered">Každý příběh je plný dobrodružství&hellip;</h1>
        <p>Určitě už jste zažili v přírodě dobrodružství, které se vám vrylo hluboko do paměti.
        Zachytili jste ho na fotkách, možná i na videu, pomocí chytrých hodinek nebo mobilu jste
        měřili rychlost, tep, spálené kalorie. Děláme to tak všichni, ne?</p>

        <p>Možná za dobrodružstvím ale nevyrážíte jen kvůli grafu tepové frekvence.
        Možná, stejně jako my, vyrážíte i pro ten pocit, že se něco děje, pro radost z pohybu, za
        novými objevy.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.claim {
  color: white;
  font-family: 'Dancing Script';
  font-size: 8rem;
  line-height: 10rem;
}

.columns {
  align-items: center;
  min-height: calc(100vh - #{$navbar-height});
}
</style>
