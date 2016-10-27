function makeClick(){
  var statisticStat = 0
  var sensorStat = 0

  $('#statistic').click(function(){
    $(this).css('background','rgba(85,167,192,1)')
    $(this).css('color','white')
    $('#sensor').css('background','rgba(85,167,192,0)')
    $('#sensor').css('color','rgb(85,167,192)')
    window.open("./chart.html","_self")
    Click_Chart(0)
  })

  $('#sensor').click(function(){
    $(this).css('background','rgba(85,167,192,1)')
    $(this).css('color','white')
    $('#statistic').css('background','rgba(85,167,192,0)')
    $('#statistic').css('color','rgb(85,167,192)')
    window.open("./index.html","_self")
  })

  $('#sensor').css('background','rgba(85,167,192,1)')
  $('#sensor').css('color','white')
}

function Get_Timestamp(){
  var time = new Date()
  var detik = time.getSeconds()
  var menit = time.getMinutes()
  var jam = time.getHours()
  var day = time.getDate()
  var hari = time.getDay()
  var month = time.getMonth()
  var year = time.getFullYear()

  var indmonth = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']
  var indhari = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY']

  var tanggalnya = day +' '+ indmonth[month] +' '+ year
  var jamnya = jam +':'+ menit +':'+ detik

  $('#tanggal').html(tanggalnya)
  $('#hari').html(indhari[hari])
  $('#jam').html(jamnya)
}
setInterval('Get_Timestamp()',1000)

function Give_Tombol_Style(index){

  for(i=0; i<=5; i++){
    $('#tmb-chart-'+i).css('background','rgba(85,167,192,.15)')
  }

  $('#tmb-chart-'+index).css('background','rgb(85,167,192)')
}

//---------------------- Panggil Grafik Suhu
setInterval("Call_Data_Temp_Realtime()",1000)

function Call_Temp_Chart(){
  var dataTemp = []
  for (i = 0; i <= 100; i++) {
    dataTemp[i] = Math.floor(Math.random()*100+1)
  }

  Give_Tombol_Style(0)

  $('#container').highcharts({
      chart: {
          zoomType: 'x',
          backgroundColor: 'rgba(0,0,0,0)',
          events : {
                load : function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];

                        var x = (new Date()).getTime(), // current time
                            y = Call_Data_Temp_Realtime();
                        series.addPoint([x, y], true, true);

                }
            }
      },
      credits:{
        enabled: false
      },
      title: {
          text: 'GRAFIK SUHU UDARA REAL TIME',
          style:{
                  color: 'rgb(85,167,192)'
          }
      },
      xAxis: {
          type: 'datetime',
          title: {
              text: 'TIME',
              style:{
                      color: 'rgb(85,167,192)'
              }
          },
          labels:{
            style:{
                    color: 'rgb(85,167,192)'
            }
          }
      },
      yAxis: {
        min:0,
          title: {
              text: 'TEMPERATURE (\xB0 C)',
              style:{
                      color: 'rgb(85,167,192)'
              }
          },
          labels:{
            style:{
                    color: 'rgb(85,167,192)'
            }
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },

      series: [{
          type: 'area',
          name: 'USD to EUR',
          data: (function () {
                // generate an array of random data
                var data = [], time = (new Date()).getTime(), i;

                for (i = -99; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(Math.random() * 100)
                    ]);
                }
                return data;
            }())
      }]
  });
}

function Call_Data_Temp_Realtime(){
  var a = Math.floor(Math.random()*100)+1
  return a
}
//------------------------------------------------------------------------------

//---------------------- Panggil Grafik Cahaya
function Call_Light_Chart(){
  var dataTemp = []
  for (i = 0; i <= 100; i++) {
    dataTemp[i] = Math.floor(Math.random()*100+1)
  }

  Give_Tombol_Style(1)

  $('#container').highcharts({
      chart: {
          zoomType: 'x',
          backgroundColor: 'rgba(0,0,0,0)',
          events : {
                load : function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Call_Data_Light_Realtime();
                        series.addPoint([x, y], true, true);
                    }, 1000);
                }
            }
      },
      credits:{
        enabled: false
      },
      title: {
          text: 'GRAFIK INTENSITAS CAHAYA REAL TIME',
          style:{
                  color: 'rgb(85,167,192)'
          }
      },
      xAxis: {
          type: 'linear',
          title: {
              text: 'TIME',
              style:{
                      color: 'rgb(85,167,192)'
              }
          },
          labels:{
            style:{
                    color: 'rgb(85,167,192)'
            }
          }
      },
      yAxis: {
          title: {
              text: 'TEMPERATURE (\xB0 C)',
              style:{
                      color: 'rgb(85,167,192)'
              }
          },
          labels:{
            style:{
                    color: 'rgb(85,167,192)'
            }
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
      },

      series: [{
          type: 'area',
          name: 'USD to EUR',
          data: (function () {
                // generate an array of random data
                var data = [], time = (new Date()).getTime(), i;

                for (i = -99; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        Math.round(Math.random() * 100)
                    ]);
                }
                return data;
            }())
      }]
  });
}

function Call_Data_Light_Realtime(){
  var a = Math.floor(Math.random()*100)+1
  return a
}
//------------------------------------------------------------------------------
