// jQuery

$(document).mousemove(function(event) {
    $('#tooltip').css('left', event.clientX + 'px')
    $('#tooltip').css('top', event.clientY + 'px')
});


let svg;
let heightScale;
let widthScale;
let xScale;

const w = 1000;
const h = 500;
const padding = 40;

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then(response => response.json())
    .then(function (response) {
        addSvg(response);
        
    })

const addSvg = (response) => {
    svg = d3.select('#graph-div')
            .append('svg')
            .attr('width', w)
            .attr('height', h);

    addScale(response);
}

const tooltip = d3.select('#graph-div')
                  .append('div')
                  .attr('id', 'tooltip')
                  .attr('class', 'smallfont')
                  .style('position', 'absolute')
                  .style('opacity', '0')

const addScale = (response) => {
    const specifier = '%M:%S';
    const timeArray = response.map(d => d3.timeParse(specifier)(d.Time))
    const yearArray = response.map(d => d.Year);

    xScale = d3.scaleLinear()
               .domain([1993, d3.max(yearArray)])
               .range([padding, w - padding]);

    widthScale = d3.scaleLinear()
                   .domain([1993, d3.max(yearArray)])
                   .range([padding, w - padding]);

    heightScale = d3.scaleTime()
                    .domain(d3.extent(timeArray))
                    .range([padding, h - padding])

    addAxis(timeArray, yearArray, response);
}

const addAxis = (timeArray, yearArray, response) => {
    const yAxis = d3.axisLeft(heightScale);
    const xAxis = d3.axisBottom(xScale);

    svg.append('g')
       .attr('id', 'y-axis')
       .attr('transform', 'translate(' + padding + ', 0)')
       .call(yAxis.tickFormat(d => d3.timeFormat('%M:%S')(d)));
    
    svg.append('g')
       .attr('id', 'x-axis')
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis.tickFormat(d => d));
    
    addScatter(timeArray, yearArray, response);
}

const addScatter = (timeArray, yearArray, response) => {
    const specifier = '%M:%S';

    svg.selectAll('circle')
       .data(response)
       .enter()
       .append('circle')
       .attr('class', 'dot')
       .attr('data-xvalue', (d) => d.Year)
       .attr('data-yvalue', (d) => new Date(d.Year, 0, 0, 0, d.Time.substring(0, 2), d.Time.substring(3, 5)))
       .attr('fill', function(d) {
           if (d.URL == "") {
               return 'orange';
           } else {
               return 'blue';
           }
       })
       .attr('cx', (d, i) => widthScale(d.Year))
       .attr('cy', (d, i) => heightScale(d3.timeParse(specifier)(d.Time)))
       .attr('r', 5)
       .on('mouseover', (event) => tooltip.style('opacity', '1')
                                          .attr('data-year', event.currentTarget.dataset.xvalue))
       .on('mousemove', (event) => tooltip
                                          .html(`<b>Name:</b> ${event.currentTarget.__data__.Name}` + '<br>' + `<b>Doping:</b> ${event.currentTarget.__data__.Doping}` + "<br>" + `<b>Nationality:</b> ${event.currentTarget.__data__.Nationality}` + "<br>" + `<b>Place:</b> ${event.currentTarget.__data__.Place}` + '<br>' + `<b>Time:</b> ${event.currentTarget.__data__.Time}` + "<br>" + `<b>Year:</b> ${event.currentTarget.__data__.Year}`))
       .on('mouseout', () => tooltip.style('opacity', 0));

    addLegend();
}

const addLegend = () => {
    const legendItems = [
        {text: 'Without doping allegations', color: 'orange'},
        {text: 'With doping allegations', color: 'blue'}
    ]

    const legend = d3.select('#legend')
      .append('svg')
      .attr('width', 100)
      .attr('height', 100)
      .style('position', 'absolute')
      .attr('transform', `translate(${w - padding}, 0)`)
      .selectAll('.legendItem')
      .data(legendItems)
      .enter()
      .append('rect')
      .attr('class', 'legendItem')
      .attr('width', 12)
      .attr('height', 12)
      .style('fill', d => d.color)
      .attr('transform', (d, i) => {
          let x = 0;
          let y = padding + (i * 20);
          return `translate(${x}, ${y})`

      });

    svg.append('text')
       .attr('x', w - (padding + 200))
       .attr('y', padding + 10)
       .text(legendItems[0].text);

    svg.append('text')
       .attr('x', w - (padding + 200))
       .attr('y', padding + 30)
       .text(legendItems[1].text);
}