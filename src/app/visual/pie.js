/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Thu Aug 22 2019
 * Description: 
 * This is a work in progress utility component for 
 * graphical representation of users assets in bank.
 * Not yet developed.
 *
 */

var data = [{
    values: [200, 35, 87, 40, 44, 300, 5],
    labels: ['Кредити', 'Уштеђевина', 'Плата', 'Кредитна картица','Дугови', 'Пензиони фонд', 'Дивиденде'],
    text: 'Расположива средства',
    textposition: 'inside',
    domain: {column: 1},
    name: 'Расположива средства',
    hoverinfo: 'label+percent+name+value',
    hole: .4,
    type: 'pie'
  }];
  
  var layout = {
    title: 'Расположива средства',
    grid: {rows: 1},
    showlegend: true,
    annotations: [
      {
        font: {
          size: 12
        },
        showarrow: false,
        text: 'Моја средства',
        x: 0.503,
        y: 0.5
      }
    ]
  };
  
  Plotly.newPlot('myDiv', data, layout, {showSendToCloud:true ,displayModeBar: false});