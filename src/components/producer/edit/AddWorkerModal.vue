<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addWorker" 
        @show="resetModalWorker"
        @ok="handleOkWorker"
        >
            <template #modal-title>
                <h4>Añadir a Empleados</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitWorker">

                <b-form-group
                label="Es trabajador formal"
                label-for="is_formal_worker"
                >
                    <b-form-checkbox
                        v-model.trim="items.is_formal_worker"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Tipo de persona"
                label-for="type_person"
                >
                <b-form-input
                    v-model="items.type_person"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Es residente"
                label-for="is_resident"
                >
                    <b-form-checkbox
                        v-model.trim="items.is_resident"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Genero"
                label-for="gender"
                >
                <b-form-input
                    v-model="items.gender"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Remuneración"
                label-for="receive_remuneration"
                >
                    <b-form-checkbox
                        v-model.trim="items.receive_remuneration"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Cargo"
                label-for="work_position"
                >
                <b-form-input
                    v-model="items.work_position"
                    required
                ></b-form-input>
                </b-form-group>


                <b-form-group
                label="Tipo de trabajo"
                label-for="type_job"
                >
                <b-form-input
                    v-model="items.type_job"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'addVWorkerModal',
    data() {
        return {
            items: {
                is_formal_worker: false,
                type_person: '',
                is_resident: false,
                gender: '',
                receive_remuneration: false,
                work_position: '',
                type_job: ''
            }            
        }
    },
    methods: {
        resetModalWorker() {
            this.items.is_formal_worker = false
            this.items.type_person = ''
            this.items.is_resident = false
            this.items.gender = ''
            this.items.receive_remuneration = false
            this.items.work_position = ''
            this.items.type_job = ''
        },
    handleOkWorker(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit Worker
        this.handleSubmitWorker()

        },
    handleSubmitWorker() {
            this.$emit('dataWorker',this.items)
            console.log(this.items)
        }
    }
}
</script>
