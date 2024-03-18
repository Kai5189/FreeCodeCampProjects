const jsonData =
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

function timeZoneOffset(date) {
  var newDate = new Date(date);
  var userTimezoneOffset = newDate.getTimezoneOffset() * 60000;
  return new Date(newDate.getTime() + userTimezoneOffset);
}

async function getData() {
  const dataset = await d3.json(jsonData);
  const w = 800;
  const h = 500;
  const padding = 40;

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset.data, d => d[1])])
    .range([h - padding, padding]);

  const mindate = timeZoneOffset(dataset.data[0][0]);
  const maxdate = timeZoneOffset(dataset.data[dataset.data.length - 1][0]);

  const xScale = d3
    .scaleTime()
    .domain([mindate, maxdate])
    .range([padding, w - padding]);

  const svg = d3
    .select('#main')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  // start of new tooltip define new div
  var tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);

  svg
    .selectAll('rect')
    .data(dataset.data)
    .enter()
    .append('rect')
    .attr('width', 5)
    .attr('height', (d, i) => h - padding - yScale(d[1]))
    .attr('x', (d, i) => xScale(timeZoneOffset(d[0])))
    .attr('y', (d, i) => yScale(d[1]))
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .attr('class', 'bar')
    .on('mouseover', d => {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0.9);
      tooltip
        .html(`${timeZoneOffset(d[0])} <br> $${d[1]} Billion`)
        .attr('data-date', d[0])
        .style('left', d3.event.pageX + 10 + 'px')
        .style('top', d3.event.pageY + 'px');
    })
    .on('mouseout', () => {
      tooltip
        .transition()
        .duration(500)
        .style('opacity', 0);
    });

  const xAxis = d3.axisBottom(xScale);
  svg
    .append('g')
    .attr('transform', `translate(0, ${h - padding})`)
    .call(xAxis)
    .attr('id', 'x-axis');

  const yAxis = d3.axisLeft(yScale);
  svg
    .append('g')
    .attr('transform', `translate( ${padding}, 0)`)
    .call(yAxis)
    .attr('id', 'y-axis');

  svg
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 0 + padding + 5)
    .attr('x', 0 - h / 3)
    .attr('dy', '1em')
    .attr('class', 'label')
    .style('text-anchor', 'middle')
    .text('Gross Domestic Product');
}

getData();