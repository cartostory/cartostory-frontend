<script>
export default {
  name: 'Landing',
}
</script>

<template>
  <el-main>
    <el-col :span="10" :offset="7">
      <el-row>
        <h1>Cartostory</h1>
      </el-row>
      <el-row>
        <el-col class="section" :span="12">
          <h2>Napsat příběh</h2>
          <p>Chcete napsat svůj vlastní příběh? Z&nbsp;prázdnin, dovolené nebo jen zajímavého sobotního
            výletu?</p>
          <el-button @click="$router.push('/story/create')">Chci psát</el-button>
        </el-col>
        <el-col class="section" :span="12">
          <h2>Číst příběh</h2>
          <p>Váš kamarád nebo příbuzný napsal příběh a poslal vám jeho adresu? Můžete si ho přečíst.</p>
          <el-button @click="$router.push('/story/load')">Chci číst</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-main>
</template>

<style lang="scss" scoped>
h1,
h2 {
  text-align: center;
}

h2 {
  flex: 1 0 100%;
}

.section {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}

.section:first-child {
  border-right: 1px solid #F56C6C;
  padding-right: 1rem;
}

.section:last-child {
  padding-left: 1rem;
}

.section:last-child p {
  flex: 1 0 auto;
}

</style>
