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

function Get_Sensor_Value(){

  //Bagian ini digunakan untuk membangkitkan nilai acak untuk sensor
  //Bagian ini perlu dihapus jika akan diintegrasikan dengan aplikasi back-end
  var val = Math.floor((Math.random()*100)+1)  // nilai acak untuk status dan kompas
  var val1 = Math.floor((Math.random()*100)+1) // nilai acak untuk kemiringan tilt angel
  var val2 = Math.floor((Math.random()*100)+1) // nilai acak untuk roll angel
  var val3 = Math.floor((Math.random()*100)+1) //nilai acak untuk sensor suhu
  var val4 = Math.floor((Math.random()*100)+1) //nilai acak untuk sensor cahaya
  var val5 = Math.floor((Math.random()*100)+1) //nilai acak untuk sensor tanah
  var val6 = Math.floor((Math.random()*100)+1) //nilai acak untuk sensor kedalaman
  var val7 = Math.floor((Math.random()*100)+1)*10 //nilai acak untuk sensor asap
  var val8 = Math.floor((Math.random()*100)+1) //nilai acak untuk sensor api
  var val9 = Math.floor((Math.random()*100)+1) //nilai acak untuk sensor humidity

  //ini untuk memberikan index array untuk variabel statusnya
  if(val<11){status=0}
  else{status=1}

  // ini untuk konversi nilai derajat kompas
  if(val<=50){compass_val = -1*(Math.floor(val*0.9))}
  else if(val>50){compass_val = Math.floor((val-50)*0.9)}

  // ini untuk konversi nilai derajat kemiringan/tilt angel
  if(val1<=50){kemiringan_val = -1*(Math.floor(val*0.4))}
  else if(val1>50){kemiringan_val = Math.floor((val-50)*0.4)}

  // ini untuk konversi nilai derajat roll angel
  if(val2<=50){roll_val = -1*(Math.floor((val*1.04)-16))}
  else if(val2>50){roll_val = Math.floor(((val-50)*1.04)-16)}

  // ini untuk konversi nilai suhu
  temp_val = val3
  temp_dn = Math.floor(val3*1023/100)


  // ini untuk konversi nilai cahaya
  light_val = val4
  if(light_val<=20){
    $('#light-dn').html("DARK")
    document.getElementById('light-dn').className = 'danger'
  }
  else if(light_val>20 && light_val<=60){
    $('#light-dn').html("MEDIUM")
    document.getElementById('light-dn').className = 'normal'
}
  else{
    $('#light-dn').html("BRIGHT")
    document.getElementById('light-dn').className = 'warning'
}

  // ini untuk konversi nilai water level
  water_val = val5
  water_dn = Math.floor(val5*1023/100)

  // ini untuk konversi nilai kedalaman
  depth_val = val6
  depth_dn = Math.floor(val6*1023/100)

  // ini untuk konversi nilai smoke
  smoke_val = (val7/10)*1.8
  smoke_ppm = val7
  if(smoke_ppm<=300){
    $('#smoke-dn').html("CLEAR")
    document.getElementById('smoke-dn').className = 'normal'
  }
  else if(
    smoke_ppm>300 && smoke_ppm<=600){$('#smoke-dn').html("WARNING")
    document.getElementById('smoke-dn').className = 'warning'
}
  else{
    $('#smoke-dn').html("DANGER")
    document.getElementById('smoke-dn').className = 'danger'
}

  // ini untuk konversi nilai flame
  flame_val = val8*1.8
  flame_persen = val8
  flame_dn = Math.floor(val8*1023/100)

  // ini untuk konversi nilai humidity
  humidity_val = val9

  var statusnya = ['NOT CONNECTED','CONNECTED']
  var kelasnya = ['unconnect', 'connect']

  // Berikan nilai untuk status koneksi
  $('#koneksi').html(statusnya[status])
  if (status == 1) {document.getElementById('koneksi').className = 'connect'}
  else {document.getElementById('koneksi').className = 'unconnect'}

  // Berikan nilai untuk derajat kemiringan kompas
  $('#compass').css('transform','rotate('+ compass_val +'deg)')

  // Berikan nilai untuk derajat kemiringan tilt sensor
  $('#kemiringan').css('transform','rotate('+ kemiringan_val +'deg)')

  // Berikan nilai untuk derajat kemiringan roll sensor
  $('#sudut').css('margin-top',roll_val +'px')

  // Berikan nilai untuk suhu
  $('#temp').html(temp_val)
  if(temp_val<=20){
    $('#temp-dn').html("COLD")
    document.getElementById('temp-dn').className = 'normal'
  }
  else if(temp_val>20 && temp_val<=30){
    $('#temp-dn').html("WARM")
    document.getElementById('temp-dn').className = 'warning'
}
  else{
    $('#temp-dn').html("HOT")
    document.getElementById('temp-dn').className = 'danger'
}

  // Berikan nilai untuk cahaya
  $('#light').html(light_val)

  // Berikan nilai untuk soil moisture
  $('#water').html(water_val)
  if(water_val<=20 || water_val>=80){
    $('#water-dn').html("DANGER")
    document.getElementById('water-dn').className = 'danger'
  }
  else{
    $('#water-dn').html("NORMAL")
    document.getElementById('water-dn').className = 'normal'
}

  // Berikan nilai untuk depth
  $('#depth').html(depth_val)
  if(depth_val<=30){
    $('#depth-dn').html("DANGER")
    document.getElementById('depth-dn').className = 'danger'
  }
  else if(
    depth_val>30 && depth_val<=60){$('#depth-dn').html("WARNING")
    document.getElementById('depth-dn').className = 'warning'
}
  else{
    $('#depth-dn').html("NORMAL")
    document.getElementById('depth-dn').className = 'normal'
}

  // Berikan nilai untuk smoke
  $('#smoke').css('transform','rotate('+ smoke_val +'deg)')
  $('#smoke-persen').html(smoke_ppm)

  // Berikan nilai untuk flame
  $('#flame').css('transform','rotate('+ flame_val +'deg)')
  $('#flame-persen').html(flame_persen)
  if(flame_persen<=20){
    $('#flame-dn').html("NO FIRE")
    document.getElementById('flame-dn').className = 'normal'
  }
  else if(flame_persen>20 && flame_persen<=60){
    $('#flame-dn').html("WARNING")
    document.getElementById('flame-dn').className = 'warning'
}
  else{
    $('#flame-dn').html("WILDFIRE")
    document.getElementById('flame-dn').className = 'danger'
}

  // Berikan nilai untuk humidity
  $('#humidity').html(humidity_val)
}
setInterval('Get_Sensor_Value()',2000)

