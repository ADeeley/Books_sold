window.onload = function() {
    d3.json('data/authors.json', function(data) {
        let margin = {top: 20, right: 20, 
                      bottom: 50, left: 70}

        let radius = 5,
            width = 800,
            height = 600,
            outerWidth = width + margin.right + margin.left,
            outerHeight = height + margin.top + margin.bottom,
            n = null;

        let x = d3.scaleLinear()
            .domain([0, Math.max.apply(null, (data.map((author) => parseInt(author[5]))))])
            .range([0, width])

        console.log('test: ' + x(50000))
        let chart = d3.select('.chart')
            .attr('width', outerWidth)
            .attr('height', outerHeight)

        let circle = chart.selectAll('circle')
            .data(data)
        .enter().append('circle')
            .attr('class', 'point')
            .attr('cx', (d) => margin.left + x(parseInt(d[5])))
            .attr('cy', (d) => height - parseInt(d[2]))
            .attr('r', radius)
    })
}
