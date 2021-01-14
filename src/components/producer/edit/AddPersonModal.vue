<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addPerson" 
        @show="resetModal"
        @ok="handleOk"
        >
            <template #modal-title>
                <h4>Añadir a grupo familiar</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitPerson">
                <b-form-group
                label="Relación familiar"
                label-for="family_relation"
                >
                <b-form-input
                    v-model="items.family_relation"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Nombre"
                label-for="first_name"
                >
                <b-form-input
                    v-model="items.first_name"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Apellido"
                label-for="last_name"
                >
                <b-form-input
                    v-model="items.last_name"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Edad"
                label-for="age"
                >
                <b-form-input
                    v-model="items.age"
                    required
                    type="number"
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Estudios primarios"
                label-for="has_primary_studies"
                >
                    <b-form-checkbox
                        v-model.trim="items.has_primary_studies"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Estudios secundarios"
                label-for="has_secondary_studies"
                >
                    <b-form-checkbox
                        v-model.trim="items.has_secondary_studies"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Estudios terciarios"
                label-for="has_tertiary_studies"
                >
                    <b-form-checkbox
                        v-model.trim="items.has_terteary_studies"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Estudios universitarios"
                label-for="has_university_studies"
                >
                    <b-form-checkbox
                        v-model.trim="items.has_university_studies"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Desarrolla actividad laboral"
                label-for="perform_work_activity"
                >
                    <b-form-checkbox
                        v-model.trim="items.perform_work_activity"
                        value="true"
                        unchecked-value="false"
                        >
                        Sí.
                    </b-form-checkbox>
                </b-form-group>

                <b-form-group
                label="Describe actividad laboral"
                label-for="description"
                >
                <b-form-input
                    v-model="items.description"
                    required
                ></b-form-input>
                </b-form-group>
            
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'AddPersonModal',
    data() {
        return {
            items: {
                family_relation: "",
                first_name: "",
                last_name: "",
                age: 0,
                has_primary_studies: false,
                has_secondary_studies: false,
                has_tertiary_studies: false,
                has_university_studies: false,
                perform_work_activity: false,
                description: ""               
            }            
        }
    },
    methods: {
        resetModal() {
            this.items.family_relation = ''
            this.items.first_name = ''
            this.items.last_name = ''
            this.items.age = 0
            this.items.has_primary_studies = false
            this.items.has_secondary_studies = false
            this.items.has_tertiary_studies = false
            this.has_university_studies = false,
            this.items.perform_work_activity = false
            this.items.description = ''
        },
    handleOk(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit handler
        this.handleSubmitPerson()
        },
    handleSubmitPerson() {
            this.$emit('dataPerson',this.items)
            console.log(this.items)
        }
    }
}
</script>