function Click_Chart(){
  var chartTitle = [
                    'GRAFIK SUHU TIME SERIES',
                    'GRAFIK INTENSITAS CAHAYA TIME SERIES',
                    'GRAFIK KELEMBAPAN TANAH TIME SERIES',
                    'GRAFIK KEDALAMAN TIME SERIES',
                    'GRAFIK INTENSITAS GAS TIME SERIES',
                    'GRAFIK INTENSITAS API TIME SERIES'
                  ]
  var xTitle = ['TEMPERATURE (\xB0 C)','LIGHT INTENSITY (%)','SOIL MOISTURE (%)','DEPTH (cm)','SMOKE INTENSITY (%)','FLAME INTENSITY (%)']

  var dataTemp = []; var dataLight = []; var dataSoil = []; var dataDepth = []; var dataSmoke = []; var dataFlame = []
  for (i = 0; i <= 100; i++) {
    dataTemp[i] = Math.floor(Math.random()*100+1)
    dataLight[i] = Math.floor(Math.random()*100+1)
    dataSoil[i] = Math.floor(Math.random()*100+1)
    dataDepth[i] = Math.floor(Math.random()*100+1)
    dataSmoke[i] = Math.floor(Math.random()*100+1)
    dataFlame[i] = Math.floor(Math.random()*100+1)
  }

  $('#tmb-chart-0').click(function(){
    Give_Tombol_Style(0)
    Display_Chart(chartTitle[0],xTitle[0],dataTemp)
  })
  $('#tmb-chart-1').click(function(){
    Give_Tombol_Style(1)
    Display_Chart(chartTitle[1],xTitle[1],dataLight)
  })
  $('#tmb-chart-2').click(function(){
    Give_Tombol_Style(2)
    Display_Chart(chartTitle[2],xTitle[2],dataSoil)
  })
  $('#tmb-chart-3').click(function(){
    Give_Tombol_Style(3)
    Display_Chart(chartTitle[3],xTitle[3],dataDepth)
  })
  $('#tmb-chart-4').click(function(){
    Give_Tombol_Style(4)
    Display_Chart(chartTitle[4],xTitle[4],dataSmoke)
  })
  $('#tmb-chart-5').click(function(){
    Give_Tombol_Style(5)
    Display_Chart(chartTitle[5],xTitle[5],dataFlame)
  })
  $('#tmb-chart-6').click(function(){
    Give_Tombol_Style(6)
    Compare_Chart(xTitle,dataTemp,dataLight,dataSoil,dataDepth,dataSmoke,dataFlame)
  })

  Give_Tombol_Style(0)
  Display_Chart(chartTitle[0], xTitle[0],dataTemp)
}

function Give_Tombol_Style(index){

  for(i=0; i<=5; i++){
    $('#tmb-chart-'+i).css('background','rgba(85,167,192,.15)')
  }

  $('#tmb-chart-'+index).css('background','rgb(85,167,192)')
}
function Display_Chart(chartTitle,xTitle,data) {
  $('#container').highcharts({
      chart: {
          zoomType: 'x',
          backgroundColor: 'rgba(0,0,0,0)'
      },
      credits:{
        enabled: false
      },
      title: {
          text: chartTitle,
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
          title: {
              text: xTitle,
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
          data: data
      }]
  });
}

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
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = Call_Data_Temp_Realtime();
                        series.addPoint([x, y], true, true);
                    }, 1000);
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

function Call_Data_Temp_Realtime(){
  var a = Math.floor(Math.random()*100)+1
  return a
}

function Give_Tombol_Style(index){
  for(i=0; i<=5; i++){
    $('#tmb-chart-'+i).css('background','rgba(85,167,192,.15)')
  }

  $('#tmb-chart-'+index).css('background','rgb(85,167,192)')
}

/*
function Compare_Chart(xTitle,dataTemp,dataLight,dataSoil,dataDepth,dataSmoke,dataFlame) {

    $('#container').highcharts({
        chart: {
            backgroundColor: 'rgba(0,0,0,0)'
        },
        title: {
            text: 'GRAFIK PERBANDINGAN NILAI SENSOR TIME SERIES',
            style:{
                    color: 'rgb(85,167,192)'
            }
        },
        credits:{
          enabled: false
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
            title: {
                text: 'PERSENTASE (%)'
            },
            labels:{
              style:{
                      color: 'rgb(85,167,192)'
              }
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: xTitle[0],
            data: dataTemp
        }, {
            name: xTitle[1],
            data: dataLight
        }, {
            name: xTitle[2],
            data: dataSoil
        }, {
            name: xTitle[3],
            data: dataDepth
        }, {
            name: xTitle[4],
            data: dataSmoke
        }, {
            name: xTitle[5],
            data: dataFlame
        }]
    });

}
*/
