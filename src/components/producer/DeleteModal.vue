<template>
    <div>
        <b-modal id="bv-modal-delete" hide-footer>
            <template #modal-title>
                <h4>Eliminar</h4>
            </template>
            <div class="d-block text-center">
                <div class="row">
                    <div class="col">
                        <div>
                            <div>
                                <h5>¿Estas seguro de eliminar este registro?</h5>
                                <div class="p-4">
                                    <p>Productor: <strong>{{ producerDelete.first_name}} {{ producerDelete.last_name }}</strong></p>
                                    <p>DNI: <strong>{{ producerDelete.document }}</strong></p> 
                                </div>       
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <b-button 
                        v-on:click="deleteProducer" 
                        variant="danger"
                        @click="$bvModal.hide('bv-modal-delete')"
                        >
                            Eliminar
                        </b-button>

                        <b-button  
                        @click="$bvModal.hide('bv-modal-delete')"
                        >
                        Cancelar
                        </b-button>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    name: 'DeleteModal',
    props: [
        'producerDelete'
    ],
    data() {
        return {

        }
    },
    methods: {
        ...mapActions([
            'retrieveProduction'
        ]),
        deleteProducer () {
            const path = `http://www.agrapi.com.ar/api/v1.0/producers/${this.producerDelete.id}/`
            axios.delete(path).then((response) => {
                Swal.fire("Registro eliminado","","success")
                this.retrieveProduction(this.producerDelete.page)

            })
            .catch ((error) => {
                Swal.fire("Error at conect to server","","error")
            })
        }
    }
}
</script>