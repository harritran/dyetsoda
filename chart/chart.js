console.log("Chart.js " + Chart.version);
//----REMEBER TO CHECK SCRIPT LINK IN HTML----
//----TASK: BLOCKOUT, ANIMATIC, MODELLING, RIGGING, ANIMATION, VFX/LIGHT, RENDER, COMP, CLOSED

const colorCode = {
    PENDING: 'rgba(255, 26, 104, .7)',
    PLANNED: 'rgba(54, 162, 235, .7)',
    WORKING: 'rgba(255, 206, 86, .7)',
    DONE: 'rgba(75, 192, 192, .7)',
    UNKNOWN: 'rgba(153, 102, 255, .7)',
    REVIEW: 'rgba(255, 159, 64, .7)'
}
const data = {
    //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'projName1', //PROJECT NAME
        data: [
            {x: ['2022-05-02', '2022-05-15'], y: 'MODELLING', name: 'James', status: 'PLANNED', duration:'1', pay:'900', note:''},
            {x: ['2022-05-03', '2022-05-25'], y: 'ANIMATIC', name: 'Kirk', status: 'REVIEW', duration:'2', pay:'100', note:''},
            {x: ['2022-05-02', '2022-05-05'], y: 'ANIMATION', name: 'Jasmine', status: 'DONE', duration:'3', pay:'250', note:''},
            {x: ['2022-05-12', '2022-05-30'], y: 'RENDER', name: 'John', status: 'WORKING', duration:'4', pay:'520', note:''},
            {x: ['2022-05-10', '2022-06-04'], y: 'COMP', name: 'Logan', status: 'PENDING', duration:'4', pay:'400', note:''},
            {x: ['2022-05-10', '2022-06-10'], y: 'RENDER1', name: 'Logan', status: 'PENDING', duration:'5', pay:'400', note:''}
        ],
        backgroundColor: (ctx) => { 
            return colorCode[ctx.raw.status];

        } 
        //backgroundColor: 'rgba(10, 216, 82, 0.8)'
    }]
  };
//----PLUGINS----------------------------
    const todayLine = {
        id: 'todayLine',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: { top, bottom, left, right }, scales: {x, y}} = chart;
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 1 ;
            ctx.strokeStyle = 'rgba(255, 26, 104, 1)';
            ctx.moveTo(y.getPixelForValue(new Date()), top);
            ctx.lineTo(y.getPixelForValue(new Date()), bottom);
            ctx.stroke();
            ctx.restore();

            ctx.fillText(`${new Date().getDate()}-${new Date().getMonth()+1}`,y.getPixelForValue(new Date()), bottom);
            }

            
    }
    const assignedTask = { //this one works so far
        id: 'assignTask',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: { top, bottom, left, right }, scales: {x,y}} = chart;
            ctx.textBaseline = 'middle';
            data.datasets[0].data.forEach((datapoint, index) => {
                //ctx.fillText(datapoint.name, 10, y.getPixelForValue(index)); // THIS WORKS
            });
        }
    }
    const taskStatus = {
        id: 'taskStatus',
        afterDatasetsDraw(chart, args, pluginOptions) {
            const { ctx, data, chartArea: { top, bottom, left, right }, scales: {x,y}} = chart;
            ctx.save();
            data.datasets[0].data.forEach((datapoint, index) => {
                ctx.fillText(datapoint.status, 80, y.getPixelForValue(index)); //datapoint.x[0] doesnt work
                
            });
            ctx.restore();
        }
    }

//-----CONFIG------------------------------------------ 
  const config = {
    type: 'bar',
    data,
    options: {
      layout: {padding:{left:0}},
      indexAxis : 'y',
      scales: {
        x: {
            position: 'top',
            type: 'time',
            time: {displayFormats:{day:'dd-MM'}},
            min: '2022-04-27', //PROJECT START DATE
            max: '2022-06-10' //PROJECT END DATE
        }
      },
      plugins:{
        legend: {display:false},
        tooltip:{callbacks:{title:(ctx) => { //todo write duration function
            const start = new Date(ctx[0].raw.x[0])
            const end = new Date(ctx[0].raw.x[1])
            const duration = ctx[0].raw.duration
            return `${start.toLocaleString([],{day:'numeric', month:'short'})} - ${end.toLocaleString([],{day:'numeric', month:'short'})} | ${duration} days`
        }}}

        }
    },
    plugins: [todayLine, assignedTask, taskStatus] //TODO: make collumn for duration, start-end date, pay
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
const currentDate = new Date();
//const options = { month: 'numeric', day: 'numeric' };
const formattedDate = new Date().toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' });
console.log(formattedDate);