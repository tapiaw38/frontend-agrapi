<template>
    <div class="container-fluid pl-4 pr-4 list content-app">
        <div class="row">
            <div class="col text-left pt-2">
                <div class="text-left m-3">
                    <h4>
                      Registros<b-badge class="ml-2" variant="success">{{ countProducer }}</b-badge>
                    </h4>
                    <b-form inline>
                        <b-form-group>
                            <nav class="pagination" role="navigation">
                                <b-button class="btn-icon-arrow" variant="light" @click="changePage(page-1)">
                                    <b-icon scale="1.5" variant="success" icon="arrow-left-short" aria-hidden="true"></b-icon>
                                </b-button>
                                <li>
                                    <b-badge class="m-2" variant="light">{{ page }} de {{ pages }}</b-badge>
                                </li>
                                <b-button class="btn-icon-arrow" variant="light" @click="changePage(page+1)">
                                    <b-icon scale="1.5" variant="success" icon="arrow-right-short" aria-hidden="true"></b-icon>
                                </b-button>
                               </nav>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input 
                            v-model="searching" id="form-search" 
                            size="sm" 
                            class="mb-2 m-sm-3 mb-sm-0" 
                            placeholder="Busqueda por Apellido"
                            ></b-form-input>
                            <b-form-input 
                            v-model="document" id="form-document" 
                            size="sm" 
                            class="mb-2 m-sm-3 mb-sm-0" 
                            placeholder="Busqueda por DNI"
                            ></b-form-input>
                        
                        </b-form-group>
                    </b-form>
                  </div>
                <div class="col-md-12">
                    <b-table striped hover :items="filterProducerName" :fields="fields" :busy="isBusy">

                        <template v-slot:cell(first_name)="data">
                            {{ data.item.producer.first_name }}
                        </template>

                        <template v-slot:cell(last_name)="data">
                            {{ data.item.producer.last_name }}
                        </template>

                        <template v-slot:cell(date_birth)="data">
                            {{ data.item.producer.date_birth | date-filter}}
                        </template>

                        <template v-slot:cell(document)="data">
                            {{ data.item.producer.document }}
                        </template>

                        <template v-slot:cell(phone_number)="data">
                            {{ data.item.producer.phone_number }}
                        </template>

                        <template v-slot:cell(created)="data">
                            {{ data.item.modified | date-filter }}
                        </template>

                        <template v-slot:cell(production)="data">
                            <div class="row" v-for="items in data.item.producer.production" :key="items.id">
                                <p class="text-inline text-list m-1" v-if="items.production_agricultural.length != 0">Agricola 
                                    <b-badge variant="success"></b-badge>
                                </p>
                                <p class="text-inline text-list m-1" v-if="items.production_livestock.length != 0">Ganadera 
                                    <b-badge variant="success"></b-badge>
                                </p>
                                <p class="text-inline text-list m-1" v-if="items.production_agroindustrial.length != 0">Agro-industrial 
                                    <b-badge variant="success"></b-badge>
                                </p>
                            </div>
                        </template>

                        <template v-slot:cell(action)="data">
                            <b-button :to="{ name: 'EditProducer', params: {producerId:data.item.id} }" size="sm" variant="light">
                                <b-icon icon="pencil" aria-hidden="true" variant="success"></b-icon>
                            </b-button>
                            <b-button
                            size="sm" 
                            variant="danger"
                            v-on:click="getId(
                                data.item.id,
                                data.item.producer.first_name,
                                data.item.producer.last_name,
                                data.item.producer.document,
                                )"
                            id="show-btn" @click="$bvModal.show('bv-modal-delete')"
                            >
                                <b-icon icon="trash" aria-hidden="true"></b-icon>
                            </b-button>
                        </template>

                        <template v-slot:cell(date)="data">
                            <b-button
                            :to="{ name: 'DatePerson', params: {producerId:data.item.id} }" 
                            size="sm" 
                            variant="light">
                                <b-icon icon="person" variant="success"></b-icon>
                            </b-button>
                            <b-button 
                            :to="{ name: 'DateProduction', params: {producerId:data.item.id} }" 
                            size="sm" 
                            variant="success"
                            >
                                <b-icon icon="graph-up"></b-icon>
                            </b-button>
                        </template>

                        <template v-slot:table-busy>
                            <div class="text-center text-success my-2">
                              <b-spinner class="align-middle"></b-spinner>
                              <strong>Loading...</strong>
                            </div>
                        </template>

                    </b-table>

                </div>
            </div>
        </div>
        <DeleteModal :producerDelete="producerDelete"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    import DeleteModal from './DeleteModal.vue'
    export default {
        components:{
            DeleteModal
        },
        data () {
            return {
                document : '',
                fields : [
                    {key : 'first_name', label : 'Nombre'},
                    {key : 'last_name', label : 'Apellido'},
                    {key : 'date_birth', label : 'Fecha Nacimiento'},
                    {key : 'document', label : 'DNI'},
                    {key : 'phone_number', label : 'Tel'},
                    {key : 'production', label : 'Producción'},
                    {key : 'created', label : 'Modificado'},
                    {key : 'action', label : 'Acciones'},
                    {key : 'date', label : 'Datos'},
                ],
    
                searching: '',
                document: '',
                page: 1,
                producerDelete: {
                    id: '',
                    first_name: '',
                    last_name: '',
                    document: '',
                    page: '',
                },
            }
        },
        mounted() {
            this.$store.dispatch('retrieveProduction',this.page)

        },
        methods: {
            ...mapActions([
                'retrieveProduction',
            ]),

            changePage (page) {
                this.page = (page <= 0 || page > this.pages) ? this.page : page;
                this.retrieveProduction(this.page)
            },
            getId: function (id, first_name, last_name, document) {
                this.producerDelete.id=id
                this.producerDelete.first_name=first_name
                this.producerDelete.last_name=last_name
                this.producerDelete.document=document
                this.producerDelete.page = this.page
            }
        },
        computed: {
            ...mapGetters({
                admin: 'admin',
                production: 'production',
                pages: 'pages',
                isBusy: 'isBusy',
                countProducer: 'countProducer',
            }),
            filterProducerName: function () {
                return this.production.filter((items) => items.producer.last_name.toUpperCase().includes(this.searching.toUpperCase())&&items.producer.document.includes(this.document));
            },
        }
    }
</script>

<style>
#form-search{
    width: 30em;
}
.expand :hover{
    transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -webkit-transition: all 500ms;
}
.btn-icon-arrow:hover svg{
    transform: scale(1.1);
    -ms-transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -webkit-transition: all 900ms;
}
.badge-register {
    border-radius: 50%;
}
.list {
    background-color: white;
    height: 100%;
}
.text-list {
    font-size: 0.8rem;
    font-weight: bold;
    font-family: sans-serif;
}
</style>