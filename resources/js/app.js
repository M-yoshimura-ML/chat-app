/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Echo from 'laravel-echo';
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
 Vue.use(VueChatScroll)

require('./bootstrap');

window.Vue = require('vue').default;


import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
import axios from 'axios';
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/Message.vue').default);

const app = new Vue({
    el: '#app',
    data:{
        message:'',
        chat:{
            message:[],
            user:[],
            color:[],
            time:[]
        },
        typing:'',
        numberOfUser:0
    },
    watch:{
        message(){
            window.Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods:{
        send(){
            if(this.message.length !=0){
                //console.log(this.message);
                this.chat.message.push(this.message);
                this.chat.color.push('success');
                this.chat.user.push('you');
                this.chat.time.push(this.getTime());
                axios.post('/send', {
                    message: this.message,
                    chat:this.chat
                })
                .then(response => {
                    console.log(response);
                    this.message = '';
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        getTime(){
            let time = new Date();
            return time.getHours()+':'+ time.getMinutes();
        },
        getOldMessages(){
            axios.post('/getOldMessages')
                .then(response=>{
                    console.log(response);
                    if(response.data != ''){
                        this.chat = response.data;
                    }
                })
                .catch(error=>{
                    console.log(error);
                })
        }
    },
    mounted(){
        this.getOldMessages();
        window.Echo.private('chat')
        .listen('ChatEvent', (e) => {
            this.chat.message.push(e.message);
            this.chat.user.push(e.user);
            this.chat.color.push('warning');
            this.chat.time.push(this.getTime());
            axios.post('/saveToSession',{
                chat: this.chat
            })
            console.log(e);
        })
        .listenForWhisper('typing', (e) => {
            if(e.name!=''){
                //console.log('typing');
                this.typing='typing...';
            }else{
                //console.log('');
                this.typing='';
            }
            //console.log(e.name);
        });
        window.Echo.join('chat')
        .here((users) => {
            this.numberOfUser = users.length;
            console.log(users);
         })
         .joining((user) => {
             this.numberOfUser += 1;
             this.$toaster.success(user.name + ' joined chat');
             console.log(user.name);
        })
        .leaving((user) => {
            this.numberOfUser -= 1;
            this.$toaster.warning(user.name + ' leaved chat');
        })
        .error((error) => {
        });
    }
});
