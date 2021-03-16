<template>
    <div class="content-maps">
        <div class="row">
            <div class="content-info">
                <transition name="bounce">
                    <div class="label text-center mx-auto" v-if="producerMarker!=''">

                        <p>Sup. de producción: <strong>{{producerMarker.surface}} ha.<sup>2</sup></strong></p>
                        <p>Caminos: <strong>{{producerMarker.road_state}}</strong></p>
                        <p v-if="producerMarker.production_service">Servicio Agua: 
                            <strong v-if="producerMarker.production_service.has_service_aqua">Sí</strong>
                            <strong v-else>No</strong>
                        </p>
                        <p v-if="producerMarker.production_service">Servicio Luz: 
                            <strong v-if="producerMarker.production_service.has_service_energy">Sí</strong>
                            <strong v-else>No</strong>
                        </p>
                        <p v-if="producerMarker.production_irrigation">Estado canales <strong>{{producerMarker.production_irrigation.channel_conditions}}</strong></p>
                        <!-- Production agricultural -->
                        <div v-for="(agricultural,index_agri) in producerMarker.production_agricultural" :key="index_agri">
                            <p>Producción Agricola: <strong class="text-uppercase">{{agricultural.activity_name}}</strong></p>
                            <p>Variedad: <strong class="text-uppercase">{{agricultural.variety}}</strong></p>
                            <p>Sup.: <strong>{{agricultural.surface}} ha.<sup>2</sup></strong></p>
                            <p>Edad: <strong>{{agricultural.age}} años</strong></p>
                            <div v-for="(pests,index_pests) in agricultural.agricultural_pests" :key="index_pests">
                                <p> 
                                    <strong>
                                        {{pests.type_pests}}: {{pests.pests_description}}
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <!-- Production livestock -->
                        <div v-for="(livestock,index_live) in producerMarker.production_livestock" :key="index_live">
                            <p>Producción Ganadera: <strong class="text-uppercase">{{livestock.type_activity}}</strong></p>
                            <p>Sup.: <strong>{{livestock.surface}} ha.<sup>2</sup></strong></p>
                            <p>Tipo de enfermedad 
                                <strong>
                                    {{livestock.livestock_health.type_disease}}
                                </strong>
                            </p>
                            <p>Nombre: 
                                <strong>
                                    {{livestock.livestock_health.name_disease}}
                                </strong>
                            </p>
                        </div>
                        <!-- Production agroindustrial -->
                        <div v-for="(agroindustrial,index_agro) in producerMarker.production_agroindustrial" :key="index_agro">
                            <p>Agro-industrial: <strong class="text-uppercase">{{agroindustrial.description}}</strong></p>
                            <p>Materia Prima: 
                                <strong>{{agroindustrial.raw_material}}</strong>
                            </p>
                            <p>Mecanizada: 
                                <strong v-if="agroindustrial.is_mechanized">Sí</strong>
                                <strong v-else>No</strong>
                            </p>
                            <p>Conocimiento: 
                                {{agroindustrial.knowledge}}
                            </p>
                        </div>
                    </div>
                </transition>
                <CarouselCard :interval="7000" height="300px" arrow="always" v-if="producerMarker!=''">
                    <CarouselCardItem v-if="producerMarker!=''">
                        <div class="text-center carousel-section">
                            <fusioncharts
                            :type="type_grafic1"
                            :width="width_grafic1"
                            :height="height_grafic1"
                            :dataFormat="dataFormat_grafic1"
                            :dataSource="dataSource"
                            >
                            </fusioncharts>
                        </div>
                    </CarouselCardItem>
                    <CarouselCardItem v-if="producerMarker!='' && countAgricultural !=0 ">
                        <div class="text-center carousel-section">
                            <fusioncharts
                            :type="type_grafic2"
                            :width="width_grafic2"
                            :height="height_grafic2"
                            :dataFormat="dataFormat_grafic2"
                            :dataSource="dataSource2"
                            >
                            </fusioncharts>
                        </div>
                    </CarouselCardItem>
                    <CarouselCardItem v-if="producerMarker!='' && countLivestock !=0 ">
                        <div class="text-center carousel-section">
                            <fusioncharts
                            :type="type_grafic3"
                            :width="width_grafic3"
                            :height="height_grafic3"
                            :dataFormat="dataFormat_grafic3"
                            :dataSource="dataSource3"
                            >
                            </fusioncharts>
                        </div>
                    </CarouselCardItem>
                     <CarouselCardItem v-if="producerMarker!='' && countAgroindustrial !=0 ">
                        <div class="text-center carousel-section">
                            <fusioncharts
                            :type="type_grafic4"
                            :width="width_grafic4"
                            :height="height_grafic4"
                            :dataFormat="dataFormat_grafic4"
                            :dataSource="dataSource4"
                            >
                            </fusioncharts>
                        </div>
                    </CarouselCardItem>
                </CarouselCard>


            </div>
            <div class="col-lg-12">
                <GmapMap
                :center="myCoordinates"
                :zoom="zoom"
                class="productions-maps"
                >
                <div>

                </div>
                    <gmap-marker
                    v-for="(production, index_position) in production"
                    :key="index_position"
                    :position="{lat:production.lat, lng:production.lng}"
                    :clickable="clickable"
                    :draggable="draggable"
                    :id="'production'+index_position"
                    icon = "/static/img/location.png"
                    @mouseover="onDataProducer(index_position)"
                    ></gmap-marker>
                    
                </GmapMap>
            </div>
        </div>
    </div>
