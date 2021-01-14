<template lang="html">
    <div>
        <div class="pt-3" style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between">
            <div>
                <h4>Tus coordenadas:</h4>
                <p>{{ myCoordinates.lat }} Latitud, {{ myCoordinates.lng }} Longitud</p>
            </div>
            <div>
                <h4>Coordenadas del mapa:</h4>
                <p>{{ mapCoordinates.lat }} Latitud, {{ mapCoordinates.lng }} Longitud</p>
            </div>
        </div>
        <GmapMap
            :center="myCoordinates"
            :zoom="zoom"
            style="width:1200px; height:560px; margin: 7px auto;"
            ref="mapRef"
            @dragend="handleDrag"
        >
        <gmap-marker
        :position="myCoordinates"
        :clickable="true"
        :draggable="false"
        @click="center=myCoordinates"
      ></gmap-marker>
    </GmapMap>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                productionId: this.$route.params.productionId,
                map: null,
                myCoordinates: {
                    lat: 0,
                    lng: 0
                },
                zoom: 17,
            }
        },
        methods: {
            getLocation () {
                const path = `http://localhost:8000/api/v1.0/createProduction/${this.productionId}/`
                axios.get(path).then((response) => {
                    response.data.forEach(element => {
                        this.myCoordinates.lat = element.lat;
                        this.myCoordinates.lng = element.lng;
                    });
                })
            },
            handleDrag() {
                // get center and zoom level, store in localstorage
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();
                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }
        },
        computed: {
            mapCoordinates() {
                if(!this.map) {
                    return {
                        lat: 0,
                        lng: 0
                    };
                }
                return {
                    lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
            }
        },
        created() {
            // does the user have a saved center? use it instead of the default
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                // get user's coordinates from browser request
                this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
            }
            // does the user have a saved zoom? use it instead of the default
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
            this.getLocation()
        },
        mounted() {
            // add the map to a data object
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        }
    }
</script>