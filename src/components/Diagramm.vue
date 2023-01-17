<template>
  <div id="myDiagramDiv"></div>
</template>

<script>
import * as go from 'gojs/release/go-module'
import { eventBus } from "@/eventBus";
import AddLinkForm from "@/components/AddLinkForm";
import AddForm from "@/components/AddForm";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Diagramm",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AddForm,
  },
  data() {
    return {
      myDiagram: null,
      $: null,
      firstNodeRelation: null,
      secondNodeRelation: null,
    }
  },
  methods: {
    addNode(node) {
      this.myDiagram.model.addNodeData(node)
      this.$modal.hideAll();
    },
    convertVisibility(v) {
      switch (v) {
        case "public":
          return "+";
        case "private":
          return "-";
        case "protected":
          return "#";
        case "package":
          return "~";
        default:
          return v;
      }
    },

    convertIsTreeLink(r) {
      return r === "generalization";
    },

    convertFromArrow(r) {
      switch (r) {
        case "generalization":
          return "";
        default:
          return "";
      }
    },

    convertToArrow(r) {
      switch (r) {
        case "generalization":
          return "Triangle";
        case "aggregation":
          return "StretchedDiamond";
        case "composition":
          return "StretchedDiamond";
        case "association":
          return "";
        case "realization":
          return "Triangle";
        case "dependence":
          return "Triangle";
        default:
          return "";
      }
    },
    colorArrowFrom(r) {
      switch (r) {
        case "generalization":
          return "White";
        case "aggregation":
          return "White";
        case "composition":
          return "Black";
        case "association":
          return "Black";
        case "realization":
          return "Black";
        case "dependence":
          return "Black";
        default:
          return "White";
      }
    },

    convertDash(r) {
      switch (r) {
        case "generalization":
          return [0, 0];
        case "aggregation":
          return [0, 0];
        case "composition":
          return [0, 0];
        case "association":
          return [0, 0];
        case "realization":
          return [2, 4];
        case "dependence":
          return [2, 4];
        default:
          return [0, 0];
      }
    },
    // eslint-disable-next-line no-unused-vars
    addRelation(relation) {
      this.myDiagram.model.addLinkData(relation)
      this.resetTargets()
    },
    resetTargets() {
      this.secondNodeRelation = null
      this.firstNodeRelation = null
      this.isAdding = false
    },
    clickAddRelation() {
      if (this.firstNodeRelation == null) {
        alert('Выберите блок')
      }
      if (this.isAdding == false && this.firstNodeRelation !== null) {
        this.isAdding = true
        alert('Выберите блок с которым хотите связать')
      }
    },
    // eslint-disable-next-line no-unused-vars
    onClickNode(e, node) {
      if (this.firstNodeRelation === null || !this.isAdding) {
        this.firstNodeRelation = JSON.parse(JSON.stringify(node.data))
      } else if (this.secondNodeRelation == null && this.isAdding) {
        this.secondNodeRelation = JSON.parse(JSON.stringify(node.data))
        //Open form
        this.showAddLinkForm()
      }
    },
    // eslint-disable-next-line no-unused-vars
    onDoubleClick(e, node) {
      // eslint-disable-next-line no-unused-vars
      this.myDiagram.commit(d => console.log(d))
    },
    showAddLinkForm() {
      this.$modal.show(AddLinkForm, { first: this.firstNodeRelation, second: this.secondNodeRelation })
    },

    drawDiagramm() {
      this.$ = go.GraphObject.make;
      this.myDiagram =
        this.$(go.Diagram, "myDiagramDiv",
          {
            "undoManager.isEnabled": true,
            layout: this.$(go.TreeLayout,
              {
                angle: 90,
                path: go.TreeLayout.PathSource,
                setsPortSpot: false,
                setsChildPortSpot: false,
                arrangement: go.TreeLayout.ArrangementHorizontal
              })
          });

      var propertyTemplate =
        this.$(go.Panel, "Horizontal",
          // property visibility/access
          this.$(go.TextBlock,
            { isMultiline: false, editable: true, width: 12 },
            new go.Binding("text", "visibility", this.convertVisibility)),
          this.$(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
          this.$(go.TextBlock, "",
            new go.Binding("text", "type", t => t ? ": " : "")),
          this.$(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "type").makeTwoWay()),
          this.$(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "default", s => s ? " = " + s : ""))
        );

      var methodTemplate =
        this.$(go.Panel, "Horizontal",
          this.$(go.TextBlock,
            { isMultiline: true, editable: true, width: 12 },
            new go.Binding("text", "visibility", this.convertVisibility)),
          this.$(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", s => s[0] === 'c')),
          this.$(go.TextBlock, { isMultiline: false, editable: true }, "()",
            new go.Binding("text", "parameters", function (parr) {
              var s = "(";
              for (var i = 0; i < parr.length; i++) {
                var param = parr[i];
                if (i > 0) s += ", ";
                s += param.name + ": " + param.type;
              }
              return s + ")";
            })),
          this.$(go.TextBlock, "",
            new go.Binding("text", "type", t => t ? ": " : "")),
          this.$(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "type").makeTwoWay())
        );

      this.myDiagram.nodeTemplate =
        this.$(go.Node, "Auto",
          {
            locationSpot: go.Spot.Center,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides,
            click: this.onClickNode,
            doubleClick: this.onDoubleClick,
          },
          this.$(go.Shape, { fill: "lightyellow" }),
          this.$(go.Panel, "Table",
            { defaultRowSeparatorStroke: "black" },
            // header
            this.$(go.TextBlock,
              {
                row: 0, columnSpan: 2, margin: 3, alignment: go.Spot.Center,
                font: "bold 12pt sans-serif",
                isMultiline: false, editable: true
              },
              new go.Binding("text", "name").makeTwoWay()),
            // properties
            this.$(go.TextBlock, "Свойства класса",
              { row: 1, font: "italic 10pt sans-serif" },
              new go.Binding("visible", "visible", v => !v).ofObject("PROPERTIES")),
            this.$(go.Panel, "Vertical", { name: "PROPERTIES" },
              new go.Binding("itemArray", "properties"),
              {
                row: 1, margin: 3, stretch: go.GraphObject.Fill,
                defaultAlignment: go.Spot.Left, background: "lightyellow",
                itemTemplate: propertyTemplate
              }
            ),
            this.$("PanelExpanderButton", "PROPERTIES",
              { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
              new go.Binding("visible", "properties", arr => arr.length > 0)),
            // methods
            this.$(go.TextBlock, "Методы класса",
              { row: 2, font: "italic 10pt sans-serif" },
              new go.Binding("visible", "visible", v => !v).ofObject("METHODS")),
            this.$(go.Panel, "Vertical", { name: "METHODS" },
              new go.Binding("itemArray", "methods"),
              {
                row: 2, margin: 3, stretch: go.GraphObject.Fill,
                defaultAlignment: go.Spot.Left, background: "lightyellow",
                itemTemplate: methodTemplate
              }
            ),
            this.$("PanelExpanderButton", "METHODS",
              { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
              new go.Binding("visible", "methods", arr => arr.length > 0))
          )
        );


      this.myDiagram.linkTemplate =
        this.$(go.Link, { routing: go.Link.Orthogonal },
          new go.Binding("isLayoutPositioned", "relationship", this.convertIsTreeLink),
          this.$(go.Shape, new go.Binding('strokeDashArray', 'relationship', this.convertDash)),
          this.$(go.Shape, { scale: 1.3, fill: "White" },
            new go.Binding("fromArrow", "relationship", this.convertFromArrow)),
          this.$(go.Shape, { scale: 1.3 },
            new go.Binding('fill', 'relationship', this.colorArrowFrom),
            new go.Binding("toArrow", "relationship", this.convertToArrow)),
        );
      this.myDiagram.model = new go.GraphLinksModel(
        {
          copiesArrays: true,
          copiesArrayObjects: true,
          nodeDataArray: this.nodedata,
          linkDataArray: this.linkdata
        });
    },
    async getSavedDiagramm() {
      // eslint-disable-next-line no-unused-vars
      let data = await this.$store.dispatch('SHOW_PROJECT', this.$route.query.id)
      console.log(data.data.schema)
      if (data.data.schema === null) {
        this.$store.commit('setNode', [])
        this.$store.commit('setLink', [])
      } else {
        data.data = JSON.parse(data.data.schema)
        this.$store.commit('setNode', data.data.nodedata)
        this.$store.commit('setLink', data.data.linkdata)
      }
      this.$notify({
        type: data.type,
        title: data.title,
        text: data.message,
      })
    },
    async save() {
      let nodedata = JSON.parse(JSON.stringify(this.myDiagram.model.nodeDataArray))
      let linkdata = JSON.parse(JSON.stringify(this.myDiagram.model.linkDataArray))
      let savedata = { nodedata: nodedata, linkdata: linkdata }
      let updateSchema = {
        data: savedata,
        id: this.$route.query.id
      }
      let data = await this.$store.dispatch('SAVE_SCHEMA', updateSchema)
      this.$notify({
        type: data.type,
        title: data.title,
        text: data.message,
      })
    }
  },
  async mounted() {
    await this.getSavedDiagramm();
    this.drawDiagramm()
    eventBus.$on('addedNode', this.addNode)
    eventBus.$on('clickAddRelation', this.clickAddRelation)
    eventBus.$on('addRelation', this.addRelation)
    eventBus.$on('cancelAddLink', this.resetTargets)
    eventBus.$on('saveJson', this.save)
  },
  destroyed() {
    eventBus.$off('addedNode')
    eventBus.$off('clickAddRelation')
    eventBus.$off('addRelation')
    eventBus.$off('cancelAddLink')
    eventBus.$off('saveJson')

  },
  computed: {
    nodedata() {

      return this.$store.state.nodedata
    },
    linkdata() {
      return this.$store.state.linkdata
    },
    isAdding: {
      get() {
        return this.$store.state.isAdding
      },
      set(value) {
        this.$store.commit('changeIsAdding', value)
      }
    }
  },
}

</script>

<style scoped>

</style>