</template>


<script>
import { CarouselCard, CarouselCardItem } from 'vue-carousel-card'
import 'vue-carousel-card/styles/index.css'
import axios from "axios";
export default {
    components: { CarouselCard, CarouselCardItem },
    data() {
        return {
            map: null,
            myCoordinates: {
                lat: -28.065566,
                lng: -67.564566
            },
            zoom: 10,
            clickable: true,
            draggable: false,
            //Production
            producer: [],
            production: [],
            producerMarker: '',
            //Count
            countAgricultural: 0,
            countLivestock: 0,
            countAgroindustrial: 0,
            //CountAgricultural
            countVid: 0,
            countOlivo: 0,
            //count Livestock
            countBovino: 0,
            countOvino: 0,
            countCaprino: 0,
            countPorcino: 0,
            countCamelido: 0,
            countAvicultura: 0,
            countCunicultura: 0,
            countApicultura: 0,
            countAcuicultura: 0,
            //Grafics
            type_grafic1: "column2d",
            width_grafic1: "260",
            height_grafic1: "250",
            dataFormat_grafic1: "json",
            dataSource: {
                chart: {
                caption: "",
                subCaption: "Total producciones.",
                xAxisName: "Tipo",
                yAxisName: "Cantidad",
                numberSuffix: "",
                theme: "fusion",
                },
                data: [
                {
                    label: "Agricola",
                    value: "0",
                },
                {
                    label: "Ganadera",
                    value: "0",
                },
                {
                    label: "Agroindustrial",
                    value: "0",
                },
                ],
            },
            type_grafic2: "pie2d",
            width_grafic2: "260",
            height_grafic2: "250",
            dataFormat_grafic2: "json",
            dataSource2: {
                chart: {
                caption: "Producciones Agricolas",
                subCaption: "Porcentaje según tipo.",
                showValues: "1",
                showPercentInTooltip: "0",
                numberPrefix: "%",
                enableMultiSlicing: "1",
                theme: "fusion",
                },
                data: [
                {
                    label: "Vid",
                    value: 0,
                },
                {
                    label: "Olivo",
                    value: 0,
                },
                {
                    label: "Tomate",
                    value: 0,
                },
                ],
            },
            type_grafic3: "pie2d",
            width_grafic3: "260",
            height_grafic3: "250",
            dataFormat_grafic3: "json",
            dataSource3: {
                chart: {
                caption: "Producciones Ganaderas",
                subCaption: "Porcentaje según tipo.",
                showValues: "1",
                showPercentInTooltip: "0",
                numberPrefix: "%",
                enableMultiSlicing: "1",
                theme: "fusion",
                },
                data: [
                {
                    label: "Bovino",
                    value: 0
                },
                {
                    label: "Ovino",
                    value: 0
                },
                {
                    label: "Caprino",
                    value: 0
                },
                {
                    label: "Porcino",
                    value: 0
                },
                {
                    label: "Camelidos",
                    value: 0
                },
                {
                    label: "Avicultura",
                    value: 0
                },
                {
                    label: "Cunicultura",
                    value: 0
                },
                {
                    label: "Apicultura",
                    value: 0
                },
                {
                    label: "Acuicultura",
                    value: 0
                }
                ],
            },
            type_grafic4: "pie2d",
            width_grafic4: "260",
            height_grafic4: "250",
            dataFormat_grafic4: "json",
            dataSource4: {
                chart: {
                caption: "Producciones Agro-industria",
                subCaption: "Porcentaje según tipo.",
                showValues: "1",
                showPercentInTooltip: "0",
                numberPrefix: "%",
                enableMultiSlicing: "1",
                theme: "fusion",
                },
                data: [
                {
                    label: "Ceramica",
                    value: 0,
                },
                {
                    label: "Madera",
                    value: 0,
                },
                {
                    label: "Dulces",
                    value: 0,
                },
                {
                    label: "Conservas",
                    value: 0,
                },
                ],
            },
        }
    },
    methods: {
        getDataMap() {
            const config = { 
                headers: {
                'Authorization': 'Token ' + this.token,
                }
            };
            const path = "http://www.agrapi.com.ar/api/v1.0/productive/data/";
            axios.get(path,config).then((response) => {
                
                response.data.forEach(element => {
                   this.producer = this.producer.concat(element.producer)
                   //console.log(element.producer.production)
                });
                response.data.forEach(element => {
                    this.production = this.production.concat(element.producer.production)
                });
            })
        },
        onDataProducer (index){
            //console.log(id)
            this.producerMarker = this.production[index]

            //Filter District

            //Reset count production
            this.countAgricultural = 0
            this.countLivestock = 0
            this.countAgroindustrial = 0

            //district
            const district = this.producerMarker.district
            let filterDistrict = []
            //list Productions
            let listAgricultural = []
            let listLivestock = []
            let listAgroindustrial = []

            filterDistrict = this.production.filter(element => element.district.toUpperCase().includes(district.toUpperCase()))

            filterDistrict.forEach(element => {
                if (element.production_agricultural.length != 0) {
                    //list Agricultural
                    element.production_agricultural.forEach(items => {
                        // count production agricultural
                        this.countAgricultural ++
                        listAgricultural.push(items.activity_name)
                    });

                }if (element.production_livestock.length != 0) {
                    //list Livestock
                    element.production_livestock.forEach(items => {    
                        // count production livestock
                        this.countLivestock ++
                        listLivestock.push(items.type_activity)
                    });
                }
                if (element.production_agroindustrial.length != 0) {
                    //list Agroindustrial
                    element.production_agroindustrial.forEach(items => {
                        // count production agroindustrial
                        this.countAgroindustrial ++
                        listAgroindustrial.push(items.description)
                    });
                }
            });

            // add count production four district
            this.dataSource.chart.caption = this.producerMarker.district
            this.dataSource.data[0].value = this.countAgricultural
            this.dataSource.data[1].value = this.countLivestock
            this.dataSource.data[2].value = this.countAgroindustrial

            //probability Agroindustrial

            let selectVid = listAgricultural.filter(element => element.toUpperCase().includes("VID")||element.toUpperCase().includes("UVA")||element.toUpperCase().includes("VIÑAS"))
            let selectOlivo = listAgricultural.filter(element => element.toUpperCase().includes("OLIVO")||element.toUpperCase().includes("ACEITUNA"))
            let selectTomate = listAgricultural.filter(element => element.toUpperCase().includes("TOMATE"))

            let probVid = ((selectVid.length/listAgricultural.length)*100)
            let probOlivo = ((selectOlivo.length/listAgricultural.length)*100)
            let probTomate = ((selectTomate.length/listAgricultural.length)*100)

            //add data source agricultural
            this.dataSource2.data[0].value = probVid
            this.dataSource2.data[1].value = probOlivo
            this.dataSource2.data[2].value = probTomate
            
            //probability Livestock
            let selectBovino = listLivestock.filter(element => element.toUpperCase().includes("BOVINO"))
            let selectOvino = listLivestock.filter(element => element.toUpperCase().includes("OVINO"))
            let selectCaprino = listLivestock.filter(element => element.toUpperCase().includes("CAPRINO"))
            let selectPorcino = listLivestock.filter(element => element.toUpperCase().includes("PORCINO"))
            let selectCamelido = listLivestock.filter(element => element.toUpperCase().includes("CAMELIDO"))
            let selectAvicultura = listLivestock.filter(element => element.toUpperCase().includes("AVICULTURA"))
            let selectCunicultura = listLivestock.filter(element => element.toUpperCase().includes("CUNICULTURA"))
            let selectApicultura = listLivestock.filter(element => element.toUpperCase().includes("APICULTUA"))
            let selectAcuicultura = listLivestock.filter(element => element.toUpperCase().includes("ACUICULTURA"))

            let probBovino = ((selectBovino.length/listLivestock.length)*100)
            let probOvino = ((selectOvino.length/listLivestock.length)*100)
            let probCaprino = ((selectCaprino.length/listLivestock.length)*100)
            let probPorcino = ((selectPorcino.length/listLivestock.length)*100)
            let probCamelido = ((selectCamelido.length/listLivestock.length)*100)
            let probAvicultura = ((selectAvicultura.length/listLivestock.length)*100)
            let probCunicultura = ((selectCunicultura.length/listLivestock.length)*100)
            let probApicultura = ((selectApicultura.length/listLivestock.length)*100)
            let probAcuicultura = ((selectAcuicultura.length/listLivestock.length)*100)

            //add datasource livestock
            this.dataSource3.data[0].value = probBovino
            this.dataSource3.data[1].value = probOvino
            this.dataSource3.data[2].value = probCaprino
            this.dataSource3.data[3].value = probPorcino
            this.dataSource3.data[4].value = probCamelido
            this.dataSource3.data[5].value = probAvicultura
            this.dataSource3.data[6].value = probCunicultura
            this.dataSource3.data[7].value = probApicultura
            this.dataSource3.data[8].value = probAcuicultura

            //probavility agoindustrial
            let selectCeramica = listAgroindustrial.filter(element => element.toUpperCase().includes("CERAMICA"))
            let selectMadera = listAgroindustrial.filter(element => element.toUpperCase().includes("MADERA"))
            let selectDulce = listAgroindustrial.filter(element => element.toUpperCase().includes("DULCE"))
            let selectConserva = listAgroindustrial.filter(element => element.toUpperCase().includes("CONSERVA")||element.toUpperCase().includes("ESCABECHI"))

            let probCeramica = ((selectCeramica.length/listAgroindustrial.length)*100)
            let probMadera = ((selectMadera.length/listAgroindustrial.length)*100)
            let probDulce = ((selectDulce.length/listAgroindustrial.length)*100)
            let probConserva = ((selectConserva.length/listAgroindustrial.length)*100)

            //add datasource agroindustrial
            this.dataSource4.data[0].value = probCeramica
            this.dataSource4.data[1].value = probMadera
            this.dataSource4.data[2].value = probDulce
            this.dataSource4.data[3].value = probConserva
        },
        onDataProduction () {
            
        }
    },
    computed: {
        token () {
            return this.$store.state.token
        }
    },
    created() {
        this.getDataMap()
    },
}
</script>

<style>
.content-maps {
    margin-top: 69px;
}
.productions-maps {
    width:100%;
    height:800px;
    margin: 0px auto; 
}
.label {
  width: 250px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
  padding: 10px;
  background-color: rgba(38, 202, 60, 0.705);

}
.label p {
  color: white;
  font-size: 15px;
  margin: 0px;
}
.content-info {
    width: 400px;
    z-index: 1;
    position: absolute;
    height: 100%;
}
.carousel-section {

  height: 300px;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;  
}
.bounce-enter-active {
  animation: bounce-in .7s;
}
.bounce-leave-active {
  animation: bounce-in .7s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>