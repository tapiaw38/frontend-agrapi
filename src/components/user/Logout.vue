<template>
    <div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    created () {
        this.$store.dispatch('destroyToken').then(response => {
            console.log("logout")
            this.$router.push({ name: 'Login' })
            })
    }
}
</script>