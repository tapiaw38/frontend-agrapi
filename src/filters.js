// filters.js
import Vue from 'vue';
import moment from 'moment';

Vue.filter('date-filter', function(date){
    return moment(date).format('LL')
})