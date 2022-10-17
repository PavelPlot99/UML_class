import Vue from 'vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        nodedata: [
            {
                key: 1,
                name: "BankAccount",
                properties: [
                    {name: "owner", type: "String", visibility: "public"},
                    {name: "balance", type: "Currency", visibility: "public", default: "0"}
                ],
                methods: [
                    {name: "deposit", parameters: [{name: "Тест", type: "Тестовый"}], visibility: "public"},
                    {name: "withdraw", parameters: [{name: "amount", type: "Currency"}], visibility: "public"}
                ]
            },
            {
                key: 11,
                name: "Person",
                properties: [
                    {name: "name", type: "String", visibility: "public"},
                    {name: "birth", type: "Date", visibility: "protected"}
                ],
                methods: [
                    {name: "getCurrentAge", type: "int", visibility: "public"}
                ]
            },
            {
                key: 12,
                name: "Student",
                properties: [
                    {name: "classes", type: "List", visibility: "public"}
                ],
                methods: [
                    {name: "attend", parameters: [{name: "class", type: "Course"}], visibility: "private"},
                    {name: "sleep", visibility: "private"}
                ]
            },
            {
                key: 13,
                name: "Professor",
                properties: [
                    {name: "classes", type: "List", visibility: "public"}
                ],
                methods: [
                    {name: "teach", parameters: [{name: "class", type: "Course"}], visibility: "private"}
                ]
            },
            {
                key: 14,
                name: "Course",
                properties: [
                    {name: "name", type: "String", visibility: "public"},
                    {name: "description", type: "String", visibility: "public"},
                    {name: "professor", type: "Professor", visibility: "public"},
                    {name: "location", type: "String", visibility: "public"},
                    {name: "times", type: "List", visibility: "public"},
                    {name: "prerequisites", type: "List", visibility: "public"},
                    {name: "students", type: "List", visibility: "public"}
                ]
            }
        ],
        linkdata: [
            {from: 12, to: 11, relationship: "generalization",},
            {from: 13, to: 11, relationship: "generalization",},
            {from: 14, to: 13, relationship: "dependence",},
            {from: 12, to: 14, relationship: "composition",},
            {from: 11, to: 14, relationship: "association",}
        ],
        isAdding: false,
    },
    getters: {},
    mutations: {
        addNode: (state, payload) => {
            let arr = state.nodedata.sort((a, b) => a.key > b.key ? 1 : -1)
            payload.key = arr[arr.length - 1].key + 1
            state.nodedata.push(payload)
        },
        changeIsAdding: (state, payload) => {
          state.isAdding = payload
        },
    },
    actions: {},
    modules: {}
})
