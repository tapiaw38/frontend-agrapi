<template Lang="html">
  <transition name="fade">
    <div class="container-fluid content-app">
      <div v-if="show" class="preloader">

        <!--
        <div class="col-12" style="position: absolute;">
            <div class="loader" style="width: 20px;">Loading...</div>
        </div>
        -->

        <div class="lds-ripple">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          
        </div>
      </div>

      <div class="row pb-2 pt-4 justify-content-center" v-if="show == false">
        <b-card-group rows class="justify-content-center">
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <div class="d-block content-card">
                  <b-icon
                    class="m-4"
                    icon="journal-check"
                    scale="5"
                    variant="success"
                  ></b-icon>
                  <h4 class="mt-4">
                    Encuestas mes {{ currentMonth }}
                    <b-badge variant="success">{{
                      filterMonthOne.length
                    }}</b-badge>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <fusioncharts
                  :type="type_grafic3"
                  :width="width_grafic3"
                  :height="height_grafic3"
                  :dataFormat="dataFormat_grafic3"
                  :dataSource="dataSource3"
                >
                </fusioncharts>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <div class="d-block content-card">
                  <b-icon
                    class="m-4"
                    icon="person-check"
                    scale="5"
                    variant="success"
                  ></b-icon>
                  <h4 class="mt-4">
                    Productores registrados
                    <b-badge variant="success">{{ countPolls }}</b-badge>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <fusioncharts
                  :type="type_grafic4"
                  :width="width_grafic4"
                  :height="height_grafic4"
                  :dataFormat="dataFormat_grafic4"
                  :dataSource="dataSource4"
                >
                </fusioncharts>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <div class="d-block content-card">
                  <b-icon
                    class="m-4"
                    icon="clipboard-data"
                    scale="5"
                    variant="success"
                  ></b-icon>
                  <h4 class="mt-4">Producciones</h4>
                  <div class="row text-center">
                    <h6 class="m-2">
                      <img
                        :src="'../static/img/grape.svg'"
                        width="30px"
                        height="30px"
                        alt="gape"
                      />
                      <b-badge variant="success">{{
                        countAgricultural
                      }}</b-badge>
                    </h6>
                    <h6 class="m-2">
                      <img
                        :src="'../static/img/cow.svg'"
                        width="30px"
                        height="30px"
                        alt="cow"
                      />
                      <b-badge variant="success">{{ countLivestock }}</b-badge>
                    </h6>
                    <h6 class="m-2">
                      <img
                        :src="'../static/img/industry.svg'"
                        width="30px"
                        height="30px"
                        alt="industry"
                      />
                      <b-badge variant="success">{{
                        countAgroindustrial
                      }}</b-badge>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <fusioncharts
                  :type="type_grafic1"
                  :width="width_grafic1"
                  :height="height_grafic1"
                  :dataFormat="dataFormat_grafic1"
                  :dataSource="dataSource"
                >
                </fusioncharts>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <fusioncharts
                  :type="type_grafic2"
                  :width="width_grafic2"
                  :height="height_grafic2"
                  :dataFormat="dataFormat_grafic2"
                  :dataSource="dataSource2"
                >
                </fusioncharts>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <div class="d-block content-card">
                  <b-icon
                    class="m-4"
                    icon="person-lines-fill"
                    scale="5"
                    variant="success"
                  ></b-icon>
                  <h4 class="mt-4">
                    Mano de obra contratada
                    <b-badge variant="success">{{ countWorker }}</b-badge>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div class="m-1" style="width: 19rem">
            <div class="card card-home">
              <div class="card-body text-center">
                <div class="d-block content-card">
                  <b-icon
                    class="m-4"
                    icon="shop-window"
                    scale="5"
                    variant="success"
                  ></b-icon>
                  <h4 class="mt-4">
                    Ventas Angro-industria {{ myYear }}
                    <div class="row justify-content-center">
                      <h4 class="m-2">
                        <img
                          :src="'../static/img/ceramics.svg'"
                          width="30px"
                          height="30px"
                          alt="ceramics"
                        />
                        <b-badge variant="success">{{
                          countHandmande
                        }}</b-badge>
                      </h4>
                      <h4 class="m-2">
                        <img
                          :src="'../static/img/jelly.svg'"
                          width="30px"
                          height="30px"
                          alt="jelly"
                        />
                        <b-badge variant="success">{{ countFood }}</b-badge>
                      </h4>
                    </div>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="countHandmande != 0 || countFood != 0"
            class="m-1"
            style="width: 19rem"
          >
            <div class="card card-home">
              <div class="card-body text-center">
                <fusioncharts
                  :type="type_grafic5"
                  :width="width_grafic5"
                  :height="height_grafic5"
                  :dataFormat="dataFormat_grafic5"
                  :dataSource="dataSource5"
                >
                </fusioncharts>
              </div>
            </div>
          </div>
        </b-card-group>
      </div>
    </div>
  </transition>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      show: true,
      polls: [],
      countPolls: 0,
      producers: [],
      surfaceAgricultural: 0,
      surfaceLivestock: 0,
      // Count
      countAgricultural: 0,
      countLivestock: 0,
      countHandmande: 0,
      priceHandmande: 0,
      countFood: 0,
      priceFood: 0,
      countAgroindustrial: 0,
      countWorker: 0,
      countMonotributista: 0,
      countNoMonotributista: 0,
      // Actuality
      minDay: "",
      // Months
      currentMonth: "",
      beginning_year: "",
      myYear: new Date().getUTCFullYear(),
      myMonth: 0,
      myMonthTwo: 0,
      myMonthThree: 0,
      month_one: "",
      month_two: "",
      month_three: "",
      // Date Grafics
      //
      type_grafic1: "pie2d",
      width_grafic1: "260",
      height_grafic1: "250",
      dataFormat_grafic1: "json",
      dataSource: {
        chart: {
          caption: "Producciones",
          subCaption: "Porcentaje según actividad.",
          showValues: "1",
          showPercentInTooltip: "0",
          numberPrefix: " ",
          enableMultiSlicing: "1",
          theme: "fusion",
        },
        data: [
          {
            label: "Agricola",
            value: 0,
          },
          {
            label: "Ganadera",
            value: 0,
          },
          {
            label: "Agro-Industria",
            value: 0,
          },
        ],
      },
      type_grafic4: "pie2d",
      width_grafic4: "260",
      height_grafic4: "250",
      dataFormat_grafic4: "json",
      dataSource4: {
        chart: {
          caption: "Productores Autonomos",
          subCaption: "Registrados en AFIP.",
          showValues: "1",
          showPercentInTooltip: "0",
          numberPrefix: " ",
          enableMultiSlicing: "1",
          theme: "fusion",
        },
        data: [
          {
            label: "Registrados",
            value: 1,
          },
          {
            label: "No registrados",
            value: 1,
          },
        ],
      },
      type_grafic5: "pie2d",
      width_grafic5: "260",
      height_grafic5: "250",
      dataFormat_grafic5: "json",
      dataSource5: {
        chart: {
          caption: "Venta agro-industria [" + new Date().getUTCFullYear() + "]",
          subCaption: "Productos artesanales y alimentarios.",
          showValues: "1",
          showPercentInTooltip: "0",
          numberPrefix: "$",
          enableMultiSlicing: "1",
          theme: "fusion",
        },
        data: [
          {
            label: "Artes.",
            value: 0,
          },
          {
            label: "Alimen.",
            value: 0,
          },
        ],
      },
      type_grafic2: "column2d",
      width_grafic2: "260",
      height_grafic2: "250",
      dataFormat_grafic2: "json",
      dataSource2: {
        chart: {
          caption: "Superficie de producciones",
          subCaption: "Total de sup. agricola y ganadera.",
          xAxisName: "Producciones",
          yAxisName: "Superficie",
          numberSuffix: " ha.",
          theme: "fusion",
        },
        data: [
          {
            label: "Agricola",
            value: "1",
          },
          {
            label: "Ganadera",
            value: "1",
          },
        ],
      },
      type_grafic3: "column2d",
      width_grafic3: "260",
      height_grafic3: "250",
      dataFormat_grafic3: "json",
      dataSource3: {
        chart: {
          caption:
            "Encuestas a productores [" +
            new Date().getUTCFullYear() +
            " - " +
            (new Date().getUTCFullYear() + 1) +
            "]",
          subCaption:
            "Cantidad de encuestas realizadas en los ultimos tres meses",
          xAxisName: "Meses",
          yAxisName: "Encuestas",
          numberSuffix: " ",
          theme: "fusion",
        },
        data: [
          {
            label: "",
            value: 0,
          },
          {
            label: "",
            value: 0,
          },
          {
            label: "",
            value: 0,
          },
        ],
      },
    };
  },
  methods: {
    getProduction() {
      const config = { 
        headers: {
          'Authorization': 'Token ' + this.token,
        }
      };
      const path = "http://www.agrapi.com.ar/api/v1.0/productive/data/";
      axios.get(path,config).then((response) => {

        this.polls = response.data;
        this.countPolls = this.polls.length;
        this.producers = response.data.producer;

        response.data.forEach((element) => {
          this.production = element.producer.production;
          this.activityWorker =
            element.producer.producer_activity.activity_worker;
          this.countWorker +=
            element.producer.producer_activity.activity_worker.length;
          this.addData();
          // data monotributsta
          if (element.producer.producer_activity.is_monotributista == true) {
            this.countMonotributista++;
          }
          if (element.producer.producer_activity.is_monotributista == false) {
            this.countNoMonotributista++;
          }
        });
        this.addDataSource();
        this.addDataMonth();
        this.addDataProducer();
        this.addDataYear();
      })
      .catch( error => {
        console.log(error)
      })
    },
    showToggle() {
      setTimeout(() => {
        this.show = false;
      }, 700);
    },
    addDays() {
      var d = new Date();
      var day = d.getUTCDate() - 4;
      var month = d.getUTCMonth() + 1;
      var year = d.getUTCFullYear();
      this.minDay = year + "-" + month + "-" + day;
    },
    addMonth() {
      var d = new Date();
      var day = d.getUTCDate();

      var month = d.getUTCMonth();
      var month_two;
      var year_two = d.getUTCFullYear();

      var month_three;
      var year_three = d.getUTCFullYear();
      var year = d.getUTCFullYear();

      if (month == 0) {
        month = 12;
        var year = d.getUTCFullYear() - 1;
        month_two = 11;
        year_two = d.getUTCFullYear() - 1;
        month_three = 10;
        year_three = d.getUTCFullYear() - 1;
      } else if (month == 1) {
        month_two = 12;
        year_two = d.getUTCFullYear() - 1;
        month_three = 11;
        year_three = d.getUTCFullYear() - 1;
      } else if (month == 2) {
        month_two = 1;
        month_three = 12;
        year_three = d.getUTCFullYear() - 1;
      } else if (month == 3) {
        month_two = 2;
        month_three = 1;
      } else if (month == 4) {
        month_two = 3;
        month_three = 2;
      } else if (month == 5) {
        month_two = 4;
        month_three = 3;
      } else if (month == 6) {
        month_two = 5;
        month_three = 4;
      } else if (month == 7) {
        month_two = 6;
        month_three = 5;
      } else if (month == 8) {
        month_two = 7;
        month_three = 6;
      } else if (month == 9) {
        month_two = 8;
        month_three = 7;
      } else if (month == 10) {
        month_two = 9;
        month_three = 8;
      } else if (month == 11) {
        month_two = 10;
        month_three = 9;
      } else if (month == 12) {
        month_two = 11;
        month_three = 10;
      }

      // months
      this.myMonth = month;
      this.myMonthTwo = month_two;
      this.myMonthThree = month_three;

      this.month_one = year + "-" + month + "-" + "31";
      this.month_two = year_two + "-" + month_two + "-" + "31";
      this.month_three = year_three + "-" + month_three + "-" + "31";

      // beginning of the year
      this.beginning_year = d.getUTCFullYear() + "-" + "01" + "-" + "01";
    },
    addData() {
      this.production.forEach((elem) => {
        if (elem.production_agricultural.length != 0) {
          this.countAgricultural++;
          elem.production_agricultural.forEach((element) => {
            this.surfaceAgricultural += element.surface;
          });
        }
        if (elem.production_livestock.length != 0) {
          this.countLivestock++;
          elem.production_livestock.forEach((element) => {
            this.surfaceLivestock += element.surface;
          });
        }
        if (elem.production_agroindustrial.length != 0) {
          this.countAgroindustrial++;
        }
      });
    },
    addDataYear: function () {
      this.filterBeginningYear.forEach((element) => {
        element.producer.production.forEach((production) => {
          if (production.production_agroindustrial.length != 0) {
            production.production_agroindustrial.forEach((handmande) => {
              handmande.agroindustrial_handmande_product.forEach((element) => {
                this.countHandmande += element.quantity;
                this.priceHandmande += element.price * element.quantity;
              });
            });
            production.production_agroindustrial.forEach((food) => {
              food.agroindustrial_food_product.forEach((element) => {
                this.countFood += element.quantity;
                this.priceFood += element.price * element.quantity;
              });
            });
          }
        });
      });
      this.dataSource5.data[0].value = this.priceHandmande;
      this.dataSource5.data[1].value = this.priceFood;
    },
    addDataSource() {
      this.dataSource.data[0].value = this.countAgricultural;
      this.dataSource.data[1].value = this.countLivestock;
      this.dataSource.data[2].value = this.countAgroindustrial;
    },
    addDataProducer() {
      this.dataSource2.data[0].value = this.surfaceAgricultural;
      this.dataSource2.data[1].value = this.surfaceLivestock;
      this.dataSource4.data[0].value = this.countMonotributista;
      this.dataSource4.data[1].value = this.countNoMonotributista;
    },
    addDataMonth() {
      this.dataSource3.data[0].value = this.filterMonthOne.length;
      this.dataSource3.data[1].value = this.filterMonthTwo.length;
      this.dataSource3.data[2].value = this.filterMonthThree.length;
      if (this.myMonth == 12) {
        this.dataSource3.data[0].label = "Enero";
        this.dataSource3.data[1].label = "Diciembre";
        this.dataSource3.data[2].label = "Noviembre";
        this.currentMonth = "enero";
      } else if (this.myMonth == 1) {
        this.dataSource3.data[0].label = "Febrero";
        this.dataSource3.data[1].label = "Enero";
        this.dataSource3.data[2].label = "Diciembre";
        this.currentMonth = "febrero";
      } else if (this.myMonth == 2) {
        this.dataSource3.data[0].label = "Marzo";
        this.dataSource3.data[1].label = "Febrero";
        this.dataSource3.data[2].label = "Enero";
        this.currentMonth = "marzo";
      } else if (this.myMonth == 3) {
        this.dataSource3.data[0].label = "Abril";
        this.dataSource3.data[1].label = "Marzo";
        this.dataSource3.data[2].label = "Febrero";
        this.currentMonth = "abril";
      } else if (this.myMonth == 4) {
        this.dataSource3.data[0].label = "Mayo";
        this.dataSource3.data[1].label = "Abril";
        this.dataSource3.data[2].label = "Marzo";
        this.currentMonth = "mayo";
      } else if (this.myMonth == 5) {
        this.dataSource3.data[0].label = "Junio";
        this.dataSource3.data[1].label = "Mayo";
        this.dataSource3.data[2].label = "Abril";
        this.currentMonth = "junio";
      } else if (this.myMonth == 6) {
        this.dataSource3.data[0].label = "Julio";
        this.dataSource3.data[1].label = "Mayo";
        this.dataSource3.data[2].label = "Abril";
        this.currentMonth = "julio";
      } else if (this.myMonth == 7) {
        this.dataSource3.data[0].label = "Agosto";
        this.dataSource3.data[1].label = "Julio";
        this.dataSource3.data[2].label = "Junio";
        this.currentMonth = "agosto";
      } else if (this.myMonth == 8) {
        this.dataSource3.data[0].label = "Septiembre";
        this.dataSource3.data[1].label = "Agosto";
        this.dataSource3.data[2].label = "Julio";
        this.currentMonth = "septiembre";
      } else if (this.myMonth == 9) {
        this.dataSource3.data[0].label = "Octubre";
        this.dataSource3.data[1].label = "Septiembre";
        this.dataSource3.data[2].label = "Agosto";
        this.currentMonth = "octubre";
      } else if (this.myMonth == 10) {
        this.dataSource3.data[0].label = "Noviembre";
        this.dataSource3.data[1].label = "Octubre";
        this.dataSource3.data[2].label = "Septiembre";
        this.currentMonth = "noviembre";
      } else if (this.myMonth == 11) {
        this.dataSource3.data[0].label = "Diciembre";
        this.dataSource3.data[1].label = "Noviembre";
        this.dataSource3.data[2].label = "Octubre";
        this.currentMonth = "diciembre";
      }
      if (Boolean(this.show)) this.showToggle();
    },
  },
  computed: {
    filterPolls: function () {
      return this.polls.filter((items) => items.created > this.minDay);
    },
    filterMonthOne: function () {
      return this.polls.filter((items) => items.created > this.month_one);
    },
    filterMonthTwo: function () {
      return this.polls.filter(
        (items) =>
          items.created > this.month_two && items.created < this.month_one
      );
    },
    filterMonthThree: function () {
      return this.polls.filter(
        (items) =>
          items.created > this.month_three && items.created < this.month_two
      );
    },
    filterBeginningYear: function () {
      return this.polls.filter((items) => items.created > this.beginning_year);
    },
    token () {
      return this.$store.state.token
    }
  },
  mounted() {},
  created() {
    this.getProduction();
    this.addDays();
    this.addMonth();
    this.addDataYear();
  },
};
</script>

<style>
.content-card {
  margin: 30px;
  height: 100%;
}
.card-home {
  height: 100%;
  width: 100%;
}
.preloader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 95%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  z-index: 1;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #21ca0b;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>