<template lang="html">
    <div class="container-fluid p-4 content-app">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-8 col-sm-12">
                <div class="mt-1">
                    <b-card no-body>
                        <b-card-body>
                            <h4 class="mb-4">Datos Personales</h4>
                          <b-card-text class="pt-2 pb-2">
                              <p>Nombre: <strong>{{producer.first_name}}</strong></p>
                              <p>Apellido: <strong>{{producer.last_name}}</strong></p>
                              <p>Genero: <strong>{{producer.gender}}</strong></p>
                              <p>DNI: <strong>{{producer.document}}</strong></p>
                              <p>Fecha <strong>de nacimiento: {{producer.date_birth}}</strong></p>
                              <p>Tel: <strong>{{producer.phone_number}}</strong></p>
                          </b-card-text>
                        </b-card-body>
                    </b-card>
                </div>
                <div class="mt-1" v-if="producer.producer_home">
                   <b-card no-body>
                        <b-card-body>
                            <h4 class="mb-4">Recidencia</h4>
                          <b-card-text class="pt-2 pb-2">
                              <p>Distrito: <strong>{{producer.producer_home.district}}</strong></p>
                              <p>Dirección: <strong>{{producer.producer_home.address}}</strong></p>
                              <p>Tipo de vivienda: <strong>{{producer.producer_home.type_recidence}}</strong></p>
                              <p>Estado de vivienda: <strong>{{producer.producer_home.state_recidence}}</strong></p>
                          </b-card-text>
                        </b-card-body>
                    </b-card>
                </div>
                <div class="mt-1" v-if="producer.producer_person">
                   <b-card no-body>
                        <b-card-body>
                            <h4 class="mb-4">Grupo Familiar 
                                <b-badge size="md" variant="success">
                                    {{producer.producer_person.length}}
                                </b-badge>
                            </h4>
                          <b-card-text 
                          class="pt-2 pb-2 second" 
                          v-for="item in producer.producer_person" 
                          :key="item.id"
                          style="padding:15px; border-radius:20px; "
                          >
                            <p><strong>{{item.family_relation}}</strong></p>
                                <p>Nombre: <strong>{{item.first_name}}</strong></p>
                                <p>Apellido: <strong>{{item.last_name}}</strong></p>
                                <p>Edad: <strong>{{item.age}}</strong></p>
                                <p>Estudios Primarios: 
                                    <strong v-if="item.has_primary_studies==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p>Estudios Secundarios: 
                                    <strong v-if="item.has_secondary_studies==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p >Estudios Terciarios: 
                                    <strong v-if="item.has_tertiary_studies==true">Sí</strong>
                                    <strong v-else>Sí</strong>
                                </p>
                                <p>Estudios Universitarios: 
                                    <strong v-if="item.has_university_studies==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p>Desarrolla actividad laboral: 
                                    <strong v-if="item.perform_work_activity==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p v-if="item.perform_work_activity==true">Descripción: <strong>{{item.description}}</strong></p>
                          </b-card-text>
                        </b-card-body>
                    </b-card>
                </div>
                <div class="mt-1" v-if="producer.producer_activity">
                   <b-card no-body>
                        <b-card-body>
                            <h4 class="mb-4">Actividad Laboral</h4>
                          <b-card-text class="pt-2 pb-2">
                                <p>Trabajador Informal: 
                                    <strong v-if="producer.producer_activity.is_informal_worker==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p>Trabajador Formal: 
                                    <strong v-if="producer.producer_activity.is_formal_worker==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p>Dependencia Labaoral: 
                                    <strong v-if="producer.producer_activity.works_under_dependency==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p>Monotributista: 
                                    <strong v-if="producer.producer_activity.is_monotributista==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                                <p v-if="producer.producer_activity.is_monotributista==true">Categoria: 
                                    <strong>{{producer.producer_activity.category}}</strong>
                                </p>
                                <p>Contrata Mano de obra externa: <strong>{{producer.producer_activity.use_external_labor}}</strong></p>
                          </b-card-text>
                            <b-card no-body>
                                <b-card-body>
                                    <h4 class="mb-4">Empleados 
                                        <b-badge size="md" variant="success">
                                            {{producer.producer_activity.activity_worker.length}}
                                        </b-badge>
                                    </h4>
                                <b-card-text 
                                class="pt-2 pb-2 second" 
                                v-for="item in producer.producer_activity.activity_worker" 
                                :key="item.id"
                                style="padding:15px; border-radius:20px; "
                                >
                                    <p><strong>{{item.type_person}}</strong></p>
                                    <p>Reside en las instalaciones: 
                                        <strong v-if="item.is_resident==true">Sí</strong>
                                        <strong v-else>No</strong>
                                    </p>
                                    <p>Genero: <strong>{{item.gender}}</strong></p>
                                    <p>Remunercación: 
                                        <strong v-if="item.receive_remuneration==true">Sí</strong>
                                        <strong v-else>No</strong>
                                    </p>
                                    <p>Cargo: <strong>{{item.work_position}}</strong></p>
                                    <p>Tipo: <strong>{{item.type_job}}</strong></p>
                                </b-card-text>
                                </b-card-body>
                            </b-card>
                        </b-card-body>
                    </b-card>
                </div>
                <div class="mt-1" v-if="producer.producer_vehicle">
                   <b-card no-body>
                        <b-card-body>
                            <h4 class="mb-4">Vehiculos
                                <b-badge size="md" variant="success">
                                    {{producer.producer_vehicle.length}}
                                </b-badge>
                            </h4>
                          <b-card-text 
                          class="pt-2 pb-2 second" 
                          v-for="item in producer.producer_vehicle" 
                          :key="item.id"
                          style="padding:15px; border-radius:20px; "
                          >
                            <p><strong>{{item.name_vehicle}}</strong></p>
                                <p>Usa Acomplado: 
                                  <strong v-if="item.use_trailer==true">Sí</strong>
                                  <strong v-else>No</strong>
                                </p>
                                <p>Tipo de Acoplado: 
                                    <strong>{{item.type_trailer}}</strong>
                                </p>
                                <p>Usa Semi Acoplado: 
                                    <strong v-if="item.use_semitrailer==true">Sí</strong>
                                    <strong v-else>No</strong>
                                </p>
                          </b-card-text>
                        </b-card-body>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            producerId: this.$route.params.producerId,

        }
    },
    mounted() {
        this.retrieveProducer(this.producerId)
    },
    methods: {

        ...mapActions([
            'retrieveProducer'
        ])
    },
    computed: {
        ...mapGetters([
            'producer'
        ])
    }
}
</script>