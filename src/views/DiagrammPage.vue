<template>
  <div>
    <div class="area-diagramm" id="myDiagramDiv">
      <Diagram/>
    </div>
    <Menu/>
  </div>
</template>

<script>
import '../assets/styles/style.css'
import Diagram from "@/components/Diagramm";
import Menu from "@/components/Menu";
export default {
  name: 'DiagrammPage',
  components: {
    Diagram,
    Menu,
  }
}
</script>

<style scoped>
.area-diagramm {
  background: transparent url("/src/assets/images/back_dim.png");
  min-height: calc(100vh - 10px);
}
</style>
