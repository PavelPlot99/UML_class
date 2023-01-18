import Vue from 'vue'
import Vuex from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

Vue.use(Vuex)

const TITLE_ON_SUCCESS = 'Успешно'
// eslint-disable-next-line no-unused-vars
const TYPE_ON_SUCCESS = 'success'
const TITLE_ON_ERROR = 'Ошибка'
const TYPE_ON_ERROR = 'error'
// eslint-disable-next-line no-unused-vars
const MESSAGE_ON_ERROR = 'Ошибка сервера'
const URL = ' http://backend.uml.1086129-cj97557.tmweb.ru/api'

axios.defaults.baseURL = URL

export default new Vuex.Store({
    state: {
        userToken: localStorage.getItem('JWT'),
        userLogin: localStorage.getItem('login'),
        nodedata: [
            {
                key: 1,
                name: "BankAccount",
                properties: [
                    { name: "owner", type: "String", visibility: "public" },
                    { name: "balance", type: "Currency", visibility: "public", default: "0" }
                ],
                methods: [
                    { name: "deposit", parameters: [{ name: "Тест", type: "Тестовый" }], visibility: "public" },
                    { name: "withdraw", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
                ]
            },
            {
                key: 11,
                name: "Person",
                properties: [
                    { name: "name", type: "String", visibility: "public" },
                    { name: "birth", type: "Date", visibility: "protected" }
                ],
                methods: [
                    { name: "getCurrentAge", type: "int", visibility: "public" }
                ]
            },
            {
                key: 12,
                name: "Student",
                properties: [
                    { name: "classes", type: "List", visibility: "public" }
                ],
                methods: [
                    { name: "attend", parameters: [{ name: "class", type: "Course" }], visibility: "private" },
                    { name: "sleep", visibility: "private" }
                ]
            },
            {
                key: 13,
                name: "Professor",
                properties: [
                    { name: "classes", type: "List", visibility: "public" }
                ],
                methods: [
                    { name: "teach", parameters: [{ name: "class", type: "Course" }], visibility: "private" }
                ]
            },
            {
                key: 14,
                name: "Course",
                properties: [
                    { name: "name", type: "String", visibility: "public" },
                    { name: "description", type: "String", visibility: "public" },
                    { name: "professor", type: "Professor", visibility: "public" },
                    { name: "location", type: "String", visibility: "public" },
                    { name: "times", type: "List", visibility: "public" },
                    { name: "prerequisites", type: "List", visibility: "public" },
                    { name: "students", type: "List", visibility: "public" }
                ]
            }
        ],
        linkdata: [
            { from: 12, to: 11, relationship: "generalization", },
            { from: 13, to: 11, relationship: "generalization", },
            { from: 14, to: 13, relationship: "dependence", },
            { from: 12, to: 14, relationship: "composition", },
            { from: 11, to: 14, relationship: "association", }
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
        setToken(state, payload) {
            state.userToken = payload
        },
        setUserLogin(state, payload) {
            state.userLogin = payload
        },
        setNode: (state, payload) => {
            state.nodedata = payload
        },
        setLink: (state, payload) => {
            state.linkdata = payload
        }
    },
    actions: {
        REGISTER: async (context, userData) => {
            let data = {
                type: '',
                token: '',
                message: '',
                title: '',
            }
            await axios
                .post('/register', {
                    login: userData.login,
                    password: userData.password,
                },
                    {
                        headers: {
                            Accept: `Application/json`,
                        },
                    }
                )
                .then((result) => {
                    data.type = 'success'
                    data.message = 'Вы успешно зарегистрировались'
                    data.title = TITLE_ON_SUCCESS
                    context.commit('setToken', result.data.data.token)
                    context.commit('setUserLogin', result.data.data.user.login)
                    localStorage.setItem('JWT', result.data.data.token)
                    localStorage.setItem('login', result.data.data.user.login)
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                })
            return data
        },
        LOGIN: async (context, userData) => {
            let data = {
                type: '',
                token: '',
                message: '',
                title: '',
            }
            await axios
                .post('/login', {
                    login: userData.login,
                    password: userData.password,
                },
                    {
                        headers: {
                            Accept: `Application/json`,
                        },
                    }
                )
                .then((result) => {
                    data.type = 'success'
                    data.message = 'Вы успешно вошли'
                    data.title = TITLE_ON_SUCCESS
                    context.commit('setToken', result.data.data.token)
                    context.commit('setUserLogin', result.data.data.user.login)
                    localStorage.setItem('JWT', result.data.data.token)
                    localStorage.setItem('login', result.data.data.user.login)
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                })
            return data
        },
        GET_PROJECTS: async (context) => {
            let data = {}
            await axios
                .get('/project', {
                    headers: {
                        Authorization: `Bearer ${context.state.userToken}`,
                    },
                })
                .then((result) => {
                    data.data = result.data.data
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                })
            return data
        },
        DELETE_PROJECT: async (context, id) => {
            let data = {}
            await axios
                .delete(`/project/${id}`, {
                    headers: {
                        Authorization: `Bearer ${context.state.userToken}`,
                    },
                })
                .then(() => {
                    data.type = TYPE_ON_SUCCESS
                    data.title = TITLE_ON_SUCCESS
                    data.message = 'Проект удален'
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                })
            return data
        },
        CREATE_PROJECT: async (context, project) => {
            let data = {}
            await axios
                .post(
                    '/project',
                    {
                        ...project,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${context.state.userToken}`,
                        },
                    },
                )
                .then((result) => {
                    data.data = result.data.data
                    data.type = TYPE_ON_SUCCESS
                    data.title = TITLE_ON_SUCCESS
                    data.message = "Проект успешно создан"
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                })
            return data
        },
        CREATE_PROJECT_WITH_IMPORT: async (context, project) => {
            let data = {}
            await axios
                .post(
                    '/project/import',
                    project,
                    {
                        headers: {
                            Authorization: `Bearer ${context.state.userToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    },

                )
                .then((result) => {
                    data.data = result.data.data
                    data.type = TYPE_ON_SUCCESS
                    data.title = TITLE_ON_SUCCESS
                    data.message = "Проект успешно создан"
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                })
            return data
        },
        SHOW_PROJECT: async (context, id) => {
            let data = {}
            await axios
                .get(`/project/${id}`, {
                    headers: {
                        Authorization: `Bearer ${context.state.userToken}`,
                    },
                })
                .then((result) => {
                    data.data = result.data.data
                    data.type = TYPE_ON_SUCCESS
                    data.title = TITLE_ON_SUCCESS
                    data.message = "Проект загружен"
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                })
            return data
        },
        SAVE_SCHEMA: async (context, update) => {
            let data = {}
            await axios
                .patch(`/project/${update.id}/schema`,
                    {
                        schema: JSON.stringify(update.data)
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${context.state.userToken}`,
                        },
                    })
                .then((result) => {
                    data.data = result.data.data
                    data.type = TYPE_ON_SUCCESS
                    data.title = TITLE_ON_SUCCESS
                    data.message = "Проект сохранен"
                })
                .catch(() => {
                    data.type = TYPE_ON_ERROR
                    data.title = TITLE_ON_ERROR
                    data.message = MESSAGE_ON_ERROR
                })
            return data
        },
    },
    modules: {}
})
