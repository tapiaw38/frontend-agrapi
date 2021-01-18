<template lang="html">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="card m-2">
                    <div class="card-body">
                        <h3>¿Estas seguro que deseas eliminar este registro?</h3>
                        <p>Productor: {{ this.element.first_name}} {{ this.element.last_name }}</p>
                        <p>DNI: {{ this.element.document }}</p>        
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <b-button v-on:click="deleteProducer" variant="danger">
                    Eliminar
                </b-button>

                <b-button variant="secondary" :to="{ name: 'ListProducer' }">
                    Cancelar
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            producerId: this.$route.params.producerId,
            element: {
                first_name: '',
                last_name: '',
                document: '',
            }
        }
    },
    methods: {
        getProducer () {
            const path = `http://localhost:8000/api/v1.0/pollsters/all/${this.producerId}/`
            axios.get(path).then((response) => {
                this.element.first_name = response.data.producer.first_name
                this.element.last_name = response.data.producer.last_name
                this.element.document = response.data.producer.document
            })
            .catch((error) => {
                console.log(error)
                Swal.fire("Error at conect to server","","error")
            })
        },
        deleteProducer () {
            const path = `http://localhost:8000/api/v1.0/pollsters/all/${this.producerId}/`
            axios.delete(path).then((response) => {
                location.href = '/producers/'
            })
            .catch ((error) => {
                Swal.fire("Error at conect to server","","error")
            })
        }
    },
    created() {
        this.getProducer()
    },
}
</script>