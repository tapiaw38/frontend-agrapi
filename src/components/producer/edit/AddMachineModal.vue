<template>
    <div>
        <b-modal 
        size="lg" 
        id="bv-modal-addMachine" 
        @show="resetModalMachine"
        @ok="handleOkMachine"
        >
            <template #modal-title>
                <h4>Añadir a maquinarias</h4>
            </template>
            <form ref="form" @submit.stop.prevent="handleSubmitMachine">
                
                <b-form-group
                label="Destino de maquinaria"
                label-for="destination"
                >
                <b-form-input
                    v-model="items.destination"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Maquinaria"
                label-for="name_machine"
                >
                <b-form-input
                    v-model="items.name_machine"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Tipo de maquinaria"
                label-for="type_machine"
                >
                <b-form-input
                    v-model="items.type_machine"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Modelo"
                label-for="model"
                >
                <b-form-input
                    v-model="items.model"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Estado de maquinaria"
                label-for="state_machine"
                >
                <b-form-input
                    v-model="items.state_machine"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Años"
                label-for="age"
                >
                <b-form-input
                    v-model="items.age"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                label="Observación"
                label-for="observation"
                >
                <b-form-input
                    v-model="items.observation"
                    required
                ></b-form-input>

                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: 'addMachineModal',
    data() {
        return {
            items: {
                destination: "",
                name_machine: "",
                type_maquinary: "",
                model: "",
                state_machine: "",
                age: "",
                observation: ""     
            }            
        }
    },
    methods: {
        resetModalMachine() {
            this.items.destination = ''
            this.items.name_machine = ''
            this.items.type_maquinary = ''
            this.items.model = ''
            this.items.state_machine = ''
            this.items.age = ''
            this.items.observation = ''
        },
    handleOkMachine(bvModalEvt) {
        // Prevent modal from closing

        // Trigger submit handler
        this.handleSubmitMachine()
        },
    handleSubmitMachine() {
            this.$emit('dataMachine',this.items)
        }
    }
}
</script>